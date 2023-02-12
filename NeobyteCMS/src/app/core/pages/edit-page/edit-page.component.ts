import {AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements AfterViewInit {
  originalURL = "https://www.google.com"

  // @ViewChild('content_edit', {static: false}) iframe: ElementRef;
  //
  // firstInput = 5;
  // doc;
  // compRef: ComponentRef<InnerComponent>;


  ngAfterViewInit(): void {

    // this.doc = this.iframe!.contentDocument || this.iframe!.contentWindow;
    //
    // console.log(iframeContent)

    // const cmsEditableElements = iframe.getElementsByClassName("cms-editable")
    // console.log(cmsEditableElements)
    // for (let i = 0; i < cmsEditableElements.length; i++) {
    //   cmsEditableElements[i].setAttribute("contenteditable", "true")
    //   cmsEditableElements[i].classList.add("mce-content-body", "cms-initialized")
    // }

    // // Add the styles to the head tag
    // const styleTag = iframeContent.createElement("style");
    // styleTag.innerHTML = ".home{color:white}";
    // iframeContent.head.appendChild(styleTag);
  }
}

