// @ts-check
import freemailData from '../data/freemail.json';

/**
 * Check if an email address matches a free email provider.
 *
 * @remarks
 * You should ensure that the email address is valid before calling this
 * function, as an invalid email will likely result in the function returning
 * false incorrectly.
 *
 * @param email {string} - The email address to check.
 * @returns True if email is issued from a free email provider.
 *
 * @public
 */
export default function isFreeEmail(email) {
  const domain = email.split('@')[1];
  if (!domain) return false;

  const firstCharRegex = freemailData[domain[0]];

  // Check email against first char regexes if they exist:
  if (firstCharRegex) {
    for (const r of firstCharRegex) {
      const regex = new RegExp(r);
      if (regex.test(domain)) return true;
    }
  }

  const splatRegex = freemailData['*'];

  // Check email against splat regexes:
  for (const r of splatRegex) {
    const regex = new RegExp(r);
    if (regex.test(domain)) return true;
  }

  // No matches, so not a free email.
  return false;
}
