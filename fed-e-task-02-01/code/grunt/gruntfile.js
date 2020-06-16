module.exports = grunt => {
  // grunt.initConfig() 用于为任务添加一些配置选项
  grunt.initConfig({
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date(),
    clean: {
      src: ['dist/', 'temp/']
    },

    jshint: {
      all: [
        'src/assets/scripts/*.js'
      ],
      jshintrc: true,
      options: {
        browser: true,
        devel: true
      }
    },

    scsslint: {
      allFiles: [
        'src/assets/styles/*.scss'
      ],
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      }
    }

  })

  // 删除
  grunt.loadNpmTasks('grunt-contrib-clean')
  // js css语法检查
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-scss-lint')
  // 监听
  grunt.loadNpmTasks('grunt-contrib-watch')
  // sass编译
  grunt.loadNpmTasks('grunt-contrib-sass')
  // js css img html压缩
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')



  grunt.registerTask('default', ['clean'])
  grunt.registerTask('lint', 'jshint and scsslint', () => {
    grunt.task.run('scsslint', 'jshint')
  })
  // grunt.registerTask('default', ['sass', 'babel', 'watch'])

  // const browserSync = require('browser-sync')
  // const bs = browserSync.create()



}