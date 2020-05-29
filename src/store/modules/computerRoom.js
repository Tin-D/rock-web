import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import axios from 'axios';

const url = '/computer_room';

const store = generateCurdManager({
    namespaced: true,
    url,
    listProperty: 'computerRooms',
    serverPagination: true,
});

const { state, actions, mutations } = store;

Object.assign(state, {
    listOptions: [],
});

Object.assign(mutations, {
    setListOptions (state, options) {
        state.listOptions = options;
    },
});

Object.assign(actions, {
    async [actionTypes.common.listOptions] ({ commit }) {
        const { data } = await axios.get(`${url}/list_options`);
        commit('setListOptions', data);
    },
    async [actionTypes.computerRoom.getComputerRoomName] ({ dispatch, state }, id) {
        if (state.listOptions.length === 0) {
            await dispatch(actionTypes.common.listOptions);
        }

        // 第一级是客户，第二级是机房
        for (let customer of state.listOptions) {
            for (let room of customer.rooms) {
                if (room.id === id) {
                    return `${customer.name}-${room.name}`;
                }
            }
        }

        return null;
    },
});

export default store;
