import { generateCurdManager } from '@/store/baseManager';
import { getterTypes } from '@/store/getterTypes';
import { generateTree } from '@/roadhog/utils';

const store = generateCurdManager({
    namespaced: true,
    url: '/dictionary_code',
    listProperty: 'codes',
});

const { getters } = store;

// noinspection DuplicatedCode
Object.assign(getters, {
    [getterTypes.dictionaryCode.getCodeTree] (state) {
        const result = [];
        generateTree(null, state.codes, result, 'index');
        return result;
    },
    [getterTypes.dictionaryCode.getChildrenTreeByParentId] (state) {
        return (rootId) => {
            const root = _.find(state.codes, n => n.id === rootId);
            if (root == null) {
                return [];
            }
            const result = [root];
            generateTree([root], state.codes, result, 'index');
            return result[0].children;
        };
    },
    [getterTypes.dictionaryCode.getChildrenTreeByParentCode] (state) {
        return (rootCode) => {
            const root = _.find(state.codes, n => n.code === rootCode);
            if (root == null) {
                return [];
            }
            const result = [root];
            generateTree([root], state.codes, result, 'index');
            return result[0].children;
        };
    },
});

export default store;
