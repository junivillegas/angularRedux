import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import * as fromIngresoEgreso from '../../ingreso-egreso/ingreso-egreso.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';

  public ingresos: number;
  public egresos: number;

  public cuantosIngresos: number;
  public cuantosEgresos: number;

  public ingresosEgresosSubs: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.ingresosEgresosSubs = this.store.select('ingresoEgreso')
      .subscribe(ingresosEgresos =>
        this.contarIngresosEgresos(ingresosEgresos.items)
      );
  }

  contarIngresosEgresos(items: IngresoEgresoModel[]) {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach( item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [
      [this.ingresos, this.egresos],
    ];
  }

}
