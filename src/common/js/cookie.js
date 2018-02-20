export function setCookie (name, value, expire = 1000 * 60 * 60 * 24 * 30) {
  // 设置cookie，默认有效时间为30天
  let date = new Date()
  date.setTime(date.getTime() + expire)
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date.toUTCString()
}

export function getCookie (name) {
  // 获取cookie
  let start = document.cookie.indexOf(name + '=')
  if (!(start === -1)) {
    start = start + 1 + name.length
    let end = document.cookie.indexOf(';', start)
    if (!(end === -1)) {
      return decodeURIComponent(document.cookie.slice(start, end))
    } else {
      return decodeURIComponent(document.cookie.slice(start, 0))
    }
  }
}

export function deletCookie (name) {
  let value = getCookie(name)
  console.log(value)
  console.log(name)
  setCookie(name, value, -1)
}
