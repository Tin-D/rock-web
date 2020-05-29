<template>
    <div class="login">
        <div role="alert" class="large-alert el-alert el-alert--warning is-center"><!---->
            <div class="el-alert__content">
                <span class="el-alert__title">
                    支持浏览器：
                    <i class="fa fa-internet-explorer"></i>IE10(或更高),
                    <a title="点击下载" href="#">
                        <i class="fa fa-firefox"></i> Firefox
                    </a>,
                    <a title="点击下载" href="#">
                        <i class="fa fa-chrome"></i> Chrome
                    </a>
                </span>
            </div>
        </div>

        <div class="login-panel">
            <el-row>
                <el-col :span="8" :offset="8">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <img class="head-icon" src="../../assets/logo.png" alt="logo" />
                            <strong>{{ company.title }}</strong>
                        </div>
                        <div class="panel-body" @keyup.enter="handleSubmit">
                            <el-alert
                                :title="errorMessage"
                                :closable="false"
                                type="error"
                                show-icon
                                style="margin-bottom: 10px; padding-left: 6px;"
                                v-show="checkFailed"
                            />

                            <el-form ref="form" :model="form" :rules="rules">

                                <el-form-item prop="username">
                                    <el-input placeholder="用户名" v-model.trim="form.username" autofocus>
                                        <i slot="prefix" class="fa fa-user fa-fw"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="password" ref="passwordFormItem">
                                    <el-input
                                        ref="passwordInput"
                                        placeholder="密码"
                                        type="password"
                                        v-model.trim="form.password"
                                    >
                                        <i slot="prefix" class="fa fa-key fa-fw"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="code" v-if="company.enableValidCode">
                                    <el-input v-model="form.code" placeholder="验证码" style="width: 200px;"/>

                                    <div style="position: absolute; top: -9px;" :style="{left: company.enableValidCode ? '210px' : '0'}">
                                        <img :src="validImgUrl"
                                             @click="handleClickValidImage"
                                             title="点击刷新"
                                             style="padding-top: 10px;"
                                             v-if="company.enableValidCode"
                                             alt="验证码"
                                        />

                                        <!--<el-button type="text" href="#"-->
                                        <!--style="font-size: 14px;"-->
                                        <!--:style="{marginLeft: company.enableValidCode ? '15px':'0'}"-->
                                        <!--@click="handleResetMyPassword"-->
                                        <!--&gt;-->
                                        <!--忘记密码-->
                                        <!--</el-button>-->
                                    </div>
                                </el-form-item>

                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        style="width: 100%; font-size: 18px;"
                                        @click="handleSubmit"
                                        :disabled="isChecking">
                                        <i class="fa fa-sign-in fa-fw"></i>
                                        <span v-if="!isChecking">登 录</span>
                                        <span v-else>登录中...</span>
                                    </el-button>
                                </el-form-item>

                            </el-form>
                        </div>
                        <div class="panel-footer">
                            <p>
                                <i class="fa fa-home fa-fw"></i>
                                <a :href="company.url" target="_blank" style="margin-left: 10px;">{{ company.url }}</a>
                            </p>
                            <p>
                                <i class="fa fa-tty fa-fw"></i>
                                <span style="margin-left: 10px;">{{ company.tel }}</span>
                            </p>
                            <p>
                                <i class="fa fa-copyright fa-fw"></i>
                                <span style="margin-left: 10px;">{{ company.copyright }}</span>
                            </p>
                            <p>
                                <i class="fa fa-code-fork fa-fw"></i>
                                <span style="margin-left: 10px;">{{ company.version }}(Client: {{ company.clientVersion }})</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <reset-my-password v-if="ResetMyPasswordDialog.show"
                          :username="ResetMyPasswordDialog.username"
                          @close="ResetMyPasswordDialog.handleClose"
        />
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import * as validators from '@/roadhog/validators';
    import { actionTypes } from '@/store/actionTypes';
    import ResetMyPassword from './ResetMyPassword';

    export default {
        components: { ResetMyPassword },
        mixins: [formPageMixin(null)],
        created () {
            document.title = this.company.title;
            this.pageTitle = this.company.title;
        },
        data () {
            return {
                pageTitle: null,
                isChecking: false,
                checkFailed: false,
                validImgUrl: '/api/code_image',
                errorMessage: '',
                DownloadBrowserDialog: {
                    show: false,
                    handleClose: () => {
                        this.DownloadBrowserDialog.show = false;
                        this.handleClickValidImage();
                    },
                    handleEdit: async () => {
                        this.DownloadBrowserDialog.show = true;
                    },
                },
                ResetMyPasswordDialog: {
                    show: false,
                    username: null,
                    handleClose: (returnValue) => {
                        this.ResetMyPasswordDialog.show = false;
                        this.ResetMyPasswordDialog.username = null;
                        if (returnValue && returnValue.refresh) {
                            this.form.password = null;
                            if (this.form.code) {
                                this.form.code = null;
                            }
                            this.handleClickValidImage();
                            this.$refs.form.clearValidate();
                            this.errorMessage = null;
                            this.$store.dispatch(actionTypes.auth.logout);
                        }
                    },
                    handleAdd: (username) => {
                        this.ResetMyPasswordDialog.show = true;
                        this.ResetMyPasswordDialog.username = username;
                    },
                },
            };
        },
        computed: {
            ...mapState({
                company: (state) => {
                    return state.global.webSettings;
                },
            }),
        },
        methods: {
            ...mapActions([actionTypes.auth.login, actionTypes.auth.getCurrentUser]),
            initForm () {
                const result = {
                    username: {
                        rules: [validators.required({ message: '请输入用户名' })],
                    },
                    password: {
                        rules: [validators.required({ message: '请输入密码' })],
                    },
                };

                if (this.company.enableValidCode) {
                    result.code = {
                        rules: [validators.required({ message: '请填写验证码' })],
                    };
                }

                return result;
            },
            async commit (values) {
                // 用户名或密码错误
                this.checkFailed = false;
                const result = await this.login(values);
                if (result.success) {
                    await this.getCurrentUser();
                    this.$router.push('/');
                } else {
                    this.errorMessage = result.message;
                    if (this.errorMessage === '密码已过期') {
                        this.ResetMyPasswordDialog.handleAdd(values.username);
                    }
                    this.handleClickValidImage();
                    this.checkFailed = true;
                }
            },
            handleClickValidImage () {
                this.validImgUrl = `/api/code_image?time=${new Date().getMilliseconds()}`;
            },
        },
    };
</script>

<style lang="scss">
    body {
        background-image: none;
    }

    .login {
        height: 100%;

        .large-alert {
            .el-alert__content {
                padding: 15px 0;

                .el-alert__title {
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }

        .login-panel {
            position: relative;
            margin-top: 5%;

            .panel-heading {
                position: relative;
                text-indent: 45px;
                height: 32px;
                line-height: 32px;
                font-size: 1.3em;

                img {
                    position: absolute;
                    margin-top: 2px;
                    margin-left: -40px;
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
</style>
