import { API } from 'aws-amplify'
import * as Queries from '@/src/graphql/queries'
import * as Mutations from '@/src/graphql/mutations'

export default entity => {
  const createQuery = Mutations[`create${entity}`]
  const deleteQuery = Mutations[`delete${entity}`]
  const getQuery = Queries[`get${entity}`]
  const listQuery = Queries[`list${entity}s`]
  const updateQuery = Mutations[`update${entity}`]

  return ({
    async create (attrs) {
      return (await API.graphql({
        query: createQuery,
        variables: { input: { ...attrs } }
      })).data[`create${entity}`]
    },

    async delete (id) {
      return (await API.graphql({
        query: deleteQuery,
        variables: { input: { id } }
      })).data[`delete${entity}`]
    },

    async get (id) {
      return (await API.graphql({
        query: getQuery,
        variables: { id }
      })).data[`get${entity}`]
    },

    async list () {
      return (await API.graphql({
        query: listQuery
      })).data[`list${entity}s`].items
    },

    async update (id, attrs) {
      return (await API.graphql({
        query: updateQuery,
        variables: { input: { id, ...attrs } }
      })).data[`update${entity}`]
    },
  })
}
