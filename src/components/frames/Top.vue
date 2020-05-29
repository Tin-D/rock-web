<template>
    <div>
        <img src="../../assets/logo.png" class="logo"/>

        <span class="site-title">{{ siteTitle }}</span>

        <div class="user-info" v-if="currentUser">
            <el-dropdown trigger="click" @command="handleCommand">
                <el-button>
                    <i class="fa fa-user" style="margin-right: 5px"></i>
                    {{ currentUser.fullName }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userInfo"><i class="fa fa-edit fa-fw"></i> 修改用户信息</el-dropdown-item>
                    <el-dropdown-item command="changePassword"><i class="fa fa-key fa-fw"></i> 修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout"><i class="fa fa-sign-out fa-fw"></i> 登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { actionTypes } from '@/store/actionTypes';

    export default {
        computed: {
            siteTitle () {
                return this.$store.state.global.webSettings.title;
            },
        },
        methods: {
            async handleCommand (cmd) {
                if (cmd === 'logout') {
                    this.$store.dispatch(actionTypes.auth.logout);
                } else {
                    throw new Error('not support cmd: ' + cmd);
                }
            },
        },
    };
</script>
