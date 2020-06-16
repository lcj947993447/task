// TODO: site logics

$(($) => {
  const $body = $('html, body')
  console.log("123")

  // let data = {
  //   name: 'lcj'
  // }
  $('#scroll_top').on('click', () => {
    $body.animate({ scrollTop: 0 }, 600)
    return false
  })
})
