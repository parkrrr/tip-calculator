module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
              options: {
                port: 8080,
                hostname: '*'
              }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:8080/tests/index.html']
                }
            }
        }
    });

    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['connect', 'qunit']);
};
