/**
 * Introduce an artifical delay. Useful for debugging & trying things out.
 * @param ms Milliseconds to wait (default 5000)
 */
export const delay = (ms: number = 5000) => {
  console.warn(`Introducing artifical delay of ${ms} ms`);
  return new Promise((res) => setTimeout(res, ms));
};
