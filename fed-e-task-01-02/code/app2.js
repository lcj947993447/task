const fp = require("lodash/fp")

const { Maybe, Container } = require('./sopports')

// 1.
    let maybe = Maybe.of([5, 6, 1])
    // 通过把ex1当参数 使用map调用
    // let ex1 = fp.flowRight(fp.map(fp.add(3)))
    // console.log(maybe.map(ex1))

    // 将maybe作为数据传递给ex1
    let ex1 = fp.flowRight(fp.map(fp.add(3)), fp.prop('_value'))
    console.log(ex1(maybe))
// 2.
    let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    // 通过把ex2当参数 使用map调用
    // let ex2 = fp.flowRight(fp.first)
    // console.log(xs.map(ex2))

    // 将xs作为数据传递给ex2
    let ex2 = fp.flowRight(fp.first, fp.prop('_value'))
    console.log(ex2(xs))

// 3.
    let safeProp = fp.curry(function (x, o) {
        return Maybe.of(o[x])
    })
    let user = {
        id: 2,
        name: "Albert"
    }
    let ex3 = fp.flowRight(fp.first, fp.prop('_value'), safeProp('name'))
    console.log(ex3(user))

// 4.
    // let ex4 = function (n) {
    //     if (n) {
    //         return parseInt(n)
    //     }
    // }
    let ex4 = function (n) {
        return Maybe.of(n).map(parseInt)._value
    }
    console.log(ex4('22X'))