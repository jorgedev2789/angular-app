import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[];

  constructor() {}

  getMovie(id: number) {
    const data = JSON.parse(localStorage.getItem('movies'));
    return data.filter((e) => e._id === id);
  }

  getMovies() {
    if (localStorage.getItem('movies') === null) {
      this.movies = [];
    } else {
      this.movies = JSON.parse(localStorage.getItem('movies'));
    }
    const data = this.sortBy(this.movies,['_id']);
    return data;
  }

  addMovie(movie: Movie) {
    const clone = { ...movie, _id: this.generateID() };
    this.movies.push(clone);
    let movies = [];
    if (localStorage.getItem('movies') === null) {
      movies = [];
      movies.push(clone);
      localStorage.setItem('movies', JSON.stringify(movies));
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
      movies.push(clone);
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }

  updateMovie(movie: Movie) {
    const data = this.movies.map((e) => {
      if (e._id === movie._id) {
        return { ...movie };
      }
      return e;
    });

    localStorage.setItem('movies', JSON.stringify(data));
  }

  deleteMovie(id: number) {
    for (let i = 0; i < this.movies.length; i++) {
      if (id == this.movies[i]._id) {
        this.movies.splice(i, 1);
        localStorage.setItem('movies', JSON.stringify(this.movies));
      }
    }
  }

  generateID() {
    let AutoID = 1; // Get the latest sequential ID for this sector.
    if (localStorage.getItem('ID')) {
      AutoID = parseInt(localStorage.getItem('ID')) + 1; // Save the new ID
      localStorage.setItem('ID', String(AutoID));
    } else {
      localStorage.setItem('ID', String(AutoID));
    }
    return AutoID;
  }

  sortBy (arr, keys, splitKeyChar='~') {
    return arr.sort((i1,i2) => {
        const sortStr1 = keys.reduce((str, key) => str + splitKeyChar+i1[key], '')
        const sortStr2 = keys.reduce((str, key) => str + splitKeyChar+i2[key], '')
        return sortStr2.localeCompare(sortStr1)
    })
}
}
