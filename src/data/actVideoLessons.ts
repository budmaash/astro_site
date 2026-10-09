import { formatDuration, vimeoThumbnail, type VideoLesson } from './videoLessons';

// Vimeo folder "ACT Practice Test 2/Math":
// [question, Vimeo ID, embed hash, duration in seconds, publish date, thumbnail key].
const actTest2MathVideos: Array<[number, string, string, number, string, string]> = [
  [1, '1227105883', '0b6e53911f', 69, '2026-09-15', '2201250660-20d4b83a36d0b8c1004f6d2eec44a745ce85d29a5683822b4712842ea61ecd5e-d'],
  [2, '1227105889', '8dae6f714e', 61, '2026-09-15', '2201250642-c134c45b876ab556955ac348a9469ca534e7b8257329769409bcdee98eef2ab6-d'],
  [3, '1227105888', '9bef4a33aa', 93, '2026-09-15', '2201250664-fdb2d329ceb3bf0198e90cc1df9160f7a569d45bae6e2b321f57053bb98299f0-d'],
  [4, '1227105882', 'fe676cacc5', 141, '2026-09-15', '2201250663-e462d7994b63d0aac805a496e767044aa3cc566f95766a45c4b7386fcbf50aaf-d'],
  [5, '1227105912', '9910c006fb', 53, '2026-09-15', '2201250685-5d1ce1a8d49849008e11eea4f1e5a8574c4937bf4e136d3a74818ac2105cc2ff-d'],
  [6, '1227105919', 'c9666b67d4', 84, '2026-09-15', '2201250671-db8a3f75c99a308492a66ed63875b7d2e49005425b40f816d7563c7c453f2f44-d'],
  [7, '1227105921', 'e70b08fdbf', 123, '2026-09-15', '2201250704-9901bf7db4d624996787d2fad86c0351cf3f0aa62a70cf84a2f9991154ad4638-d'],
  [8, '1227105924', '12bab92af2', 176, '2026-09-15', '2201250712-df9651d1d1ef9e5761df013df87ecefc09bd85685670190e126e33f72fb1304e-d'],
  [9, '1227105938', '916fee38d9', 140, '2026-09-15', '2201250720-8d3af2032b03caa3e31fb3c2c34ee58c9b0ced9537509a81788dbefc62dea131-d'],
  [10, '1227105955', '61fd408773', 57, '2026-09-15', '2201250691-71c5a5c7633785f1567a57d42180d2f943ef1f4545e377b8a5a167459c7a817e-d'],
  [11, '1227105965', 'ce4bd6d99b', 351, '2026-09-15', '2201250795-8c3baddce1c5dbfa80e8f2b9cea7ac952f8f011d1ebbb810f386326ee1131e5f-d'],
  [12, '1227105967', '9adf4a372a', 76, '2026-09-15', '2201250755-e9f01d30b73c84ed777bac3155509c5c80f26709149e1ae00fe053b6f99c9fd5-d'],
  [13, '1227105969', '337c131dfc', 74, '2026-09-15', '2201250731-709c11e87906697dab0491c96cc20c702801b24af8ed8c650b8f463de6373869-d'],
  [14, '1227105970', 'a687eea688', 150, '2026-09-15', '2201250752-a21760b1e9b4923c5660f3db780b0451d960e01714803b5e376c7f950625132a-d'],
  [15, '1227105993', '5d21d301a5', 167, '2026-09-15', '2201250801-e4dd809706950810e9015b6143ed6dff6d5ed92443a0d2ff010a369e6e38cdf8-d'],
  [16, '1227106006', '803ffcdd1b', 207, '2026-09-15', '2201250793-28ad9ad2c4f0d43a2c4827cd2c5b3719da288544446921278698e953c96b633f-d'],
  [17, '1227106011', 'bf48f941be', 160, '2026-09-15', '2201250800-541c387c643f0567f1022be469dd4ee4151cbd059fd3f916e144f479f62665df-d'],
  [18, '1227106048', '0e6a6db0eb', 118, '2026-09-15', '2201250808-5c18c7b5a69e2b6f5e035050d9fe65d93e48ec452412147897bd0951718dce19-d'],
  [19, '1227106052', '5b4bb5529d', 113, '2026-09-15', '2201250817-5a1a9602eef00f8b46a27bbfaf1be442bb3c02da8de1c4419705fba77fc8318f-d'],
  [20, '1227106059', '08a452dcba', 175, '2026-09-15', '2201250838-ad15a83efa73d120d0d8d760c1cddd853f46935b9844d45ac0d0e7bb458fd043-d'],
  [21, '1227106060', '37d90726d5', 191, '2026-09-15', '2201250847-9542b836c25ae36b616d57d0d14b19c5952888f4c074b92f3d9f68de520f63e1-d'],
  [22, '1227106072', '15b087135f', 64, '2026-09-15', '2201250848-cc47ce0125530d6027c4f1495c630d3437ea3504c1e4f537954a18cab89a18d8-d'],
  [23, '1227106078', '44b27f9ddc', 216, '2026-09-15', '2201250853-4dc037833689e620b5f158ee770f39778e0277d577af5ed2ba9e7c7fb7cd2b25-d'],
  [24, '1227106093', '8c06187a11', 250, '2026-09-15', '2201250870-e5d0c9d6708ccdc9a607092bffe59e51bf8267fd0890d573f0673f13ca191fe3-d'],
  [25, '1227106096', 'a2f4ae0a44', 123, '2026-09-15', '2201250883-6584289d4e8e83753d07afdabe7ee348c27ed23d56c998dd48d63297e9c17a76-d'],
  [26, '1227106109', '0f527cbc3b', 88, '2026-09-15', '2201250878-d3417c985ce8696b59d6286f6b9e50431897d9a09693367be2e56bf05534299a-d'],
  [27, '1227106113', '294d4b3d45', 118, '2026-09-15', '2201250894-cda14d22498b62a08e99cbf71190685c568d6c1afd06992e3d3c6b7a3bcd1e10-d'],
  [28, '1227106126', 'b55c7228f4', 143, '2026-09-15', '2201250916-faee82eb5b5e6352269d9c344b64255c523455791aae9cbd11fcc393050dd8f0-d'],
  [29, '1227106125', 'c203cf3a32', 152, '2026-09-15', '2201250908-f0bff88e1ef9b7d49ed22a9a43155a1a7c74880571e3e84c3e214c3377c8631c-d'],
  [30, '1227106138', '76eb633f1f', 97, '2026-09-15', '2201250915-adb1ed9258a2edd51960a90102aec7afcd47f6056b6eb79f8023c1ec961143e8-d'],
  [31, '1227106141', '94dc00b925', 128, '2026-09-15', '2201250923-1d00c93d4443c0569416061c647a2c9a5aba469cea2d1b463994097c8e06256b-d'],
  [32, '1227106161', '0d7629d08a', 203, '2026-09-15', '2201250950-4b35a8c8b8f271929aa1338b188a0da2c2d5175c5167f965d8d8f38ba8e1d77d-d'],
  [33, '1227106174', '80b45d37e4', 78, '2026-09-15', '2201250947-50167d05081d01c07307c5f84881af421d031c80fc6062407aad327ebfc2743f-d'],
  [34, '1227106173', '338a3870c4', 197, '2026-09-15', '2201250962-e7bf997f0849d722c6d2dba8296d12e4b195781d1ab9d3e08ca79434b4c5f86c-d'],
  [35, '1227106175', 'da46d1e83c', 118, '2026-09-15', '2201250956-2607bc4cf16f6287413ccd26a090682733a2cf643da5ca6d496f6e88a441915b-d'],
  [36, '1227106190', 'f5aa9c718b', 208, '2026-09-15', '2201250973-1f8657399e0e0b245efdd1c5ae90b3f554e585c980a269fbb23f02635a359e9d-d'],
  [37, '1227106191', '5da634b433', 408, '2026-09-15', '2201251024-a425858a35f342436362cfc48953c82924ed6858502d7ddc297e8b94e2a45711-d'],
  [38, '1227106205', 'ee573e328e', 184, '2026-09-15', '2201251000-608ab2ce6b7fb665f172576355e355ccec842703fac85006903ca9e391e3b8b2-d'],
  [39, '1227106207', '0970c1e836', 216, '2026-09-15', '2201250986-d8b4abf64825528a2fee247d9ae1513164d7a28d568fa390fbccedc9e7da8879-d'],
  [40, '1227106221', '4066f3c4d6', 223, '2026-09-15', '2201251016-a3351da806a0186b3b59e77c59d559b3e5aacef390462d7c54d322142492260f-d'],
  [41, '1227106228', 'a979af1321', 259, '2026-09-15', '2201251035-6b21f0d3ad5e38bd4e0c93f3714745bf78f71ae3eac9c7696ce364da6482ae23-d'],
  [42, '1227106246', 'fa26270a19', 192, '2026-09-15', '2201251037-f150f2c8bd4b0b5cbcb01005508ac89ea43ed156cd7effeaab0e848cdd588953-d'],
  [43, '1227106265', 'fc1daa2513', 251, '2026-09-15', '2201251055-b1b412fabee2f4ed315861d77a02300119e6013653d3fee4eebbbef2b271c4b0-d'],
  [44, '1227106268', '54626f0a1f', 276, '2026-09-15', '2201251103-156e31c17fb78d66453cf8cda5e023b8f1563af1ef80d12cd4026f3185542daa-d'],
  [45, '1227106279', '6381524eb6', 162, '2026-09-15', '2201251082-01213737ccba00a6c7969e864bd0303c32a39a034c70f81cd5adc79855f795ae-d'],
];

