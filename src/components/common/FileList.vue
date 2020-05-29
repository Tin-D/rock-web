<template>
    <div v-loading="isReadFiles">
        <el-form inline class="toolbar" size="mini" v-if="!readonly">
            <el-form-item>
                <input ref="btnFile"
                       type="file"
                       @change="handleFileChange"
                       :multiple="limit > 1 ? 'multiple' : null"
                       accept="accept"
                       style="display: none"
                />
                <el-button size="mini" type="primary" @click="$refs.btnFile.click()">选取本地文件</el-button>
                <span style="margin-left: 10px;">上传文件要求: {{ helpText }}</span>&nbsp;<span style="color: red">大小为0的文件不会被上传</span>
            </el-form-item>
        </el-form>

        <el-table :data="files"
                  width="100%"
                  highlight-current-row
                  stripe
                  border
                  size="mini"
                  :default-sort="{prop: readonly ? 'size' : 'token', order: 'descending'}"
                  empty-text="没有选择附件"
        >
            <el-table-column type="index" width="55"/>

            <el-table-column label="名称" prop="name" sortable>
                <template slot-scope="{ row }">
                    <i class="el-icon-delete" @click="handleRemoveFile(row)" style="cursor: pointer; color: red;" title="删除" v-if="!readonly"></i>&nbsp;&nbsp;
                    <el-button type="text" @click.stop.prevent="handleFileClick(row)" :title="row.name">{{ row.name }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="大小(kb)" prop="size" sortable>
                <template slot-scope="{ row }">
                    {{ row.size ? (row.size / 1024).toFixed(2) : null }}
                </template>
            </el-table-column>

            <el-table-column label="已上传" prop="token" sortable v-if="!readonly">
                <template slot-scope="{ row }">
                    {{ row.token ? '是' : '否' }}
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import { actionTypes } from '@/store/actionTypes';
    import { alertError } from '@/roadhog/alert';

    function getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async function generateFileJson (file) {
        const fileString = await getBase64(file);
        const index = fileString.indexOf('base64,');
        const contentType = fileString.substr(5, index - 'base64,'.length + 1);
        return {
            name: file.name,
            contentType,
            size: file.size,
            content: fileString.substr(index + 'base64,'.length),
        };
    }

    export default {
        async created () {
            if (this.recorderId) {
                const attachments = await this.$store.dispatch(actionTypes.common.getAttachments, { recorderId: this.token || this.recorderId });
                for (let a of attachments) {
                    this.files.push({
                        id: a.id,
                        url: `/api/attachment/download/${a.token || a.id}`,
                        size: a.size,
                        name: a.name,
                        token: a.token,
                    });
                }
                this.$emit('input', this.files);
            }
        },
        data () {
            return {
                isReadFiles: false,
                files: [],
            };
        },
        computed: {
            parsedMaxSize () {
                if (this.maxSize === '0') {
                    return Number.MAX_VALUE;
                }

                const maxSize = this.maxSize.toLowerCase();
                let sizeNumber = parseInt(maxSize.substr(0, maxSize.length - 1));
                if (_.endsWith(maxSize, 'g')) {
                    sizeNumber = sizeNumber * 1024 * 1024 * 1024;
                } else if (_.endsWith(maxSize, 'm')) {
                    sizeNumber = sizeNumber * 1024 * 1024;
                } else if (_.endsWith(maxSize, 'k')) {
                    sizeNumber = sizeNumber * 1024;
                }

                return sizeNumber;
            },
            helpText () {
                let result = '';
                if (this.parsedMaxSize < Number.MAX_VALUE) {
                    result = result + '文件大小不超过 ' + this.maxSize + ';';
                }

                if (this.accept !== '*/*') {
                    result = result + '允许的文件类型 ' + this.accept;
                }

                return result;
            },
        },
        methods: {
            async handleFileChange (e) {
                const files = e.target.files;

                if (!files || files.length === 0) {
                    return;
                }

                if (this.limit > 1) {
                    // 判断文件数量
                    const fileListSize = this.files.length + e.target.files;
                    if (fileListSize > this.limit) {
                        alertError(`最多只允许上传${this.limit}个附件`);
                        return;
                    }
                } else {
                    this.files = [];
                }

                this.isReadFiles = true;
                for (let f of files) {
                    try {
                        const fj = await generateFileJson(f);
                        if (fj.size > this.parsedMaxSize) {
                            alertError(`文件: ${fj.name} 的大小: ${fj.size}, 超过允许的大小: ${this.maxSize}`);
                        } else {
                            this.files.push(fj);
                        }
                    } finally {
                    }
                }
                this.isReadFiles = false;

                this.$emit('input', this.files.filter(n => n.size > 0));
            },
            handleFileClick (file) {
                if (!file.token) {
                    return;
                }

                if (this.clickToDownload) {
                    this.$store.dispatch(actionTypes.common.downloadAttachment, { attachmentId: file.id, token: file.token });
                } else {
                    this.$emit('preview', file);
                }
            },
            handleRemoveFile (file) {
                const index = this.files.indexOf(file);
                if (index > -1) {
                    this.files.splice(index, 1);
                }
            },
        },
        props: {
            limit: {
                type: Number,
                default: 3,
            },
            maxSize: {
                type: String,
                default: '50m', // 支持的单位：k, m, g
            },
            accept: {
                type: String,
                default: '*/*',
            },
            recorderId: {
                type: String,
            },
            token: {
                type: String,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            clickToDownload: {
                type: Boolean, // 默认点击文件名就下载，如果不是下载，就设置成false，并在父组件上监听 'preview' 事件
                default: true,
            },
        },
    };
</script>
