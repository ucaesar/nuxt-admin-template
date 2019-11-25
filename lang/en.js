export default {
    axios: {
        error: {
            '403': 'Error 403 - Access Denied',
            '404': 'Error 404 - Not Found',
            '500': 'Error 500 - Inner Server Error',
            timeout: 'Timeout, retry pls.',
            unknownError: 'Unknown Error Occured'
        }
    },

    components: {
        table: {
            actionsHeaderText: 'Actions'
        },
        dialog: {
            okButtonText: 'OK',
            cancelButtonText: 'Cancel',
            makeSureToDeleteTitle: 'Make sure to DELETE this?'
        }
    },

    admin: {
        toolbar: {
            logoutButtonText: 'Logout'
        },
        navigator: {
            '/superadmin': 'Super Admin',
            '/superadmin/resourcegroup': 'Resource Group Manager',
            '/superadmin/resource': 'Resource Manager',
            '/superadmin/role': 'Role Manager'
        }
    },

    login: {
        toolbarText: 'Login',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        submitButtonText: 'Login',
        error: {
            invalidAccount: 'Invalid username or password'
        }
    },

    formValidating: {
        error: {
            fieldRequired: 'Required *'
        }
    },

    superadmin: {
        roleManager: {
            newRoleButtonText: 'New Role',
            roleNameHeaderText: 'Role Name'
        },
        resourceGroupTable: {
            newButtonText: 'New Resource Group',
            groupNameHeaderText: 'Name',
            groupDescriptionHeaderText: 'Description'
        }
    }
};
