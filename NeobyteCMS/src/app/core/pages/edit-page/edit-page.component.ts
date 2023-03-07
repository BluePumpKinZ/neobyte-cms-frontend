import {AfterViewInit, Component, ComponentRef, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IframeHelperService} from "../../services/iframe-helper.service";
import {PageService} from "../../services/page.service";
import tinymce from "tinymce";
import {MessageService} from "../../services/message.service";

// import { Editor, EditorSettings } from 'tinymce';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements AfterViewInit, OnInit {
  @ViewChild('content_edit') iframe!: ElementRef<HTMLIFrameElement>;
  siteId: string | undefined;
  pageId: string | undefined;

  // settings: EditorSettings = {}
  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _iframeHelper: IframeHelperService,
    private _pageService: PageService,
  ) {
  }


  ngAfterViewInit(): void {
    this.setupEditor();
    //get iframe and add other _iframeHelper options on it
    // this._iframeHelper.disableInteractions(this.iframe.nativeElement);
    // this._iframeHelper.simulateClicks(this.iframe.nativeElement, window.parent.document);
  }

  get_doctype(doctype: DocumentType): string {
    return '<!DOCTYPE ' +
      doctype.name +
      (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '') +
      (doctype.systemId ? ' "' + doctype.systemId + '"' : '') + '>';
  }

  setupEditor() {
    var dfreeHeaderConfig = {
      base_url: '/tinymce', // Root for resources
      suffix: '.min',        // Suffix to use when loading resources
      selector: '.dfree-header',
      menubar: false,
      inline: true,
      toolbar: false,
      plugins: ['quickbars'],
      quickbars_insert_toolbar: 'undo redo',
      quickbars_selection_toolbar: 'italic underline',
      toolbar_persist: true,
    };

    var dfreeBodyConfig = {
      toolbar_persist: true,
      base_url: '/tinymce', // Root for resources
      suffix: '.min',        // Suffix to use when loading resources
      selector: '.dfree-body',
      menubar: false,
      inline: true,
      plugins: [
        'autolink',
        'codesample',
        'link',
        'lists',
        'media',
        'powerpaste',
        'table',
        'image',
        'quickbars',
        'codesample',
        'help'
      ],
      toolbar: false,
      quickbars_insert_toolbar: 'quicktable image media codesample',
      quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
      contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean',
    };

    tinymce.init(dfreeHeaderConfig);
    tinymce.init(dfreeBodyConfig);


    // tinymce.init({
    //   selector: 'div.tinymce',
    //   plugins: [ 'quickbars' ],
    //   toolbar: false,
    //   menubar: false,
    //   inline: true
    // });
    // tinymce.init({
    //   base_url: '/tinymce', // Root for resources
    //   suffix: '.min',        // Suffix to use when loading resources
    //   selector: "",
    //   plugins: "",
    //   toolbar: "",
    //   menubar: false,
    //
    //   setup: function (editor) {
    //     editor.ui.registry.addContextToolbar('textalignment', {
    //       predicate: function (node) {
    //         return editor.dom.getParent(node, '.myclass') !== null;
    //       },
    //       items: 'alignleft aligncenter alignright',
    //       position: 'selection',
    //       scope: 'node'
    //     });
    //   }
    // });
  }

  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this.pageId = this._route.snapshot.paramMap.get('pageId')!;
    this._iframeHelper.get(`websites/${this.siteId}/pages/${this.pageId}/render`).subscribe(blob => {
      this.iframe.nativeElement.src = blob;
      //wait until iframe is loaded
      this.iframe.nativeElement.onload = () => {
        this._iframeHelper.disableInteractions(this.iframe.nativeElement);
        //this._iframeHelper.simulateClicks(this.iframe.nativeElement, this.iframe.nativeElement.contentWindow!.document);
        this.loadSite();
      }
    });
  }

  onPublishSite() {
    //get the content from the iframe and save it with the pageservice
    let pageDocument = this.iframe.nativeElement.contentDocument!;
    const content = this.get_doctype(pageDocument.doctype!) + pageDocument.documentElement.outerHTML;
    this._pageService.publishPage(this.siteId!, this.pageId!, content).subscribe(
      () => {
        //this._messageService.add({type: 'success', title: 'Page', description: 'Page updated'});
      });
  }

  getDuplicateIds(doc: Document) {
    const elements = [...doc.querySelectorAll('[id]')];
    const ids: string[] = [];
    const dups: Element[] = [];
    elements.map(el => (ids.includes(el.id) ? dups.push(el) : ids.push(el.id)));
    return dups;
  }

  private loadSite() {
    // Blur anything that was autofocused
    if (this.iframe.nativeElement.contentWindow!.document.activeElement) {
      (this.iframe.nativeElement.contentWindow!.document.activeElement as HTMLElement).blur();
    }

    // Show no regions notice
    if (![...this.iframe.nativeElement.contentWindow!.document.querySelectorAll('.cms-editable')].length) {
      //show message that there are no regions
      this._messageService.add({type: 'danger', title: 'No regions', description: 'There are no regions to edit'});
    }

    // Check for duplicate ids
    this.getDuplicateIds(this.iframe.nativeElement.contentWindow!.document).map(element => {
      if (element.classList.contains('cms-editable')) {
        this._messageService.add({type: 'danger', title: 'Duplicate ID', description: 'Duplicate ID found'});
      }
    });

    // Inject TinyMCE
    const script = this.iframe.nativeElement.contentWindow!.document.createElement('script');
    script.src = `${location.protocol}//${location.host}/tinymce/tinymce.min.js`;
    script.onload = () => {
      this.setupEditor();
      this._messageService.add({type: 'success', title: 'Editor loaded', description: 'Editor (TinyMCE) loaded successfully.'});
    }

    // If TinyMCE fails to load
    script.onerror = (error) => {
      this._messageService.add({type: 'danger', title: 'Editor failed', description: 'Editor (TinyMCE) failed to load. Please try again later.'});
    };

    this.iframe.nativeElement.contentWindow!.document.body.appendChild(script);
  }
}

