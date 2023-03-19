import {Component} from '@angular/core';
import {PageService} from "../../services/page.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SiteDetails} from "../../models/Site";

@Component({
  selector: 'app-enable-new-pagemodal',
  templateUrl: './enable-new-pagemodal.component.html',
  styleUrls: ['./enable-new-pagemodal.component.css']
})
export class EnableNewPagemodalComponent {
  addPageForm: FormGroup;

  constructor(
    private _pagesService: PageService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {
    this.addPageForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      path: ["", [Validators.required]],
    });
  }

  onEnablePage() {
    if(this.addPageForm.valid) {
      const id = this._route.snapshot.paramMap.get('siteId')!;
      this._pagesService.createPage(id,this.addPageForm.value.name, this.addPageForm.value.path).subscribe(
        (data: SiteDetails) => {
        },
        (error) => {
        }
      );
    }
  }
}
