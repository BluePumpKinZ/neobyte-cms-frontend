import {Component, Input, OnInit} from '@angular/core';
import {WebsiteService} from "../../services/website.service";
import {FilemanagerService} from "../../services/filemanager.service";
import {FileSystemItem} from "../../models/File";

@Component({
  selector: 'app-manage-files-modal',
  templateUrl: './manage-files-modal.component.html',
  styleUrls: ['./manage-files-modal.component.css']
})
export class ManageFilesModalComponent implements OnInit {
  selectedFile: FileSystemItem | undefined;
  currentPath: string = "/uploads";
  breadcrumbs: string[] = [];
  fmentries: FileSystemItem[] = [];

  @Input() siteId: string | undefined;

  constructor(private _filemanagerService: FilemanagerService,) {
  }

  ngOnInit(): void {
      this.getEntriesSorted(this.siteId!, this.currentPath);
  }

  getEntriesSorted(siteId: string, path: string) {
    this._filemanagerService.getEntries(siteId, path).subscribe(files => {
      this.fmentries = files.sort((a: { isDirectory: any; }, b: { isDirectory: any; }) => {
        if (a.isDirectory && !b.isDirectory) {
          return -1;
        } else if (!a.isDirectory && b.isDirectory) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  getFileSizeinKB(size: number) {
    return Math.round(size / 1024);
  }

  selectEntry(entry: FileSystemItem) {
    this.selectedFile = entry;
  }

  deleteEntry(entry: FileSystemItem) {
    if (!confirm("Are you sure you want to delete this file?")) {
      return;
    }
    if (entry.isDirectory) {
      this._filemanagerService.deleteFolder(this.siteId!, entry.path).subscribe(() => {
        this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
          this.fmentries = files;
        });
      });
    } else {
      this._filemanagerService.deleteFile(this.siteId!, entry.path).subscribe(() => {
        this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
          this.fmentries = files;
        });
      });
    }
  }

  renameEntry(entry: FileSystemItem, newName: string) {
    if (!confirm("Are you sure you want to rename this file?")) {
      return;
    }
    if (entry.isDirectory) {
      this._filemanagerService.renameFolder(this.siteId!, entry.path, newName).subscribe(() => {
        this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
          this.fmentries = files;
        });
      });
    } else {
      this._filemanagerService.renameFile(this.siteId!, entry.path, newName).subscribe(() => {
        this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
          this.fmentries = files;
        });
      });
    }
  }

  uploadFile(file: File) {
    this._filemanagerService.uploadFile(this.siteId!, this.currentPath, file).subscribe(() => {
      this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
        this.fmentries = files;
      });
    });
  }

  createFolder() {
    this._filemanagerService.addFolder(this.siteId!, this.currentPath).subscribe(() => {
      this._filemanagerService.getEntries(this.siteId!, "/").subscribe(files => {
        this.fmentries = files;
      });
    });
  }

  loadOtherDir(name: string, index: number = this.breadcrumbs.length) {
    if (index == -1) {
      this.currentPath = "";
      this.breadcrumbs = [];
    } else {
      this.breadcrumbs = this.breadcrumbs.slice(0, index);
      this.breadcrumbs.push(name);
      this.currentPath = this.breadcrumbs.join("/");
    }
    console.log(this.currentPath);
    this.getEntriesSorted(this.siteId!, "/uploads/"+this.currentPath);


    // this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    // this.breadcrumbs.push(name);
    // this.currentPath = this.breadcrumbs.join("/").toString();
    //
    // this.getEntriesSorted(this.siteId!, "/uploads/"+this.currentPath);
  }
}
