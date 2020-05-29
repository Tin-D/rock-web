<template>
    <div>
        <el-form size="mini" class="toolbar">
            <el-form-item label="任务编号">
                <span>{{ task.code }}</span>
            </el-form-item>

            <el-form-item label="任务名称">
                <span>{{ task.name }}</span>
                <span style="margin-left: 15px;">
                <el-tag type="success" v-if="task.finish"><i class="fa fa-check"></i> 已完成</el-tag>
                <el-tag type="warning" v-else><i class="fa fa-square-o"></i> 待处理</el-tag>
            </span>
            </el-form-item>

            <el-form-item label="任务类型">
                <el-tag>{{ TaskType[task.taskType] }}</el-tag>
            </el-form-item>

            <el-form-item label="创建信息">
                <span title="创建人"><i class="fa fa-user-o"></i>&nbsp;{{ task.createUserFullName || '系统' }}</span>
                <span title="创建时间"><i class="fa fa-clock-o" style="margin-left: 15px;"></i>&nbsp;{{ renderDateTime(task.createTime) }}</span>
            </el-form-item>

            <el-form-item label="位置信息">
                <i class="fa fa-building-o"></i> {{ task.customerName }} {{ task.computerRoomName }}
            </el-form-item>
        </el-form>

        <lan-client-table :data="task.children"
                          :max-height="tableHeight"
                          :show-operation-column="false"
                          :default-sort="{prop: 'name', order: 'ascending'}"
        >
            <el-table-column type="index" width="55"/>

            <el-table-column label="设备名称" prop="name" sortable/>

            <el-table-column label="创建时间" prop="createTime" :formatter="renderDateTimeRow" sortable/>

            <el-table-column label="完成" prop="finish" :formatter="renderBooleanRow" sortable/>

            <el-table-column label="完成人" prop="finishUserFullName" sortable/>

            <el-table-column label="完成时间" prop="finishTime" sortable/>

            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handleProcess(row)">办理</el-button>
                </template>
            </el-table-column>
        </lan-client-table>
    </div>
</template>

<script>
    import TaskType from '@/components/enum/TaskType';
    import LanClientTable from '@/roadhog/LanClientTable';
    import { autoHeightTableMixin } from '@/components/common/autoHeightTableMixin';

    export default {
        components: { LanClientTable },
        mixins: [autoHeightTableMixin()],
        data () {
            return {
                tableHeight: 0,
                TaskType,
            };
        },
        methods: {
            handleProcess (row) {
                alert(row.name);
            },
        },
        props: {
            task: {
                type: Object,
                required: true,
            },
        },
    };
</script>
