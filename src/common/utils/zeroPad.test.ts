import zeroPad from './zeroPad';


test('It should pad values with leading zeros to reach specified length', async () => {
    // Assert
  expect(zeroPad(321, 4)).toBe('0321');
  expect(zeroPad(22, 5)).toBe('00022');
  expect(zeroPad(5432, 4)).toBe('5432');
  expect(zeroPad(65432, 3)).toBe('65432');
})