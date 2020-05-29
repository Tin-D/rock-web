import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { actionTypes } from '@/store/actionTypes';

Vue.use(Router);

export const checkRole = (currentUser, needRoles) => {
    if (currentUser == null) {
        return false;
    }

    if (needRoles == null) {
        return true;
    }

    if (_.isString(needRoles)) {
        needRoles = [needRoles];
    }

    const result = _.intersection(currentUser.groups, needRoles).length > 0;
    console.log(`need role: ${needRoles}, ${result}`);
    return result;
};

export const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/auth/Login'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/components/home/Index'),
        icon: 'fa fa-home',
        text: '首页',
        meta: { auth: true },
    },
    {
        path: '/task_process',
        name: 'taskProcess',
        component: () => import(/* webpackChunkName: "taskProcess" */ '@/components/taskProcess/Index'),
        icon: 'fa fa-check-square-o',
        text: '任务办理',
        props: route => ({ code: route.query.code }),
    },
    {
        path: '/customer',
        name: 'customer',
        component: () => import(/* webpackChunkName: "admin" */ '@/components/customer/Index'),
        icon: 'fa fa-address-card-o',
        text: '客户管理',
        meta: { auth: true },
    },
    {
        path: '/computer_room',
        name: 'computer_room',
        component: () => import(/* webpackChunkName: "admin" */ '@/components/computerRoom/Index'),
        icon: 'fa fa-building',
        text: '机房管理',
        meta: { auth: true },
    },
    {
        path: '/equipment_manager',
        name: 'equipment_manager',
        component: () => import(/* webpackChunkName: "equipment" */ '@/components/equipmentManager/Index'),
        icon: 'fa fa-truck',
        text: '设备管理',
        children: [
            {
                path: 'brand',
                name: 'brand',
                icon: 'fa fa-tag',
                text: '品牌管理',
                component: () => import(/* webpackChunkName: "equipment" */ '@/components/brand/Index'),
            },
            {
                path: 'brand_model',
                name: 'brandModel',
                icon: 'fa fa-tags',
                text: '型号管理',
                component: () => import(/* webpackChunkName: "equipment" */ '@/components/brandModel/Index'),
            },
            {
                path: 'equipment',
                name: 'equipment',
                component: () => import(/* webpackChunkName: "equipment" */ '@/components/equipment/Index'),
                icon: 'fa fa-cubes',
                text: '设备仓库',
                meta: { auth: true }, // 必须登录用户才能访问，而且要具有 admin 角色
            },
        ],
    },
    {
        path: '/task',
        name: 'task',
        component: () => import(/* webpackChunkName: "admin" */ '@/components/task/Index'),
        icon: 'fa fa-tasks',
        text: '任务管理',
    },
    {
        name: 'systemSettings',
        path: '/system_settings',
        component: () => import(/* webpackChunkName: "admin" */ '@/components/systemSettings/Index'),
        icon: 'fa fa-cog',
        text: '系统设置',
        children: [
            {
                path: 'user',
                name: 'user',
                component: () => import(/* webpackChunkName: "admin" */ '@/components/user/Index'),
                icon: 'fa fa-user',
                text: '用户管理',
                meta: { auth: true },
            },
            {
                path: 'group',
                name: 'group',
                component: () => import(/* webpackChunkName: "admin" */ '@/components/group/Index'),
                icon: 'fa fa-users',
                text: '分组管理',
                meta: { auth: true },
            },
            {
                path: 'dictionary_code',
                name: 'dictionary_code',
                component: () => import(/* webpackChunkName: "admin" */ '@/components/dictionaryCode/Index'),
                icon: 'fa fa-book',
                text: '代码管理',
                meta: { auth: true },
            },
        ],
    },
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    // 登录页面
    if (to.fullPath === '/login') {
        next();
        return;
    }

    // 可以匿名访问的页面
    if (!to.meta.auth) {
        next();
        return;
    }

    let currentUser = store.state.auth.currentUser;
    if (!currentUser) {
        try {
            await store.dispatch(actionTypes.auth.getCurrentUser);
            currentUser = store.state.auth.currentUser;
        } catch (e) {
            next('/login');
        }
    }

    if (currentUser == null) {
        next('/login');
        return;
    }

    const { role } = to.meta;
    if (role && !checkRole(currentUser, role)) {
        next('/');
        return;
    }

    next();
});

export default router;
