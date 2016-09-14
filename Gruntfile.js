module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        'http-server': {
            'test': {
                port: 8080,
                runInBackground: true
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
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['http-server:test', 'qunit']);
};
