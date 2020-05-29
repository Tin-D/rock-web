<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="false"
    >
        <el-tabs type="border-card" v-model="currentTab">
            <el-tab-pane name="baseInfo" label="基本信息">
                <base-info ref="baseInfo"
                           :recorder="recorder"
                           @type-change="handleTypeChange"
                />
            </el-tab-pane>

            <el-tab-pane name="extendInfo" label="扩展信息">
                <component ref="extendInfo"
                           :is="extendEditor"
                           v-if="extendEditor"
                           :recorder="recorder"
                />
            </el-tab-pane>
        </el-tabs>

    </lan-form-dialog>
</template>

<script>
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import BaseInfo from '@/components/brandModel/BaseInfo';
    import { actionTypes } from '@/store/actionTypes';
    import Battery from '@/components/brandModel/Battery';
    import BatteryGroup from '@/components/brandModel/BatteryGroup';

    const storeModuleName = 'brandModel';

    const tabs = ['baseInfo', 'extendInfo'];

    const equipmentTypes = {
        Battery: 'Battery',
        BatteryGroup: 'BatteryGroup',
    };

    export default {
        components: { BaseInfo, Battery, BatteryGroup },
        mixins: [dialogMixin()],
        data () {
            return {
                partTitle: '设备型号',
                currentTab: tabs[0],
                extendEditor: null,
            };
        },
        computed: {
            recorder () {
                if (this.id) {
                    return this.$store.state[storeModuleName].models.find(n => n.id === this.id);
                }
                return null;
            },
            title () {
                return `${this.id ? '修改' : '新增'}: 型号`;
            },
        },
        methods: {
            handleTypeChange (equipmentType) {
                if (equipmentType === equipmentTypes.Battery) {
                    this.extendEditor = Battery;
                } else if (equipmentType === equipmentTypes.BatteryGroup) {
                    this.extendEditor = BatteryGroup;
                } else {
                    this.extendEditor = null;
                }
            },
            async handleSubmit () {
                let flag = true;
                const values = {};

                for (let t of tabs) {
                    const tab = this.$refs[t];
                    try {
                        const tabValues = await tab.collectValues();
                        // 对于扩展信息标签页，把所有字段序列化
                        if (t === 'extendInfo') {
                            values.configs = JSON.stringify(tabValues);
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
                    if (this.id) {
                        await this.$store.dispatch(`${storeModuleName}/${actionTypes.common.edit}`, { id: this.id, data: values });
                    } else {
                        await this.$store.dispatch(`${storeModuleName}/${actionTypes.common.add}`, values);
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
