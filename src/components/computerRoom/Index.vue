<template>
    <div>
        <page-header/>

        <el-form size="mini" inline class="toolbar">

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="load(true)">搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button icon="el-icon-plus" @click="computerRoomEditDialog.handleAdd">新增</el-button>
            </el-form-item>

            <lan-server-table :pagination.sync="pagination"
                              :default-sort="pagination.defaultSort"
                              :max-height="tableHeight"
                              @edit="computerRoomEditDialog.handleEdit"
                              @remove="computerRoomEditDialog.handleRemove"
                              @load="load"
            >

                <el-table-column prop="name" label="名称" sortable="custom"/>

                <el-table-column prop="customerName" label="客户名称" sortable="custom"/>

            </lan-server-table>
        </el-form>

        <computer-room-editor v-if="computerRoomEditDialog.show"
                              :id="computerRoomEditDialog.id"
                              @close="computerRoomEditDialog.handleClose"
                              @remove="computerRoomEditDialog.handleRemove"
        />
    </div>
</template>

<script>
    import LanServerTable from '@/roadhog/LanServerTable';
    import { Pagination } from '@/roadhog/Pagination';
    import { autoHeightTableMixin } from '@/components/common/autoHeightTableMixin';
    import { confirmDialog } from '@/roadhog/alert';
    import { actionTypes } from '@/store/actionTypes';
    import ComputerRoomEditor from '@/components/computerRoom/ComputerRoomEditor';
    import { models } from '@/store/models';

    const storeModuleName = models.computerRoom;

    export default {
        components: { ComputerRoomEditor, LanServerTable },
        mixins: [autoHeightTableMixin()],
        created () {
            this.load();
        },
        data () {
            return {
                tableHeight: 0,
                pagination: new Pagination({
                    sortField: 'name',
                    sortOrder: 'asc',
                }),
                computerRoomEditDialog: {
                    show: false,
                    id: null,
                    handleClose: (returnValue) => {
                        this.computerRoomEditDialog.show = false;
                        this.computerRoomEditDialog.id = null;
                        if (returnValue?.refresh) {
                            this.load();
                        }
                    },
                    handleAdd: () => {
                        this.computerRoomEditDialog.show = true;
                        this.computerRoomEditDialog.id = null;
                    },
                    handleEdit: async (row) => {
                        this.computerRoomEditDialog.show = true;
                        this.computerRoomEditDialog.id = row.id;
                    },
                    handleRemove: async (row) => {
                        await confirmDialog({ itemName: row.name });

                        await this.$store.dispatch(`${storeModuleName}/${actionTypes.common.remove}`, row.id);
                    },
                },
            };
        },
        methods: {
            async load (gotoFirstPage) {
                if (gotoFirstPage) {
                    this.pagination.setPage(1);
                }

                const result = await this.$store.dispatch(`${storeModuleName}/${actionTypes.common.list}`, this.pagination.query);
                this.pagination.setResult(result);
            },
        },
    };
</script>
