import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreakpointObserver,  Breakpoints} from '@angular/cdk/layout';
import { Route, Router } from '@angular/router';

/**Angular Material */
import {MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
  [CommonModule,
    MatCardModule,
   MatToolbarModule,
   MatGridListModule,
   MatFormFieldModule,
   MatPaginatorModule,
   MatIconModule,
   
  ],
  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
configurarTipoCurso() {
  this.router.navigate(['/configTipoCurso']);
}

  public colsize=3;
  public isMobile: boolean = false;
  public listaEscenarios: number[] =new Array(3);
  constructor(breakPointObserver: BreakpointObserver, private router: Router) {
    for (let index = 0; index < this.listaEscenarios.length; index++) {
      this.listaEscenarios[index]=index;    
    }
    breakPointObserver.observe([Breakpoints.Handset]).subscribe(result =>{
      this.isMobile = result.matches;
      if(this.isMobile){
        this.colsize=1;
      }else{
        this.colsize=3;
      }
    });
  }
  abrirCursosDeportivos():void {
    this.router.navigate(['/cursos_deportivos']);
  }
  
}