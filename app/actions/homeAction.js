import * as settings from '../../settings';
import * as types from '../constants/ActionTypes';

export function fetchTorridArt(index = 1){
  return dispatch =>{
    let URL = settings.APIURL;
    if(index > 1){
      URL = URL + '/page/'+index;
    }
    fetch(URL)
    .then(response => response.json())
    .then(responseData => {
      //console.log(responseData);
      dispatch(receiveTorridArtList(responseData));
    }).catch((error) => {
      console.log('error');
    }).done();
  }
}

function receiveTorridArtList(torridartList) {
  return {
    type: types.RECEIVE_TORRIDART_LIST,
    loading: true,
    thumbnail: torridartList.collections
  }
}
