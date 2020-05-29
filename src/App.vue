<template>
    <div id="app">
        <router-view v-if="currentUser == null"/>
        <top-left-main-frame v-else/>
    </div>
</template>
<script>
    import TopLeftMainFrame from '@/components/frames/TopLeftMainFrame';

    export default {
        components: { TopLeftMainFrame },
    };
</script>
