import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

import * as fromIngresoEgreso from '../../ingreso-egreso/ingreso-egreso.reducer';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {


  items: IngresoEgresoModel[];
  ingresoEgresoSubs: Subscription = new Subscription();

  constructor(
    private store: Store<fromIngresoEgreso.AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoSubs = this.store.select('ingresoEgreso')
    .subscribe(ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }

  borrarItem(uid) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(resp => {
      Swal.fire({
        title: 'Eliminado',
        text: 'Item Eliminado',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }).catch(resp => {
      Swal.fire({
        title: 'Error',
        text: 'Error al eleminar',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    })
  }

}
