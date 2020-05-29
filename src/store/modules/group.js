import { generateCurdManager } from '@/store/baseManager';

const store = generateCurdManager({
    namespaced: true,
    url: '/group',
    listProperty: 'groups',
});

export default store;
