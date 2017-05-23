import { observable, action, runInAction } from 'mobx';
// import request from '../utils/request';
// import { getOptions } from '../utils/fetchOptions';


class WebUIStore {
  @observable selectFavoriteCtrl = null;
  @observable showMaterial = null;
  @observable showAddModal = null;
  @observable onFavoriteMaterial = null;
}

export default new WebUIStore();
