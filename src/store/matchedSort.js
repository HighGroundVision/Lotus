
export function matchedSort(roster) {
  const rad = roster.filter((x) => x.team == 1)
  const wrOrderRad = rad
    .map((a, i) => ({ originalPosition: i, winrate: a.hero?.win_rate }))
    .sort((lhs, rhs) => lhs.winrate - rhs.winrate)
    .map((a, i) => ({ originalPosition: a.originalPosition, winrate: a.winrate, wrOrder: i }))
    .sort((lhs, rhs) => lhs.originalPosition - rhs.originalPosition)
  const wrOrderDire = roster.filter((x) => x.team == 2).sort((lhs, rhs) => lhs.hero?.win_rate - rhs.hero?.win_rate)
  const dire = wrOrderRad.map((x) => wrOrderDire[x.wrOrder])
  return [...rad, ...dire, ...roster.filter((x) => x.team == 3)]
}
