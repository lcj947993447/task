// 实现这个项目的构建任务
//  "clean": "gulp clean" 删除
//  "lint": "gulp lint",  检查
//  "serve": "gulp serve", 服务
//  "build": "gulp build", 打包 
//  "start": "gulp start", 构建 
//  "deploy": "gulp deploy --production" 部署

// 解构gulp方法
const { src, dest, parallel, series, watch } = require('gulp')


// 通过load-plugins 减少注入
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// 删除
const del = require('del')

// 静态服务器
const browserSync = require('browser-sync')
const bs = browserSync.create()

// 命令行传参
const minimist = require('minimist');

// css 校验
const reporter = require('postcss-reporter')
const stylelint = require('stylelint')
const postcss_scss = require('postcss-scss');

// 接受命令行传递参数
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};
const options = minimist(process.argv.slice(2), knownOptions);

const data = {
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
  date: new Date()
}

// 基础功能
// 初始文件位置
// 编译
// 存放文件位置
// 返回工作流 浏览器刷新

// js
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

// css
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

// html
const htmlTemp = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } })) // 模板不缓存
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

// img 压缩
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 字体文件 压缩
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 公共
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}



// clean 删除 中间文件 以及打包文件

const clean = () => {
  return del(['dist', 'temp'])
}

// lint 自检
const jslint = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
}
const csslint = () => {
  // Stylelint config rules 
  const stylelintConfig = {
    "rules": {
      "font-family-name-quotes": "always-unless-keyword" // 关键词字体 必须要用引号包起来
    }
  }
  const processors = [
    stylelint(stylelintConfig),
    reporter({ clearMessages: true, throwError: true })
  ]

  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.postcss(processors, { syntax: postcss_scss }))
}

const lint = parallel(jslint, csslint)

// 本地服务器
const serve = () => {
  // 检测src下面文件的变化
  watch('src/assets/scripts/*.js', script)
  watch('src/assets/styles/*.scss', style)
  watch('src/*.html', htmlTemp)

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  // 启动服务器
  bs.init({
    notify: false, // browsersync的小通知 是否展示
    port: 2080,// 接口
    // proxy:' localhost:2080' 设置代理的方式
    server: { // 服务器启动目录
      baseDir: ['temp', 'src', 'public'],
      routes: { // 配置/node_modules的文件去node_modules下去查找
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 压缩文件  在build的时候进行  
// 在启动时不触发方便调试时查看代码
// JS CSS HTML
// useref 查找 html中引入的同类型文件 并拼接 配合if使用可以压缩文件
const useref = () => {
  return src("temp/*.html", { searchPath: ['temp', '.'] }) // 查询起始位置
    // if 判断 压缩文件 
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ // 可以通过配置 将页面内的 css js 进行压缩  和空格去除
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJs: true
    })))
    .pipe(dest('dist'))
}

// 频繁的修改 js css html 组合成一个并行道
const compile = parallel(script, style, htmlTemp)

// build 打包 单行道
// 删除老文件
// 编译js css html
// 合并引入 压缩 改动频繁的文件
// 引入压缩的 img font 公共
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

// start 编译并启动本地服务器
const start = series(compile, serve)

// deploy 推送到生产服务器



const gitPush = () => {
  return src('dist/**/*')
    .pipe(plugins.if(options.env === "production", plugins.ghPages({
      'remoteUrl': 'https://pages.github.com'
    })))
}

const deploy = series(build, gitPush)


module.exports = {
  clean,
  lint,
  compile,
  serve,
  build,
  start,
  deploy
}


// 首先确定需要实现的功能
// 对功能进行层级关系分解成小模块
// 分析每一个小模块并将依赖的插件进行安装
// 最后根据功能的层级关系将小模块进行组合
// 最终实现功能

