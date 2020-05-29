<template>
    <div>
        <page-header/>

        <el-form size="mini" inline ref="form" :model="form" :rules="rules" v-if="!task">
            <el-form-item label="任务编号" prop="code">
                <el-input v-model="form.code" placeholder="任务编号" style="width: 300px"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="fa fa-check-square-o" @click="handleProcess"> 办理</el-button>
            </el-form-item>
        </el-form>

        <div v-if="task">
            <task-info :task="task"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as validators from '@/roadhog/validators';
    import { alertError } from '@/roadhog/alert';
    import TaskInfo from '@/components/taskProcess/TaskInfo';

    export default {
        components: { TaskInfo },
        data () {
            return {
                form: {
                    code: 'TS10eI-20190919-120303-00', // 任务编号
                },
                rules: {
                    code: [validators.required()],
                },
                task: null,
            };
        },
        methods: {
            async handleProcess () {
                await this.$refs.form.validate();
                try {
                    const { data } = await axios.get(`/task/get_by_code/${this.form.code}`, { errorHandler: () => (false) });
                    this.task = data;
                } catch {
                    alertError('没有找到任务，请确保编号正确');
                }
            },
        },
    };
</script>
