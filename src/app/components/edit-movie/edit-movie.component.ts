import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MoviesService } from './../../services/movies.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetMovieForm') myNgForm;
  movieForm: FormGroup;
  EstadoinArray: any = ['Activo', 'Inactivo'];

  ngOnInit() {}

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private movieService: MoviesService
  ) {
    var id = parseInt(this.actRoute.snapshot.paramMap.get('id'));
    const data = this.movieService.getMovie(id)[0];

    this.movieForm = this.fb.group({
      id_: [data._id, [Validators.required]],
      nombre: [data.nombre, [Validators.required]],
      pub: [data.publicacion, [Validators.required]],
      estado: [data.estado, [Validators.required]],
    });
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.movieForm.get('dob').setValue(convertDate, {
      onlyself: true,
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.movieForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateMovieForm() {
    var id = parseInt(this.actRoute.snapshot.paramMap.get('id'));
    if (window.confirm('Are you sure you want to update?')) {
      this.movieService.updateMovie({
        _id: id,
        nombre: this.movieForm.value.nombre,
        publicacion: this.movieForm.value.pub,
        estado: this.movieForm.value.estado,
      });
      this.ngZone.run(() => this.router.navigateByUrl('/movie-list'));
    }
  }
}
