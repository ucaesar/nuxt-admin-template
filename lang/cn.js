export default {
    axios: {
        error: {
            '403': '错误 403 - 拒绝访问',
            '404': '错误 404 - 无效地址',
            '500': '错误 500 - 内部服务器错误',
            '401': '错误 401 - 操作失败',
            timeout: '请求超时，请重试。',
            unknownError: '发生未知错误'
        },
        success: '操作成功'
    },

    components: {
        table: {
            newButtonText: '新增',
            searchText: '搜索',
            actionsHeaderText: '操作',
            loadingText: '正在读取...',
            submittingText: '正在提交...'
        },
        crudTable: {
            newButtonText: '新增',
            searchText: '搜索',
            actionsHeaderText: '操作',
            loadingText: '正在读取...',
            submittingText: '正在提交...'
        },
        dialog: {
            okButtonText: '确定',
            cancelButtonText: '取消',
            submitButtonText: '提交',
            makeSureToDeleteTitle: '确定要删除这个吗？'
        }
    },

    admin: {
        toolbar: {
            logoutButtonText: '退出登录'
        },
        navigator: {
            '/superadmin': '超级管理员',
            '/superadmin/resource': '资源管理',
            '/superadmin/resourcegroup': '资源组管理',
            '/superadmin/role': '角色管理'
        }
    },

    login: {
        toolbarText: '登录',
        usernameLabel: '用户名',
        passwordLabel: '密码',
        submitButtonText: '登录',
        error: {
            invalidAccount: '用户名或密码错误'
        }
    },

    formValidating: {
        error: {
            fieldRequired: '必填 *'
        }
    },

    superadmin: {
        roleTable: {
            tableTitle: '角色列表',
            newButtonText: '新建角色',
            roleNameHeaderText: '角色名',
            descriptionHeaderText: '描述',
            editorTitle: '编辑角色',
            resourceGroupInputLabel: '包含资源组',
            resourceGroupInputHint: '从列表中勾选资源组',
            roleInputLabel: '继承自角色',
            roleInputHint: '从列表中勾选角色'
        },
        resourceGroupTable: {
            tableTitle: '资源组列表',
            newButtonText: '新建资源组',
            groupNameHeaderText: '资源组名称',
            descriptionHeaderText: '描述',
            editorTitle: '编辑资源组',
            resourceInputLabel: '包含资源',
            resourceInputHint: '从列表中勾选资源'
        },
        resourceTable: {
            tableTitle: '资源列表',
            newButtonText: '新建资源',
            nameHeaderText: '名称',
            actionHeaderText: '动作',
            urlHeaderText: '地址',
            descriptionHeaderText: '描述',
            editorTitle: '编辑资源'
        }
    }
};
