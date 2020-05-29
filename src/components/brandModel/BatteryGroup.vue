<template>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="120px"
             size="mini"
    >
        <el-form-item label="总电压" prop="totalVoltage">
            <el-input-number :min="0" v-model.number="form.totalVoltage"/>
        </el-form-item>

        <el-form-item label="电池个数" prop="number">
            <el-input-number :min="0" v-model.number="form.number"/>
        </el-form-item>

    </el-form>
</template>

<script>
    import * as validators from '@/roadhog/validators';
    import extendEditorMixin from '@/components/brandModel/extendEditorMixin';

    export default {
        mixins: [extendEditorMixin],
        data () {
            return {
                form: {
                    totalVoltage: 0,
                    number: 0,
                },
                rules: {
                    totalVoltage: [validators.required({ type: 'number' })],
                    number: [validators.required({ type: 'number' })],
                },
            };
        },
    };
</script>
