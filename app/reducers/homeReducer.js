import React, {
    ListView
} from 'react-native';
import * as types from '../constants/ActionTypes';

const initialState = {
  loading: false,
  thumbnail: [],
  pageIndex:1,
  hasNextPage:true
}

export default function homeReducers(state = initialState,  action) {
  switch (action.type) {
    case types.RECEIVE_TORRIDART_LIST:
      return Object.assign({}, state, {
        loading: true,
        thumbnail: state.thumbnail.concat(action.thumbnail),
        hasNextPage: action.thumbnail.length>0,
        pageIndex:action.thumbnail.length>0?(state.pageIndex+1):state.pageIndex
      });
    break;
    default:
      return state;
  }
}
