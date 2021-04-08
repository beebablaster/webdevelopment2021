import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AlbumsService} from '../albums.service';
import {ActivatedRoute} from '@angular/router';
import {Photos} from '../models';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photos[];
  constructor(private location: Location,
              private albumsServices: AlbumsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  // tslint:disable-next-line:typedef
  returnBack(){
    this.location.back();
  }

  getPhotos(){
    this.route.paramMap.subscribe((params) => {
      // @ts-ignore
      const id = +params.get('id');
      if (id != null){
        this.albumsServices.getPhotos(id).subscribe((photo) => {
          this.photos = photo;
        });
      }
    });
  }
}
