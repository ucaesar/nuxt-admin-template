/* export default {
    axios: require('./axios.json'),

    components: require('./components.json'),

    superadmin: require('./superadmin.json'),
    admin: require('./admin.json'),

    login: require('./login.json'),
    register: require('./register.json'),

    formValidating: require('./formValidating.json'),

    expressweb: require('./expressweb.json')
}; */

import { loadLangMessages } from './utils';

export default () => {
    return new Promise(function(resolve) {
        resolve(loadLangMessages('cn'));
    });
};
