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
  title: `Question ${question}`,
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
    { label: 'Download ACT Practice Test 2', href: '/Practice%20Test%202.pdf' },
    { label: 'All ACT videos', href: '/act_videos' },
    { label: 'Free practice tests', href: '/practice-tests' },
  ],
}));

// Vimeo folder "ACT Practice Test 2/English". Each video covers a range of questions:
// [first question, last question, Vimeo ID, duration in seconds, publish date, thumbnail key].
// These embed publicly, so there is no privacy hash.
const actTest2EnglishVideos: Array<[number, number, string, number, string, string]> = [
  [1, 10, '1244081198', 1312, '2026-11-06', '2222770972-cc2d603c06d426120094e633e3ee7a5c96969c79b72fe511397b35542b1eee3b-d'],
  [11, 15, '1245626558', 504, '2026-11-10', '2224807763-64fb7298ff32498365cc94ee9e2f6b9c71935d852c97ba817a6375a676d9c810-d'],
  [16, 25, '1245628106', 1052, '2026-11-10', '2224809885-263f98e66f2006133fc99ffe66db65d677a791c75bd7345c26534b8acb4939d5-d'],
  [26, 35, '1245739368', 935, '2026-11-11', '2224952988-3f285f38904baa292d31d765816bc837f93a346b1c5cf73e2710a8dbfd320d5f-d'],
  [36, 45, '1245739369', 377, '2026-11-11', '2224952816-6f274e6fe667c5dad26a1b7a7bda8586c405e89ce21a1004028f7a7c4b7a5dbb-d'],
  [46, 50, '1245739371', 1315, '2026-11-11', '2224953012-45d8be65fea9fa095a03a963d97c4962bdbe76062f5c9590a27cfedeb83f2b71-d'],
];

const actTest2EnglishQuestions: VideoLesson[] = actTest2EnglishVideos.map(([first, last, vimeoId, seconds, uploadDate, thumbnail]) => ({
  id: `act-test-2-english-questions-${first}-${last}`,
  path: `/act_videos/test-2/english/questions-${first}-${last}`,
  section: 'question',
  test: 'ACT Practice Test 2',
  group: 'English',
  // Word joiners keep the range on one line, e.g. 'Questions / 1–10' not 'Questions 1– / 10'.
  shortTitle: `Questions ${first}\u2060–\u2060${last}`,
  title: `Questions ${first}–${last}`,
  pageTitle: `ACT Practice Test 2 English, Questions ${first}–${last} Explained | Hasan Tutoring`,
  metaDescription: `Watch step-by-step video explanations of ACT Practice Test 2, English Questions ${first}–${last} (${formatDuration(seconds)}).`,
  eyebrow: 'ACT Practice Test 2 · English',
  duration: formatDuration(seconds),
  seconds,
  vimeoId,
  thumbnail: vimeoThumbnail(thumbnail),
  uploadDate,
  description: `Video explanations of ACT Practice Test 2, English Questions ${first}–${last}.`,
  caption: `ACT Practice Test 2, English Questions ${first}–${last}, explained step by step.`,
  links: [
    { label: 'Download ACT Practice Test 2', href: '/Practice%20Test%202.pdf' },
    { label: 'All ACT videos', href: '/act_videos' },
    { label: 'Free practice tests', href: '/practice-tests' },
  ],
}));

