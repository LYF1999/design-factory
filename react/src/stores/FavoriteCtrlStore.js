import { observable, action, runInAction } from 'mobx';
import request from '../utils/request';
import { getOptions, postOptions } from '../utils/fetchOptions';


class FavoriteCtrlStore {
  @observable favoriteCtrlSet = [];

  @observable favoriteCtrlDetail = {};

  @action fetch = async () => {
    const { data } = await request('/api/favorite-ctrl/', { ...getOptions });
    runInAction(() => {
      this.favoriteCtrlSet = data;
    });
  }


  @action get = async (id) => {
    const { data } = await request('/api/favorite-ctrl/:id/', { ...getOptions, id });

    runInAction(() => {
      this.favoriteCtrlDetail = data;
    });
  }

  @action post = async (payload) => {
    const { err } = await request('/api/favorite-ctrl/', { ...postOptions(), ...payload });

    runInAction(() => {
      if (!err) {
        this.fetch();
      }
    });
  }
}

export default new FavoriteCtrlStore();
