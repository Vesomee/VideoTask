import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from 'src/app/modules/video/models/video';
import { API_KEY, API_URL } from '../config';
import { SearchVideoResponse } from '../../modules/video/models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoApi {
  constructor(private httpClient: HttpClient) { }

  public getAll(year: string | undefined, videoType: string | undefined, title: string | undefined): Observable<SearchVideoResponse> {
    const params = new HttpParams({
      fromObject: {
        type: videoType || '',
        y: year || '',
        s: title  || ''
      }
    });

    return this.httpClient.get<SearchVideoResponse>(API_URL + API_KEY, {params});
  }

  public getById(id: string): Observable<Video> {
    const params = new HttpParams({
      fromObject: {
        i: id
      }
    });

    return this.httpClient.get<Video>(API_URL + API_KEY, {params});
  }
}