// Vimeo folder "ACT Practice Test 2/Reading". One video per question:
// [passage, question, Vimeo ID, duration in seconds, publish date, thumbnail key].
// These embed publicly, so there is no privacy hash. They are recorded at 4:3 (1440x1080)
// and shown 30% larger than the default 4:3 player.
const actTest2ReadingVideos: Array<[number, number, string, number, string, string]> = [
  [1, 1, '1248255127', 222, '2026-11-19', '2228264166-da0595e2417a4c5593df599f3728c3937e546f3bcb8be2aa8d87e1852acc9cdf-d'],
  [1, 2, '1248255124', 149, '2026-11-19', '2228264147-f403a5abd90b696d7bade6550e6ae3d77fa9173887d229ecdea2082c1f3e5e52-d'],
  [1, 3, '1248255125', 117, '2026-11-19', '2228264008-ae7469ae35b48a4229fe23c12714818505a92de066f2e110e4cdc7b98f18a63f-d'],
  [1, 4, '1248255123', 142, '2026-11-19', '2228264030-db5c79a98532723460cc9494e489719e77eea0f1e341b8030f37690af1c4bd25-d'],
  [1, 5, '1248255235', 175, '2026-11-19', '2228264230-2886184c8339780dbe7ddf1361f7fbf595f2460bdfc5751d899ad644edbf241a-d'],
  [1, 6, '1248255239', 68, '2026-11-19', '2228264052-40794b5f26ef6d9ca17c4d26438c64bfd9d8d37004539e953ab6f28836fb7707-d'],
  [1, 7, '1248255244', 100, '2026-11-19', '2228264056-a33d9fb6b97907e7ea238c85de941c6eb457093fcb9dc36bfb4c7db52753c52b-d'],
  [1, 8, '1248255272', 94, '2026-11-19', '2228264200-66a061d084feffb5a058db79a7a421e61aa1f80d04cdd09201208333b6ed4d87-d'],
  [1, 9, '1248255281', 174, '2026-11-19', '2228264130-a533232db9db3e6559ac392901d8772facbc082f61c17c635acabeecf618bc97-d'],
  [2, 10, '1248587288', 240, '2026-11-20', '2228723484-5bb102e4e6df33ff12a9667046f196108ba18ee986a29005477b84205af9f62f-d'],
  [2, 11, '1248587289', 99, '2026-11-20', '2228723576-967131347285e2a92125a6e1d86ffe329a2f394721f6750320dc2ff7c3779791-d'],
  [2, 12, '1248587292', 257, '2026-11-20', '2228723597-a7343db30b96d3e3f6aa1ae73faabb61951f19ddced61529e681be458afaf706-d'],
  [2, 13, '1248587290', 112, '2026-11-20', '2228723575-8ffac165d3ef793f9f359fdac58631d91ec71934f00303eaf29fe5e565c7691e-d'],
  [2, 14, '1248587516', 166, '2026-11-20', '2228723713-9d399c446649f4833aa58340853fdee0f03493e9770583e64807e800f29bc4b5-d'],
  [2, 15, '1248587515', 187, '2026-11-20', '2228723702-e198be20388b405848d6b3155f187413db9873ae5b9c88cd026332b007aed7a2-d'],
  [2, 16, '1248587518', 123, '2026-11-20', '2228723669-dc9c6553e92400eb0e4a9862a2a260f1c8a97a08107d6f7f9395f2085f600be8-d'],
  [2, 17, '1248587517', 151, '2026-11-20', '2228723703-e1cd6625a2b265f00e215614434af684b9c78712d003da9e14e1855fd8c5b51c-d'],
  [2, 18, '1248587549', 139, '2026-11-20', '2228723733-9d22261d694f2c385fc8c0520caf37a6d64f26d456d69067ba25ba0690e764b9-d'],
  [3, 19, '1248587574', 144, '2026-11-20', '2228723842-7fb6b4ea2e57ee9428feacd1db69ff2cda4f33699853afb52fbf6e6892f58ae9-d'],
  [3, 20, '1248587573', 51, '2026-11-20', '2228723742-546b1541fa43957aab61122458ab8e78488d30a777fea170d0bdd03161e5d4eb-d'],
  [3, 21, '1248587592', 121, '2026-11-20', '2228723796-9490665b15fbb1bf61b88a0ff06cfc8ef6466d512b589014ff885a4d6a733686-d'],
  [3, 22, '1248587599', 92, '2026-11-20', '2228723835-ba6c0a9b12ffd82a28947ded8676a5f3894730f17157e11e7cbb9a6b0d2b72af-d'],
  [3, 23, '1248587604', 111, '2026-11-20', '2228723786-f4f5aaa7ecc3a45025f0ad9f763f7296c1fabce332b2e74b6ed063e0470d5bc2-d'],
  [3, 24, '1248587619', 111, '2026-11-20', '2228723798-33f374034adc3f4204cdb9e30d785e33c510594be8e015c8c410a5bd663afa8f-d'],
  [3, 25, '1248587628', 139, '2026-11-20', '2228723829-6184d6c4727e00deb9cbde73267936616b9f259b54d489061c1197f1f70db93c-d'],
  [3, 26, '1248587639', 90, '2026-11-20', '2228723804-a86b1998a0369bbd388e56bc1b9899c144c9c4b6ddb119fe3a7e352ca2ecf8f6-d'],
  [3, 27, '1248587648', 140, '2026-11-20', '2228723941-d854563cbddc6c952a89755ca47945b9476dcedb106da210808435c4c0ed3859-d'],
  [4, 28, '1248587656', 128, '2026-11-20', '2228723974-a9fe10c0a37f0f989317847e9f7336710e73cdbebe5d31d39c2135ae484272d5-d'],
  [4, 29, '1248587663', 119, '2026-11-20', '2228723926-41d560e8d07c4679ffc1022183d09b033cc199720fd9060cc22c8b1ddb4efa21-d'],
  [4, 30, '1248587672', 151, '2026-11-20', '2228724008-3f05ec987a0c7918b32e1ee5afb150df8f675a9c0da609bc8de86e4987d0fceb-d'],
  [4, 31, '1248587799', 118, '2026-11-20', '2228724221-8ef5e9f685eea2e5b02e711b8bc0075ae495a581bb5428967168914e751e4a39-d'],
  [4, 32, '1248587800', 112, '2026-11-20', '2228724158-6616c804e1f358d7cbff114f02aed1218f240be5adb6c53e36981fc2e76abc96-d'],
  [4, 33, '1248587798', 116, '2026-11-20', '2228724126-53eaf00f3f4624e970561062b56537a55558d4102206401efe8b9fd1038246c8-d'],
  [4, 34, '1248587802', 86, '2026-11-20', '2228724113-789f905834db84baa5c249b239e80e9442f7bfe74c226ead991aae58eeba6f99-d'],
  [4, 35, '1248587860', 80, '2026-11-20', '2228724214-8475f0f8c8b5c46d6a105e1da66e485db3f26feaea47d3f2d373068237a49336-d'],
  [4, 36, '1248587874', 109, '2026-11-20', '2228724160-3a74a21e66fa78df624f8cbf2c5d6c048e62e7cf366cc878b8e72a377d2503ce-d'],
];

