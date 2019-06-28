import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  form: FormGroup;
  tipo = 'ingreso';
  loading: Subscription = new Subscription();
  cargando: boolean;

  constructor(private ieService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(null, [Validators.min(1), Validators.required])
    });

    this.loading = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.loading.unsubscribe();
  }

  sendIngresosEgresos() {
    this.store.dispatch( new ActivarLoadingAction() );
    const ingresosEgresos = new IngresoEgresoModel({ ...this.form.value, tipo: this.tipo });
    this.ieService.crearIngresoEgresos(ingresosEgresos)
      .then(resp => {
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire({
          title: 'Creado',
          text: ingresosEgresos.descripcion,
          type: 'success',
          confirmButtonText: 'Ok'
        });
        this.form.reset();
      })
      .catch(resp => {
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire({
            title: 'Error',
            text: ingresosEgresos.descripcion,
            type: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
  }
}
