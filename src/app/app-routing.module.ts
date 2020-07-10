import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ListMovieComponent } from './components/list-movie/list-movie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movie-list' },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: 'movie-list', component: ListMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }