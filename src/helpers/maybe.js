/**
 * maybe
 * performs case analysis on Maybe monad
 * - returns the value in the Just object if there is something
 * - returns a default value if there is Nothing
 *
 * @param {*} def
 * @param function f
 * @param Maybe m
 * @returns *
 */
const maybe = (def, f, m) => (m.isJust() ? f(m.value()) : def)

export default maybe
