module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: 'localhost'
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:8080/tests/index.html']
                },
            },
        },
        shell: {
            ui_test_: {
                command: './node_modules/.bin/qunit ./tests/tests.ui.js',
            }
        }
    });

    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', ['connect', 'qunit', 'shell:ui_test']);
    grunt.registerTask('test', ['connect', 'qunit']);
    grunt.registerTask('ui_test', ['connect', 'shell:ui_test']);
};
