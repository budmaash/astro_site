export type VideoSection = 'lesson' | 'question';

export type VideoLesson = {
  // Stable key; also accepted as a #hash on the hub page, which redirects to `path`.
  id: string;
  // Site path of the video's own page, e.g. '/sat_videos/test-8/module-1/question-20'.
  path: string;
  // 'lesson' videos list under Lessons; 'question' videos explain a single
  // question and list under the Question Explanations dropdown.
  section: VideoSection;
  // Practice test this video belongs to, e.g. 'SAT Practice Test 8'.
  test?: string;
  // Sidebar sub-heading inside Question Explanations, e.g. 'Module 1'.
  group?: string;
  // Short sidebar label for question videos, e.g. 'Question 20'.
  shortTitle?: string;
  title: string;
  // <title> and meta description for the video's page.
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  duration: string;
  seconds: number;
  vimeoId: string;
  // Privacy hash from the Vimeo embed URL (the `h` parameter).
  vimeoHash?: string;
  // Vimeo thumbnail (1280x720) and publish date, used for VideoObject structured data.
  thumbnail: string;
  uploadDate: string;
  description: string;
  caption: string;
  // Optional lesson notes; the notes panel is hidden when these are absent.
  takeaway?: string;
  annotationTitle?: string;
  annotationCopy?: string;
  callout?: string;
  links: Array<{ label: string; href: string }>;
};

export const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/** Vimeo thumbnail URL from the `video/<key>` part of its picture link. */
export const vimeoThumbnail = (key: string) => `https://i.vimeocdn.com/video/${key}_1280x720?region=us`;

/** Embed URL for the Vimeo player, including the privacy hash when there is one. */
export const vimeoEmbedUrl = (video: Pick<VideoLesson, 'vimeoId' | 'vimeoHash'>) =>
  `https://player.vimeo.com/video/${video.vimeoId}?${video.vimeoHash ? `h=${video.vimeoHash}&` : ''}title=0&byline=0&portrait=0`;

