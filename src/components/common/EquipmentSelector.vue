<template>
    <lan-form-dialog
        ref="lanDialog"
        title="设备选择器"
        @close="handleClose"
        :is-loading="false"
    >
        <el-form size="mini" inline class="toolbar">
            <el-form-item title="设备名称">
                <el-input placeholder="设备名称" v-model.trim="query.name"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <lan-client-table :data="displayTableData"
                          pagination
                          :max-height="tableHeight"
                          :show-operation-column="false"
                          @selection-change="handleSelectionChange"
        >

            <el-table-column
                type="selection"
                width="55"
            />

            <el-table-column label="名称" prop="name" sortable/>

        </lan-client-table>

        <div slot="buttons">
            <el-button type="primary" size="mini" @click="handleOk">确定</el-button>
        </div>

    </lan-form-dialog>
</template>

<script>
    import axios from 'axios';
    import LanClientTable from '@/roadhog/LanClientTable';
    import { dialogAutoHeightTableMixin } from '@/components/common/autoHeightTableMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';

    export default {
        components: { LanClientTable },
        mixins: [dialogAutoHeightTableMixin(), dialogMixin()],
        created () {
            this.load();
        },
        data () {
            return {
                tableHeight: 0,
                tableData: [],
                displayTableData: [],
                selectedRows: [],
                query: {
                    name: null,
                },
            };
        },
        methods: {
            async load () {
                const { data } = await axios.get(`/equipment/find_equipment/${this.computerRoomId}`);
                this.tableData = data;
                this.handleSearch();
            },
            handleSearch () {
                let chain = _.chain(this.tableData);
                if (this.query.name) {
                    chain = chain.filter(i => i.name.includes(this.query.name));
                }

                this.displayTableData = chain.value();
            },
            handleSelectionChange (rows) {
                this.selectedRows = rows;
            },
            handleOk () {
                this.closeDialog(this.selectedRows);
            },
        },
        props: {
            computerRoomId: {
                type: String,
                required: true,
            },
        },
    };
</script>
