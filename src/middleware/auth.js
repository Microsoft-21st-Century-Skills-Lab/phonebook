import isUndefined from 'lodash/isUndefined.js'
import isEqual from 'lodash/isEqual.js'
import isEmpty from 'lodash/isEmpty.js'
import { tokenDecode } from '../helpers/token.js'

/**
 * _401
 * returns 401 response error
 *
 * @param object res
 * @returns object
 */
const _401 = (res) => {
  res.statusCode = 401
  res.json({ message: 'You are not allowed to access this content' })

  return res
}

/**
 * auth
 * auth middleware for phonebook
 *
 * @param object req
 * @param object res
 * @param function next
 * @returns object
 */
const auth = async (req, res, next) => {
  const path = req.path

  // exempt /signup and /login from any token checks
  if (isEqual(path, '/signup') || isEqual(path, '/login')) {
    return next()
  }

  // -H 'authorization: <my-token>' || /contacts?token=<my-token>
  // extract our token from either an authorization header or a querystring
  const token = req.header('authorization') || req.query.token

  // if there is no token at all, return a 401
  if (isUndefined(token) || isEmpty(token)) {
    return _401(res)
  }

  // get our payload from the token
  const payload = await tokenDecode(token)

  // check if there is an email in the token
  // perform more payload-related checks here
  if (isUndefined(payload.email)) {
    return _401(res)
  }

  // tell express to function as it normally does
  next()
}

export default auth
