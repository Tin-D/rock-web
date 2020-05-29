import axios from 'axios';
import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import { mutationTypes } from '@/store/mutationTypes';

const url = '/brand_model';

const store = generateCurdManager({
    namespaced: true,
    url,
    listProperty: 'models',
    serverPagination: false,
});

const { actions } = store;

Object.assign(actions, {
    async [actionTypes.common.list] ({ dispatch, commit, rootState }) {
        if (rootState.brand.brands == null || rootState.brand.brands.length === 0) {
            await dispatch(`brand/${actionTypes.common.list}`, null, { root: true });
        }

        const { data: models } = await axios.get(url);
        const brands = rootState.brand.brands;
        _.forEach(models, m => {
            m.brandName = brands.find(b => b.id === m.brandId)?.name;
        });
        commit(mutationTypes.common.setListData, models);
    },
});

export default store;
