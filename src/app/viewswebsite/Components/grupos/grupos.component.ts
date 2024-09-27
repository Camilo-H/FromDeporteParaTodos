import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
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

  guardar():void{

  }
  cancelar():void{
    
  }


}
