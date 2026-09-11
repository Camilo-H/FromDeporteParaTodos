import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavComponent } from 'src/app/viewswebsite/pages/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GrupoService } from 'src/app/services/grupo.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { HorarioService } from 'src/app/services/horario.service';
import { InstructorServisce } from 'src/app/services/instructor.service';
import { GrupoDTO } from 'src/app/Models/DTOs/grupo-dto';
import { HorarioDTO } from 'src/app/Models/DTOs/horario-dto';
import { InscripcionDTO } from 'src/app/Models/DTOs/inscripcion-dto';

@Component({
  selector: 'app-inscripcion-grupo',
  standalone: true,
  imports: [CommonModule, SidenavComponent, MatButtonModule, MatSnackBarModule],
  providers: [DatePipe],
  templateUrl: './inscripcion-grupo.component.html',
  styleUrls: ['./inscripcion-grupo.component.css'],
})
export class InscripcionGrupoComponent implements OnInit {
  categoria: string = '';
  curso: string = '';
  anio: number = 0;
  iterable: number = 0;

  grupo: GrupoDTO | null = null;
  horarios: HorarioDTO[] = [];
  cargando = true;
  inscribiendo = false;
  yaInscrito = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grupoService: GrupoService,
    private inscripcionService: InscripcionesService,
    private horarioService: HorarioService,
    private instructorService: InstructorServisce,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria') ?? '';
      this.curso     = params.get('curso') ?? '';
      this.anio      = Number(params.get('anio'));
      this.iterable  = Number(params.get('iterable'));
      this.cargarGrupo();
    });
  }

  private cargarGrupo(): void {
    this.cargando = true;
    this.grupoService.getGrupo(this.categoria, this.curso, this.anio, this.iterable).subscribe({
      next: (grupo) => {
        this.grupo = grupo;
        if (grupo.idInstructor) {
          this.instructorService.getInstructor(grupo.idInstructor).subscribe({
            next: (inst) => { this.grupo!.nombreInstructor = inst.nombre; },
            error: () => {},
          });
        }
        this.horarioService.getHorarios(this.categoria, this.curso, this.anio, this.iterable).subscribe({
          next: (h: any) => { this.horarios = Array.isArray(h) ? h : []; },
          error: () => { this.horarios = []; },
        });
        this.cargando = false;
      },
      error: () => {
        this.snackBar.open('No se pudo cargar la información del grupo', 'Cerrar', { duration: 4000, panelClass: ['snack-error'] });
        this.cargando = false;
      },
    });
  }

  letraDeIterable(n: number | null): string {
    if (!n || n < 1) return '?';
    return String.fromCharCode(64 + n);
  }

  inscribirse(): void {
    const idRaw = sessionStorage.getItem('dpt_perfil_id');
    if (!idRaw) {
      this.snackBar.open('No se pudo identificar tu perfil. Intenta iniciar sesión de nuevo.', 'Cerrar', { duration: 5000, panelClass: ['snack-error'] });
      return;
    }
    const alumnoId = Number(idRaw);
    const hoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

    const inscripcion: InscripcionDTO = {
      fechaInscripcion: hoy,
      fechaDesvinculacion: '',
      alumnoId,
      categoria: this.categoria,
      curso: this.curso,
      anio: this.anio,
      iterable: this.iterable,
      eliminado: 0,
    };

    this.inscribiendo = true;
    this.inscripcionService.postInscripcion(inscripcion).subscribe({
      next: () => {
        this.yaInscrito = true;
        this.inscribiendo = false;
        this.snackBar.open('¡Te has inscrito al grupo exitosamente!', 'Cerrar', { duration: 5000, panelClass: ['snack-success'] });
      },
      error: (err) => {
        this.inscribiendo = false;
        if (err.status === 409) {
          this.snackBar.open('Ya estás inscrito en este grupo.', 'Cerrar', { duration: 4000, panelClass: ['snack-error'] });
        } else {
          this.snackBar.open('Error al inscribirse. Intenta de nuevo.', 'Cerrar', { duration: 4000, panelClass: ['snack-error'] });
        }
      },
    });
  }

  volver(): void {
    this.router.navigate(['/list-grupos', this.categoria, this.curso]);
  }
}
