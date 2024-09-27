import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-inscripciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-inscripciones.component.html',
  styleUrls: ['./form-inscripciones.component.css'],
})
export class FormInscripcionesComponent {
  constructor(private router: Router) {}
  cancelar(): void {
    this.router.navigate(['/cursos_deportivos']);
  }
  guardar(): void {
    this.router.navigate(['/list_cursos']);
  }
}
