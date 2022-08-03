import isEqual from 'lodash/isEqual.js'
import isEmpty from 'lodash/isEmpty.js'
import reduce from 'lodash/reduce.js'
import { USERS } from '../constants.js'
import toException from '../helpers/toException.js'
import read from './read.js'
import write from './write.js'
import { passwordGenerate } from '../helpers/hash.js'
import maybe from '../helpers/maybe.js'

/**
 * signup
 * appends new user entry to users registry
 *
 * @param string email
 * @param string password
 * @returns boolean
 */
const signup = toException(
  async (email, password) => {
    if (isEmpty(email) || isEmpty(password)) {
      return false
    }
    // get data from users database
    const users = await read(USERS)
    // see if there is an entry for which there exists an email match
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

    const newPassword = maybe('', (x) => x, await passwordGenerate(password))

    // append to and store new object
    return !isEmpty(user)
      ? false
      : isEmpty(newPassword)
      ? false
      : await write(USERS, [...users, ...[{ email, password: newPassword }]])
  },
  () => false,
)

export default signup
