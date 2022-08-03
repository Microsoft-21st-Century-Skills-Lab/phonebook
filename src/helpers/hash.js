import bcrypt from 'bcrypt'
import Maybe from 'maybe'
import toException from './toException.js'

/**
 * passwordGenerate
 * creates bcrypt hash from password string
 *
 * @param string plaintext
 * @returns string
 */
export const passwordGenerate = toException(
  async (plaintext) => {
    const hash = await bcrypt.hash(plaintext, 10)

    return Maybe(() => hash) // something/just
  },
  () => Maybe(() => null), // nothing
)

/**
 * passwordVerify
 * verifies the validity of bcrypt hash
 *
 * @param string plaintext
 * @param string hash
 * @returns boolean
 */
export const passwordVerify = toException(
  async (plaintext, hash) => await bcrypt.compare(plaintext, hash),
  () => false,
)
