export const mixColors = (hex1, hex2, weight2 = 0.5) => {
  if (weight2 <= 0) return hex1
  if (weight2 >= 1) return hex2
  let weight1 = 1 - weight2
  let int1 = parseInt(hex1.slice(1, 7), 16)
  let int2 = parseInt(hex2.slice(1, 7), 16)
  let int =
    (((int1 & 0xff0000) * weight1 + (int2 & 0xff0000) * weight2) & 0xff0000) |
    (((int1 & 0x00ff00) * weight1 + (int2 & 0x00ff00) * weight2) & 0x00ff00) |
    (((int1 & 0x0000ff) * weight1 + (int2 & 0x0000ff) * weight2) & 0x0000ff)
  return '#' + int.toString(16).padStart(6, '0')
}


export const inOrOut = (x, y, w, h, mPos) => {
  //c.rect(x, y, w, h, 0, null, colors.red)
  return mPos.x >= x && mPos.x < x + w && mPos.y >= y && mPos.y < y + h
}
