//【F】去除 url 多余的字符
const simplifyUrl = (url) => {
  return url
    .replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

//【F】本地存储站点列表
const saveList = (objList) => {
  const string = JSON.stringify(objList)
  localStorage.setItem('x', string)
  render()
}

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
//【F】根据 hashMap 渲染站点列表
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((item, index) => {
    const $li = $(`
      <li>
        <a href="${item.url}">
          <div class="site">
            <div class="logo">${item.logo.toUpperCase()}</div>
            <div class="link">${simplifyUrl(item.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `).insertBefore($lastLi)
    // 监听 关闭按钮 的点击
    $li.on('click', '.close', (e) => {
      e.preventDefault() // 阻止 a 标签的默认行为
      hashMap.splice(index, 1)
      saveList(hashMap)
    })
  })
}

// 页面初始化
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
let hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'B', url: 'https://www.bilibili.com' },
  { logo: 'G', url: 'https://google.com' },
]
render()

//【O】监听 添加按钮 的点击
$('.addButton').on('click', () => {
  let url = window.prompt('请输入您要添加的网址：')
  if (url.indexOf('http') !== 0) {
    url = 'http://' + url
  }
  if (!simplifyUrl(url)) {
    return
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  })
  saveList(hashMap)
})

//【O】监听 键盘按下 事件
$(document).on('keypress', (e) => {
  const { key } = e
  hashMap.forEach((item) => {
    console.log(item.logo)
    if (item.logo.toLowerCase() === key) {
      window.open(item.url)
    }
  })
})
