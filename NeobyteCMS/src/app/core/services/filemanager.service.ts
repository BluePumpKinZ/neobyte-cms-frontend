import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, tap} from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {

  constructor(private http: HttpClient, private messageService: MessageService, private authService: AuthService) {}

  addFolder(siteId:string, path: string): Observable<any> {
    return this.http.post(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/folder/create`, {path: path}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Folder', description: 'Folder created'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  getEntries(siteId:string, path: string): Observable<any> {
    return this.http.get(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/folder/list`, {params: {path: path}}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Folder', description: 'Entry created'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  renameFolder(siteId:string, path: string, newPath: string): Observable<any> {
    return this.http.post(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/folder/rename`, {path: path, newPath: newPath}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Folder', description: 'Folder renamed'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  deleteFolder(siteId:string, path: string): Observable<any> {
    return this.http.delete(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/folder/delete`, {params: {path: path}}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Folder', description: 'Folder deleted'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  renameFile(siteId:string, path: string, newPath: string): Observable<any> {
    return this.http.post(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/file/rename`, {path: path, newPath: newPath}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'File', description: 'File renamed'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  deleteFile(siteId:string, path: string): Observable<any> {
    return this.http.delete(`websites/${siteId}/${ this.authService.getRole() == 'OWNER' ? 'home' : 'upload' }/file/delete`, {params: {path: path}}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'File', description: 'File deleted'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }

  uploadFile(siteId:string, path: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    return this.http.post(`websites/${siteId}/upload/file/`, formData).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'File', description: 'File uploaded'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    );
  }
}
