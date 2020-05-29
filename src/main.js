import Vue from 'vue';
import 'lodash';
import 'font-awesome/css/font-awesome.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/web.scss';
import './roadhog/commonMixins';
import './roadhog/axiosConfig';
import roadHog from './roadhog/roadhog';
import App from './App.vue';
import router from './router';
import store from './store';
import { actionTypes } from '@/store/actionTypes';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
Vue.use(roadHog);

window.addEventListener('resize', () => {
    store.commit('calcViewHeight');
    console.log('window resize!');
});

// 防止回车刷新页面
document.querySelector('body').addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
        e.preventDefault();
        return false;
    }
});

Promise.all([
    store.dispatch(actionTypes.common.getWebSettings),
    store.dispatch(`dictionaryCode/${actionTypes.common.list}`),
    // store.dispatch(`groupManager/${actionTypes.common.list}`),
]).then(() => {
    store.dispatch(actionTypes.auth.getCurrentUser)
        .then(() => {
            // 载入需要认证后才能获取的基础数据
            store.dispatch(`brand/${actionTypes.common.list}`);
            store.dispatch(`brandModel/${actionTypes.common.list}`);
        })
        .finally(() => {
            new Vue({
                router,
                store,
                render: h => h(App),
            }).$mount('#app');
        });
});
