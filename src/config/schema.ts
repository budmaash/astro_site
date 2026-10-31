/**
 * Schema.org structured data.
 *
 * The Organization and WebSite nodes are emitted on every page by
 * SquarespaceShellLayout, so page-specific nodes can reference the business
 * by @id instead of repeating it. Pages add their own nodes by passing
 * `schema` to createShellConfig().
 *
 * Deliberate omissions:
 *  - No PostalAddress. This is a service-area business with no public
 *    address anywhere on the site, so areaServed carries the geography.
 *    Do not add a street address unless a real business address exists.
 *  - No sameAs. No social or business profile links exist on the site yet.
 *    Add real, verified profile URLs here once a Google Business Profile
 *    or social account is live -- an empty sameAs is worse than none.
 *  - No AggregateRating or Review. There are no reviews on the site, and
 *    inventing them is both a policy violation and a manual-action risk.
 *  - No FAQPage on /faq. Google retired FAQ rich results for all sites on
 *    2026-05-07, so there is no SERP feature to win, and there is no
 *    confirmed AI-citation benefit. The page is standard marketing FAQ
 *    copy rather than genuine user Q&A, so QAPage does not fit either.
 *  - No Course on /act or /sat. Those pages are exam reference material,
 *    not enrollable courses with instances, instructors and durations.
 *    Service describes what is actually offered without overclaiming.
 */

import type { Resource } from '../data/resources';
import { vimeoEmbedUrl, type VideoLesson } from '../data/videoLessons';

/** Canonical origin. Bare domain: www 301-redirects here. */
export const SITE_URL = 'https://hasantutoring.com';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/about#person`;

export type SchemaNode = Record<string, unknown>;

const BUSINESS_NAME = 'Hasan Tutoring';
const EMAIL = 'Majid@HasanTutoring.com';
const TELEPHONE = '+1-913-210-0611';

/** Where tutoring is actually offered, per /contact. */
const AREA_SERVED: SchemaNode[] = [
  { '@type': 'City', name: 'Overland Park', containedInPlace: { '@type': 'State', name: 'Kansas' } },
  { '@type': 'AdministrativeArea', name: 'Kansas City metropolitan area' },
  { '@type': 'Place', name: 'Online (worldwide)' },
];

export const organizationNode: SchemaNode = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: BUSINESS_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/sqs-shell/logo_2.webp`,
  image: `${SITE_URL}/sqs-shell/logo_2.webp`,
  description:
    'Personalized ACT and SAT tutoring in the Kansas City area and online, with practical strategies tailored to each student.',
  email: EMAIL,
  telephone: TELEPHONE,
  // Typed stub rather than a bare @id reference, so every page's graph is
  // self-describing. /about declares the full Person under the same @id;
  // consumers merge nodes that share an @id.
  founder: { '@type': 'Person', '@id': PERSON_ID, name: 'Majid Hasan' },
  areaServed: AREA_SERVED,
};

export const websiteNode: SchemaNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: BUSINESS_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
};

/** Majid Hasan. Credentials below are stated on /about. */
export const personNode: SchemaNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Majid Hasan',
  url: `${SITE_URL}/about`,
  jobTitle: 'ACT & SAT Tutor',
  email: EMAIL,
  telephone: TELEPHONE,
  worksFor: { '@id': ORG_ID },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Kansas School of Law' },
  knowsAbout: ['ACT test preparation', 'SAT test preparation', 'Standardized test tutoring'],
};

/** A tutoring service offering. */
function serviceNode(serviceType: string, name: string, path: string): SchemaNode {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    serviceType,
    name,
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
  };
}

// Used by src/archive/tutoring.astro; /tutoring is not currently published.
export const tutoringServiceNode = serviceNode(
  'ACT and SAT test preparation tutoring',
  'One-on-one ACT & SAT tutoring',
  '/tutoring',
);

export const actServiceNode = serviceNode('ACT test preparation', 'ACT tutoring & test prep', '/act-test-information');
export const satServiceNode = serviceNode('SAT test preparation', 'SAT tutoring & test prep', '/sat-test-information');

export const actGuideNode: SchemaNode = {
  '@type': 'Article',
  '@id': `${SITE_URL}/act-test-information#article`,
  headline: 'ACT Guide: Format, Sections, Scoring & Test Dates',
  url: `${SITE_URL}/act-test-information`,
  description:
    'How the ACT works section by section, with the question types and strategies for English, Math, Reading and Science.',
  about: { '@type': 'Thing', name: 'ACT' },
  publisher: { '@id': ORG_ID },
  author: { '@id': PERSON_ID },
  isAccessibleForFree: true,
  // Shown in the page byline too -- bump dateModified on substantive edits.
  datePublished: '2026-04-08',
  dateModified: '2026-10-30',
};

