import { generateCurdManager } from '@/store/baseManager';

const store = generateCurdManager({
    namespaced: true,
    url: '/cable',
    listProperty: 'cables',
    serverPagination: true,
});

export default store;
