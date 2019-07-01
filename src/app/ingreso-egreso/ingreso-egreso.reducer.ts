import * as fromIngresoEgreso from './ingreso-egreso.acctions';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {

  switch (action.type) {

    case fromIngresoEgreso.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };

    case fromIngresoEgreso.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
