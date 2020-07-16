// 导入snabbdom
import { init, h } from 'snabbdom'
import classs from "snabbdom/modules/class"
import props from "snabbdom/modules/props"
import style from "snabbdom/modules/style"
import eventlisteners from "snabbdom/modules/eventlisteners"

// init 返回值patch函数，作用对比两个vnode的差异更新到真是dom
// 参数：数组，模块
let patch = init([
  classs,
  props,
  style,
  eventlisteners
])


let data = [
  {
    rank: 1,
    name: "eee",
    age: 11
  },
  {
    rank: 2,
    name: "bbb",
    age: 16
  },
  {
    rank: 3,
    name: "ccc",
    age: 13
  },
  {
    rank: 4,
    name: "aaa",
    age: 18
  },
  {
    rank: 5,
    name: "ddd",
    age: 15
  },
  {
    rank: 6,
    name: "hhh",
    age: 17
  },
  {
    rank: 7,
    name: "ggg",
    age: 22
  },
  {
    rank: 8,
    name: "fff",
    age: 18
  },
  {
    rank: 9,
    name: "iii",
    age: 19
  },
  {
    rank: 10,
    name: "jjj",
    age: 21
  }
]

let rank = {
  rankCurrent: "rank",
  rankTypeList: ['none', "rank", "name", "age"],
  dataLen: data.length,
  addNameList: ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh", "iii", "jjj", "kkk", "lll", "mmm", "nnn"],
}

// oldVnode
let vnode = "!"
// 最外层
function wrapper (data) {
  return h('div#app', [
    h('h3.title', 'rankTop10'),
    h('div.sort-wrapper', [
      'sort:',
      h('div.sort-type', rank.rankTypeList.map(sortView)),
      h(
        'a.btn.add',
        {
          props: {
            href: "javascript:;"
          },
          on: {
            click: [itemAdd]
          }
        },
        'add'
      )
    ]),
    h(
      'div.list-wrapper',
      noData()
    )
  ])
}
function itemAdd () {
  let a = {
    rank: rank.dataLen += 1,
    name: rank.addNameList[Math.floor(Math.random() * 14)],
    age: Math.floor(Math.random() * 100)
  }
  data = [a].concat(data)

  sortData()
}

// sortView 排序
function sortView (item) {

  return h(
    'a.btn',
    {
      class: {
        active: rank.rankCurrent === item
      },
      props: {
        href: "javascript:;"
      },
      on: {
        click: [sortData, item]
      }
    },
    item
  )
}

// 数据排序
function sortData (sort) {
  rank.rankCurrent = sort || rank.rankCurrent
  if (rank.rankCurrent !== "none") {
    data.sort((prev, next) => {
      if (prev[rank.rankCurrent] > next[rank.rankCurrent]) {
        return 1;
      }
      if (prev[rank.rankCurrent] < next[rank.rankCurrent]) {
        return -1;
      }
      return 0;
    });
  }
  initDom();
}

// itemView 内容
function noData () {
  if(data.length > 0){
    return data.map(itemView)
  }else{
    return h('div.no-data', '没数据了~')
  }
}
function itemView (item) {
  return h(
    'div.item-wrapper',
    {
      key: item.rank
    },
    [
      h('div.rank', item.rank),
      h('div.name', item.name),
      h('div.age', item.age),
      h(
        'a.item-remove',
        {
          props: {
            href: "javascript:;"
          },
          on: {
            click: [itemRemove, item]
          }
        },
        'X'
      )
    ]
  )

}

function itemRemove (item) {
  console.log(item)
  if (data.length <= 1) {
    alert("要删完啦")
  }
  data = data.filter(i => {
    return i !== item
  })
  initDom();
}



function initDom () {
  vnode = patch(vnode, wrapper(data));
}

window.addEventListener('DOMContentLoaded', () => {
  var app = document.getElementById('app');
  vnode = patch(app, wrapper(data));
});