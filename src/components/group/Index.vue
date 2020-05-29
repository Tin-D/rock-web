<template>
    <curd-index store-module-name="group"
                state-list-property="groups"
                :default-sort="{prop: 'name'}"
                :filter-method="['name']"
                :editor="GroupEditor"
                :can-edit="(row) => row.editable"
                :can-remove="(row) => row.editable"
    >

        <el-table-column prop="name" label="名称"/>
    </curd-index>
</template>

<script>
    import CurdIndex from '@/components/common/CurdIndex';
    import GroupEditor from '@/components/group/GroupEditor';

    export default {
        components: { CurdIndex },
        data () {
            return {
                GroupEditor,
            };
        },
    };
</script>
