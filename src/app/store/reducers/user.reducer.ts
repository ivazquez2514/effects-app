import { User } from 'src/app/models/user.model';

import * as fromUser from '../actions';

export interface UserState {
  user: User;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  loaded: false,
  loading: false,
  error: null
}

export function userReducer( state = initialState, action: fromUser.userActions ): UserState {

  switch ( action.type ) {

    case fromUser.LOAD_USER:
      return {
        ...state,
        loading: true,
        error: null
      };

    case fromUser.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: { ...action.user }
      };

    case fromUser.LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          status: action.payload.status,
          message: action.payload.message,
          url: action.payload.url
        }
      };

    default:
      return state;

  }

}

