import axios from 'axios';
import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import { mutationTypes } from '@/store/mutationTypes';
import Vue from 'vue';

const url = '/customer';

const store = generateCurdManager({
    namespaced: true,
    url,
    listProperty: 'pagination',
    serverPagination: true,
});

const { actions, mutations } = store;

Object.assign(actions, {
    async [actionTypes.common.listOptions] ({ commit }) {
        const { data } = await axios.get(`${url}/list_options`);
        commit(mutationTypes.common.setListOptionData, data);
    },
});

Object.assign(mutations, {
    [mutationTypes.common.setListOptionData] (state, options) {
        Vue.set(state, 'options', options);
    },
});

export default store;