export const actGuideBreadcrumbNode: SchemaNode = {
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/act-test-information#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'ACT/SAT Info', item: `${SITE_URL}/tests` },
    { '@type': 'ListItem', position: 3, name: 'ACT' },
  ],
};

export const practiceTestsNode: SchemaNode = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/practice-tests#list`,
  name: 'Free ACT & SAT practice tests',
  url: `${SITE_URL}/practice-tests`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'LearningResource',
        name: 'Free ACT practice test',
        url: 'https://app.hasantutoring.com/act-practice-test',
        learningResourceType: 'Practice test',
        educationalLevel: 'High school',
        provider: { '@id': ORG_ID },
        isAccessibleForFree: true,
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'LearningResource',
        name: 'Free digital SAT practice test',
        url: 'https://app.hasantutoring.com/sat-practice-test',
        learningResourceType: 'Practice test',
        educationalLevel: 'High school',
        provider: { '@id': ORG_ID },
        isAccessibleForFree: true,
      },
    },
  ],
};

export const punctuationLessonNode: SchemaNode = {
  '@type': 'LearningResource',
  '@id': `${SITE_URL}/sat-punctuation-guide#lesson`,
  name: 'SAT punctuation guide',
  url: `${SITE_URL}/sat-punctuation-guide`,
  description:
    'A guide to the boundaries questions in SAT Reading and Writing: the punctuation and sentence-boundary rules the SAT tests, with the steps for each question type.',
  learningResourceType: 'Study guide',
  educationalLevel: 'High school',
  about: { '@type': 'Thing', name: 'SAT Reading and Writing: Boundaries' },
  provider: { '@id': ORG_ID },
  author: { '@id': PERSON_ID },
  isAccessibleForFree: true,
  // Shown in the page byline too -- bump dateModified on substantive edits.
  datePublished: '2026-08-19',
  dateModified: '2026-10-21',
};

export const actPunctuationLessonNode: SchemaNode = {
  ...punctuationLessonNode,
  '@id': `${SITE_URL}/act-punctuation-guide#lesson`,
  name: 'ACT punctuation guide',
  url: `${SITE_URL}/act-punctuation-guide`,
  description:
    'A guide to the punctuation and sentence-boundary rules tested on the ACT, with the steps for each question type.',
  about: { '@type': 'Thing', name: 'ACT English punctuation' },
  // Shown in the page byline too -- bump dateModified on substantive edits.
  datePublished: '2026-09-24',
  dateModified: '2026-10-21',
};

export const satVocabularyNode: SchemaNode = {
  '@type': 'LearningResource',
  '@id': `${SITE_URL}/sat-vocabulary#lesson`,
  name: 'SAT vocabulary list',
  url: `${SITE_URL}/sat-vocabulary`,
  description:
    'Every vocabulary word tested so far in SAT Reading and Writing, with short, simple definitions, grouped by difficulty.',
  learningResourceType: 'Vocabulary list',
  educationalLevel: 'High school',
  about: { '@type': 'Thing', name: 'SAT Reading and Writing: Words in Context' },
  provider: { '@id': ORG_ID },
  author: { '@id': PERSON_ID },
  isAccessibleForFree: true,
  encoding: {
    '@type': 'MediaObject',
    contentUrl: `${SITE_URL}/sat-vocabulary-list.pdf`,
    encodingFormat: 'application/pdf',
  },
  // Shown in the page byline too -- bump dateModified when the list changes.
  datePublished: '2026-10-28',
  dateModified: '2026-10-28',
};

