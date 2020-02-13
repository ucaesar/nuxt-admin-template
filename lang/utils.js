const modules = [
    'admin',
    'axios',
    'components',
    'formValidating',
    'login',
    'register',
    'superadmin',
    'expressweb'
];

export function loadLangMessages(lang) {
    const path = `./${lang}/`;

    const messages = {};
    modules.forEach(module => {
        messages[module] = require(`./${lang}/` + module + '.json');
    });

    return messages;
}
