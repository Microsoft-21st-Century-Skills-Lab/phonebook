import { PHONEBOOK } from '../constants.js'
import toException from '../helpers/toException.js'
import read from './read.js'

/**
 * contacts
 * retrieves all contacts in contacts registry file
 *
 * @returns object
 */
const contacts = toException(
  async () => await read(PHONEBOOK),
  () => [],
)

export default contacts
