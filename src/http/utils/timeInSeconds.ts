export const yearInSeconds = (year: number) => {
  return monthInSeconds(12 * year)
}

export const monthInSeconds = (month: number) => {
  return weeksInSeconds(30 * month)
}

export const weeksInSeconds = (weeks: number) => {
  return dayInSeconds(7 * weeks)
}

export const dayInSeconds = (days: number) => {
  return hoursInSeconds(24 * days)
}

export const hoursInSeconds = (hours: number) => {
  return minutsInSeconds(60 * hours)
}

export const minutsInSeconds = (minuts: number) => {
  const seconds = 60 * minuts

  return seconds
}
