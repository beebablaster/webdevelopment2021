import { Component, OnInit } from '@angular/core';
import {Albums} from '../models';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Albums[];
  loaded: boolean;
  newAlbum: string;
  constructor(private albumsService: AlbumsService) {
    this.newAlbum = '';
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  // tslint:disable-next-line:typedef
  getAlbums(){
    this.loaded = false;
    this.albumsService.getAlbums().subscribe( (albums) => {
      this.albums = albums;
      this.loaded = true;
    });
  }

  deleteAlbum(id: number){
    this.albums = this.albums.filter((x) => x.id !== id);
    this.albumsService.deleteAlbum(id).subscribe(() =>
    console.log('deleted', id));
  }

  addAlbum(){
    const album = {
      title: this.newAlbum
    };
    this.loaded = false;
    // tslint:disable-next-line:no-shadowed-variable
    this.albumsService.addAlbum(album as Albums).subscribe((album) =>{
      console.log(album);
      this.albums.unshift(album);
      this.newAlbum = '';
      this.loaded = true;
  });
  }
}
