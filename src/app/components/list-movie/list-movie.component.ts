import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Movie } from './../../models/movie';
import { MoviesService } from './../../services/movies.service';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddMovieComponent } from '../add-movie/add-movie.component';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
})
export class ListMovieComponent implements OnInit {
  MovieData: any = [];
  dataSource: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'nombre',
    'publicacion',
    'estado',
    'action',
  ];

  constructor(private movieService: MoviesService, private dialog: MatDialog) {
    this.refresh();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  ngOnInit(): void {}

  deleteMovie(index: number, e) {
    if (window.confirm('Are you sure')) {
      console.log(e._id);
      this.movieService.deleteMovie(e._id);

      this.refresh();
    }
  }

  refresh() {
    const data = this.movieService.getMovies();
    this.MovieData = data;
    this.dataSource = new MatTableDataSource<Movie>(this.MovieData);
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddMovieComponent, dialogConfig);
}

}
