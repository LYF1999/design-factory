import { observable, action, runInAction } from 'mobx';
import request from '../utils/request';
import { MaterialType } from './contants';


class MaterialsStore {
  @observable font = {};
  @observable background = {};
  @observable image = {};
  @observable layout = {};


  @action fetch = async (type) => {
    const no = MaterialType[type.toString().toUpperCase()];
    const data = await request('/api/material/', { query: { type: no } });

    runInAction(() => {
      this[type] = data;
    });
  }
}

export default new MaterialsStore();
