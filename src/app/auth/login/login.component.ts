import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;

  // Se usa para cancelar las subscripciones cuando el componente muere para no gastar memoria usar siempre
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe((ui) => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: any) {
    this.authService.login(form.email, form.password);
  }

}
