import {AfterViewInit, Component, ComponentRef, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IframeHelperService} from "../../services/iframe-helper.service";
import {PageService} from "../../services/page.service";
import tinymce from "tinymce";
import Editor from "../../services/editor/editor";
import {MessageService} from "../../services/message.service";
import {getType} from "../../services/editor/region-types";

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
  activeEditor: Editor | null | undefined;

  // settings: EditorSettings = {}
  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _iframeHelper: IframeHelperService,
    private _pageService: PageService,
  ) {
  }


  ngAfterViewInit(): void {
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
    //add loading class to element #loading at parent window
    window.parent.document.getElementById('loading')!.classList.add('loading');
    //get the content from the iframe and save it with the pageservice
    let pageDocument = this.iframe.nativeElement.contentDocument!;
    const content = this.get_doctype(pageDocument.doctype!) + pageDocument.documentElement.outerHTML;
    this._pageService.publishPage(this.siteId!, this.pageId!, content).subscribe(
      () => {
        //remove loading class to element #loading at parent window
        //add timeout to prevent flashing
        setTimeout(() => {
          window.parent.document.getElementById('loading')!.classList.remove('loading');
          this._messageService.add({type: 'success', title: 'Publish', description: 'Page published successfully'});
        }, 1000);
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
    // this._messageService.add({type: 'info', title: 'Loading', description: 'Loading page...'});
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


    //create a element with custom tag <TINYMCE-INJECT>
    this.iframe.nativeElement.contentWindow!.document.getElementsByTagName('body')[0].appendChild(this.iframe.nativeElement.contentWindow!.document.createElement('TINYMCE-INJECT-FIRST'));

    // Inject TinyMCE
    const script = this.iframe.nativeElement.contentWindow!.document.createElement('script');
    script.src = `${location.protocol}//${location.host}/tinymce/tinymce.min.js`;
    script.onload = () => {
      this._messageService.add({
        type: 'success',
        title: 'Editor loaded',
        description: 'Editor (TinyMCE) loaded successfully.'
      });
      // [...this.iframe.nativeElement.contentWindow!.document.querySelectorAll('.cms-editable')].map(element => {
      //   const hasId = element.hasAttribute('id');
      //   const type = getType(element);
      //   const doc = this.iframe.nativeElement.contentWindow!.document;
      const win = this.iframe.nativeElement.contentWindow!;
      //   // Enable outline transitions afer a brief delay to prevent flashing
      //   console.log(element);
      //
      //   if (!hasId) {
      //     this._messageService.add({
      //       type: 'danger',
      //       title: 'Duplicate ID',
      //       description: 'ID not found on editable element'
      //     });
      //     return;
      //   }

      // Create the editor
      const editor = new Editor(null, {}, (win as any).tinymce);

      editor.initialize().then(() => {
        console.log('editor initialized');
      }).catch((error) => {
        console.log(error);
      });
    }
      // });
      // };

      // If TinyMCE fails to load
      script.onerror = (error) => {
        this._messageService.add({
          type: 'danger',
          title: 'Editor failed',
          description: 'Editor (TinyMCE) failed to load. Please try again later.'
        });
      };

      this.iframe.nativeElement.contentWindow!.document.body.appendChild(script);
    }
}

