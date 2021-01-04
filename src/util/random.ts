/**
 * Returns a random integer from in the range [`lower`, `upper`].
 *
 * @param lower lower bound (inclusive)
 * @param upper upper bound (inclusive)
 * @returns a random integer in the ranga [`lower`, `upper`]
 */
const random = (lower: number, upper: number) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export default random;
