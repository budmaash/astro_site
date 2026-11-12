/**
 * Cities in-person students come from, on both sides of the state line.
 *
 * The ACT and SAT Service schema use this list for areaServed. The "In person
 * in Kansas City" copy on /act-tutoring and /sat-tutoring names the same
 * cities, so update both together, and match the service area on the Google
 * Business Profile.
 */

export type ServiceArea = { city: string; state: 'Kansas' | 'Missouri' };

export const inPersonAreas: ServiceArea[] = [
  { city: 'Overland Park', state: 'Kansas' },
  { city: 'Leawood', state: 'Kansas' },
  { city: 'Olathe', state: 'Kansas' },
  { city: 'Prairie Village', state: 'Kansas' },
  { city: 'Kansas City', state: 'Missouri' },
];
