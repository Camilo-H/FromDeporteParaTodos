import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthServiceService {

  constructor( private http: HttpClient, private autservise: AuthService) {

   }

  getProtectedResource(){
    
  }
}
