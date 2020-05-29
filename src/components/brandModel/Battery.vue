<template>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="120px"
             size="mini"
    >
        <el-form-item label="标称电压(V)" prop="standardVoltage">
            <el-input-number :min="0" v-model.number="form.standardVoltage"/>
        </el-form-item>

        <el-form-item label="标称容量(AH)" prop="standardCapacity">
            <el-input-number :min="0" v-model.number="form.standardCapacity"/>
        </el-form-item>

        <el-form-item label="端子规格(厘)" prop="specification">
            <el-input placeholder="端子规格" v-model="form.specification"/>
        </el-form-item>

        <el-form-item label="满电内阻(MΩ)" prop="internalResistance">
            <el-input placeholder="满电内阻(MΩ)" v-model="form.internalResistance"/>
        </el-form-item>

        <el-form-item label="质量(kg)" prop="quality">
            <el-input-number :min="0" v-model.number="form.quality"/>
        </el-form-item>

    </el-form>
</template>

<script>
    import extendEditorMixin from '@/components/brandModel/extendEditorMixin';

    export default {
        mixins: [extendEditorMixin],
        data () {
            return {
                form: {
                    standardVoltage: null,
                    standardCapacity: null,
                    specification: null,
                    internalResistance: null,
                    quality: null,
                },
                rules: {},
            };
        },
    };
</script>
