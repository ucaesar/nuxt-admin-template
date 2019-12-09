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
            newButtonText: 'New',
            searchText: 'Search',
            actionsHeaderText: 'Actions',
            loadingText: 'Loading...',
            submittingText: 'Submitting...'
        },
        dialog: {
            okButtonText: 'OK',
            cancelButtonText: 'Cancel',
            submitButtonText: 'Submit',
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
        roleTable: {
            tableTitle: 'Roles',
            newButtonText: 'New Role',
            roleNameHeaderText: 'Role Name',
            descriptionHeaderText: 'Description',
            editorTitle: 'Edit Role'
        },
        resourceGroupTable: {
            tableTitle: 'Resource Groups',
            newButtonText: 'New Resource Group',
            groupNameHeaderText: 'Name',
            descriptionHeaderText: 'Description',
            editorTitle: 'Edit Resource Group'
        },
        resourceTable: {
            tableTitle: 'Resources',
            newButtonText: 'New Resource',
            nameHeaderText: 'Name',
            actionHeaderText: 'Action',
            urlHeaderText: 'Url',
            descriptionHeaderText: 'Description',
            editorTitle: 'Edit Resource'
        }
    }
};
