import * as fromUI from './ui.accions';

// Estado inicial declaratoria
export interface State {
  isLoading: boolean;
}

// Inicia el estado
const initState: State = {
  isLoading: false
};

// Aca se ejecutan las acciones

export function uiReducer( state = initState, action: fromUI.acciones): State {
  switch (action.type) {

    case fromUI.ACTIVAR_LOADING:
      return {
        // ... Se usan los ... para mantanter las otras propiedades igual
        isLoading: true
      };

    case fromUI.DESACTIVAR_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