// Vimeo folder "SAT Practice Test 8" (Module 1 and Module 2 subfolders):
// [module, question, Vimeo ID, embed hash, duration in seconds, publish date, thumbnail key].
const satTest8Videos: Array<[number, number, string, string, number, string, string]> = [
  [1, 1, '1221985233', '718b3f0a43', 52, '2026-08-28', '2194829689-c9713c425abd303e4ac3ec2f66d51229cabdb8ac5b1df8c3f6a1723adff923e2-d'],
  [1, 2, '1221985234', '5cc78d6022', 74, '2026-08-28', '2194829679-d722abda615d0ac829807f00591b2ebd64d004df4be4552dbf06efd7e08496fa-d'],
  [1, 3, '1221985231', 'ff43d39fde', 64, '2026-08-28', '2194829677-42e3c6f7afbec4cd82f07fdbaac4274a5ed6ca063b0462f52d235d12a7601a31-d'],
  [1, 4, '1221985232', '6ed59bec13', 145, '2026-08-28', '2194829691-0c0d6255edbd261ff9057b96bd5aefc9fb345c3e0eae004d30a6d503c68e2211-d'],
  [1, 5, '1221985243', '33ab22ecec', 172, '2026-08-28', '2194829704-c89502541e247f1c7e89607c15364c02862631120272dbef3f97cb2149c4c233-d'],
  [1, 6, '1221985244', '526110e150', 53, '2026-08-28', '2194829739-181b14f7dd09f9c91cd46418bc2f2b7ff3367a96b6e9841e2995ad5c89e934fb-d'],
  [1, 7, '1221985245', '8834fe31eb', 105, '2026-08-28', '2194829699-3c730bcb8ca7d95dc856c6cd1a8ad1a26f4f05a1f49e24b7c55aa3cfc05d719f-d'],
  [1, 8, '1221985246', '5b7e8feee9', 117, '2026-08-28', '2194829740-431c79bafc15eca1386e63a5d8cfdcc9f226c19c58a33dbf3b4d9b0e497e27ff-d'],
  [1, 9, '1221985252', 'ed8ef72760', 168, '2026-08-28', '2194829698-ba696f1b7785035742ea9ba29e4437359fe26c085cc5d8f62709e673482cf8e2-d'],
  [1, 10, '1221985258', 'aedacc40fc', 95, '2026-08-28', '2194829705-cfb474d81910ff80168debc1b07d95deab06168f5fb425a21059940724bbf1bf-d'],
  [1, 11, '1221985259', '4d20a569d6', 125, '2026-08-28', '2194829712-9d605b810abc7f3e284bbb9a6a109ca5c9c1e603d74f3d6e800cdd5cd9fe0ee6-d'],
  [1, 12, '1221985260', '908cd3252e', 254, '2026-08-28', '2194829734-b22a3976026a51f49b969fa3e085c16ac008ece768ad5be952661014f948f890-d'],
  [1, 13, '1221985261', 'c24f352c7e', 217, '2026-08-28', '2194829718-05942f6dee15a428ee1839356d93021a8d3709c2f56e74e3f5711e5d2c704104-d'],
  [1, 14, '1221985263', '5343adab13', 280, '2026-08-28', '2194829721-f35b57ed9842466798844854382b46c3d097ab09f9c8cacd9f4eef06638e0b2b-d'],
  [1, 15, '1221985268', '24b6da498b', 193, '2026-08-28', '2194829737-1c157ab0cd190121d8a1b3221539892f20699f53ba7f5c73422d50fb546e0787-d'],
  [1, 16, '1221985275', '47ee9f3e22', 143, '2026-08-28', '2194829735-a12533aa3d35ddb14328a4e2c0cb7e5fc0d8149b85af8c065e199f05b1275112-d'],
  [1, 17, '1221985279', '735694f0be', 261, '2026-08-28', '2194829765-583b511cc9921a99bf860bfb7346b2af7b77294470b4b0db0cf9b4dcd1cbe813-d'],
  [1, 18, '1221985280', '7d84c8d0c4', 419, '2026-08-28', '2194829774-649027fa4209fb029605c3a808f2831c8570cb3ca7dbdcb31b443f4f74c8585c-d'],
  [1, 19, '1221985281', '8ef729f310', 209, '2026-08-28', '2194829751-353b794609370c664c1088ad18b399a48e2c70052779ecab0496ca13d1e54458-d'],
  [1, 20, '1221985282', '617f77b77f', 294, '2026-08-28', '2194829763-e4763a4e45ec3cb6e53bcb9b8a055f2e8fc8621612a8fc6ea1257bb5697b4eb9-d'],
  [1, 21, '1221985294', '7c4cd8fe1e', 435, '2026-08-28', '2194829809-986bdc28da98451a9775e3b82c9998355c1da1719361f0050718a9952800e500-d'],
  [1, 22, '1221985300', '7a91190783', 274, '2026-08-28', '2194829784-c3ffb4f3b5bb8f130d2677951bc80d170a5e1c012f29d61b9c021986ae881231-d'],
  [1, 23, '1221985302', '02b1190c7e', 521, '2026-08-28', '2194829862-7fd35fd7eaf84100b0f07a3fa7289e79c9bd49a1b808419cd419d48b9c0ca155-d'],
  [1, 24, '1221985304', '276fcbb08b', 370, '2026-08-28', '2194829808-e726602a108c75d25de21ba8e6dfd6986d7f17c1bc87022d0de15348da7b4b1e-d'],
  [1, 25, '1221985314', 'a55d7a174f', 323, '2026-08-28', '2194829811-6ebb8b0c31c562b89a6b0b99a0057b8ec45b747718b5aba7e139f36eef5b9438-d'],
  [1, 26, '1221985333', '0f49c10646', 215, '2026-08-28', '2194829818-0eb9e9b988308a91c2737408b9d8da4902b9c60d0caa5dd91a22be698b8afecb-d'],
  [1, 27, '1221985337', 'af56ec03ff', 409, '2026-08-28', '2194829843-0eb5e2b35f6352c986536150cc16e301aad1beac15c91c16fcd1736f94495583-d'],
  [2, 1, '1223211463', '4a64b6c7f4', 98, '2026-09-02', '2196369137-c2199d3374a445e4d2e9bfcb17b21814792954a4c1f911b68d139c6cd3a3943a-d'],
  [2, 2, '1223211462', '1e33373643', 73, '2026-09-02', '2196369112-47e034baea1b7f7076fb880b2235d9c39a95e55688e48705196baff5d0c20d87-d'],
  [2, 3, '1223211464', 'bbc9fbb9fa', 169, '2026-09-02', '2196369197-7072bb53e958e5ec016e617b4cec5e81a82afd910cf54d8c8411d5cfdd449656-d'],
  [2, 4, '1223211465', '107f0d57a8', 110, '2026-09-02', '2196369152-519425aca537d0acd8047f66ceb054dfdb6eabf9975743f4783b1d0818ecdb8d-d'],
  [2, 5, '1223211489', 'e83eba0c83', 94, '2026-09-02', '2196369153-75933cb1eaf480b4422c471a762ce2f504cd867110cd72fb722d5c7ef6310a0e-d'],
  [2, 6, '1223211492', 'ace92e6818', 191, '2026-09-02', '2196369171-6c870e779a3a1eec63c3eba290c6dffa882295d3f426d2752ca06a149f036967-d'],
  [2, 7, '1223211499', '09563525e7', 79, '2026-09-02', '2196369155-07b213f40db67ae32626e645d080840e52ad3be93ecaac9daa72ede2edb86510-d'],
  [2, 8, '1223211505', '46601ef484', 116, '2026-09-02', '2196369160-d5ef1d0242dc2125f7f125b14605abcaa15a876cc70b982499effd796d0f5e30-d'],
  [2, 9, '1223211515', 'ac61c37836', 176, '2026-09-02', '2196369311-13708c6228aa1ad8e8a7cff27d25f3cce1fd40e459d873c3b1dedc984827de9d-d'],
  [2, 10, '1223211517', '60b5b229b0', 180, '2026-09-02', '2196369173-cf6f982559245d4cfb4d00294a54e3361e315f1c3abf207ecadf322fa3c5bb90-d'],
  [2, 11, '1223211524', '357279560a', 188, '2026-09-02', '2196369195-b9f8730c123be28d935b9bbe5c5f18dcb30e4f45089db77d75a8385c35a5e336-d'],
  [2, 12, '1223211525', '08221026ad', 124, '2026-09-02', '2196369224-1305c4e955f7f8a3ac68b1062b2a0a5dc4cec04d6680d8ca91b4c12da483152a-d'],
  [2, 13, '1223211548', '4a83f9afc0', 45, '2026-09-02', '2196369212-f092c25cb7189b4f62214ea75581a6ac68fe4f4a707b4dfc4089b1eb6695a975-d'],
  [2, 14, '1223211546', '4e8e69ef85', 301, '2026-09-02', '2196369238-67f7ee719a729c3b03d8caa9946dba24938c0c4f7fb2ebefe41d43203e7fdbc1-d'],
  [2, 15, '1223211547', '8da3c403c8', 196, '2026-09-02', '2196369241-109325b3981df66c90fdca27ef6b2a19d112c777ccd92b732b17b97efbaffe14-d'],
  [2, 16, '1223211550', 'e4f3e3322a', 283, '2026-09-02', '2196369234-ab2584afeda1fcf5d1804ee9b5e51401375e2c5809af6cdfc647f592b77630e5-d'],
  [2, 17, '1223211577', 'd901fe763c', 206, '2026-09-02', '2196369289-b83df402a36eb9694931a2f1aa3c99f3c23824f7ed76097b865364db13fb2cea-d'],
  [2, 18, '1223211583', '1184abd344', 469, '2026-09-02', '2196369341-63f70e620994d1408c82909c34e574dd534bca48a3c4ec7fc29a8d8767ed81b1-d'],
  [2, 19, '1223211584', 'b06824e764', 376, '2026-09-02', '2196369353-bf3347ba4279485c8289a9abc5f520b4266331a26b9f83dff738798a3ed5ce5b-d'],
  [2, 20, '1223211588', '7c06c10738', 196, '2026-09-02', '2196369293-1d8fb073d2bd0b512463bc50914c84408aba4b3bba1c25e6e0fb495f87c9aef8-d'],
  [2, 21, '1223211766', 'e8df18baf3', 207, '2026-09-02', '2196369517-41bcad870622fc6b2a30863cbcf5ba2409668fb0a2966a4dfde51c29bc7ed6f4-d'],
  [2, 22, '1223211767', '39b37c0ce1', 133, '2026-09-02', '2196369503-c852259286ff26b69406a32ea5f26dad172e1802868815a40fb0d066a900f1a1-d'],
  [2, 23, '1223211768', 'd43f2edb2a', 151, '2026-09-02', '2196369504-ba89750d614183809d6d8ae5f61d4d0e0c4cbc6b4270a1a7e737ca8d4b259ea3-d'],
  [2, 24, '1223211769', '0bbf2f94ee', 305, '2026-09-02', '2196369524-4e4de77b8fa043bbbaae3cd612764d5b3d9287c47037fe75c80c7ff3fd25b46b-d'],
  [2, 25, '1223211784', '3108898c5d', 343, '2026-09-02', '2196369550-763271cd42ee9cebebdc30fb0c384ad9f46059e819ef01c54ab02032217b5431-d'],
  [2, 26, '1223211786', 'd4ad11c596', 659, '2026-09-02', '2196369573-3f486548810518a2b8e68eec5ddcc867a914577229c87201df5de77d0900ac56-d'],
  [2, 27, '1223211788', '9e71b6d278', 350, '2026-09-02', '2196369631-98c8684c09c7d793d210c8bb767bd8d7b4ebde8a66abe2c0edb6afe0fede1ec3-d'],
];

