import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnSetItemsActions } from './ingreso-egreso.acctions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private ingresoEgresoListenerSubs: Subscription = new Subscription();
  private ingresoEgresoItemsSubs: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubs = this.afDB.collection(`/${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( docData => {
        return docData.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          };
        });
      })
    )
    .subscribe( (collection: any[]) => {
      this.store.dispatch(new SetItemsActions(collection));
    });
  }

  crearIngresoEgresos(obj: IngresoEgresoModel) {
    const user = this.authService.getUser();
    return this.afDB
      .doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...obj });
  }

  borrarIngresoEgreso(id: string) {
    const user = this.authService.getUser();
    return this.afDB
      .doc(`${user.uid}/ingresos-egresos/items/${id}`).delete();
  }

  cancelSubscriptions() {
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.ingresoEgresoListenerSubs.unsubscribe();
    this.store.dispatch(new UnSetItemsActions());
  }
}
