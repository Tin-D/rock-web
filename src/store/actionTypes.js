export const actionTypes = {
    common: {
        list: 'list', // 更新列表数据
        add: 'add', // 新增
        edit: 'edit', // 更新
        remove: 'remove', // 删除
        get: 'get', // 获取一条数据,
        checkUnique: 'checkUnique', // 检查重名,
        listOptions: 'listOptions', // 获取select选择器展现的数据
        exportExcel: 'exportExcel', // 导出Excel表
        parseExcel: 'parseExcel', // 读取excel文件
        parseDbf: 'parseDbf', // 读取dbf文件
        parseFile: 'parseFile', // 读取文件
        openDownloadLink: 'openDownloadLink', // 打开下载链接
        getWebSettings: 'getWebSettings', // 获取网站配置信息
        downloadAttachment: 'downloadAttachment', // 下载附件
        previewImage: 'previewImage', // 预览图片
        import: 'import',
        export: 'export',
        getAttachments: 'getAttachments', // 获取附件
        saveAttachmentTemp: 'saveAttachmentTemp', // 临时保存附件
        getAttachmentBase64: 'getAttachmentBase64', // 获取附件内容，以base64返回
        saveExistsAttachment: 'saveExistsAttachment', // 保存一个已有的附件
        loadGlobalSecureData: 'loadGlobalSecureData', // 加载非匿名用户才能获取的全局数据
        getUniqueId: 'getUniqueId', // 从服务器上获取一个guid
    },
    auth: {
        login: 'login',
        logout: 'logout',
        resetMyPassword: 'resetMyPassword',
        getCurrentUser: 'getCurrentUser',
    },
    user: {
        resetPassword: 'resetPassword',
        findPostUsers: 'findPostUsers',
        findDepartmentUsers: 'findDepartmentUsers',
    },
    department: {
        findDepartmentUsers: 'findDepartmentUsers',
        findDepartmentChildren: 'findDepartmentChildren',
    },
    workflow: {
        checkRecorderCreatorClassName: 'checkRecorderCreatorClassName',
        getTasks: 'getTasks',
        getInstanceStatus: 'getInstanceStatus',
        saveAndStartWorkflow: 'saveAndStartWorkflow', // 保存并启动流程，要在各自模块的controller中自己实现
        doTask: 'doTask', // 执行任务
        addExecutorsToStep: 'addExecutorsToStep', // 加签人员
        forceGotoStep: 'forceGotoStep', // 强行跳转到指定步骤
    },
    equipment: {
        getExtendInfo: 'getExtendInfo', // 获取设备的扩展信息
        findComputerRoomEquipments: 'findComputerRoomEquipments', // 获取机房下的所有设备
    },
    computerRoom: {
        getComputerRoomName: 'getComputerRoomName', // 获取机房的完整名称，比如：A集团-1号机房
    },
};
