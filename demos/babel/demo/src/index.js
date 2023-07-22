/*
 * @Author         : yum
 * @Date           : 2020-11-17 23:40:33
 * @LastEditors    : yum
 * @LastEditTime   : 2020-11-18 00:32:24
 * @Description    :
 */

export const sayHi = (name) => {
  if (name) {
    return `hi, ${name}`;
  } else {
    return 'hi, stranger'
  }
}
