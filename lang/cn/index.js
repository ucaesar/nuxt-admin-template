export default {
    axios: require('./axios.json'),

    components: {
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
            '/superadmin/role': '角色管理',
            '/superadmin/user': '用户管理'
        }
    },

    login: require('./login.json'),
    register: {
        toolbarText: '注册',
        usernameLabel: '用户名',
        passwordLabel: '密码',
        passwordConfirmLabel: '再次输入密码',
        emailLabel: '电子邮件',
        loginButtonText: '已有账户',
        submitButtonText: '现在注册！',
        error: {
            usernameType: '用户名只能包含 a~z A~Z 0~9',
            usernameLength: '用户名长度限制在5~20之间',
            passwordType: '密码字符异常',
            passwordLength: '密码长度限制在8~20之间',
            differentPassword: '两次输入的密码需要一致',
            emailFormatt: '邮箱格式不正确',

            existedEmail: '注册邮箱已存在，请更换',
            existedUsername: '注册用户名已存在'
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
        },
        userTable: {
            tableTitle: '用户列表',
            usernameHeaderText: '名称',
            editorTitle: '编辑用户',
            roleInputLabel: '所属角色',
            roleInputHint: '从列表中勾选角色'
        }
    }
};
