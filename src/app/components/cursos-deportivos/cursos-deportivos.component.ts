import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreakpointObserver,  Breakpoints} from '@angular/cdk/layout';
import { Router } from '@angular/router';

/**Dependencia Material */
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cursos-deportivos',
  standalone: true,
  templateUrl: './cursos-deportivos.component.html',
  styleUrls: ['./cursos-deportivos.component.css'],
  imports: 
  [
    CommonModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule

  ],
})
export class CursosDeportivosComponent {
tablaDeportistasCurso() {
  this.router.navigate(['/list_cursos'])
}
inscribirseAcurso():void {
  this.router.navigate(['/inscripciones']);
}
configurar():void{
  this.router.navigate(['/']);
}
  public colsize=3;
  public isMobile: boolean = false;
  public listaEscenarios: number[] =new Array(9);
  public infoCurso: string = "Es una cancha con el sistema de revestimiento acrílico compuesto por seis (6) capas, utilizado en canchas de hockey, pistas de patinaje, ciclo rutas, zonas de bicicletas. también se puede utilizar para canchas de tenis, baloncesto, fútbol sala y voleibol. El sistema es 100% acrílico, obteniendo una combinación de capas de textura y acabado no abrasivo, Es una cancha con el sistema de revestimiento acrílico compuesto por seis (6) capas, utilizado en canchas de hockey, pistas de patinaje, ciclo rutas, zonas de bicicletas. también se puede utilizar para canchas de tenis, baloncesto, fútbol sala y voleibol. El sistema es 100% acrílico, obteniendo una combinación de capas de textura y acabado no abrasivo";

  constructor(breakPointObserver: BreakpointObserver, private router: Router){
    for (let index = 0; index < this.listaEscenarios.length; index++) {
      this.listaEscenarios[index]=index;    
    }
    breakPointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result =>{
      this.isMobile = result.matches;
      if(this.isMobile){
        this.colsize=1;
      }else{
        this.colsize=3;
      }
    });
  }

  
}
