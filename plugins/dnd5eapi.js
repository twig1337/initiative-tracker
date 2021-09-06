const url = 'https://www.dnd5eapi.co/api';

const createHandler = $axios => resource => ({
  search (query) {
    if (!Array.isArray(query)) {
      throw new TypeError('query must be an array')
    }

    const path = `${url}/${resource}`;

    if (!query.length) {
      return $axios.$get(path)
    }

    return $axios.$get(path + '?' + query.map(param => `${param.key}=` + encodeURIComponent(param.value)).join('&'))
  },

  get (id) {
    return $axios.$get(`${url}/${resource}/${id}`)
  }
})

export default (ctx, inject) => {
  const initializedHandler = createHandler(ctx.$axios)

  inject('monsters', initializedHandler('monsters'))
  inject('spells', initializedHandler('spells'))
}
