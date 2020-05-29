<template>
    <div style="height: 100%;">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        待处理任务列表
                    </div>
                    <div class="panel-body">
                        <!-- 下面这个组件要完成-->
                        <task-list/>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        新告警列表（这部分做个假列表就好了）
                    </div>
                    <div class="panel-body">
                        具体的列表加在这里
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        最近完成任务列表
                    </div>
                    <div class="panel-body">
                        <!-- 下面这个组件要完成-->
                        <task-list/>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TaskList from '@/components/home/TaskList';

    export default {
        components: { TaskList },
    };
</script>
