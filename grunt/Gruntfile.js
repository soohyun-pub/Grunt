module.exports = function (grunt) {

    'use strict';

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    require('load-grunt-tasks')(grunt);

    // 작업시간 표시
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' ======================================================================== \n' +
            ' * Project   : <%= pkg.name %>(<%= pkg.description %>) v<%= pkg.version %>\n' +
            ' * Publisher : <%= pkg.make.publisher %> (<%= pkg.make.email %>), (<%= pkg.make.blog %>)\n' +
            ' * Build     : <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * License   : <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' ======================================================================== \n' +
            ' */\n',

        // html task
        includes: {
            dist: {
                expand: true,
                cwd: 'src/docs/html/',
                src: ['**/*.html'],
                dest: 'dest',
                options: {
                    flatten: true,
                    // debug: true,
                    includePath: 'src/docs/include/'
                }
            }
        },
        htmlhint: {
            options: {
                htmlhintrc: 'grunt/.htmlhintrc'
            },
            dist: 'dest/**/*.html'
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dest/**/*'
                    ]
                }]
            },
        },


        // watch task
        watch: {
            options: { livereload: true },
            html: {
                files: ['src/docs/**/*.html'],
                tasks: ['htmlhint', 'includes']
            },
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // keepalive: true,
                    base: 'dest',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/index.html'
                }
            }
        },

    });



    // server
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect', 'watch']);
        }
        grunt.task.run([
            'default',
            'connect',
            'watch'
        ]);
    });

    // html task
    grunt.registerTask('html', [
        'htmlhint',
        'includes'
    ]
    );

    grunt.registerTask('default', [
        'clean:dist',
        'html'
    ]
    );

};