const actTest2ReadingQuestions: VideoLesson[] = actTest2ReadingVideos.map(([passage, question, vimeoId, seconds, uploadDate, thumbnail]) => ({
  id: `act-test-2-reading-question-${question}`,
  path: `/act_videos/test-2/reading/question-${question}`,
  section: 'question',
  test: 'ACT Practice Test 2',
  group: 'Reading',
  shortTitle: `Question ${question}`,
  title: `Question ${question}`,
  pageTitle: `ACT Practice Test 2 Reading, Question ${question} Explained | Hasan Tutoring`,
  metaDescription: `Watch a step-by-step video explanation of ACT Practice Test 2, Reading Question ${question} (Passage ${passage}, ${formatDuration(seconds)}).`,
  eyebrow: `ACT Practice Test 2 · Reading · Passage ${passage}`,
  duration: formatDuration(seconds),
  seconds,
  vimeoId,
  aspectRatio: '4/3',
  displayScale: 1.3,
  thumbnail: vimeoThumbnail(thumbnail),
  uploadDate,
  description: `A video explanation of ACT Practice Test 2, Reading Question ${question} (Passage ${passage}).`,
  caption: `ACT Practice Test 2, Reading Question ${question}, explained step by step.`,
  links: [
    { label: 'Download ACT Practice Test 2', href: '/Practice%20Test%202.pdf' },
    { label: 'All ACT videos', href: '/act_videos' },
    { label: 'Free practice tests', href: '/practice-tests' },
  ],
}));

// Test order: English, Math, then Reading. This is also the sidebar and previous/next order.
// Add ACT lesson videos (section: 'lesson') ahead of the question explanations.
export const actVideoLessons: VideoLesson[] = [
  ...actTest2EnglishQuestions,
  ...actTest2MathQuestions,
  ...actTest2ReadingQuestions,
];

const actQuestionCount = actTest2MathQuestions.length;
const actEnglishQuestionCount = Math.max(...actTest2EnglishVideos.map(([, last]) => last));
const actReadingQuestionCount = actTest2ReadingQuestions.length;

export const actVideoHub = {
  name: 'ACT Video Explanations',
  path: '/act_videos',
  contentsLabel: 'Contents · ACT',
  tutoringLink: {
    href: '/act-tutoring',
    text: 'Want help with your ACT performance? → 1-on-1 ACT tutoring in Kansas City.',
  },
  questionsLabel: 'Explanations, Practice Test 2',
  groupLabels: {
    English: 'English Explanations, Practice Test 2',
    Math: 'Math Explanations, Practice Test 2',
    Reading: 'Reading Explanations, Practice Test 2',
  },
  sectionHeadings: {
    English: 'English Explanations',
    Math: 'Math Explanations',
    Reading: 'Reading Explanations',
  },
  intro: `Step-by-step video explanations for all ${actQuestionCount} math questions and ${actEnglishQuestionCount} English questions on ACT Practice Test 2, plus ${actReadingQuestionCount} reading questions.`,
  pageTitle: 'ACT Video Explanations: Practice Test 2 | Hasan Tutoring',
  metaDescription: `Free step-by-step video explanations for all ${actQuestionCount} math and ${actEnglishQuestionCount} English questions on ACT Practice Test 2, plus ${actReadingQuestionCount} reading questions.`,
};
