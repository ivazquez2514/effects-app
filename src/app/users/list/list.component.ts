import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as fromUsersActions from 'src/app/store/actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  users: User[] = [];
  loading = false;
  error = null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch( new fromUsersActions.LoadUsers() );

    this.store.select('users')
      .subscribe( data => {
        this.users = data.users;
        this.loading = data.loading;
        this.error = data.error;
      });
  }

}
