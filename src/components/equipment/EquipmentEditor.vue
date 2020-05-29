<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="false"
    >

        <el-tabs type="border-card" v-model="currentTab">

            <el-tab-pane label="基本信息" name="baseInfo">
                <base-info ref="baseInfo"
                           :recorder="recorder"
                           @brand-model-change="handleBrandModelChange"
                           @computer-room-change="handleComputerRoomChange"
                />
            </el-tab-pane>

            <el-tab-pane label="扩展信息" name="extendInfo" v-if="extendComponent">
                <component ref="extendInfo"
                           :is="extendComponent"
                           :equipment-id="id"
                           :computer-room-id="computerRoomId"
                />
            </el-tab-pane>
        </el-tabs>

    </lan-form-dialog>
</template>

<script>
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import { getterTypes } from '@/store/getterTypes';
    import { actionTypes } from '@/store/actionTypes';
    import BaseInfo from '@/components/equipment/BaseInfo';
    import Battery from '@/components/equipment/Battery';

    const tabs = ['baseInfo', 'extendInfo'];

    export default {
        mixins: [dialogMixin()],
        components: { BaseInfo },
        data () {
            return {
                currentTab: tabs[0],
                extendComponent: null,
                computerRoomId: null,
            };
        },
        computed: {
            recorder () {
                return this.id ? this.$store.getters[`equipment/${getterTypes.common.getById}`](this.id) : null;
            },
            title () {
                return this.id ? `修改设备：${this.recorder.name}` : '新增设备';
            },
        },
        methods: {
            handleBrandModelChange (brandModelId) {
                if (brandModelId) {
                    const brand = this.$store.state.brandModel.models.find(i => i.id === brandModelId);
                    const equipmentType = this.getDictionaryCode(brand.typeId);
                    if (equipmentType.code === 'Battery') {
                        this.extendComponent = Battery;
                    } else {
                        this.extendComponent = null;
                    }
                } else {
                    this.extendComponent = null;
                }
            },
            handleComputerRoomChange (computerRoomId) {
                this.computerRoomId = computerRoomId;
            },
            async handleSubmit () {
                let flag = true;
                const values = {};

                for (let t of tabs) {
                    const tab = this.$refs[t];
                    if (!tab) {
                        continue;
                    }
                    try {
                        const tabValues = await tab.collectValues();
                        if (t === 'extendInfo') {
                            values.extendInfo = JSON.stringify(tabValues);
                        } else {
                            Object.assign(values, tabValues);
                        }
                    } catch {
                        this.currentTab = t;
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    if (values.owner === '') { // 防止传递空字符串，导致外键检查错误
                        delete values.owner;
                    }
                    if (this.id) {
                        await this.$store.dispatch(`equipment/${actionTypes.common.edit}`, { id: this.id, data: values });
                    } else {
                        await this.$store.dispatch(`equipment/${actionTypes.common.add}`, values);
                    }
                    this.closeDialog({ refresh: true });
                }
            },
        },
        props: {
            id: {
                type: String,
            },
        },
    };
</script>
