import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-grupos',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './list-grupos.component.html',
  styleUrls: ['./list-grupos.component.css']
})
export class ListGruposComponent {

  public colsize = 3;
  public isMobile: boolean = false;
  public listaEscenarios: number[] = new Array(3);

  constructor(private router: Router) { }
  onUpdate(): void {

  }
  onDelete(): void {

  }
  nuevoGrupo(): void { this.router.navigate(['/crear-editar-grupo'])}

  verEstudiantesGrupo(): void { this.router.navigate(['/listaDeportistasCurso']) }
}
