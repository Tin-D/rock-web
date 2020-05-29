<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="isLoadingFormData"
    >

        <el-tabs v-model="activeTab">
            <el-tab-pane label="基本信息" name="baseInfo">
                <el-form v-if="!isLoadingFormData"
                         ref="form"
                         :model="form"
                         :rules="rules"
                         label-width="80px"
                         size="mini"
                >

                    <el-form-item label="名称" prop="name">
                        <el-input placeholder="名称" v-model="form.name"/>
                    </el-form-item>

                    <el-form-item label="编号" prop="code" v-if="!isCreate">
                        <el-input placeholder="编号" v-model="form.code" disabled/>
                    </el-form-item>

                    <el-form-item label="类别" prop="taskType">
                        <el-select v-model="form.taskType" placeholder="请选择任务类别" style="width: 100%">
                            <el-option v-for="(value, key) of TaskType"
                                       :key="key"
                                       :value="key"
                                       :label="value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="机房" prop="computerRoomId">
                        <computer-room-selector v-model="form.computerRoomId"
                                                :readonly="!isCreate"
                                                style="width: 100%"
                        />
                    </el-form-item>

                    <el-form-item label="创建时间" prop="createTime">
                        <el-input :value="renderDateTime(form.createTime)" disabled/>
                    </el-form-item>

                </el-form>
            </el-tab-pane>

            <el-tab-pane label="设备列表" name="childTasks">
                <el-form size="mini" inline class="toolbar">
                    <el-form-item>
                        <el-button size="mini" @click="EquipmentSelectorDialog.handleOpen" type="primary" icon="el-icon-plus">添加设备</el-button>
                    </el-form-item>
                </el-form>

                <lan-client-table :data="form.childTasks"
                                  :max-height="300"
                                  :show-operation-column="false"
                                  :default-sort="{prop: 'name'}"
                >

                    <el-table-column label="设备名称" prop="name" sortable/>

                    <el-table-column label="操作">
                        <template slot-scope="{ row }">
                            <el-button size="mini" type="danger" @click="handleRemoveChildTask(row)">删除</el-button>
                        </template>
                    </el-table-column>

                </lan-client-table>

                <computer-room-equipment-selector v-if="EquipmentSelectorDialog.show"
                                                  @close="EquipmentSelectorDialog.handleClose"
                                                  :computer-room-id="form.computerRoomId"
                />

            </el-tab-pane>

        </el-tabs>
    </lan-form-dialog>
</template>

<script>
    import axios from 'axios';
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';
    import TaskType from '@/components/enum/TaskType';
    import ComputerRoomSelector from '@/components/computerRoom/ComputerRoomSelector';
    import LanClientTable from '@/roadhog/LanClientTable';
    import ComputerRoomEquipmentSelector from '@/components/task/ComputerRoomEquipmentSelector';

    const storeModuleName = 'task';

    export default {
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        components: { LanClientTable, ComputerRoomSelector, ComputerRoomEquipmentSelector },
        async created () {
            // 编辑模式，加载的时候要获取子任务列表
            if (!this.isCreate) {
                const { data } = await axios.get(`/task/${this.id}`);
                this.form.childTasks = data.children || [];
            }
        },
        data () {
            return {
                partTitle: '任务',
                activeTab: 'baseInfo',
                TaskType,
                EquipmentSelectorDialog: {
                    show: false,
                    handleClose: (returnValue) => {
                        this.EquipmentSelectorDialog.show = false;
                        if (returnValue) {
                            _.forEach(returnValue, e => {
                                // 相同设备不允许出现多次
                                if (!this.form.childTasks.find(i => i.equipmentId === e.id)) {
                                    this.form.childTasks.push({
                                        equipmentId: e.id,
                                        name: e.name,
                                    });
                                }
                            });
                        }
                    },
                    handleOpen: () => {
                        this.EquipmentSelectorDialog.show = true;
                    },
                },
            };
        },
        methods: {
            initForm () {
                return {
                    name: {
                        rules: [validators.required()],
                    },
                    code: {},
                    taskType: {
                        rules: [validators.required()],
                    },
                    computerRoomId: {
                        rules: [validators.required()],
                    },
                    childTasks: {
                        default: [],
                    },
                    createTime: {},
                };
            },
            handleRemoveChildTask (task) {
                const index = this.form.childTasks.indexOf(task);
                this.form.childTasks.splice(index, 1);
            },
            processValues (values) {
                values.children = values.childTasks;

                delete values.childTasks;
                delete values.createTime;
                return values;
            },
        },
    };
</script>
