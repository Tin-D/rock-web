import axios from 'axios';
import { actionTypes } from '@/store/actionTypes';
import { mutationTypes } from '@/store/mutationTypes';
import router from '@/router/index';

const state = {
    currentUser: null,
};

const mutations = {
    [mutationTypes.auth.setCurrentUser] (state, user) {
        state.currentUser = user;
    },
    [mutationTypes.auth.clearCurrentUser] (state) {
        state.currentUser = null;
    },
};

const actions = {
    async [actionTypes.auth.login] (store, { username, password, code }) {
        const { data } = await axios.post('/login', { username, password, code });
        return data;
    },
    async [actionTypes.auth.logout] ({ commit }) {
        await axios.get('/logout');
        commit(mutationTypes.auth.setCurrentUser, null);
        router.push('/login');
    },
    async [actionTypes.auth.getCurrentUser] ({ commit }) {
        const { data } = await axios.get('/current_user');
        commit(mutationTypes.auth.setCurrentUser, data);
    },
};

export default {
    state,
    mutations,
    actions,
    namespaced: false,
};
