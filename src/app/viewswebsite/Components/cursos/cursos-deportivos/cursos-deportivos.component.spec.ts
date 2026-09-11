import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { CursosDeportivosComponent } from './cursos-deportivos.component';
import { CursodeportivoService } from 'src/app/services/cursodeportivo.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenInterchangeService } from 'src/app/services/token-interchange.service';

const mockCurso = { nombre: 'Natacion', categoria: 'Recreativo', estadoCurso: 'ACTIVO', estadoInscripciones: 'CERRADO', idImagen: null, imagenBase64: null, tipoArchivo: null };

describe('CursosDeportivosComponent', () => {
  let component: CursosDeportivosComponent;
  let fixture: ComponentFixture<CursosDeportivosComponent>;
  let cursoSpy: jasmine.SpyObj<CursodeportivoService>;
  let snackOpen: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;
  let perfilSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    cursoSpy  = jasmine.createSpyObj('CursodeportivoService', [
      'getCursos', 'getTodosCursosDeCategoria', 'cambiarEstadoCurso', 'cambiarEstadoInscripciones',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    perfilSubject = new BehaviorSubject<string>('');

    cursoSpy.getCursos.and.returnValue(of([] as any));
    cursoSpy.getTodosCursosDeCategoria.and.returnValue(of([] as any));

    await TestBed.configureTestingModule({
      imports: [CursosDeportivosComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: Router,       useValue: routerSpy },
        { provide: CursodeportivoService, useValue: cursoSpy },
        { provide: PerfilService, useValue: { perfil$: perfilSubject.asObservable() } },
        { provide: AuthService,  useValue: jasmine.createSpyObj('AuthService', ['login', 'logout', 'isAuthenticated', 'getProfile']) },
        { provide: TokenInterchangeService, useValue: {} },
        { provide: OAuthService, useValue: { configure: () => {}, setupAutomaticSilentRefresh: () => {}, events: of(), loadDiscoveryDocumentAndTryLogin: () => Promise.resolve(), getIdentityClaims: () => null, hasValidAccessToken: () => false, hasValidIdToken: () => false } },
        { provide: ImagenService, useValue: { getimagen: jasmine.createSpy().and.returnValue(of({})) } },
        { provide: MatDialog,    useValue: { open: jasmine.createSpy().and.returnValue({ afterClosed: () => of(null) }) } },
        { provide: BreakpointObserver, useValue: { observe: jasmine.createSpy().and.returnValue(of({ matches: false })) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'Recreativo' } } } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(CursosDeportivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Espiar el snackBar real que el componente inyecta (evita problemas de módulo vs. spy manual)
    snackOpen = spyOn(component['snackBar'], 'open');
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('loadCursos(): usa getTodosCursosDeCategoria cuando el rol es "Coordinador"', () => {
    cursoSpy.getTodosCursosDeCategoria.and.returnValue(of([{ ...mockCurso }] as any));
    // Reset de llamadas previas del ngOnInit (que ya invocó getCursos con perfil vacío)
    cursoSpy.getCursos.calls.reset();
    cursoSpy.getTodosCursosDeCategoria.calls.reset();
    perfilSubject.next('Coordinador');
    expect(cursoSpy.getTodosCursosDeCategoria).toHaveBeenCalledWith('Recreativo');
    expect(cursoSpy.getCursos).not.toHaveBeenCalled();
  });

  it('loadCursos(): usa getCursos para cualquier otro rol (Alumno, Instructor, vacío)', () => {
    cursoSpy.getCursos.and.returnValue(of([{ ...mockCurso }] as any));
    cursoSpy.getCursos.calls.reset();
    cursoSpy.getTodosCursosDeCategoria.calls.reset();
    perfilSubject.next('Alumno');
    expect(cursoSpy.getCursos).toHaveBeenCalledWith('Recreativo');
    expect(cursoSpy.getTodosCursosDeCategoria).not.toHaveBeenCalled();
  });

  it('gruposCurso(): navega a /list-grupos con categoría y curso', () => {
    component.gruposCurso('Recreativo', 'Natacion');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list-grupos', 'Recreativo', 'Natacion']);
  });

  it('toggleEstadoCurso(): actualiza estadoCurso y muestra snackbar de éxito', () => {
    const item = { ...mockCurso, estadoCurso: 'ACTIVO' };
    cursoSpy.cambiarEstadoCurso.and.returnValue(of({ ...item, estadoCurso: 'INACTIVO' } as any));
    component.toggleEstadoCurso(item as any);
    expect(item.estadoCurso).toBe('INACTIVO');
    expect(snackOpen).toHaveBeenCalledWith(
      jasmine.stringContaining('deshabilitado'), 'Cerrar', jasmine.any(Object)
    );
  });

  it('toggleEstadoCurso(): muestra snackbar de error si el servicio falla', () => {
    cursoSpy.cambiarEstadoCurso.and.returnValue(throwError(() => ({ status: 500 })));
    component.toggleEstadoCurso({ ...mockCurso } as any);
    expect(snackOpen).toHaveBeenCalledWith(
      jasmine.stringContaining('Error al cambiar'), 'Cerrar', jasmine.any(Object)
    );
  });

  it('toggleInscripciones(): actualiza estadoInscripciones y muestra snackbar de éxito', () => {
    const item = { ...mockCurso, estadoInscripciones: 'CERRADO' };
    cursoSpy.cambiarEstadoInscripciones.and.returnValue(of({ ...item, estadoInscripciones: 'ABIERTO' } as any));
    component.toggleInscripciones(item as any);
    expect(item.estadoInscripciones).toBe('ABIERTO');
    expect(snackOpen).toHaveBeenCalledWith(
      jasmine.stringContaining('abiertas'), 'Cerrar', jasmine.any(Object)
    );
  });
});
