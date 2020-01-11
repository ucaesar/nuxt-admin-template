export default {
    axios: {
        error: {
            '403': 'Error 403 - Access Denied',
            '404': 'Error 404 - Not Found',
            '500': 'Error 500 - Inner Server Error',
            '401': 'Error 401 - Operation Failed',
            timeout: 'Timeout, retry pls.',
            unknownError: 'Unknown Error Occured'
        },
        success: 'Operation Successed'
    },

    components: {
        table: {
            newButtonText: 'New',
            searchText: 'Search',
            actionsHeaderText: 'Actions',
            loadingText: 'Loading...',
            submittingText: 'Submitting...'
        },
        crudTable: {
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
            '/superadmin/role': 'Role Manager',
            '/superadmin/user': 'User Manager'
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

    register: {
        toolbarText: 'Register',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        passwordConfirmLabel: 'Confirm password',
        emailLabel: 'Email',
        submitButtonText: 'Register Now!',
        error: {
            usernameType: 'Contains only a~z A~Z 0~9',
            usernameLength: 'Length between 5~20',
            passwordType: 'Contains bad character',
            passwordLength: 'Length between 8~20',
            differentPassword: 'Should be the same',
            emailFormatt: "Check Email's format",

            existedEmail: 'Registry Email has been existed',
            existedUsername: 'Username has been existed'
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
            editorTitle: 'Edit Role',
            resourceGroupInputLabel: 'Resource Groups contained',
            resourceGroupInputHint: 'Select resource groups from list below',
            roleInputLabel: 'Roles inherited from',
            roleInputHint: 'Select roles from list below'
        },
        resourceGroupTable: {
            tableTitle: 'Resource Groups',
            newButtonText: 'New Resource Group',
            groupNameHeaderText: 'Name',
            descriptionHeaderText: 'Description',
            editorTitle: 'Edit Resource Group',
            resourceInputLabel: 'Resources contained',
            resourceInputHint: 'Select resources from list below'
        },
        resourceTable: {
            tableTitle: 'Resources',
            newButtonText: 'New Resource',
            nameHeaderText: 'Name',
            actionHeaderText: 'Action',
            urlHeaderText: 'Url',
            descriptionHeaderText: 'Description',
            editorTitle: 'Edit Resource'
        },
        userTable: {
            tableTitle: 'Users',
            usernameHeaderText: 'Username',
            editorTitle: 'Edit User',
            roleInputLabel: 'Roles',
            roleInputHint: 'Select roles from list below'
        }
    }
};
