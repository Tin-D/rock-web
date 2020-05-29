export const getterTypes = {
    common: {
        getById: 'getById',
    },
    dictionaryCode: {
        getCodeTree: 'getCodeTree', // 获取代码树
        getChildrenTreeByParentId: 'getChildrenTreeByParentId', // 根据父节点的id，获取直接子节点
        getChildrenTreeByParentCode: 'getChildrenTreeByParentCode', // 根据父节点code，获取直接子节点
    },
    department: {
        getTreeData: 'getTreeData',
        getTreeDataByRoot: 'getTreeDataByRoot',
    },
    equipmentModel: {
        getWithBrand: 'getWithBrand', // 获取包含品牌信息的型号
        renderBrandAndModel: 'renderBrandAndModel', // 展示品牌型号
        getBrandAndModel: 'getBrandAndModel', // 根据型号获取品牌型号
    },
};
