<template>
    <el-container style="height: 100%;">

        <el-header class="header">
            <Top/>
        </el-header>

        <el-container class="main-container">

            <el-aside class="left">
                <Left :root-menu="routes"/>
            </el-aside>

            <el-main class="main-frame">
                <router-view/>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    import Left from './Left';
    import Top from './Top';
    import { routes } from '@/router';

    export default {
        components: { Left, Top },
        data () {
            return {
                routes,
                BUILD_DATE: process.env.BUILD_DATE || 'dev mode',
            };
        },
        mounted () {
            this.$store.commit('calcViewHeight');
        },
    };
</script>
