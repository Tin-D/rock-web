import { generateCurdManager } from '@/store/baseManager';

const baseUrl = '/task';

const store = generateCurdManager({
    namespaced: true,
    url: baseUrl,
    listProperty: 'tasks',
    serverPagination: true,
});

export default store;
