<template>
    <div>
        待处理任务列表
    </div>
</template>

<script>
    export default {
        props: {
            taskStatus: { // 要展示的任务的状态
                type: String,
                required: true,
            },
        },
    };
</script>
