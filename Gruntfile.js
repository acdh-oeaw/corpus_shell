module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        execute: {
            jscc_cql_grammar: {
                options: {
                    // execute node with additional arguments 
                    args: [
                        '-p', '',
                        '-t', 'driver_v8.js_',
                        '--output', '../../scripts/js/query_input/cql_parser.js',
                        '../../scripts/js/query_input/cql_grammar.par'
                    ],
                    cwd: './node_modules/jscc-node'
                },
                files: {
                  './scripts/js/query_input/cql_parser.js': ['./node_modules/jscc-node/jscc.js']  
                }
            }
        },        
        jsdoc : {
            dist : {
                src: ['scripts/js/*.js', 'scripts/js/query_input/*.js'],
                options: {
                    destination: 'docs/jsdocs',
                    private: true,
                    configure: 'jsdocconf.json'
                }
            }
        }
    });
  
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', 'My "default" task description.', ['execute:jscc_cql_grammar']);

};
