import {expect, test} from 'vitest';
import isFreeEmail from './email';

const cases = [
  ['liam@acme.co', false],
  ['liam@gmail.com', true],
  ['liam@hotmail.ca', true],
  ['liam@onmicrosoft.com', false], // Missing splat portion of regex so is not free email.
  ['liam@a.onmicrosoft.com', true], // Matches splat regex, so is free email.
  ['liam@-.onmicrosoft.com', true], // Skip first char, matches splat, so is free email.
];

test.each(cases)(
  'expect `isFreeEmail(%j)` to be %j',
  (email, expectedValue) => {
    expect(isFreeEmail(email)).toBe(expectedValue);
  },
);
