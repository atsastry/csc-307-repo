import mut from './module.js' // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// test cases for div 
test('Testing div -- two positive numbers', () => {
  const expected = 5;
  const got = mut.div(30, 6);
  expect(got).toBe(expected);
});

test('Testing div -- neg / pos', () => {
  const expected = -2;
  const got = mut.div(-6, 3);
  expect(got).toBe(expected);
});

test('divides zero by a num', () => {
  const expected = Infinity;
  const got = mut.div(70, 0);
  expect(got).toBe(expected);
});

// test cases for containsNumbers
test('detects numbers in a mixed string', () => {
  expect(mut.containsNumbers("hello13579april")).toBe(true);
});

test('returns false when there are no numbers', () => {
  expect(mut.containsNumbers("hello professor zeilke!!")).toBe(false);
});

test('can detect a single digit in a text string', () => {
  expect(mut.containsNumbers("abcd4ef")).toBe(true);
});

test('detects number at the start of the string', () => {
  expect(mut.containsNumbers("1gargle")).toBe(true);
});

test('detects number at the end of the string', () => {
  expect(mut.containsNumbers("donkle1")).toBe(true);
});

test('returns false for empty string', () => {
  expect(mut.containsNumbers("")).toBe(false);
});

test('returns false for whitespace only', () => {
  expect(mut.containsNumbers("   ")).toBe(false);
});

