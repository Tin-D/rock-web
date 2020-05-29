<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="isLoadingFormData"
    >

        <el-form v-if="!isLoadingFormData"
                 ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 size="mini">

            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholer="名称"/>
            </el-form-item>

            <el-form-item label="类别" prop="typeId">
                <dictionary-code-selector v-model="form.typeId" root-code="CableType" placeholder="线缆类别"/>
            </el-form-item>

<!--            <el-form-item label="输入端" prop="inEquipmentId">-->
<!--                <equipment-selector v-model="form.inEquipmentId"/>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="输出端" prop="outEquipmentId">-->
<!--                <equipment-selector v-model="form.outEquipmentId"/>-->
<!--            </el-form-item>-->

        </el-form>

    </lan-form-dialog>
</template>

<script>
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';
    import DictionaryCodeSelector from '@/components/dictionaryCode/DictionaryCodeSelector';

    const storeModuleName = 'cable';

    export default {
        components: { DictionaryCodeSelector },
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        data () {
            return {
                partTitle: '线缆',
                EquipmentSelectorDialog: {
                    show: false,
                    handleClose: () => {
                        this.EquipmentSelectorDialog.show = false;
                        this.EquipmentSelectorDialog.id = null;
                    },
                    handleAdd: () => {
                        this.EquipmentSelectorDialog.show = true;
                    },
                },
            };
        },
        methods: {
            initForm () {
                return {
                    name: {
                        rules: [validators.required(), validators.validateAsync(this.checkUnique())],
                    },
                    typeId: {
                        rules: [validators.required()],
                    },
                    inEquipmentId: {
                        rules: [validators.required()],
                    },
                    outEquipmentId: {
                        rules: [validators.required()],
                    },
                };
            },
            processValues (values) {
                return values;
            },
        },
    };
</script>
