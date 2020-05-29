<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="isLoadingFormData"
    >

        <lan-client-table :data="equipments"
                          pagination
                          :default-sort="{prop: 'name', order: 'ascending' }"
                          @selection-change="handleSelectionChange"
                          :max-height="tableHeight"
                          :show-operation-column="false"
        >

            <el-table-column
                type="selection"
                width="55"
            />

            <el-table-column label="名称" prop="name" sortable/>

            <el-table-column label="品牌" prop="brandName" sortable/>

            <el-table-column label="型号" prop="brandModelName" sortable/>

            <el-table-column label="类型" prop="typeName" sortable/>

        </lan-client-table>

    </lan-form-dialog>
</template>

<script>
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import { actionTypes } from '@/store/actionTypes';
    import LanClientTable from '@/roadhog/LanClientTable';
    import { dialogAutoHeightTableMixin } from '@/components/common/autoHeightTableMixin';

    export default {
        components: { LanClientTable },
        mixins: [dialogMixin(), dialogAutoHeightTableMixin()],
        created () {
            Promise.all([
                // 获取机房名称
                this.$store.dispatch(`computerRoom/${actionTypes.computerRoom.getComputerRoomName}`, this.computerRoomId),

                // 获取机房下的所有设备
                this.$store.dispatch(`equipment/${actionTypes.equipment.findComputerRoomEquipments}`, this.computerRoomId),
            ]).then(([computerRoomName, equipments]) => {
                this.title += computerRoomName;
                this.equipments = equipments.filter(n => n.typeCode !== 'Battery');
            }).finally(() => {
                this.isLoadingFormData = false;
            });
        },
        data () {
            return {
                tableHeight: 0,
                isLoadingFormData: true,
                equipments: [],
                selectedRows: [],
                title: '设备选择器：',
            };
        },
        methods: {
            handleSelectionChange (rows) {
                this.selectedRows = rows;
            },
            handleSubmit () {
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
