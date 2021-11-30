/**
 * @param {*} n 
 * @returns 
 * @description 时间格式化
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatWeek = week => {
  return parseInt(week.toString()) || 7
}

export function formatTime (date, joinSymbol = '/') {
  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())
  const week = formatWeek(date.getDay())
  const hour = formatNumber(date.getHours())
  const minute = formatNumber(date.getMinutes())
  const second = formatNumber(date.getSeconds())
  return {
    result: [year, month, day].map(formatNumber).join(joinSymbol) + ' ' + [hour, minute, second].map(formatNumber).join(':'),
    date: [year, month, day].map(formatNumber).join(joinSymbol),
    chinaDate: `${year}年${month}月${day}日`,
    clock: [hour, minute, second].map(formatNumber).join(':'),
    year,
    month,
    week,
    day,
    hour,
    minute,
    second
  }
}
