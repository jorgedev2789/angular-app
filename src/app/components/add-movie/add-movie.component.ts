import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetMovieForm') myNgForm;
  movieForm: FormGroup;
  EstadoinArray: any = ['Activo','Inactivo'];


  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private movieService: MoviesService
  ) { }


  /* Reactive book form */
  submitBookForm() {
    this.movieForm = this.fb.group({
      nombre: ['', [Validators.required]],
      pub: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    })
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.movieForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.movieForm.controls[controlName].hasError(errorName);
  }  

  /* Submit form */
  submitMovieForm() {
    if (this.movieForm.valid) {
    
      this.movieService.addMovie({
        _id:null,
        nombre: this.movieForm.value.nombre,
        publicacion: this.movieForm.value.pub,
        estado: this.movieForm.value.estado,
      })
      this.ngZone.run(() => this.router.navigateByUrl('/movie-list'));
    }
  }

}