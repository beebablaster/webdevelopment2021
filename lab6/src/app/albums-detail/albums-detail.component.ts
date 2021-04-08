import { Component, OnInit } from '@angular/core';
import {Albums, Photos} from '../models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-albums-detail',
  templateUrl: './albums-detail.component.html',
  styleUrls: ['./albums-detail.component.css']
})
export class AlbumsDetailComponent implements OnInit {
  album: Albums;
  loaded: boolean;
  photos: Photos;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  // tslint:disable-next-line:typedef
  getAlbum() {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      // @ts-ignore
      const id = +params.get('id');
      this.loaded = false;
      this.albumsService.getAlbum(id).subscribe((album) => {
        // tslint:disable-next-line:no-non-null-assertion
        this.album = album!;
        this.loaded = true;
      });
    });
  }

  // tslint:disable-next-line:typedef
  returnBack(){
  this.location.back();
  }

  updateAlbum(){
    this.loaded = false;
    this.albumsService.updateAlbum(this.album).subscribe((album) =>
    console.log(album));
    this.loaded = true;
    }
}
