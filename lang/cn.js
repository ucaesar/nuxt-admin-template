export default {
    axios: {
        error: {
            '403': '错误 403 - 拒绝访问',
            '404': '错误 404 - 无效地址',
            '500': '错误 500 - 内部服务器错误',
            timeout: '请求超时，请重试。',
            unknownError: '发生未知错误'
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
        rolemanager: {
            newRoleButtonText: '新建角色',
            roleNameHeaderText: '角色名'
        }
    }
};
