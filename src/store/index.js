import Vue from 'vue';
import Vuex from 'vuex';
import global from '@/store/modules/global';
import auth from '@/store/modules/auth';
import dictionaryCode from '@/store/modules/dictionaryCode';
import customer from '@/store/modules/customer';
import brandModel from '@/store/modules/brandModel';
import user from '@/store/modules/user';
import group from '@/store/modules/group';
import equipment from '@/store/modules/equipment';
import cable from '@/store/modules/cable';
import auditLog from '@/store/modules/auditLog';
import department from '@/store/modules/department';
import workflow from '@/store/modules/workflow';
import computerRoom from '@/store/modules/computerRoom';
import task from '@/store/modules/task';
import brand from '@/store/modules/brand';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global,
        auth,
        auditLog,
        dictionaryCode,
        group,
        user,
        department,
        workflow,
        brandModel,
        customer,
        equipment,
        cable,
        computerRoom,
        task,
        brand,
    },
});
