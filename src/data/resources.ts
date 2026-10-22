import actPunctuationPreview from '../assets/lessons/act-punctuation/P6_2.png';
import satPunctuationPreview from '../assets/lessons/sat-punctuation/P10.png';
import satTest8MathPreview from '../assets/resources/sat-test-8-math-preview.png';
import actTest2MathPreview from '../assets/resources/act-test-2-math-preview.png';
import examFolderPreview from '../assets/resources/exam-folder.png';
import probabilityPreview from '../assets/resources/probabilities-preview.png';

export const resourceTypes = ['Lesson', 'Video', 'Document'] as const;

export type ResourceType = (typeof resourceTypes)[number];
type SatSubject = 'Math' | 'Reading and Writing';
type ActSubject = 'English' | 'Math' | 'Reading' | 'Science';

type ResourceBase = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  href: string;
  action: string;
  image: string | ImageMetadata;
  imageAlt: string;
  imageMode?: 'cover' | 'contain';
  external?: boolean;
  download?: boolean;
};

export type Resource = ResourceBase & (
  | { exam: 'SAT'; subjects: SatSubject[] }
  | { exam: 'ACT'; subjects: ActSubject[] }
);

// Newest first. Add a newly published resource at the beginning of this list;
// the hero and both exam libraries read from the same entries.
export const resources: Resource[] = [
  {
    id: 'sat-punctuation',
    exam: 'SAT',
    subjects: ['Reading and Writing'],
    type: 'Lesson',
    title: 'SAT Punctuation Lesson',
    description: 'Learn how to handle all punctuation (known as boundaries) questions on the Reading and Writing section of the SAT. A full guide with multiple examples for every type of question.',
    href: '/lessons/punctuation',
    action: 'Read the lesson',
    image: satPunctuationPreview,
    imageAlt: 'An SAT punctuation answer choice crossed out, with a note explaining why the clause is incomplete',
  },
  {
    id: 'act-punctuation',
    exam: 'ACT',
    subjects: ['English'],
    type: 'Lesson',
    title: 'ACT Punctuation Lesson',
    description: 'Work through complete sentences, run-ons, commas, colons, and dashes in ACT English.',
    href: '/act_lessons/punctuation',
    action: 'Read the lesson',
    image: actPunctuationPreview,
    imageAlt: 'An ACT punctuation answer choice with each side of the semicolon marked as a complete sentence',
  },
  {
    id: 'sat-test-8-math-videos',
    exam: 'SAT',
    subjects: ['Math'],
    type: 'Video',
    title: 'All Math Explanations, Test 8',
    description: 'Full, detailed explanations to all 54 Math questions from SAT Digital Paper Test 8',
    href: '/sat_videos',
    action: 'Watch the video',
    image: satTest8MathPreview,
    imageAlt: 'SAT Math question 24 about triangles PQR and LMN, with a hand-drawn sketch of triangle PQR on the xy-plane',
    imageMode: 'contain',
  },
  {
    id: 'act-test-2-math-videos',
    exam: 'ACT',
    subjects: ['Math'],
    type: 'Video',
    title: 'All ACT Math Explanations, Practice Test 2',
    description: 'Detailed explanations for all 45 Math Questions from the new ACT format, ACT Practice Test 2.',
    href: '/act_videos',
    action: 'Watch the video',
    image: actTest2MathPreview,
    imageAlt: 'ACT Math question 44 about two hyperbolas and an ellipse through their vertices, with a hand-drawn sketch of the ellipse',
    imageMode: 'contain',
  },
  {
    id: 'act-practice-test-2',
    exam: 'ACT',
    subjects: ['English', 'Math', 'Reading', 'Science'],
    type: 'Document',
    title: 'ACT Practice Test 2',
    description: 'Download a full ACT practice test covering all four sections.',
    href: '/Practice%20Test%202.pdf',
    action: 'Download the PDF',
    image: '/practice_test_splash.webp',
    imageAlt: 'Sample ACT practice test score reports',
    download: true,
  },
  {
    id: 'sat-probability',
    exam: 'SAT',
    subjects: ['Math'],
    type: 'Document',
    title: 'Probability review',
    description: 'A visual reference for core probability ideas.',
    href: '/lessons/probabilities.png',
    action: 'Open the document',
    image: probabilityPreview,
    imageAlt: 'Probability reference graphic',
    imageMode: 'contain',
  },
  {
    id: 'sat-practice-test-1',
    exam: 'SAT',
    subjects: ['Reading and Writing', 'Math'],
    type: 'Document',
    title: 'Digital SAT Practice Test 1',
    description: 'Download a full digital SAT practice test.',
    href: '/sat-practice-test-1-digital.pdf',
    action: 'Download the PDF',
    image: examFolderPreview,
    imageAlt: 'An exam folder with study materials',
    download: true,
  },
  {
    id: 'sat-practice-test-8',
    exam: 'SAT',
    subjects: ['Reading and Writing', 'Math'],
    type: 'Document',
    title: 'Digital SAT Practice Test 8',
    description: 'Another full digital SAT practice test for timed review.',
    href: '/sat-practice-test-8-digital.pdf',
    action: 'Download the PDF',
    image: examFolderPreview,
    imageAlt: 'An exam folder with study materials',
    download: true,
  },
];

// Resources named in the "New" strip above the homepage hero, in display order.
// `label` replaces the resource's title in the strip only.
export const announcedResources: Array<{ id: string; label?: string }> = [
  { id: 'sat-test-8-math-videos', label: 'SAT Math - 54 Video Explanations, Test 8' },
  { id: 'act-test-2-math-videos', label: 'ACT Math - 45 Video Explanations, Practice Test 2' },
  { id: 'act-punctuation', label: 'ACT Punctuation Guide' },
  { id: 'sat-punctuation', label: 'SAT Punctuation Guide' },
];
