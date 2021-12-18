export const declOfNum = (count: number, titles: [string, string, string]) => {
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][count % 10 < 5 ? count % 10 : 5]
  ]
}
