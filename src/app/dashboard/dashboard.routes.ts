import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingrego-egreso/estadistica/estadistica.component';
import { IngregoEgresoComponent } from '../ingrego-egreso/ingrego-egreso.component';
import { DetalleComponent } from '../ingrego-egreso/detalle/detalle.component';

export const dashboardRouters: Routes = [
    { path: '', component: EstadisticaComponent},
    { path: 'ingresos-egresos', component: IngregoEgresoComponent},
    { path: 'detalle', component: DetalleComponent}
];
