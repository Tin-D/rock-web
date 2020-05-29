import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import axios from 'axios';

const store = generateCurdManager({
    namespaced: true,
    url: '/user',
    listProperty: 'users',
    serverPagination: false,
});

const { actions } = store;

/**
 * 重置用户密码
 * @param store
 * @param id {string} 用户id
 * @returns {Promise<string>} 新密码
 */
actions[actionTypes.user.resetPassword] = async (store, id) => {
    const { data } = await axios.put(`/user/reset_password/${id}`);
    return data.message;
};

export default store;
