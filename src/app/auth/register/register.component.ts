import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: any) {
    this.authService
      .crearUsuario(form.email, form.nombre, form.password);
  }

}