const actTest2MathQuestions: VideoLesson[] = actTest2MathVideos.map(([question, vimeoId, vimeoHash, seconds, uploadDate, thumbnail]) => ({
  id: `act-test-2-math-question-${question}`,
  path: `/act_videos/test-2/math/question-${question}`,
  section: 'question',
  test: 'ACT Practice Test 2',
  group: 'Math',
  shortTitle: `Question ${question}`,
  title: `Math, Question ${question}`,
  pageTitle: `ACT Practice Test 2 Math, Question ${question} Explained | Hasan Tutoring`,
  metaDescription: `Watch a step-by-step video explanation of ACT Practice Test 2, Math Question ${question} (${formatDuration(seconds)}), then move on to the next question.`,
  eyebrow: 'ACT Practice Test 2 · Math',
  duration: formatDuration(seconds),
  seconds,
  vimeoId,
  vimeoHash,
  thumbnail: vimeoThumbnail(thumbnail),
  uploadDate,
  description: `A video explanation of ACT Practice Test 2, Math Question ${question}.`,
  caption: `ACT Practice Test 2, Math Question ${question}, explained step by step.`,
  links: [
    { label: 'ACT Practice Test 2', href: '/Practice%20Test%202.pdf' },
    { label: 'All ACT math videos', href: '/act_videos' },
    { label: 'Free practice tests', href: '/practice-tests' },
    { label: 'All ACT resources', href: '/resources#act-resources' },
  ],
}));

// Add ACT lesson videos (section: 'lesson') ahead of the question explanations.
export const actVideoLessons: VideoLesson[] = [
  ...actTest2MathQuestions,
];

const actQuestionCount = actVideoLessons.filter((video) => video.section === 'question').length;

export const actVideoHub = {
  name: 'ACT Math Video Explanations',
  path: '/act_videos',
  eyebrow: 'ACT Math · Practice Test 2',
  contentsLabel: 'Contents · ACT Math',
  intro: `Step-by-step video explanations for all ${actQuestionCount} math questions on ACT Practice Test 2. Choose a question to watch its explanation.`,
  pageTitle: 'ACT Math Video Explanations: Practice Test 2 | Hasan Tutoring',
  metaDescription: `Free step-by-step video explanations for all ${actQuestionCount} math questions on ACT Practice Test 2, one short video per question.`,
};
