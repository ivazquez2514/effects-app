import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as userActions from '../../store/actions/';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  user: User = null;
  loading = false;
  error = null;

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.select('user')
      .subscribe( data => {
        this.user = data.user;
        this.loading = data.loading;
        this.error = data.error;
      });

    this.router.params
      .subscribe( params => {
        this.store.dispatch( new userActions.LoadUser( params.id ) );
      });
  }

}
