<template>
    <curd-index store-module-name="brandModel"
                state-list-property="models"
                :default-sort="{prop: 'brandName', order: 'ascending'}"
                :editor="BrandModelEditor"
                :filter-method="['brandName', 'name', 'externalDimension']"
                pagination
    >

        <el-table-column label="品牌" prop="brandName" sortable/>

        <el-table-column label="型号" prop="name" sortable/>

        <el-table-column label="外观尺寸" prop="externalDimension" sortable/>

        <el-table-column label="设备类型" prop="typeId" :formatter="renderDictionaryCodeRow" sortable/>

    </curd-index>
</template>

<script>
    import BrandModelEditor from '@/components/brandModel/BrandModelEditor';
    import CurdIndex from '@/components/common/CurdIndex';

    export default {
        components: { CurdIndex },
        data () {
            return {
                BrandModelEditor,
            };
        },
        computed: {
            brands () {
                return this.$store.state.brand.brands;
            },
        },
    };
</script>