export const actPercentilesNode: SchemaNode = {
  '@type': 'Article',
  '@id': `${SITE_URL}/act-score-percentiles#article`,
  headline: 'ACT Score Percentiles: What Your ACT Score Means',
  url: `${SITE_URL}/act-score-percentiles`,
  description:
    'What ACT scores mean as percentile ranks, with the full table of national ranks for every ACT composite and section score.',
  about: { '@type': 'Thing', name: 'ACT score percentiles' },
  publisher: { '@id': ORG_ID },
  author: { '@id': PERSON_ID },
  isAccessibleForFree: true,
  citation: 'ACT Score National Ranks, ACT, Inc., 2026-2027 reporting year',
  // Shown in the page byline too -- bump dateModified when the table changes.
  datePublished: '2026-10-29',
  dateModified: '2026-10-29',
};

export const satPercentilesNode: SchemaNode = {
  '@type': 'Article',
  '@id': `${SITE_URL}/sat-score-percentiles#article`,
  headline: 'SAT Score Percentiles: What Your SAT Score Means',
  url: `${SITE_URL}/sat-score-percentiles`,
  description:
    'What SAT scores mean as percentile ranks, with tables of percentiles for every SAT total score and section score.',
  about: { '@type': 'Thing', name: 'SAT score percentiles' },
  publisher: { '@id': ORG_ID },
  author: { '@id': PERSON_ID },
  isAccessibleForFree: true,
  citation: 'SAT user group percentiles, College Board',
  // Shown in the page byline too -- bump dateModified when the tables change.
  datePublished: '2026-10-29',
  dateModified: '2026-10-29',
};

export const contactPageNode: SchemaNode = {
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#page`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Hasan Tutoring',
  about: { '@id': ORG_ID },
  mainEntity: { '@id': ORG_ID },
};

/** ISO 8601 duration for VideoObject, e.g. 294 -> 'PT4M54S'. */
const isoDuration = (seconds: number) => `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;

type VideoHub = { name: string; path: string };

/**
 * One video's own page: a VideoObject (the page's main content) plus a
 * breadcrumb back to its hub. Each video has exactly one watch page.
 */
export function videoPageNodes(video: VideoLesson, hub: VideoHub): SchemaNode[] {
  const url = `${SITE_URL}${video.path}`;
  return [
    {
      '@type': 'VideoObject',
      '@id': `${url}#video`,
      name: video.pageTitle.replace(/ \| Hasan Tutoring$/, ''),
      description: video.metaDescription,
      thumbnailUrl: video.thumbnail,
      uploadDate: video.uploadDate,
      duration: isoDuration(video.seconds),
      embedUrl: vimeoEmbedUrl(video),
      url,
      inLanguage: 'en',
      educationalLevel: 'High school',
      learningResourceType: video.section === 'question' ? 'Question explanation' : 'Video lesson',
      isAccessibleForFree: true,
      publisher: { '@id': ORG_ID },
      creator: { '@id': PERSON_ID },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Resources', item: `${SITE_URL}/resources` },
        { '@type': 'ListItem', position: 2, name: hub.name, item: `${SITE_URL}${hub.path}` },
        { '@type': 'ListItem', position: 3, name: video.title },
      ],
    },
  ];
}

/** A video hub page: an ItemList pointing at every video's own page. */
export function videoHubNode(hub: VideoHub, videos: VideoLesson[]): SchemaNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}${hub.path}#list`,
    name: hub.name,
    url: `${SITE_URL}${hub.path}`,
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${video.path}`,
    })),
  };
}

/** /resources: a CollectionPage whose ItemList points at every resource in the library. */
export function resourcesPageNodes(resources: Resource[]): SchemaNode[] {
  const url = `${SITE_URL}/resources`;
  return [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#page`,
      url,
      name: 'Free ACT & SAT Resources',
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      mainEntity: { '@id': `${url}#list` },
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#list`,
      name: 'Free ACT & SAT test prep resources',
      numberOfItems: resources.length,
      itemListElement: resources.map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: resource.title,
        url: new URL(resource.href, SITE_URL).href,
      })),
    },
  ];
}

/** Build the JSON-LD @graph for a page. */
export function buildGraph(pageNodes: SchemaNode[] = []): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organizationNode, websiteNode, ...pageNodes],
  });
}
