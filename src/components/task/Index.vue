<template>
    <div>
        <page-header/>

        <el-form size="mini" inline class="toolbar">

            <el-form-item title="任务名称">
                <el-input placeholder="任务名称" clearable v-model="pagination.query.name"/>
            </el-form-item>

            <el-form-item title="任务编号">
                <el-input placeholder="任务编号" clearable v-model="pagination.query.code"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="load(true)">搜索</el-button>

                <el-button icon="el-icon-plus" @click="taskEditorDialog.handleAdd">新增</el-button>
            </el-form-item>

        </el-form>

        <lan-server-table :pagination.sync="pagination"
                          :default-sort="pagination.defaultSort"
                          :max-height="tableHeight"
                          @edit="taskEditorDialog.handleEdit"
                          @remove="taskEditorDialog.handleRemove"
                          @load="load"
        >

            <el-table-column label="名称" prop="name" sortable="custom"/>

            <el-table-column label="编号" prop="code" sortable="custom"/>

            <el-table-column label="任务类别" prop="taskType" sortable="custom">
                <template slot-scope="{ row }">
                    {{ TaskType[row.taskType] }}
                </template>
            </el-table-column>

            <el-table-column label="机房" prop="computerRoomName" sortable="custom"/>

            <el-table-column label="已完成" prop="finish" :formatter="renderBooleanRow" sortable="custom"/>

            <el-table-column label="创建时间" prop="createTime" :formatter="renderDateTimeRow" sortable="custom"/>

        </lan-server-table>

        <task-editor v-if="taskEditorDialog.show"
                     :id="taskEditorDialog.id"
                     @close="taskEditorDialog.handleClose"
        />
    </div>
</template>

<script>
    import LanServerTable from '@/roadhog/LanServerTable';
    import { Pagination } from '@/roadhog/Pagination';
    import { autoHeightTableMixin } from '@/components/common/autoHeightTableMixin';
    import { actionTypes } from '@/store/actionTypes';
    import TaskEditor from '@/components/task/TaskEditor';
    import { confirmDialog } from '@/roadhog/alert';
    import TaskType from '@/components/enum/TaskType';

    export default {
        components: { TaskEditor, LanServerTable },
        mixins: [autoHeightTableMixin()],
        created () {
            this.load();
        },
        data () {
            return {
                tableHeight: 0,
                TaskType,
                pagination: new Pagination({
                    sortField: 'createTime',
                    sortOrder: 'desc',
                    name: null,
                    code: null,
                }),
                taskEditorDialog: {
                    show: false,
                    id: null,
                    handleClose: () => {
                        this.taskEditorDialog.show = false;
                        this.taskEditorDialog.id = null;
                    },
                    handleAdd: () => {
                        this.taskEditorDialog.show = true;
                        this.taskEditorDialog.id = null;
                    },
                    handleEdit: async (row) => {
                        this.taskEditorDialog.show = true;
                        this.taskEditorDialog.id = row.id;
                    },
                    handleRemove: async (row) => {
                        await confirmDialog({ itemName: row.name });
                        await this.$store.dispatch(`task/${actionTypes.common.remove}`, row.id);
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

                const result = await this.$store.dispatch(`task/${actionTypes.common.list}`, this.pagination.query);
                this.pagination.setResult(result);
            },
        },
    };
</script>
