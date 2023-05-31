const path = require('path');

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
            ui_test: {
                command: `${path.join('node_modules', '.bin', 'qunit')} ${path.join('tests', 'tests.ui.js')}`
            }
        },
        copy: {
            main: {
                src: `${path.join('node_modules', 'knockout', 'build', 'output', 'knockout-latest.js')}` ,
                dest: `${path.join('js', 'knockout-min.js')}`,
              },
        }
    });

    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', ['deploy', 'connect', 'qunit', 'shell:ui_test']);
    grunt.registerTask('deploy', ['copy']);
    grunt.registerTask('test', ['deploy', 'connect', 'qunit']);
    grunt.registerTask('ui_test', ['connect', 'deploy', 'shell:ui_test']);
};
