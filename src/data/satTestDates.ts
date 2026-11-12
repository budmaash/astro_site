/**
 * National SAT test dates and registration deadlines, from College Board:
 * https://satsuite.collegeboard.org/sat/dates-deadlines
 *
 * Used by /sat-test-information (full table), /start and /sat-tutoring (next date).
 * Dates already past at build time drop off, so add the next season's dates
 * as College Board publishes them.
 */

export type SatTestDate = [test: string, regular: string, late: string];

export const satTestDates: SatTestDate[] = [
  ['2026-12-05', '2026-11-20', '2026-11-24'],
  ['2027-03-06', '2027-02-19', '2027-02-23'],
  ['2027-05-01', '2027-04-16', '2027-04-20'],
  ['2027-06-05', '2027-05-21', '2027-05-25'],
];

/** Test dates on or after today, as of the build. */
export function upcomingSatDates(): SatTestDate[] {
  const now = new Date().toISOString().slice(0, 10);
  return satTestDates.filter(([test]) => test >= now);
}

/**
 * The next test date and the deadline still open for it: the regular
 * deadline until it passes, then the late one. Null if every date has passed
 * or both deadlines for the next date have closed.
 */
export function nextSatDate(): { test: string; deadline: string; late: boolean } | null {
  const now = new Date().toISOString().slice(0, 10);
  const next = upcomingSatDates()[0];
  if (!next) return null;
  const [test, regular, late] = next;
  if (regular >= now) return { test, deadline: regular, late: false };
  if (late >= now) return { test, deadline: late, late: true };
  return null;
}
