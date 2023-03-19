import {Component} from '@angular/core';
import {PageService} from "../../services/page.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SiteDetails} from "../../models/Site";

@Component({
  selector: 'app-add-new-pagemodal',
  templateUrl: './add-new-pagemodal.component.html',
  styleUrls: ['./add-new-pagemodal.component.css']
})
export class AddNewPagemodalComponent {
  addNewPageForm: FormGroup;

  constructor(
    private _pagesService: PageService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {
    this.addNewPageForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      path: ["", [Validators.required]],
    });
  }
  onAddPage() {
    if(this.addNewPageForm.valid) {
      const id = this._route.snapshot.paramMap.get('siteId')!;
      this._pagesService.createEmptyPage(id,this.addNewPageForm.value.name, this.addNewPageForm.value.path).subscribe(
        (data: SiteDetails) => {
        },
        (error) => {
        }
      );
    }
  }
}
