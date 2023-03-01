import {Component, Input} from '@angular/core';
import {Page} from "../../models/Page";
import {PageService} from "../../services/page.service";

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.css']
})
export class RenameModalComponent {

  @Input() page: Page | undefined;
  @Input() siteId: string | undefined;

  constructor(
    private _pagesService: PageService,
  ) {
  }

  onRenamePage() {
    if (this.page) {
      this._pagesService.updatePage(this.siteId!, this.page.id, this.page.name, this.page.path).subscribe();
    }
  }
}
