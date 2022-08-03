import Maybe from 'maybe'
import jwt from 'jsonwebtoken'
import toException from './toException.js'
import { JWT_SECRET } from '../constants.js'

/**
 * tokenGenerate
 * subsumes payload in JWT
 *
 * @param object payload
 * @returns string
 */
export const tokenGenerate = toException(
  async (payload) => {
    const token = await Promise.resolve(jwt.sign(payload, JWT_SECRET))

    return Maybe(() => token)
  },
  () => Maybe(() => null),
)

/**
 * tokenDecode
 * decodes app-issued JWT
 *
 * @param string token
 * @returns object
 */
export const tokenDecode = toException(
  async (token) => await Promise.resolve(jwt.verify(token, JWT_SECRET)),
  () => ({}),
)
