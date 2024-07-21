import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInscripcionesComponent } from './components/form-inscripciones/form-inscripciones.component';
import { HomeComponent } from './viewswebsite/pages/home/home.component';
import { CursosDeportivosComponent } from './components/cursos-deportivos/cursos-deportivos.component';
import { ListDeportistasdeCursoComponent} from './components/list-deportistasde-curso/list-deportistasde-curso.component';
import { ConfigTipoCursoComponent } from './components/config-tipo-curso/config-tipo-curso.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'inscripciones', component:FormInscripcionesComponent},
  {path: 'cursos_deportivos', component: CursosDeportivosComponent},
  {path: 'list_cursos', component: ListDeportistasdeCursoComponent },
  {path: 'configTipoCurso', component: ConfigTipoCursoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
