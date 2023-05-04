import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadResult } from '../model/upload-result';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private httpClient: HttpClient) { }

  getImage(postId: string){
    return lastValueFrom(this.httpClient.get<UploadResult>('/get-image/' + postId));
  }
}
