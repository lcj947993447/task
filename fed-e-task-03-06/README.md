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

- 





5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。



6.针对新技术，你是如何过渡到项目中？