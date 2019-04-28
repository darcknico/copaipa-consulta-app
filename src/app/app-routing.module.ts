import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ErrorComponent } from './external/error/error.component';
import { NotFoundComponent } from './external/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'external/login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children:[
      
      {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'aportes',
        loadChildren: './tabla-aporte/tabla-aporte.module#TablaAporteModule'
      },
      {
        path: 'consultas',
        loadChildren: './consultas/consultas.module#ConsultasModule'
      },
      {
        path: 'convenios',
        loadChildren: './convenios/convenios.module#ConveniosModule'
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }
    ],
  },
  {path: 'external', loadChildren: './external/external.module#ExternalModule'},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
