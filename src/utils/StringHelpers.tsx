export const wordWrap = (str: string, maxWidth: number) => {
  var newLineStr = '\n'
  let res = ''
  while (str.length > maxWidth) {
    let found = false
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        res = res + [str.slice(0, i), newLineStr].join('')
        str = str.slice(i + 1)
        found = true
        break
      }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
      res += [str.slice(0, maxWidth), newLineStr].join('')
      str = str.slice(maxWidth)
    }
  }

  return res + str
}

function testWhite(x: string) {
  var white = new RegExp(/^\s$/)
  return white.test(x.charAt(0))
}

export function rgba2hex(rgba: any) {
  if (rgba.includes('#')) return rgba
  rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
  return rgba && rgba.length === 4
    ? '#' +
        ('0' + parseInt(rgba[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgba[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgba[3], 10).toString(16)).slice(-2)
    : ''
}
