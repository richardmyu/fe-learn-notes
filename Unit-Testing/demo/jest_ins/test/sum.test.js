const sum = require('../index');

// .toBe 简单匹配器
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('add 1 + 2 not to equal 4', () => {
  expect(sum(1, 2)).not.toBe(4);
})

test('object assignment', () => {
  const data = { 'one': 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 })
});

// truthiness

test('test null', () => {
  const n = null;
  // 只匹配 null
  expect(n).toBeNull();
  // 与 toBeUndefined 相反
  expect(n).toBeDefined();
  // 只匹配 undefined
  expect(n).not.toBeUndefined();
  // 任何 truthy
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
})

test('test zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
})

// number

test('number', () => {
  const val = 2 + 2;
  // >
  expect(val).toBeGreaterThan(3);
  // >=
  expect(val).toBeGreaterThanOrEqual(3.5);
  // <
  expect(val).toBeLessThan(5);
  // <=
  expect(val).toBeLessThanOrEqual(4.5);
});

test('number-float', () => {
  const val = 0.1 + 0.2;
  expect(val).not.toBe(0.3);
  expect(val).toBeCloseTo(0.3);
});

// string
test('there is no i in team', () => {
  expect('team').not.toMatch(/I/);
});
test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
})

// array and iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk'
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

