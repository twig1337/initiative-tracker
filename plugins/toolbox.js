const convertAbilityToModifier = function (ability) {
  if (!Number.isInteger(ability)) throw new TypeError('"ability" argument must be an integer')

  if (ability <= 1) return -5
  if (ability >= 30) return '+10'

  const modifier = Math.floor(ability / 2) - 5;

  return modifier >= 0 ? '+' + modifier : modifier;
}

export default (ctx, inject) => {
  inject('toolbox', {
    convertAbilityToModifier
  })
}
