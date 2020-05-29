import axios from 'axios';
import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import { Pagination } from '@/roadhog/Pagination';
import { getterTypes } from '@/store/getterTypes';

const url = '/equipment';

const store = generateCurdManager({
    namespaced: true,
    url,
    listProperty: 'equipments',
    serverPagination: true,
});

const { actions } = store;

Object.assign(actions, {
    async [actionTypes.equipment.getExtendInfo] (store, id) {
        const { data } = await axios.get(`${url}/find_battery_extend_info/${id}`);
        return data;
    },
    async [actionTypes.equipment.findComputerRoomEquipments] ({ dispatch, rootGetters }, { computerRoomId }) {
        const pagination = new Pagination({
            sortField: 'name',
            computerRoomId,
        });
        pagination.setPageSize(9999);
        const result = await dispatch(actionTypes.common.list, pagination.query);

        // 增加 typeCode 字段
        for (let e of result.items) {
            const equipmentType = rootGetters[`dictionaryCode/${getterTypes.common.getById}`](e.typeId);
            e.typeCode = equipmentType?.code;
        }

        return result.items;
    },
});

export default store;
