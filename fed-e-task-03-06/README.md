1.application/json 和 application/x-www-form-urlencoded

- 浏览器的原生 From 表单，不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据

- application/x-www-form-urlencoded会对参数进行序列化处理，最终以键值对形式“key1=‘value1’&key2=‘value2’”的结构进行 URL 转码之后发送到服务器

  application/json使用序列化后的JSON类型的数据
  
  

2.角色管理可以划分为页面访问权限，数据的增/删/改权限

1. 页面访问权限，两种方式

- 直接将路由表保存在服务端，通过登录返回对应的路由表
- 给路由设置守卫，通过用户的权限列表将对应的路由添加到路由表中

2. 数据权限

- 根据对应的权限登记展示隐藏页面的操作按钮
- 不隐藏按钮，在接口访问设置权限验证，对用户做出提示



3.@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

- 项目生成添加了更多选项
- 高度集成了config和build配置文件，可以通过vue.config.js来进行额外配置



4.生产环境下前端项目的自动化部署的流程

1. Jenkins+gitlab+服务器

   主要流程：配置Jenkins环境和代码仓库以及服务器，根据流程编写Jenkinsfile（一般为：从代码仓库下载项目到服务器→安装依赖→构建/打包项目→上传打包结果→连接服务器→下载代码，启动服务/进程pm2），根据不同的环境配置不同的Jenkinsfile文件

   方式：

   - 通过监控gitlab钩子（需要配置钩子函数，以及开启Jenkins的远程构建），自动启动Jenkins启动
   - 不设置钩子，通过手动启动Jenkins

2. Actions+github+服务器：

   主要流程：根据流程编写 .github/workflows/main.yml （一般为：监视 tag 标签，从代码仓库下载项目到服务器→安装依赖→构建/打包项目→上传打包结果→连接服务器→下载代码，启动服务/进程pm2），



5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点

- vue中引入swiper框架时，频繁的出入有大量swiper页面，会导致项目内存溢出 离开路由时销毁swiper组件
- 搜狗输入法下特殊符号中的对号在手机号渲染成根号，对特殊符号做过滤
- 1.百度地图在mobile端拖拽和点击不可同时存在
  2.当地图实例display:none时，地图中心点为左上角，设置自定义浮标居中显示时会定位到左上角

6.针对新技术，你是如何过渡到项目中？

0.0目前还没有尝试过渡新技术到已有项目中