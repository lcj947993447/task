// .stylelintignore 可通过创建此文件忽略目录或者文件

// css检查配置文件
module.exports = {
    // context: 'src',// 检查目录
    // 正则匹配想要lint监测的文件
    // files: ['**/*.vue', '**/*.less', '**/*.css'],
    extends: ['stylelint-config-standard'],
    processors: ["stylelint-processor-html"],  // vue文件下检查css
    plugin: [
        // "stylelint-declaration-strict-value"
    ],
    rules: { // rules 查文档 https://stylelint.io/user-guide/rules/list
        "max-nesting-depth": 2, // 允许嵌套的深度为2
        "length-zero-no-unit": true,
        // "scale-unlimited/declaration-strict-value": "color"
    },
    defaultSeverity: "warning", // "error" 默认错误级别
	// fix: true // 自动修复
}