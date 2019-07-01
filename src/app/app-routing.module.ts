import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';

  //   // Asi se usa el Lazy Load

const routes: Routes = [
  { path: 'login', component: LoginComponent,
  canDeactivate: [ !AuthGuardService ] },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [ !AuthGuardService ]
  },
  {
    path: '',
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
      .then(m => (m.IngresoEgresoModule)),
    canLoad: [ AuthGuardService ]
  },
  { path: '**', redirectTo: '' } // Cualquier pagina redirecciona a
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
