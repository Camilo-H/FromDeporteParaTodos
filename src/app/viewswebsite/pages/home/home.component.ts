import { Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

/**Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../Components/dialog/dialog.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    DialogComponent,
    MatDialogModule,
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  configurarTipoCurso() {
    this.router.navigate(['/configuracionCatCurso']);
  }

  public colsize = 3;
  public isMobile: boolean = false;
  public listaEscenarios: number[] = new Array(3);

  constructor(breakPointObserver: BreakpointObserver, private router: Router, ) {
    for (let index = 0; index < this.listaEscenarios.length; index++) {
      this.listaEscenarios[index] = index;
    }
    breakPointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.colsize = 1;
      } else {
        this.colsize = 3;
      }
    });
  }

  readonly dialog = inject(MatDialog);
  abrirCursosDeportivos(): void {
    this.router.navigate(['/cursos_deportivos']);
  }

  onUpdate(): void {
    this.router.navigate(['/nuevoCursoCategoria']);
    console.log('Actualizar');
  }
  
  onDelete():void {
    const dialogRef = this.dialog.open(DialogComponent, {
      /*data: {name: this.name(), animal: this.animal()},*/
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });*/
  }
  
  nuevaCategoria(): void {
    this.router.navigate(['/nuevoCursoCategoria']);
  }
}
