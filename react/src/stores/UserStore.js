import { observable, action, runInAction } from 'mobx';
import { message } from 'antd';
import request from '../utils/request';
import FavoriteCtrlStore from './FavoriteCtrlStore';
import FavoriteObjectStore from './FavoriteObjectStore';
import { getOptions, postOptions } from '../utils/fetchOptions';


class UserStore {
  @observable user = {};
  @observable loading = false;
  @observable err = {};


  @action updateData = () => {
    FavoriteObjectStore.fetchAll();
    FavoriteCtrlStore.fetch();
  };


  @action fetch = async () => {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const { data, err } = await request('/api/user/', {
      ...getOptions,
    });

    runInAction(() => {
      this.loading = false;
      if (err) {
        this.err = err;
      } else {
        data.auth = true;
        this.user = data;
        this.updateData();
      }
    });
  };

  @action logout = async () => {
    const { err } = await request('/api/auth/logout/', {
      ...postOptions(),
    });

    runInAction(() => {
      if (err) {
        this.err = err;
      } else {
        this.user = {};
        FavoriteObjectStore.allFavoriteObject = {};
        FavoriteCtrlStore.favoriteCtrlSet = [];
        FavoriteCtrlStore.favoriteCtrlDetail = {};
        message.success('注销成功');
      }
    });
  }
}


export default new UserStore();
