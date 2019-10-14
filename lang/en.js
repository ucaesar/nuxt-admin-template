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

    admin: {
        toolbar: {
            logoutButtonText: 'Logout'
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
    }
}
