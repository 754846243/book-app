// 存放与验证有关的js

export function cellphoneVer (number) {
  var reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(number)
}
