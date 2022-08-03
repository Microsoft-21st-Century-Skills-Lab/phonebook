import identity from 'lodash/identity.js'
import isEqual from 'lodash/isEqual.js'
import isEmpty from 'lodash/isEmpty.js'
import reduce from 'lodash/reduce.js'
import omit from 'lodash/omit.js'
import { USERS } from '../constants.js'
import toException from '../helpers/toException.js'
import read from './read.js'
import { passwordVerify } from '../helpers/hash.js'
import { tokenGenerate } from '../helpers/token.js'
import maybe from '../helpers/maybe.js'

/**
 * login
 * authenticates phonebook user and issues object containing JWT
 *
 * @param string email
 * @param string password
 * @returns object
 */
const login = toException(
  async (email, password) => {
    if (isEmpty(email) || isEmpty(password)) {
      return {}
    }

    const users = await read(USERS)

    const user = reduce(
      users,
      (acc, entry) => {
        return {
          ...acc,
          ...(isEqual(entry.email, email) ? entry : {}),
        }
      },
      {},
    )

    // generate a token from a non-empty object
    const token = maybe(
      '',
      identity,
      await tokenGenerate(omit(user, ['password'])),
    )

    // if our password checks out, issue a token for the user, otherwise, don't
    return (await passwordVerify(password, user.password))
      ? // check if the token was generated (if it is empty or not)
        !isEmpty(token)
        ? { token }
        : {}
      : // return empty object otherwise
        {}
  },
  () => ({}),
)

export default login
