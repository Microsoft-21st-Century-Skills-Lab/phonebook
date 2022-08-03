import fs from 'fs/promises'
import toException from '../helpers/toException.js'

/**
 * read
 * retrieves contents from registry file
 *
 * @param string file
 * @returns object
 */
const read = toException(
  async (file) => {
    const contents = await fs.readFile(file)

    return JSON.parse(contents)
  },
  () => [],
)

export default read
