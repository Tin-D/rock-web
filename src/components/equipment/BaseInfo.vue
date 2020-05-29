<template>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="100px"
             size="mini"
    >

        <el-form-item label="名称" prop="name">
            <el-input placeholder="名称" v-model="form.name"/>
        </el-form-item>

        <el-form-item label="品牌型号" prop="brandModelId">
            <brand-model-selector v-model="form.brandModelId" style="width: 100%;" :readonly="this.recorder != null"/>
        </el-form-item>

        <el-form-item label="机房" prop="computerRoomId">
            <computer-room-selector v-model="form.computerRoomId" style="width: 100%"/>
        </el-form-item>

        <el-form-item label="所有权" prop="owner">
            <customer-selector v-model="form.owner"
                               style="width: 100%;"
                               placeholder="输入客户名称可搜索，留空代表产权归属公司"
                               :init-options="recorder ? [{id: recorder.owner, name: recorder.customerName}] : null"
            />
        </el-form-item>

        <el-form-item label="序列号" prop="serialNumber">
            <el-input placeholder="序列号" v-model="form.serialNumber"/>
        </el-form-item>

        <el-form-item label="出厂日期" prop="manufactureDate">
            <el-date-picker v-model="form.manufactureDate"
                            type="date"
                            placeholder="选择日期"
                            style="width: 100%;"
            />
        </el-form-item>

        <el-form-item label="收货日期" prop="deliveryDate">
            <el-date-picker v-model="form.deliveryDate"
                            type="date"
                            placeholder="收货日期"
                            style="width: 100%;"
            />
        </el-form-item>

        <el-form-item label="合同日期" prop="contractDate">
            <el-date-picker v-model="form.contractDate"
                            type="date"
                            placeholder="合同日期"
                            style="width: 100%;"
            />
        </el-form-item>

        <el-form-item label="安装日期" prop="installDate">
            <el-date-picker v-model="form.contractDate"
                            type="date"
                            placeholder="安装日期"
                            style="width: 100%;"
            />
        </el-form-item>

        <el-form-item label="启用日期" prop="startDate">
            <el-date-picker v-model="form.startDate"
                            type="date"
                            placeholder="启用日期"
                            style="width: 100%;"
            />
        </el-form-item>

    </el-form>
</template>

<script>
    import * as validators from '@/roadhog/validators';
    import BrandModelSelector from './BrandModelSelector';
    import CustomerSelector from '@/components/common/CustomerSelector';
    import ComputerRoomSelector from '@/components/computerRoom/ComputerRoomSelector';
    import EquipmentEditorMixin from '@/components/equipment/EquipmentEditorMixin';

    export default {
        mixins: [EquipmentEditorMixin],
        components: { ComputerRoomSelector, BrandModelSelector, CustomerSelector },
        created () {
            if (this.recorder) {
                Object.assign(this.form, this.recorder);
            }
        },
        data () {
            return {
                form: {
                    name: null,
                    brandModelId: null,
                    owner: null,
                    serialNumber: null,
                    computerRoomId: null,
                    manufactureDate: null,
                    deliveryDate: null,
                    contractDate: null,
                    installDate: null,
                    startDate: null,
                },
                rules: {
                    name: [validators.required()],
                    brandModelId: [validators.required({ trigger: 'change' })],
                },
            };
        },
        watch: {
            'form.brandModelId': {
                handler (newValue) {
                    this.$emit('brand-model-change', newValue);
                },
                immediate: true,
            },
            'form.computerRoomId': {
                handler (newValue) {
                    this.$emit('computer-room-change', newValue);
                },
                immediate: true,
            },
        },
        props: {
            recorder: {
                type: Object,
            },
        },
    };
</script>
