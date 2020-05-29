<template>
    <div>
        <page-header/>

        <el-form inline class="toolbar" size="mini">
            <el-form-item title="名称">
                <el-input placeholder="名称" v-model="pagination.query.name" clearable/>
            </el-form-item>

            <el-form-item title="设备类型">
                <dictionary-code-selector-simple v-model="pagination.query.typeId"
                                                 placeholder="设备类型"
                                                 root-code="EquipmentType"
                />
            </el-form-item>

            <el-form-item title="品牌型号">
                <brand-model-selector v-model="pagination.query.modelId"/>
            </el-form-item>

            <el-form-item title="序列号">
                <el-input placeholder="序列号" v-model="pagination.query.serialNumber" clearable/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="load(true)">搜索</el-button>

                <el-button icon="el-icon-plus" @click="EquipmentEditorDialog.handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <lan-server-table :pagination="pagination"
                          @load="load"
                          :max-height="tableHeight"
                          :default-sort="pagination.defaultSort"
                          @edit="EquipmentEditorDialog.handleEdit"
                          @remove="EquipmentEditorDialog.handleRemove"
        >

            <el-table-column label="名称" prop="name" sortable="custom"/>

            <el-table-column label="品牌型号" prop="brandModelId" sortable="custom">
                <template slot-scope="{ row }">
                    {{ row.brandName }} - {{ row.brandModelName }}
                </template>
            </el-table-column>

            <el-table-column label="设备类型" prop="typeId" :formatter="renderDictionaryCodeRow" sortable="custom"/>

            <el-table-column label="所有权" prop="owner" sortable="custom">
                <template slot-scope="{ row }">
                    {{ row.customerName || '公司' }}
                </template>
            </el-table-column>

            <el-table-column label="序列号" prop="serialNumber" sortable="custom"/>

            <el-table-column label="出厂日期" prop="manufactureDate" :formatter="renderDateRow" sortable="custom"/>
        </lan-server-table>

        <equipment-editor v-if="EquipmentEditorDialog.show"
                          :id="EquipmentEditorDialog.id"
                          @close="EquipmentEditorDialog.handleClose"
        />
    </div>
</template>

<script>
    import { Pagination } from '@/roadhog/Pagination';
    import LanServerTable from '@/roadhog/LanServerTable';
    import { actionTypes } from '@/store/actionTypes';
    import DictionaryCodeSelectorSimple from '@/components/dictionaryCode/DictionaryCodeSelectorSimple';
    import { autoHeightTableMixin } from '@/components/common/autoHeightTableMixin';
    import BrandModelSelector from '@/components/equipment/BrandModelSelector';
    import EquipmentEditor from '@/components/equipment/EquipmentEditor';
    import { confirmDialog } from '@/roadhog/alert';

    export default {
        mixins: [autoHeightTableMixin()],
        components: { EquipmentEditor, DictionaryCodeSelectorSimple, LanServerTable, BrandModelSelector },
        created () {
            this.load();
        },
        data () {
            return {
                tableHeight: 0,
                selectedItems: [],
                pagination: new Pagination({
                    sortField: 'name',
                    sortOrder: 'asc',
                    name: null,
                    typeId: null,
                    brandModelId: null,
                    modelId: null,
                    owner: null,
                    serialNumber: null,
                    manufactureDate: null,
                }),
                EquipmentEditorDialog: {
                    show: false,
                    id: null,
                    handleClose: (returnValue) => {
                        if (returnValue?.refresh) {
                            this.load();
                        }
                        this.EquipmentEditorDialog.show = false;
                        this.EquipmentEditorDialog.id = null;
                    },
                    handleAdd: () => {
                        this.EquipmentEditorDialog.show = true;
                        this.EquipmentEditorDialog.id = null;
                    },
                    handleEdit: async (row) => {
                        this.EquipmentEditorDialog.show = true;
                        this.EquipmentEditorDialog.id = row.id;
                    },
                    handleRemove: async (row) => {
                        await confirmDialog({ itemName: row.name });

                        await this.$store.dispatch(`equipment/${actionTypes.common.remove}`, row.id);
                        this.load();
                    },
                },
            };
        },
        methods: {
            async load (gotoFirstPage) {
                if (gotoFirstPage) {
                    this.pagination.query.page = 1;
                }
                const response = await this.$store.dispatch(`equipment/${actionTypes.common.list}`, this.pagination.query);
                this.pagination.setResult(response);
                this.resize();
            },
        },
    };
</script>
