'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
    diff: true,
    extension: ['js'],
    opts: false,
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 5000,
    ui: 'bdd',
    spec: [
        'server/test/**/!(index1|index|addusers|start|controller|role).ts',
        'clienttest/**/*.js'
    ]
};
