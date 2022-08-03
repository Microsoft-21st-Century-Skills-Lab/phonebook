import isNull from 'lodash/isNull.js'

/**
 * toException
 * custom try/catch error handler for async/await strategies
 *
 * @param function f
 * @param {(function|null)} handler
 * @returns *
 */
const toException =
  (f, handler = null) =>
  async (...args) => {
    try {
      return await f(...args)
    } catch (e) {
      return isNull(handler) ? e : handler(e)
    }
  }

export default toException
