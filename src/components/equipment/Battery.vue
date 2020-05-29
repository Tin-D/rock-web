<template>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="100px"
             size="mini"
    >
        <el-form-item label="实际容量(AH)">
            <el-input-number :min="0" v-model.number="form.realityCapacity"/>
        </el-form-item>

        <el-form-item label="所属电池组">
            <el-select v-model="form.batteryGroupEquipmentId"
                       clearable
                       filterable
                       placeholder="所属电池组"
                       style="width: 100%;"
            >
                <el-option v-for="b of batteryGroups"
                           :key="b.id"
                           :label="b.name"
                           :value="b.id"
                />
            </el-select>
            <div style="font-weight: bolder">根据基本信息中的机房列出该机房中所有电池组</div>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios';
    import EquipmentEditorMixin from '@/components/equipment/EquipmentEditorMixin';

    export default {
        mixins: [EquipmentEditorMixin],
        created () {
            this.loadExtendInfo();
        },
        data () {
            return {
                batteryGroups: [],
                form: {
                    realityCapacity: 0,
                    batteryGroupEquipmentId: null,
                },
                rules: {},
            };
        },
        methods: {},
        watch: {
            computerRoomId: {
                async handler (newValue) {
                    if (newValue) {
                        const { data } = await axios.get(`/equipment/find_battery_group_by_computer_room_id/${newValue}`);
                        this.batteryGroups = data;
                    }
                },
                immediate: true,
            },
        },
        props: {
            computerRoomId: {
                type: String,
            },
            equipmentId: {
                type: String,
            },
        },
    };
</script>
