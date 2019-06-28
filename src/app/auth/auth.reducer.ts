import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

const estadoInicial: AuthState = {
  user: null,
};

export function authReducer(state = estadoInicial, actions: fromAuth.acciones): AuthState {
  switch (actions.type) {

    case fromAuth.SET_USER:
      return {
        user: {
          ... // Extrae todos los valores y rompe la referencia
          actions.user
        }
      };
    case fromAuth.UNSET_USER:
      return {
        user: null
      };

    default:
      return state;

  }
}
