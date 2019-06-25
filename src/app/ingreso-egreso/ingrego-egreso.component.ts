import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo = 'ingreso';

  constructor() {
    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(null, [Validators.min(1), Validators.required])
    });
  }

  sendIngresosEgresos() {
    const ingresosEgregos = new IngresoEgresoModel({...this.form.value, tipo: this.tipo});
    console.log(ingresosEgregos);
  }


  ngOnInit() {
  }

}
