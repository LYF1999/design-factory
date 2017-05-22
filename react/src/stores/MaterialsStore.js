import { observable, action, runInAction } from 'mobx';
import request from '../utils/request';
import { getOptions } from '../utils/fetchOptions';
import { MaterialType } from './contants';


class MaterialsStore {
  @observable font = {};
  @observable background = {};
  @observable image = {};
  @observable layout = {};

  @observable selected = {};


  @action fetch = async (type) => {
    const no = MaterialType[type.toString().toUpperCase()];
    this[type].loading = true;
    const data = await request('/api/material/', { query: { type: no } });

    runInAction(() => {
      this[type] = data;
      this[type].loading = false;
    });
  }

  @action get = async (id) => {
    this.selected.loading = true;
    const { data, err } = await request('/api/material/:id/', {
      id,
      getOptions,
    });

    runInAction(() => {
      this.selected = data;
      this.selected.loading = false;
    });
  }
}

export default new MaterialsStore();
