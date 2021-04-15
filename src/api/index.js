import { request, service } from './service'
import { assign, map } from 'lodash'

const files = require.context('./modules', true, /\.api\.js$/)
const generators = files.keys().map(key => files(key).default)

export default assign({}, ...map(generators, generator => generator({
    request,
    service
})))

// const files = require.context('./modules', false, /\.js$/)
// const apiGenerators = files.keys().map(key => files(key).default)
// let api = {}
// apiGenerators.forEach(generator => {
//     const apiInstance = generator({request})
//     for (const apiName in apiInstance) {
//         if (Object.prototype.hasOwnProperty.call(apiInstance, apiName)) {
//             api[apiName] = apiInstance[apiName]
//         }
//     }
// })