const satTest8Questions: VideoLesson[] = satTest8Videos.map(([module, question, vimeoId, vimeoHash, seconds, uploadDate, thumbnail]) => ({
  id: `sat-test-8-module-${module}-question-${question}`,
  path: `/sat_videos/test-8/module-${module}/question-${question}`,
  section: 'question',
  test: 'SAT Practice Test 8',
  group: `Module ${module}`,
  shortTitle: `Question ${question}`,
  title: `Module ${module}, Question ${question}`,
  pageTitle: `SAT Test 8 Math Module ${module}, Question ${question} Explained | Hasan Tutoring`,
  metaDescription: `Watch a step-by-step video explanation of SAT Practice Test 8, Math Module ${module}, Question ${question} (${formatDuration(seconds)}), then move on to the next question.`,
  eyebrow: 'SAT Practice Test 8 · Math',
  duration: formatDuration(seconds),
  seconds,
  vimeoId,
  vimeoHash,
  thumbnail: vimeoThumbnail(thumbnail),
  uploadDate,
  description: `A video explanation of SAT Practice Test 8, Math Module ${module}, Question ${question}.`,
  caption: `SAT Practice Test 8, Math Module ${module}, Question ${question}, explained step by step.`,
  links: [
    { label: 'Digital SAT Practice Test 8', href: '/sat-practice-test-8-digital.pdf' },
    { label: 'All SAT math videos', href: '/sat_videos' },
    { label: 'Free practice tests', href: '/practice-tests' },
    { label: 'All SAT resources', href: '/resources#sat-resources' },
  ],
}));

export const videoLessons: VideoLesson[] = [
  // Add SAT lesson videos (section: 'lesson') ahead of the question explanations.
  ...satTest8Questions,
];

const satQuestionCount = videoLessons.filter((video) => video.section === 'question').length;

export const satVideoHub = {
  name: 'SAT Math Video Explanations',
  path: '/sat_videos',
  eyebrow: 'SAT Math · Practice Test 8',
  contentsLabel: 'Contents · SAT Math',
  intro: `Step-by-step video explanations for all ${satQuestionCount} math questions on SAT Practice Test 8, organized by module. Choose a question to watch its explanation.`,
  pageTitle: 'SAT Math Video Explanations: Practice Test 8 | Hasan Tutoring',
  metaDescription: `Free step-by-step video explanations for all ${satQuestionCount} math questions on SAT Practice Test 8, organized by module.`,
};
