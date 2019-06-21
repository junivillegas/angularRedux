import { ActionReducerMap } from '@ngrx/store';

// Archivo global que tiene todo el estado
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';


// Se importa el reducer del share con el loading
export interface AppState {
  ui: fromUi.State;
  auth: fromAuth.AuthState;
}

// Configuracion global de los reducers
// Permite fuxionar varios reduces en uno solo
export const appReducers: ActionReducerMap <AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};


