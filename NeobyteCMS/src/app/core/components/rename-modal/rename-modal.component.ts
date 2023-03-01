import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.css']
})
export class RenameModalComponent {

  @Input() rename: ((args: any) => void) | undefined;

  constructor() { }

  renameFile() {
    this.rename?.call(this, {name: 'new name'});
  }


}
