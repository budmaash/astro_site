import actPunctuationPreview from '../assets/lessons/act-punctuation/P6_2.png';
import satPunctuationPreview from '../assets/lessons/sat-punctuation/P10.png';
import satTest8MathPreview from '../assets/resources/sat-test-8-math-preview.png';
import actTest2MathPreview from '../assets/resources/act-test-2-math-preview.png';

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
    description: 'Learn the sentence-boundary and punctuation patterns that repeat on the digital SAT.',
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
    description: 'Every math question from Test 8, explained',
    href: '/sat_videos/test-8/module-1/question-1',
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
    description: 'Every math question from ACT Practice Test 2, explained',
    href: '/act_videos/test-2/math/question-1',
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
    image: '/lessons/probabilities.png',
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
    image: '/practice-tests/exam-folder.png',
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
    image: '/practice-tests/exam-folder.png',
    imageAlt: 'An exam folder with study materials',
    download: true,
  },
];
