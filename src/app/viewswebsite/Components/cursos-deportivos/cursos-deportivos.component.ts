import { Component, ElementRef, HostListener, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

/**Dependencia Material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-cursos-deportivos',
  standalone: true,
  templateUrl: './cursos-deportivos.component.html',
  styleUrls: ['./cursos-deportivos.component.css'],
  imports: [
    CommonModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    DialogComponent,
    MatDialogModule,
    FormularioComponent,
  ],
})
export class CursosDeportivosComponent {
  tablaDeportistasCurso() {
    this.router.navigate(['/list-grupos']);
  }
  inscribirseAcurso(): void {
    this.router.navigate(['/inscripciones']);
  }

  registroDeporte(): void {
    this.router.navigate(['/registroDeCursoDeportivo']);
  }
  public botonInscripcionVisible: boolean = false;
  public colsize = 3;
  public isMobile: boolean = false;
  public listaEscenarios: number[] = new Array(9);
  public infoCurso: string =
    'Es una cancha con el sistema de revestimiento acrílico compuesto por seis (6) capas, utilizado en canchas de hockey, pistas de patinaje, ciclo rutas, zonas de bicicletas. también se puede utilizar para canchas de tenis, baloncesto, fútbol sala y voleibol. El sistema es 100% acrílico, obteniendo una combinación de capas de textura y acabado no abrasivo, Es una cancha con el sistema de revestimiento acrílico compuesto por seis (6) capas, utilizado en canchas de hockey, pistas de patinaje, ciclo rutas, zonas de bicicletas. también se puede utilizar para canchas de tenis, baloncesto, fútbol sala y voleibol. El sistema es 100% acrílico, obteniendo una combinación de capas de textura y acabado no abrasivo';

  constructor(breakPointObserver: BreakpointObserver, private router: Router, private elementRef: ElementRef) {
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

  menuVisible = false;
  menuPosition = { top: '0px', left: '0px' };

  toggleMenu(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic en el botón de configuración cierre el menú inmediatamente
    this.menuVisible = !this.menuVisible;
    
    if (this.menuVisible) {
      const icon = event.target as SVGElement;
      const rect = icon.getBoundingClientRect();
      this.menuPosition = {
        top: `${rect.bottom}px`, // Ajusta la posición vertical
        left: `${rect.left}px`   // Ajusta la posición horizontal
      };
    }
  }

  onUpdate() {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '40%', // O el tamaño que desees
      height: '80%', // O el tamaño que desees
      maxWidth: 'none', // Esto asegura que no haya un máximo
      panelClass: 'mi-dialogo', // Clase personalizada si necesitas más estilos
    
      /*data: {name: this.name(), animal: this.animal()},*/
    });
  }

  onDelete() {
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

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!event.target || !((event.target as HTMLElement).closest('.menu') || (event.target as HTMLElement).closest('.bi-gear'))) {
      this.menuVisible = false;
    }
  }
}
