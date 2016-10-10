module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', ['connect:server']);
}
