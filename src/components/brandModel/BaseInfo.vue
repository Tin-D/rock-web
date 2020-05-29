<template>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px"
             size="mini"
    >

        <el-form-item label="品牌" prop="brandId">
            <brand-selector v-model="form.brandId" style="width: 100%;"/>
        </el-form-item>

        <el-form-item label="名称" prop="name">
            <el-input placeholder="名称" v-model="form.name"/>
        </el-form-item>

        <el-form-item label="设备类型" prop="typeId">
            <dictionary-code-selector-simple v-model="form.typeId"
                                             placeholder="设备类型"
                                             root-code="EquipmentType"
                                             style="width: 100%"
                                             :readonly="recorder && recorder.id != null"
            />
        </el-form-item>

        <el-form-item label="外观尺寸" prop="externalDimension">
            <el-input v-model="form.externalDimension" placeholder="外观尺寸"/>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="备注"
                v-model="form.remark"
            />
        </el-form-item>

        <el-form-item label="说明书">
            <file-list v-model="form.instructions" :recorder-id="form.attachmentListToken"/>
        </el-form-item>

    </el-form>
</template>

<script>
    import * as validators from '@/roadhog/validators';
    import BrandSelector from '@/components/brand/BrandSelector';
    import DictionaryCodeSelectorSimple from '@/components/dictionaryCode/DictionaryCodeSelectorSimple';
    import FileList from '@/components/common/FileList';

    export default {
        components: { BrandSelector, DictionaryCodeSelectorSimple, FileList },
        created () {
            if (this.recorder) {
                Object.assign(this.form, this.recorder);
            }
        },
        data () {
            return {
                form: {
                    brandId: null,
                    name: null,
                    typeId: null,
                    externalDimension: null,
                    remark: null,
                    instructions: [],
                    attachmentListToken: null,
                },
                rules: {
                    brandId: [validators.required()],
                    name: [validators.required()],
                    typeId: [validators.required()],
                    externalDimension: [validators.required()],
                },
            };
        },
        methods: {
            async collectValues () {
                await this.$refs.form.validate();
                return this.form;
            },
        },
        watch: {
            'form.typeId': {
                handler (newValue) {
                    this.$emit('type-change', newValue ? this.getDictionaryCode(newValue).code : newValue);
                },
            },
            immediate: true,
        },
        props: {
            recorder: {
                type: Object,
            },
        },
    };
</script>
