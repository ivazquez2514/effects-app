import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import * as userActions from '../actions';

@Injectable()
export class UserEffects {

  constructor(
    private service: UserService,
    private actions$: Actions
  ) {}

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType( userActions.LOAD_USER ),
    switchMap( ( action: userActions.LoadUser ) => {
      return this.service.getUser( action.id )
        .pipe(
          map( user => new userActions.LoadUserSuccess( user )),
          catchError( e => of( new userActions.LoadUsersFail( e ) ))
        );
    })
  );

}
