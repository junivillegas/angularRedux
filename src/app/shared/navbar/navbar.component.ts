import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public name: string;
  private userSubs = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(item => item.user != null)
      )
      .subscribe(item => this.name = item.user.nombre);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
