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
export default function isFreeEmail(email: string): boolean;
