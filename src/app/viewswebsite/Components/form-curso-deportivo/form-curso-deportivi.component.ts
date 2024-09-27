import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-curso-deportivi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-curso-deportivi.component.html',
  styleUrls: ['./form-curso-deportivi.component.css']
})
export class FormCursoDeportiviComponent {

  tituloPrincipal: string = '';
  subtitulo: string = '';
  descripcion: string = '';
  imagenUrl: string | ArrayBuffer | null = null;
  
  constructor(private router: Router){}
  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
       //this.imagenUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
  guardar(): void{
    this.router.navigate(['/cursos_deportivos']);
  }
  cancelar(): void{
    this.router.navigate(['/cursos_deportivos']);
  }
  

}
