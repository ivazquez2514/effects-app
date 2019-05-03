import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as usersActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  constructor(
    private service: UserService,
    private actions$: Actions
  ) {}

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType( usersActions.LOAD_USERS ),
    switchMap( () => {
      return this.service.getUsers()
        .pipe(
          map( users => new usersActions.LoadUsersSuccess( users )),
          catchError( e => of( new usersActions.LoadUsersFail( e ) ))
        );
    })
  );

}
