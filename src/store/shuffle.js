export function shuffleArray(array) {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function matchedSort(roster) {
  const rad = roster.filter((a) => a.team == 1)
  const wrOrderRad = rad
    .map((a, i) => ({ id: i, winrate: a.hero?.win_rate }))
    .sort((lhs, rhs) => lhs.winrate - rhs.winrate)
    .map((a, i) => ({ id: a.id, winrate: a.winrate, wrOrder: i }))
    .sort((lhs, rhs) => lhs.id - rhs.id)
  const wrOrderDire = roster.filter((a) => a.team == 2).sort((lhs, rhs) => lhs.hero?.win_rate - rhs.hero?.win_rate)
  const dire = wrOrderRad.map((a) => wrOrderDire[a.wrOrder])
  return [...rad, ...dire, ...roster.filter((a) => a.team == 3)]
}

export function balanceByWinrate(roster, byAttribute, byAttackCapability) {
  const rad = roster.filter((a) => a.team == 1)
  const dire = roster.filter((a) => a.team == 2)
  const combs = [0, 1, 2, 3, 4].map((a) => [rad[a], dire[a]])
  var balancedRosterPairs = combinator(combs, [...roster.filter((a) => a.team == 3)], byAttribute, byAttackCapability).roster
  var nonReserve = [
    ...balancedRosterPairs.map((a) => {
      a[0].team = 1
      return a[0]
    }),
    ...balancedRosterPairs.map((a) => {
      a[1].team = 2
      return a[1]
    }),
  ]

  var reserve = roster.filter((a) => nonReserve.map((r) => r.hero.id).indexOf(a.hero.id) < 0)
  reserve.forEach((a) => (a.team = 3))
  var newRoster = [...nonReserve, ...reserve]

  return newRoster
}

function combinator(list, adds, byAttribute, byAttackCapability, n = 0,used = [], current = [], best = { roster: [], min: 1000 } ) {
  if (n === list.length) {
    const draftBalanceRating = getDraftBalanceRating(current, byAttribute, byAttackCapability)
    if (draftBalanceRating < best.min) {
      best.roster = current
      best.min = draftBalanceRating
    }
  } else {
    var vals = [...list[n], ...adds.filter((a) => !used[a.hero.id])]
    var addCombinations = vals.flatMap((a) => vals.filter((b) => a != b).map((b) => [a, b]))
    addCombinations.forEach((item) => {
      var newUsed = [...used]
      newUsed[item[0].hero.id] = 1
      newUsed[item[1].hero.id] = 1
      combinator(list, adds, byAttribute, byAttackCapability, n + 1, newUsed, [...current, item], best)
    })
  }

  return best
}

function getDraftBalanceRating(roster, byAttribute, byAttackCapability) {
  const radiantWin = roster.reduce((c, a) => c + a[0].hero.win_rate, 0)
  const direAttr = [...new Set(roster.map(x => x[1].hero.primary_attribute))]
  const radAttr = [...new Set(roster.map(x => x[0].hero.primary_attribute))]
  const direTypes = [...new Set(roster.map(x => x[1].hero.attack_capabilities))]
  const radTypes = [...new Set(roster.map(x => x[0].hero.attack_capabilities))]
  const direWin = roster.reduce((c, a) => c + a[1].hero.win_rate, 0)
  const modifiers =
    (byAttribute ? 
      Math.abs(direAttr
        .filter(x => !radAttr.includes(x))
        .concat(radAttr.filter(x => !direAttr.includes(x))).length) * 0.1 : 0) + 
    (byAttackCapability ? 
      Math.abs(direTypes
        .filter(x => !radTypes.includes(x))
        .concat(radTypes.filter(x => !direTypes.includes(x))).length) * 0.3 : 0)

  return Math.abs(radiantWin - direWin) + modifiers
}
