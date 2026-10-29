/**
 * ACT national ranks (percentiles) by score, from ACT, Inc.'s "ACT Score
 * National Ranks" table. These are the "US Rank" values printed on score
 * reports from September 2026 through August 2027, based on ACT-tested high
 * school graduates of 2024, 2025 and 2026. Replace the rows when ACT
 * publishes the next year's table.
 */

export const actPercentilesSource = {
  reportingYear: '2026–2027',
  graduatingClasses: '2024, 2025 and 2026',
};

export const actPercentileColumns = ['composite', 'english', 'math', 'reading', 'science', 'stem'] as const;

export type ActPercentileRow = {
  score: number;
  composite: number;
  english: number;
  math: number;
  reading: number;
  science: number;
  stem: number;
};

// [score, English, Math, Reading, Science, Composite, STEM], in the PDF's column order.
const rows: Array<[number, number, number, number, number, number, number]> = [
  [36, 100, 100, 100, 100, 100, 100],
  [35, 99, 99, 98, 99, 99, 99],
  [34, 97, 99, 97, 99, 99, 99],
  [33, 96, 98, 95, 98, 98, 98],
  [32, 95, 97, 93, 97, 97, 97],
  [31, 94, 96, 91, 96, 96, 96],
  [30, 93, 95, 89, 95, 94, 95],
  [29, 92, 94, 87, 93, 93, 94],
  [28, 90, 93, 85, 92, 91, 92],
  [27, 88, 91, 83, 91, 89, 90],
  [26, 87, 88, 81, 89, 86, 88],
  [25, 84, 84, 78, 86, 83, 85],
  [24, 81, 81, 75, 82, 80, 81],
  [23, 77, 77, 71, 77, 77, 77],
  [22, 74, 74, 66, 70, 72, 73],
  [21, 70, 71, 61, 65, 68, 69],
  [20, 64, 68, 56, 60, 63, 64],
  [19, 58, 64, 51, 54, 58, 58],
  [18, 54, 60, 47, 48, 52, 52],
  [17, 50, 53, 42, 41, 47, 45],
  [16, 46, 45, 37, 34, 41, 36],
  [15, 41, 33, 33, 27, 34, 27],
  [14, 34, 21, 28, 19, 28, 17],
  [13, 28, 11, 22, 14, 20, 10],
  [12, 23, 6, 16, 10, 13, 5],
  [11, 18, 3, 10, 6, 6, 2],
  [10, 11, 2, 5, 3, 2, 1],
  [9, 6, 1, 2, 2, 1, 1],
  [8, 3, 1, 1, 1, 1, 1],
  [7, 2, 1, 1, 1, 1, 1],
  [6, 1, 1, 1, 1, 1, 1],
  [5, 1, 1, 1, 1, 1, 1],
  [4, 1, 1, 1, 1, 1, 1],
  [3, 1, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export const actPercentiles: ActPercentileRow[] = rows.map(
  ([score, english, math, reading, science, composite, stem]) => ({
    score,
    composite,
    english,
    math,
    reading,
    science,
    stem,
  }),
);

/** Average score in each column. */
export const actPercentileMeans: Record<(typeof actPercentileColumns)[number], string> = {
  composite: '19.1',
  english: '18.4',
  math: '19.0',
  reading: '20.0',
  science: '19.5',
  stem: '19.5',
};

/**
 * Example schools for each ACT score range, shown under the percentile table.
 * Where a range mixes public and private schools, two of each.
 */
export const actSchoolExamples: Array<{ range: string; schools: Array<[name: string, place: string]> }> = [
  {
    range: '21–25',
    schools: [
      ['University of Kansas', 'Lawrence, KS'],
      ['University of Missouri', 'Columbia, MO'],
      ['DePaul University', 'Chicago, IL'],
      ['High Point University', 'High Point, NC'],
    ],
  },
  {
    range: '26–30',
    schools: [
      ['Florida State University', 'Tallahassee, FL'],
      ['Auburn University', 'Auburn, AL'],
      ['Baylor University', 'Waco, TX'],
      ['Gonzaga University', 'Spokane, WA'],
    ],
  },
  {
    range: '31–33',
    schools: [
      ['University of Illinois Urbana-Champaign', 'Champaign, IL'],
      ['William & Mary', 'Williamsburg, VA'],
      ['Boston University', 'Boston, MA'],
      ['Wake Forest University', 'Winston-Salem, NC'],
    ],
  },
  {
    range: '33+',
    schools: [
      ['Washington University in St. Louis', 'St. Louis, MO'],
      ['Yale University', 'New Haven, CT'],
      ['Princeton University', 'Princeton, NJ'],
      ['Massachusetts Institute of Technology (MIT)', 'Cambridge, MA'],
    ],
  },
];
