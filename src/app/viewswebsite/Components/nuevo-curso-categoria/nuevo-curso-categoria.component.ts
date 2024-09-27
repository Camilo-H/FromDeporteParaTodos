import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-curso-categoria',
  standalone: true,
  imports: 
  [CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './nuevo-curso-categoria.component.html',
  styleUrls: ['./nuevo-curso-categoria.component.css']
})
export class NuevoCursoCategoriaComponent {
  tituloPrincipal: string = '';
  subtitulo: string = '';
  descripcion: string = '';
  imagenUrl: string | ArrayBuffer | null = null;

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
  guardar(): void {
    // Lógica para guardar los datos
    console.log('Guardado:', {
      tituloPrincipal: this.tituloPrincipal,
      subtitulo: this.subtitulo,
      descripcion: this.descripcion,
      imagenUrl: this.imagenUrl
    });
  }

  cancelar(): void {
    // Lógica para cancelar, por ejemplo, reiniciar el formulario
    this.tituloPrincipal = '';
    this.subtitulo = '';
    this.descripcion = '';
    this.imagenUrl = null;
  }
  onUpdate() {
    // Lógica para actualizar
    console.log('Actualizar');
  }

  onDelete() {
    // Lógica para eliminar
    console.log('Eliminar');
  }
}
