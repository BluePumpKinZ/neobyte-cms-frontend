import {AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements AfterViewInit, OnInit {
  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;
  siteId: string | undefined;
  pageId: string | undefined;
  pageUrl: string | undefined;
  constructor(

    private _route: ActivatedRoute,
  ) { }



  ngAfterViewInit(): void {


  }

  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this.pageId = this._route.snapshot.paramMap.get('pageId')!;
  }
}

