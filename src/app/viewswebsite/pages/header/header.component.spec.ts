import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthService } from 'src/app/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let perfilSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authSpy   = jasmine.createSpyObj('AuthService', ['logout']);
    perfilSubject = new BehaviorSubject<string>('');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Router,       useValue: routerSpy },
        { provide: AuthService,  useValue: authSpy },
        { provide: PerfilService, useValue: { perfil$: perfilSubject.asObservable() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit(): suscribe perfil$ y asigna el valor a this.perfil', () => {
    perfilSubject.next('Coordinador');
    expect(component.perfil).toBe('Coordinador');
  });

  it('ngOnInit(): perfil queda vacío cuando no hay sesión activa', () => {
    perfilSubject.next('');
    expect(component.perfil).toBe('');
  });

  it('redirectionTo(): el método existe en la clase', () => {
    expect(typeof component.redirectionTo).toBe('function');
  });

  it('cerrarSesion(): llama a authService.logout()', () => {
    component.cerrarSesion();
    expect(authSpy.logout).toHaveBeenCalledTimes(1);
  });

  it('cerrarSesion(): navega a /login tras logout', () => {
    component.cerrarSesion();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('cerrarSesion(): llama logout antes de navegar', () => {
    const order: string[] = [];
    authSpy.logout.and.callFake(() => order.push('logout'));
    routerSpy.navigate.and.callFake(() => { order.push('navigate'); return Promise.resolve(true); });
    component.cerrarSesion();
    expect(order).toEqual(['logout', 'navigate']);
  });
});
