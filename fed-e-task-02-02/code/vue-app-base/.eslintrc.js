// 可以使用此方式 再次将配置文件提取到别的文件中
// module.exports = {
//   extends: []
// }
// package.json 中 eslint:recommended 使用自定义配置文件 导向这
// 此文件可以直接集成在 package.json 中 此次单独提取出来

module.exports = {
  env: { // 此项指定环境的全局变量，下面的配置指定为浏览器环境
    browser: true,
    es2020: true
  },
  extends: [ // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: { // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    // sourceType: module,
    ecmaVersion: 11
  },
  plugins: [ //支持第三方插件的规则，插件以eslint-plugin-作为前缀，配置时该前缀可省略
    //检查vue文件需要eslint-plugin-vue插件
    'vue'
  ],
  /* 
  rules:  key: value  更多规则 均在 https://eslint.bootcss.com/docs/rules/
  value: // 作用
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    "no-console": 1, //不允许出现console语句
  }
}
