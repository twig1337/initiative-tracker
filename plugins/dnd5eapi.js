import createHandler from '~/apis/dnd5eapi'

export default (ctx, inject) => {
  const initializedHandler = createHandler(ctx.$axios)

  inject('monsters', initializedHandler('monsters'))
  inject('spells', initializedHandler('spells'))
}
