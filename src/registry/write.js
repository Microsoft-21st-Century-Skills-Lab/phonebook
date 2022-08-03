import fs from 'fs/promises'
import toException from '../helpers/toException.js'

/**
 * write
 * writes JSON data to registry
 *
 * @param string file
 * @param object contents
 * @return boolean
 */
const write = toException(
  async (file, contents) => {
    // will encode all our data as JSON
    await fs.writeFile(file, JSON.stringify(contents))

    return true
  },
  () => false,
)

export default write
