import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingrego-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';

export const dashboardRouters: Routes = [
    { path: '', component: EstadisticaComponent},
    { path: 'ingresos-egresos', component: IngresoEgresoComponent},
    { path: 'detalle', component: DetalleComponent}
];
