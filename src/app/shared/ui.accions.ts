import { Action } from '@ngrx/store';

// Actions
export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

// Exports
export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
}

// Export actions
export type acciones =  ActivarLoadingAction |
                        DesactivarLoadingAction;
