<template>
    <curd-index store-module-name="user"
                state-list-property="users"
                :default-sort="{prop: 'username'}"
                :editor="UserEditor"
                :filter-method="['username', 'fullName', 'phone', 'email']"
                :operation-buttons="[resetPasswordButton]"
                :operation-column-width="300"
    >

        <el-table-column prop="username" label="用户名" sortable/>

        <el-table-column prop="fullName" label="姓名" sortable/>

        <el-table-column prop="phone" label="电话" sortable/>

        <el-table-column prop="email" label="邮箱" sortable/>

        <el-table-column prop="enable" label="启用" sortable :formatter="renderBooleanRow"/>

        <el-table-column prop="locked" label="锁定" sortable :formatter="renderBooleanRow"/>

    </curd-index>

</template>

<script>
    import CurdIndex from '@/components/common/CurdIndex';
    import UserEditor from '@/components/user/UserEditor';
    import LanTableOperationButton from '@/roadhog/LanTableOperationButton';
    import { alertMessage, confirmDialog } from '@/roadhog/alert';
    import { actionTypes } from '@/store/actionTypes';

    export default {
        components: { CurdIndex },
        data () {
            return {
                UserEditor,
                resetPasswordButton: new LanTableOperationButton({
                    text: '重置密码',
                    icon: 'fa fa-recycle',
                    handler: async (row) => {
                        await confirmDialog({ message: `确定要重置用户 ${row.fullName} 的密码吗` });
                        const newPassword = await this.$store.dispatch(`user/${actionTypes.user.resetPassword}`, row.id);
                        alertMessage(`密码重置成功，新密码 <strong style="color: red;">${newPassword}</strong>，该用户下次登录的时候系统会强制要求修改密码`, true);
                    },
                }),
            };
        },
    };
</script>
