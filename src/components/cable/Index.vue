<template>
    <div>
        <page-header/>

        <el-form inline size="mini">

            <el-form-item>
                <el-input v-model="pagination.query.name" placeholder="名称"/>
            </el-form-item>

            <el-form-item>
                <el-button icon="el-icon-plus" @click="CableEditorDialog.handleAdd">增加</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="load(true)">搜索</el-button>
            </el-form-item>

        </el-form>

        <lan-server-table :pagination="pagination"
                          @load="load"
                          :max-height="tableHeight"
                          :default-sort="pagination.defaultSort"
                          @edit="row => CableEditorDialog.handleEdit(row)"
                          @remove="row => CableEditorDialog.handleRemove(row)"
        >

            <el-table-column label="名称" prop="name" sortable="custom"/>

            <el-table-column label="类别" prop="typeId" sortable="custom" :formatter="renderDictionaryCodeRow"/>

            <el-table-column label="输入端设备" prop="inEquipmentName" sortable="custom"/>

            <el-table-column label="输出端设备" prop="outEquipmentName" sortable="custom"/>

        </lan-server-table>

        <cable-editor v-if="CableEditorDialog.show"
                      :id="CableEditorDialog.id"
                      @close="CableEditorDialog.handleClose"
        />

    </div>
</template>

<script>
    import { Pagination } from '@/roadhog/Pagination';
    import LanServerTable from '@/roadhog/LanServerTable';
    import { autoHeightTableMixin } from '@/components/common/autoHeightTableMixin';
    import { actionTypes } from '@/store/actionTypes';
    import CableEditor from '@/components/cable/CableEditor';
    import { confirmDialog } from '@/roadhog/alert';

    export default {
        components: { CableEditor, LanServerTable },
        mixins: [autoHeightTableMixin()],
        data () {
            return {
                tableHeight: 0,
                pagination: new Pagination({
                    sortField: 'name',
                    sortOrder: 'asc',
                    name: null,
                }),
                CableEditorDialog: {
                    show: false,
                    id: null,
                    handleClose: (returnValue) => {
                        this.CableEditorDialog.show = false;
                        this.CableEditorDialog.id = null;
                        if (returnValue?.refresh) {
                            this.load();
                        }
                    },
                    handleAdd: () => {
                        this.CableEditorDialog.show = true;
                        this.CableEditorDialog.id = null;
                    },
                    handleEdit: async (row) => {
                        this.CableEditorDialog.show = true;
                        this.CableEditorDialog.id = row.id;
                    },
                    handleRemove: async (row) => {
                        await confirmDialog({ itemName: row.name });
                        await this.$store.dispatch(`cable/${actionTypes.common.remove}`, row.id);
                        this.load();
                    },
                },
            };
        },
        methods: {
            async load (gotoFirstPage) {
                if (gotoFirstPage) {
                    this.pagination.setPage(1);
                }

                const result = await this.$store.dispatch(`cable/${actionTypes.common.list}`, this.pagination.query);
                this.pagination.setResult(result);
            },
        },
    };
</script>
