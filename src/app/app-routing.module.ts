import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInscripcionesComponent } from './viewswebsite/Components/form-inscripciones/form-inscripciones.component';
import { HomeComponent } from './viewswebsite/pages/home/home.component';
import { CursosDeportivosComponent } from './viewswebsite/Components/cursos-deportivos/cursos-deportivos.component';
import { ListDeportistasdeCursoComponent} from './viewswebsite/Components/list-deportistasde-curso/list-deportistasde-curso.component';
import { ConfigTipoCursoComponent } from './viewswebsite/Components/config-tipo-curso/config-tipo-curso.component';
import { SidenavComponent } from './viewswebsite/pages/sidenav/sidenav.component';
import { LoginComponent } from './auth/login/login.component';
import { FormCursoDeportiviComponent } from './viewswebsite/Components/form-curso-deportivo/form-curso-deportivi.component';
import { NuevoCursoCategoriaComponent } from './viewswebsite/Components/nuevo-curso-categoria/nuevo-curso-categoria.component';
import { GruposComponent } from './viewswebsite/Components/grupos/grupos.component';
import { ListGruposComponent } from './viewswebsite/Components/list-grupos/list-grupos.component';
import { FormularioComponent } from './viewswebsite/Components/formulario/formulario.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'inscripciones', component:FormInscripcionesComponent},
  {path: 'cursos_deportivos', component: CursosDeportivosComponent}, //cursos deportivos
  {path: 'listaDeportistasCurso', component: ListDeportistasdeCursoComponent },//deportistas de curso
  {path: 'configuracionCatCurso', component: ConfigTipoCursoComponent},//Configuraciones de categoría
  {path: 'menu',  component: SidenavComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registroDeCursoDeportivo', component: FormCursoDeportiviComponent}, //registrar un deporte
  {path: 'nuevoCursoCategoria', component: NuevoCursoCategoriaComponent},
  {path: 'crear-editar-grupo', component: GruposComponent},
  {path: 'list-grupos', component: ListGruposComponent},
  {path: 'formulario', component: FormularioComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
