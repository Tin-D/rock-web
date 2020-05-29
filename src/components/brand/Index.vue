<template>
    <curd-index store-module-name="brand"
                state-list-property="brands"
                pagination
                :filter-method="['name']"
                :default-sort="{prop: 'name', order: 'ascending'}"
                :editor="BrandEditor"
    >
        <el-table-column prop="name" label="名称" sortable/>

    </curd-index>
</template>

<script>
    import CurdIndex from '@/components/common/CurdIndex';
    import BrandEditor from '@/components/brand/BrandEditor';

    export default {
        components: { CurdIndex },
        data () {
            return {
                BrandEditor,
            };
        },
    };
</script>
