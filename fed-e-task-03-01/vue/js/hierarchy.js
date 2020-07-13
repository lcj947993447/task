class Hierachy {
  constructor (vm, key) {
    this.vm = vm
    // data中的属性名称
    this.key = key
  }

  // 判断差值表达式是否多层
  textHierarchy (text) {
    if (text.indexOf('.') === -1) {
      return text
    } else {
      let keyItem = this.vm
      text.split('.').forEach(item => {
        keyItem = keyItem[item]
      })
      return keyItem
    }
  }
}