import { Action } from '@ngrx/store';
import { IngresoEgresoModel } from './ingreso-egreso.model';

// Se muestran
export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] UnSet Items';


// Clases para llamar los dispacher
export class SetItemsActions implements Action {
  readonly type = SET_ITEMS;

  constructor( public items: IngresoEgresoModel[]) {}
}

export class UnSetItemsActions implements Action {
  readonly type = UNSET_ITEMS;
}

// Exportar las clases
export type acciones = SetItemsActions | UnSetItemsActions;
