import freemailData from './freemail.json';

export default function isFreeEmail(email) {
  const domain = email.split('@')[1];
  if (!domain) return false;

  const firstCharRegex = freemailData[domain[0]];
  const splatRegex = freemailData['*'];

  // Check email against first char regexes if they exist:
  if (firstCharRegex) {
    for (const r of firstCharRegex) {
      const regex = new RegExp(r);
      if (regex.test(domain)) return true;
    }
  }

  // Check email against splat regexes:
  for (const r of splatRegex) {
    const regex = new RegExp(r);
    if (regex.test(domain)) return true;
  }

  // No matches, so not a free email.
  return false;
}
