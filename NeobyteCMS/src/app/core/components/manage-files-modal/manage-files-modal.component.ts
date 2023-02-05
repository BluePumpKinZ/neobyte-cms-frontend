import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-files-modal',
  templateUrl: './manage-files-modal.component.html',
  styleUrls: ['./manage-files-modal.component.css']
})
export class ManageFilesModalComponent {
  files = ['File 1', 'File 2', 'File 3'];
  selectedFile: string = "";

  constructor() {}

  selectFile(file: string) {
    this.selectedFile = file;
    alert(this.selectedFile);
  }
}
