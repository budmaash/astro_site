/**
 * National ACT test dates and registration deadlines, from ACT:
 * https://www.act.org/content/act/en/products-and-services/the-act/registration.html
 *
 * Used by /act-test-information (full table) and /act-tutoring (next date).
 * Dates already past at build time drop off, so add the next season's dates
 * as ACT publishes them.
 */

export type ActTestDate = [test: string, regular: string, late: string];

export const actTestDates: ActTestDate[] = [
  ['2026-12-12', '2026-11-06', '2026-11-29'],
  ['2027-02-27', '2027-01-22', '2027-02-09'],
  ['2027-04-10', '2027-03-05', '2027-03-23'],
  ['2027-06-12', '2027-05-07', '2027-05-25'],
  ['2027-07-10', '2027-06-04', '2027-06-22'],
];

const today = () => new Date().toISOString().slice(0, 10);

/** Test dates on or after today, as of the build. */
export function upcomingActDates(): ActTestDate[] {
  const now = today();
  return actTestDates.filter(([test]) => test >= now);
}

/**
 * The next test date and the deadline still open for it: the regular
 * deadline until it passes, then the late one. Null if every date has passed
 * or both deadlines for the next date have closed.
 */
export function nextActDate(): { test: string; deadline: string; late: boolean } | null {
  const now = today();
  const next = upcomingActDates()[0];
  if (!next) return null;
  const [test, regular, late] = next;
  if (regular >= now) return { test, deadline: regular, late: false };
  if (late >= now) return { test, deadline: late, late: true };
  return null;
}

/** "Dec 12" or "Dec 12, 2026". */
export const shortDate = (iso: string, withYear = false) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(withYear && { year: 'numeric' }),
  });

/** "December 12". */
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
