import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Usa un map para enviar una promesa con true o false

import * as firebase from 'firebase'; // Interface para el los objetos
import Swal from 'sweetalert2';
import { User } from './user.model'; // Importa el modelo

// Store
import { Store } from '@ngrx/store';
// My reducer
import { AppState } from '../app.reducer';

// My Actions
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserActions } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((userObj: any) => {
          const user = new User( userObj );
          this.store.dispatch(new SetUserActions(user));
        });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(email: string, name: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction () );

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: name,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => {
            this.router.navigate(['/']);

            this.store.dispatch( new DesactivarLoadingAction () );

          })
          .catch((error) => {
            this.store.dispatch( new DesactivarLoadingAction () );
            Swal.fire({
              title: 'Error!',
              text: error.message,
              type: 'error',
              confirmButtonText: 'Ok'
            });
          });
      })
      .catch(resp => {
        this.store.dispatch( new DesactivarLoadingAction () );
        Swal.fire({
          title: 'Login Error!',
          text: resp.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  login(email: string, password: string) {
    this.store.dispatch( new ActivarLoadingAction () );

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      this.router.navigate(['/']);
      this.store.dispatch( new DesactivarLoadingAction () );
    })
    .catch(resp => {
      this.store.dispatch( new DesactivarLoadingAction () );

      Swal.fire({
        title: 'Login Error!',
        text: resp.message,
        type: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map( fbUser => {

          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }
}
