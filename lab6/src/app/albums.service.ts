import { Injectable } from '@angular/core';
import {ALBUMS} from './albums-db';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Albums, Photos} from './models';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

    BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private client: HttpClient) { }

  // // tslint:disable-next-line:typedef
  // getAlbums(){
  //   return of(ALBUMS);
  // }
  //
  // // tslint:disable-next-line:typedef
  // getAlbum(id: number){
  //   const album = ALBUMS.find((x) => x.id === id);
  //   return of(album);
  // }

  // tslint:disable-next-line:typedef
  getAlbums(): Observable<Albums[]>{
    return this.client.get<Albums[]>(`${this.BASE_URL}/albums`);
  }

  // tslint:disable-next-line:typedef
  getAlbum(id: number): Observable<Albums>{
    return this.client.get<Albums>(`${this.BASE_URL}/albums/${id}`);
  }

  deleteAlbum(id: number): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/albums/${id}`);
  }

  updateAlbum(album: Albums): Observable<Albums>{
    return this.client.put<Albums>(`${this.BASE_URL}/albums/${album.id}`, album);
  }

  addAlbum(album: Albums): Observable<Albums>{
    return this.client.post<Albums>(`${this.BASE_URL}/albums`, album);
  };

  getPhotos(id: number): Observable<Photos[]>{
    return this.client.get<Photos[]>(`${this.BASE_URL}/albums/${id}/photos`);
  }
}
