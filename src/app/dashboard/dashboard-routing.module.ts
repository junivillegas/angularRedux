import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouters } from './dashboard.routes';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: dashboardRouters,
      //canActivate: [AuthGuardService]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule { }
