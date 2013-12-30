module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bump');

    var userConfig = require('./build.config.js');
    var taskConfig = {
        pkg: grunt.file.readJSON("package.json"),

        clean: [
//            '<%= build_dir %>',
            '<%= compile_dir %>'
        ],

        copy: {
            src_files: {
                files: [
                    {
                        src: [ 'custom.fineuploader*' ],
                        dest: '.',
                        cwd: 'src/',
                        expand: true,
                        rename: function (dest, src) {
                            var fullName = src.substring(src.lastIndexOf('/') + 1);
                            var rootName = fullName.substring(0, fullName.indexOf('-'));
                            var minIndex = fullName.lastIndexOf('.min');
                            if(minIndex >= 0) {
                                return dest + '/' + rootName + fullName.substring(minIndex);
                            } else {
                                return dest + '/' + rootName + fullName.substring(fullName.lastIndexOf('.'));
                            }
                        }
                    }
                ]
            },

            asset_files: {
                files: [
                    {
                        src: [ '**', '!custom.fineuploader*' ],
                        dest: '.',
                        cwd: 'src/',
                        expand: true
                    }
                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
    grunt.renameTask('watch');
    grunt.registerTask('build', [ 'copy:src_files', 'copy:asset_files' ]);
};