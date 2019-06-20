import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Usa un map para enviar una promesa con true o false

import * as firebase from 'firebase'; // Interface para el los objetos
import Swal from 'sweetalert2';
import { User } from './user.model'; // Importa el modelo

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore) { }


  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
      return fbUser;
    });
  }

  crearUsuario(email: string, name: string, password: string) {
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
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message,
              type: 'error',
              confirmButtonText: 'Ok'
            });
          });

      })
      .catch(resp => {
        Swal.fire({
          title: 'Login Error!',
          text: resp.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      this.router.navigate(['/']);
    })
    .catch(resp => {
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
