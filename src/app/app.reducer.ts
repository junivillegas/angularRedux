import { ActionReducerMap } from '@ngrx/store';

// Archivo global que tiene todo el estado
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


// Se importa el reducer del share con el loading
export interface AppState {
  ui: fromUi.State;
  auth: fromAuth.AuthState;
  ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

// Configuracion global de los reducers
// Permite fuxionar varios reduces en uno solo
export const appReducers: ActionReducerMap <AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};


