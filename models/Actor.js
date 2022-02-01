import _ from "lodash"

export default class Actor {
  // Ability Scores
  strength
  dexterity
  constitution
  intelligence
  wisdom
  charisma

  // Ability Modifiers
  strengthModifier
  dexterityModifier
  constitutionModifier
  intelligenceModifier
  wisdomModifier
  charismaModifier

  // Other
  armorClass
  hitPoints
  initiative

  constructor (props) {
    for (const key in props) {
      this[_.camelCase(key)] = props[key]
    }

    this.strengthModifier = this.convertAbilityToModifier(this.strength)
    this.dexterityModifier = this.convertAbilityToModifier(this.dexterity)
    this.constitutionModifier = this.convertAbilityToModifier(this.constitution)
    this.intelligenceModifier = this.convertAbilityToModifier(this.intelligence)
    this.wisdomModifier = this.convertAbilityToModifier(this.wisdom)
    this.charismaModifier = this.convertAbilityToModifier(this.charisma)

    this.rollInitiative()
  }

  convertAbilityToModifier (ability) {
    if (!Number.isInteger(ability)) throw new TypeError('"ability" argument must be an integer')

    if (ability <= 1) return -5
    if (ability >= 30) return '+10'

    const modifier = Math.floor(ability / 2) - 5

    return modifier >= 0 ? '+' + modifier : modifier
  }

  rollInitiative () {
    this.initiative = _.random(1, 20) + Number.parseInt(this.dexterityModifier)
  }
}
