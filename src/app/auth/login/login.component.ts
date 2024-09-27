import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  buttomPaswword = false;
  buttomSummit = false;
  form: FormGroup;

  constructor(private authGoogleService: AuthService, private fb: FormBuilder, private http: HttpClient) { 
    this.form = fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authGoogleService.login();

    setTimeout (()=> {
      const profile = this.authGoogleService.getProfile();
      const token = this.authGoogleService.getAccesToken();
      if(token){
        console.log(token);
        console.log('Profile:', profile);
        console.log('Access Token:', token);
        // Ahora, llamamos a un endpoint del backend usando el token
        this.callBackendWithToken(token);
      }else{
        console.error('Error: No se pudo obtener el token');
      }
      }, 1000)
  }

  callBackendWithToken(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Enviamos el token JWT al backend
    });

    this.http.get('/api/protected', { headers }).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
      },
      error => {
        console.error('Error al comunicarse con el backend:', error);
      }
    );
  }
}



/*

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    // otros imports
    ReactiveFormsModule
  ],
  // otras configuraciones
})
export class AppModule { }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      // lógica de autenticación con Google
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      // lógica de autenticación con Google
    }
  }
}


<form [formGroup]="loginForm" (ngSubmit)="login()">
  <div class="form-group">
    <label for="email">Email</label>
    <input id="email" formControlName="email" class="form-control" type="email">
    <div *ngIf="loginForm.controls.email.invalid && loginForm.controls.email.touched">
      <small class="text-danger">El email es obligatorio y debe ser válido.</small>
    </div>
  </div>

  <div class="form-group">
    <label for="password">Contraseña</label>
    <input id="password" formControlName="password" class="form-control" type="password">
    <div *ngIf="loginForm.controls.password.invalid && loginForm.controls.password.touched">
      <small class="text-danger">La contraseña es obligatoria.</small>
    </div>
  </div>

  <div class="row">
    <button 
      class="btn btn-lg btn-google btn-block text-uppercase btn-outline"
      [disabled]="!loginForm.valid"
      (click)="login()">
      <img src="https://img.icons8.com/color/22/000000/google-logo.png"> Ingresar con Google
    </button>
  </div>
</form>
*/