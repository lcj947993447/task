const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting () {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname
            }
        ])
        .then(answers => {
            this.answers = answers
        })
    }

    writing () {
        // 把每一个文件都通过模板转换到目标路径
        // 将模板文件夹下的每一个文件相对路径都通过字符串的形式存储到数组中
        const templaters = [
            'yarn.lock',
            'README.md',
            'package.json',
            'babel.config.js',
            '.gitignore',
            'src/main.js',
            'src/App.vue',
            'src/assets/logo.png',
            'src/components/Hello.vue',
            'public/favicon.ico',
            'public/index.html'
        ]
        templaters.forEach(item => {
            // item => 每个文件路径
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}