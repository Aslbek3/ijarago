/* ===== IjaraGo — PocketBase backend bilan ishlaydigan versiya =====
   E'lonlar, mening e'lonlarim va admin moderatsiya — api.js orqali
   PocketBase'ga ulanadi. Saqlangan (♡) ro'yxati shu brauzerda qoladi. */

/* ---------- i18n ---------- */
const I18N = {
  uz: {
    tagline: 'Uy topish oson',
    heroTitle: 'Ijaraga uy qidiryapsizmi?',
    heroSub: "O'zbekiston bo'ylab e'lonlar — bir joyda.",
    searchPh: 'Hudud yoki tuman...',
    search: 'Qidirish',
    listings: "E'lonlar",
    mapTitle: 'Xaritada',
    mapNote: "Xarita internet talab qiladi. Belgini bosing — e'lon ochiladi.",
    savedTitle: 'Saqlangan',
    addTitle: "E'lon berish",
    addNote: "E'lon yuborilgach moderatordan o'tgandan keyin hammaga ko'rinadi.",
    fTitle: 'Sarlavha', fTitlePh: '2 xonali kvartira, markazda',
    fRegion: 'Hudud', fType: 'Ijara turi', fRooms: 'Xonalar soni',
    fArea: 'Maydoni (m²)', fFloor: 'Qavat',
    fPrice: "Narxi (so'm)", fPhone: 'Telefon', fTg: 'Telegram (ixtiyoriy)',
    fDesc: 'Tavsif', fDescPh: 'Uy haqida qisqacha...',
    fPhotos: 'Rasmlar (ixtiyoriy, 6 tagacha)',
    publish: "E'lonni joylash",
    navHome: 'Bosh sahifa', navMap: 'Xarita', navSaved: 'Saqlangan', navAdd: "E'lon", navProfile: 'Profil',
    all: 'Barchasi', daily: 'Kunlik', long: 'Uzoq muddatli',
    allRegions: 'Barcha hududlar', anyRooms: 'Xona soni', anyPrice: 'Narx',
    rooms: 'xona', perDay: "so'm/kun", perMonth: "so'm/oy",
    call: "Qo'ng'iroq", telegram: 'Telegram',
    saved: 'Saqlandi', unsaved: "Saqlanganlardan o'chirildi",
    published: "E'lon yuborildi — moderatordan o'tgach ko'rinadi",
    noResults: "Hech narsa topilmadi. Filtrlarni o'zgartiring.",
    noSaved: "Saqlangan e'lon yo'q. Kartadagi ♡ ni bosing.",
    descTitle: 'Tavsif', contactTitle: "Bog'lanish",
    ownerTitle: "E'lon beruvchi", onMap: 'Xaritada ko‘rish',
    onGoogleMap: '🗺️ Google xarita', onYandexMap: '🗺️ Yandex xarita',
    errTitle: 'Sarlavhani kiriting', errRegion: 'Hududni tanlang',
    errPrice: "Narxni kiriting", errPhone: 'Telefon raqamni kiriting',
    countSuffix: 'ta', floor: 'qavat', chooseRegion: 'Hududni tanlang',
    fDistrict: 'Tuman', allDistricts: 'Barcha tumanlar', chooseDistrict: 'Tumanni tanlang', errDistrict: 'Tumanni tanlang',
    mapOffline: "Xarita yuklanmadi. Internet aloqasini tekshiring.",
    loadError: "Yuklab bo'lmadi, internetni tekshiring.",

    profileTitle: 'Profil',
    authTitle: 'Kirish', authSubmit: 'Davom etish',
    authNote: "Telefon raqamingiz akkauntingizni aniqlaydi — shu raqam bilan istalgan qurilmadan kira olasiz.",
    roleOwner: '🏠 Uy egasi', roleRealtor: '🧑‍💼 Rielter',
    roleOwnerNote: "Uyimni ijaraga beraman", roleRealtorNote: "Mijozlarga uy topib beraman",
    fName: 'Ism familiyangiz', errName: 'Ismingizni kiriting',
    loginIntro: 'Akkauntga kiring', loginIntroNote: "E'lon berish va o'z e'lonlaringizni kuzatish uchun akkaunt oching.",
    myListings: 'Mening e’lonlarim', noMyListings: "Hali e'lon bermagansiz.",
    statusPending: 'Kutilmoqda', statusApproved: 'Tasdiqlangan', statusRejected: 'Rad etilgan',
    logout: 'Akkauntdan chiqish', loggedOut: 'Akkauntdan chiqdingiz',
    welcome: 'Xush kelibsiz, ',
    loginFirst: "Avval akkauntga kiring",
    deleteListing: "E'lonni o'chirish", deleteConfirm: "E'lonni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.",
    deleted: "E'lon o'chirildi",
    goToAdmin: '⚙ Boshqaruv paneli',
    editListing: 'Tahrirlash', editSave: 'Yangilash', editTitle: "E'lonni tahrirlash",
    editSaved: "E'lon yangilandi — qayta moderatsiyaga yuborildi",
    nearMe: 'Yaqin atrofimda', nearMeOk: ' tanlandi (eng yaqin hudud)',
    nearMeFail: 'Joylashuvga ruxsat berilmadi', nearMeUnsupported: 'Brauzer joylashuvni qo‘llamaydi',
    shareBtn: 'Ulashish', linkCopied: 'Havola nusxalandi', shareNotFound: "E'lon topilmadi",

    adminTitle: 'Boshqaruv paneli', adminExit: 'Chiqish',
    pinNote: 'Davom etish uchun admin parolni kiriting.', pinWrong: "Parol noto'g'ri",
    cancel: 'Bekor qilish', enter: 'Kirish', ok: 'Tasdiqlash',
    adminApprove: 'Tasdiqlash', adminReject: 'Rad etish',
    adminEmpty: "Hali e'lon yo'q.", adminOpened: 'Boshqaruv paneli ochildi',
    statTotal: 'Jami', statPending: 'Kutilmoqda', statApproved: 'Tasdiqlangan', statRejected: 'Rad etilgan',
    photoTooMany: "Ko'pi bilan 6 ta rasm yuklash mumkin",

    plansTitle: 'Tariflar', back: 'Orqaga',
    plansNote: 'To‘lov qo‘lda tekshiriladi — "To‘lovni amalga oshirdim" tugmasini bossangiz, so‘rovingiz administratorga yuboriladi.',
    adminPaymentsTitle: "To'lov so'rovlari", adminListingsTitle: "E'lonlar moderatsiyasi",
    popularTag: 'Mashhur', freeTag: 'Bepul', perMonthShort: 'oy',
    chooseBtn: 'Tanlash', currentPlanBtn: 'Joriy tarifingiz', planSuffix: 'obuna',
    payCopy: 'Nusxalash', payCopied: 'Karta raqami nusxalandi',
    payConfirmBtn: "To'lovni amalga oshirdim",
    payPending: "So'rovingiz ko'rib chiqilmoqda — admin tasdiqlagach kuchga kiradi.",
    requestSent: "So'rov yuborildi",
    boostBtn: "Ko'tarish 5 000 so'm", vipBtn: 'VIP 20 000 so‘m',
    boostTitle: "E'lonni ko'tarish", vipTitle: 'VIP belgisi',
    currentPlan: 'Joriy tarif', planExpiresLabel: 'Tugash sanasi', noExpiry: "Belgilanmagan",
    remainingListings: "Qolgan e'lon limiti", remainingBoosts: "Oylik ko'tarish limiti",
    upgradeBtn: 'Tariflarni ko‘rish →',
    paymentTypePlan: 'Tarif', paymentTypeBoost: "E'lonni ko'tarish", paymentTypeVip: 'VIP belgisi',
    adminPaymentsEmpty: "Hozircha to'lov so'rovi yo'q.", approved: 'Tasdiqlandi',
    rejectPaymentConfirm: "So'rovni rad etmoqchimisiz?",
  },
  ru: {
    tagline: 'Найти жильё просто',
    heroTitle: 'Ищете квартиру в аренду?',
    heroSub: 'Объявления по всему Узбекистану — в одном месте.',
    searchPh: 'Регион или район...',
    search: 'Поиск',
    listings: 'Объявления',
    mapTitle: 'На карте',
    mapNote: 'Карта требует интернет. Нажмите на метку — откроется объявление.',
    savedTitle: 'Избранное',
    addTitle: 'Разместить объявление',
    addNote: 'После проверки модератором объявление станет видно всем.',
    fTitle: 'Заголовок', fTitlePh: '2-комнатная квартира, в центре',
    fRegion: 'Регион', fType: 'Тип аренды', fRooms: 'Количество комнат',
    fArea: 'Площадь (м²)', fFloor: 'Этаж',
    fPrice: 'Цена (сум)', fPhone: 'Телефон', fTg: 'Telegram (необязательно)',
    fDesc: 'Описание', fDescPh: 'Кратко о жилье...',
    fPhotos: 'Фото (необязательно, до 6)',
    publish: 'Разместить',
    navHome: 'Главная', navMap: 'Карта', navSaved: 'Избранное', navAdd: 'Подать', navProfile: 'Профиль',
    all: 'Все', daily: 'Посуточно', long: 'Долгосрочно',
    allRegions: 'Все регионы', anyRooms: 'Комнат', anyPrice: 'Цена',
    rooms: 'комн.', perDay: 'сум/сутки', perMonth: 'сум/мес',
    call: 'Позвонить', telegram: 'Telegram',
    saved: 'Сохранено', unsaved: 'Удалено из избранного',
    published: 'Объявление отправлено — появится после проверки модератором',
    noResults: 'Ничего не найдено. Измените фильтры.',
    noSaved: 'Нет сохранённых. Нажмите ♡ на карточке.',
    descTitle: 'Описание', contactTitle: 'Связаться',
    ownerTitle: 'Автор объявления', onMap: 'Показать на карте',
    onGoogleMap: '🗺️ Google карта', onYandexMap: '🗺️ Яндекс карта',
    errTitle: 'Введите заголовок', errRegion: 'Выберите регион',
    errPrice: 'Введите цену', errPhone: 'Введите номер телефона',
    countSuffix: 'шт.', floor: 'этаж', chooseRegion: 'Выберите регион',
    fDistrict: 'Район', allDistricts: 'Все районы', chooseDistrict: 'Выберите район', errDistrict: 'Выберите район',
    mapOffline: 'Карта не загрузилась. Проверьте подключение к интернету.',
    loadError: 'Не удалось загрузить, проверьте интернет.',

    profileTitle: 'Профиль',
    authTitle: 'Вход', authSubmit: 'Продолжить',
    authNote: 'Ваш номер телефона определяет аккаунт — вы можете войти с этим номером с любого устройства.',
    roleOwner: '🏠 Владелец', roleRealtor: '🧑‍💼 Риелтор',
    roleOwnerNote: 'Сдаю своё жильё', roleRealtorNote: 'Помогаю клиентам найти жильё',
    fName: 'Имя и фамилия', errName: 'Введите имя',
    loginIntro: 'Войдите в аккаунт', loginIntroNote: 'Откройте аккаунт, чтобы размещать объявления и отслеживать их.',
    myListings: 'Мои объявления', noMyListings: 'Вы ещё не публиковали объявления.',
    statusPending: 'На проверке', statusApproved: 'Одобрено', statusRejected: 'Отклонено',
    logout: 'Выйти из аккаунта', loggedOut: 'Вы вышли из аккаунта',
    welcome: 'Добро пожаловать, ',
    loginFirst: 'Сначала войдите в аккаунт',
    deleteListing: 'Удалить объявление', deleteConfirm: 'Удалить объявление? Это действие нельзя отменить.',
    deleted: 'Объявление удалено',
    goToAdmin: '⚙ Панель управления',
    editListing: 'Редактировать', editSave: 'Обновить', editTitle: 'Редактирование объявления',
    editSaved: 'Объявление обновлено — отправлено на повторную проверку',
    nearMe: 'Рядом со мной', nearMeOk: ' выбран (ближайший регион)',
    nearMeFail: 'Доступ к геолокации не разрешён', nearMeUnsupported: 'Браузер не поддерживает геолокацию',
    shareBtn: 'Поделиться', linkCopied: 'Ссылка скопирована', shareNotFound: 'Объявление не найдено',

    adminTitle: 'Панель управления', adminExit: 'Выход',
    pinNote: 'Введите пароль администратора.', pinWrong: 'Неверный пароль',
    cancel: 'Отмена', enter: 'Войти', ok: 'Подтвердить',
    adminApprove: 'Одобрить', adminReject: 'Отклонить',
    adminEmpty: 'Пока нет объявлений.', adminOpened: 'Панель управления открыта',
    statTotal: 'Всего', statPending: 'На проверке', statApproved: 'Одобрено', statRejected: 'Отклонено',
    photoTooMany: 'Можно загрузить максимум 6 фото',

    plansTitle: 'Тарифы', back: 'Назад',
    plansNote: 'Оплата проверяется вручную — после нажатия "Я оплатил" запрос отправится администратору.',
    adminPaymentsTitle: 'Запросы на оплату', adminListingsTitle: 'Модерация объявлений',
    popularTag: 'Популярный', freeTag: 'Бесплатно', perMonthShort: 'мес',
    chooseBtn: 'Выбрать', currentPlanBtn: 'Ваш текущий тариф', planSuffix: 'подписка',
    payCopy: 'Скопировать', payCopied: 'Номер карты скопирован',
    payConfirmBtn: 'Я оплатил',
    payPending: 'Ваш запрос на рассмотрении — вступит в силу после подтверждения администратором.',
    requestSent: 'Запрос отправлен',
    boostBtn: 'Поднять 5 000 сум', vipBtn: 'VIP 20 000 сум',
    boostTitle: 'Поднять объявление', vipTitle: 'VIP-метка',
    currentPlan: 'Текущий тариф', planExpiresLabel: 'Дата окончания', noExpiry: 'Не указана',
    remainingListings: 'Лимит объявлений', remainingBoosts: 'Лимит поднятий в месяц',
    upgradeBtn: 'Смотреть тарифы →',
    paymentTypePlan: 'Тариф', paymentTypeBoost: 'Поднятие объявления', paymentTypeVip: 'VIP-метка',
    adminPaymentsEmpty: 'Пока нет запросов на оплату.', approved: 'Подтверждено',
    rejectPaymentConfirm: 'Отклонить запрос?',
  },
};

/* O'zbekistonning 14 ta hududi. Koordinatalar - hudud markazi (taxminiy). */
const REGIONS = [
  { key: 'toshkent-sh',     uz: 'Toshkent shahri', ru: 'город Ташкент', lat: 41.311, lng: 69.280 },
  { key: 'toshkent-v',      uz: 'Toshkent viloyati', ru: 'Ташкентская обл.', lat: 41.000, lng: 69.600 },
  { key: 'andijon',         uz: 'Andijon', ru: 'Андижан', lat: 40.783, lng: 72.350 },
  { key: 'buxoro',          uz: 'Buxoro', ru: 'Бухара', lat: 39.767, lng: 64.423 },
  { key: 'fargona',         uz: "Farg'ona", ru: 'Фергана', lat: 40.389, lng: 71.783 },
  { key: 'jizzax',          uz: 'Jizzax', ru: 'Джизак', lat: 40.116, lng: 67.842 },
  { key: 'xorazm',          uz: 'Xorazm', ru: 'Хорезм', lat: 41.550, lng: 60.631 },
  { key: 'namangan',        uz: 'Namangan', ru: 'Наманган', lat: 40.998, lng: 71.672 },
  { key: 'navoiy',          uz: 'Navoiy', ru: 'Навои', lat: 40.103, lng: 65.374 },
  { key: 'qashqadaryo',     uz: 'Qashqadaryo', ru: 'Кашкадарья', lat: 38.861, lng: 65.789 },
  { key: 'qoraqalpogiston', uz: "Qoraqalpog'iston", ru: 'Каракалпакстан', lat: 42.460, lng: 59.600 },
  { key: 'samarqand',       uz: 'Samarqand', ru: 'Самарканд', lat: 39.654, lng: 66.959 },
  { key: 'sirdaryo',        uz: 'Sirdaryo', ru: 'Сырдарья', lat: 40.489, lng: 68.784 },
  { key: 'surxondaryo',     uz: 'Surxondaryo', ru: 'Сурхандарья', lat: 37.224, lng: 67.278 },
];

/* Tumanlar. Hozircha faqat Toshkent shahri (12 ta tuman); boshqa hududlar
   rasmiy ro'yxatdan to'ldiriladi. Koordinatalar taxminiy. */
const DISTRICTS = {
  'toshkent-sh': [
    { key: 'bektemir',      uz: 'Bektemir',        ru: 'Бектемир',      lat: 41.210, lng: 69.335 },
    { key: 'chilonzor',     uz: 'Chilonzor',       ru: 'Чиланзар',      lat: 41.275, lng: 69.204 },
    { key: 'yashnobod',     uz: 'Yashnobod',       ru: 'Яшнабад',       lat: 41.295, lng: 69.330 },
    { key: 'yakkasaroy',    uz: 'Yakkasaroy',      ru: 'Яккасарай',     lat: 41.290, lng: 69.260 },
    { key: 'mirobod',       uz: 'Mirobod',         ru: 'Мирабад',       lat: 41.285, lng: 69.285 },
    { key: 'mirzo-ulugbek', uz: "Mirzo Ulug'bek",  ru: 'Мирзо-Улугбек', lat: 41.340, lng: 69.330 },
    { key: 'olmazor',       uz: 'Olmazor',         ru: 'Алмазар',       lat: 41.345, lng: 69.230 },
    { key: 'sergeli',       uz: 'Sergeli',         ru: 'Сергели',       lat: 41.225, lng: 69.220 },
    { key: 'uchtepa',       uz: 'Uchtepa',         ru: 'Учтепа',        lat: 41.300, lng: 69.180 },
    { key: 'shayxontohur',  uz: 'Shayxontohur',    ru: 'Шайхантахур',   lat: 41.325, lng: 69.250 },
    { key: 'yunusobod',     uz: 'Yunusobod',       ru: 'Юнусабад',      lat: 41.367, lng: 69.289 },
    { key: 'yangihayot',    uz: 'Yangihayot',      ru: 'Янгихаёт',      lat: 41.275, lng: 69.130 },
  ],
};

const PHOTO_STYLES = [
  'linear-gradient(135deg,#1f8064,#17634f)',
  'linear-gradient(135deg,#2b7a9b,#1d5a74)',
  'linear-gradient(135deg,#8a6d3b,#6b5129)',
  'linear-gradient(135deg,#5e60ce,#4245a8)',
  'linear-gradient(135deg,#c2560a,#9a4208)',
  'linear-gradient(135deg,#157f4a,#0f5e36)',
];
const PHOTO_ICONS = ['🏢', '🏠', '🏡', '🌇', '🪟', '🛋️'];
const AVATAR_COLORS = ['#17634f', '#2a9d8f', '#2b7a9b', '#5e60ce', '#c9811b', '#8a6d3b'];

const STATUS_LABEL_KEY = { pending: 'statusPending', approved: 'statusApproved', rejected: 'statusRejected' };
const LOGO_TAPS_NEEDED = 5;

/* ---------- Tariflar (ko'rinish uchun — to'lov qo'lda tekshiriladi) ----------
   Raqamlar (limit, narx) — namuna, keyinroq osongina o'zgartirish mumkin. */
const DEMO_CARD = { number: '8600 1234 5678 9012', holder: 'IJARAGO DEMO' };

const PLANS = [
  {
    key: 'free', price: 0, popular: false, listingsLimit: 1, boostsPerMonth: 0, vipIncluded: 0,
    name: { uz: 'Bepul', ru: 'Бесплатно' },
    features: {
      uz: [
        { text: "1 ta faol e'lon", on: true },
        { text: 'Asosiy qidiruvda ko‘rinish', on: true },
        { text: "Ko'tarish imkoniyati", on: false },
        { text: 'VIP belgi', on: false },
        { text: "Ustuvor qo'llab-quvvatlash", on: false },
      ],
      ru: [
        { text: '1 активное объявление', on: true },
        { text: 'Видимость в обычном поиске', on: true },
        { text: 'Поднятие объявления', on: false },
        { text: 'VIP-метка', on: false },
        { text: 'Приоритетная поддержка', on: false },
      ],
    },
  },
  {
    key: 'start', price: 99000, popular: false, listingsLimit: 5, boostsPerMonth: 2, vipIncluded: 0,
    name: { uz: 'Start', ru: 'Старт' },
    features: {
      uz: [
        { text: "5 ta faol e'lon", on: true },
        { text: "Oyiga 2 ta bepul ko'tarish", on: true },
        { text: 'Asosiy qidiruvda ko‘rinish', on: true },
        { text: 'VIP belgi', on: false },
        { text: "Ustuvor qo'llab-quvvatlash", on: false },
      ],
      ru: [
        { text: '5 активных объявлений', on: true },
        { text: '2 бесплатных поднятия в месяц', on: true },
        { text: 'Видимость в обычном поиске', on: true },
        { text: 'VIP-метка', on: false },
        { text: 'Приоритетная поддержка', on: false },
      ],
    },
  },
  {
    key: 'pro', price: 199000, popular: true, listingsLimit: 15, boostsPerMonth: 10, vipIncluded: 1,
    name: { uz: 'Pro', ru: 'Про' },
    features: {
      uz: [
        { text: "15 ta faol e'lon", on: true },
        { text: "Oyiga 10 ta bepul ko'tarish", on: true },
        { text: '1 ta VIP belgi', on: true },
        { text: 'Qidiruvda yuqorida chiqish', on: true },
        { text: "Ustuvor qo'llab-quvvatlash", on: true },
      ],
      ru: [
        { text: '15 активных объявлений', on: true },
        { text: '10 бесплатных поднятий в месяц', on: true },
        { text: '1 VIP-метка', on: true },
        { text: 'Показ выше в поиске', on: true },
        { text: 'Приоритетная поддержка', on: true },
      ],
    },
  },
  {
    key: 'agency', price: 499000, popular: false, listingsLimit: 50, boostsPerMonth: 999, vipIncluded: 5,
    name: { uz: 'Agentlik', ru: 'Агентство' },
    features: {
      uz: [
        { text: "50 ta faol e'lon", on: true },
        { text: "Cheksiz ko'tarish", on: true },
        { text: '5 ta VIP belgi', on: true },
        { text: 'Qidiruvda eng yuqorida', on: true },
        { text: 'Shaxsiy menejer', on: true },
      ],
      ru: [
        { text: '50 активных объявлений', on: true },
        { text: 'Неограниченные поднятия', on: true },
        { text: '5 VIP-меток', on: true },
        { text: 'Показ в самом верху поиска', on: true },
        { text: 'Персональный менеджер', on: true },
      ],
    },
  },
];

function planByKey(key) { return PLANS.find((p) => p.key === key) || PLANS[0]; }
function planName(plan) { return plan.name[state.lang] || plan.name.uz; }
function planFeatures(plan) { return plan.features[state.lang] || plan.features.uz; }

/* ---------- Holat ---------- */
const LANG_KEY = 'ijarago_lang';
const SAVED_KEY = 'ijarago_saved';

const state = {
  lang: 'uz',
  type: 'all',
  region: '',
  district: '',
  rooms: '',
  price: '',
  query: '',
  view: 'home',
  authRole: 'owner',
  editingId: null,
};

let listingsCache = [];
let myListingsCache = [];
let map = null;
let markerLayer = null;
let toastTimer = null;
let logoTaps = 0;
let logoTapTimer = null;
let confirmCallback = null;
let selectedPhotoFiles = [];

function qs(id) { return document.getElementById(id); }

/* HTML'ga qo'yiladigan har qanday ma'lumot shu yerdan o'tadi (XSS himoyasi) */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || key; }

function readJson(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { return fallback; }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

function getSaved() { return readJson(SAVED_KEY, []); }

async function loadListings() {
  try {
    listingsCache = await Api.listApproved();
  } catch (e) {
    showToast(t('loadError'));
  }
}

function regionById(key) { return REGIONS.find((r) => r.key === key); }
function regionName(key) {
  const r = regionById(key);
  return r ? r[state.lang] : key;
}
function districtsOf(regionKey) { return DISTRICTS[regionKey] || []; }
function districtById(regionKey, key) { return districtsOf(regionKey).find((d) => d.key === key); }
function locText(item) {
  const d = item.district ? districtById(item.region, item.district) : null;
  return d ? d[state.lang] + ', ' + regionName(item.region) : regionName(item.region);
}
function coordsOf(item) {
  if (item.lat && item.lng) return [item.lat, item.lng];
  const d = item.district ? districtById(item.region, item.district) : null;
  if (d) return [d.lat, d.lng];
  const r = regionById(item.region);
  return r ? [r.lat, r.lng] : [41.3, 69.25];
}
/* Telegram username berilgan bo'lsa shunga, bo'lmasa telefon raqami orqali
   (bu raqam Telegram'ga ulangan bo'lsa chat ochiladi — username shart emas). */
function telegramUrl(item) {
  if (item.telegram) {
    const handle = String(item.telegram).replace(/^@/, '').replace(/[^A-Za-z0-9_]/g, '');
    return `https://t.me/${encodeURIComponent(handle)}`;
  }
  const digits = String(item.phone || '').replace(/\D/g, '');
  return `https://t.me/+${digits}`;
}
function googleMapsUrl(lat, lng) { return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`; }
function yandexMapsUrl(lat, lng) { return `https://yandex.com/maps/?pt=${lng},${lat}&z=16&l=map`; }
function titleOf(item) { return item.title || ''; }
function descOf(item) { return item.description || ''; }
function priceText(item) {
  const n = Number(item.price).toLocaleString('ru-RU');
  return n + ' ' + (item.type === 'daily' ? t('perDay') : t('perMonth'));
}
function photoStyle(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return { bg: PHOTO_STYLES[h % PHOTO_STYLES.length], icon: PHOTO_ICONS[h % PHOTO_ICONS.length] };
}
function avatarColor(id) {
  let h = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name) {
  return String(name || '').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

/* Birinchi rasm bo'lsa <img loading="lazy">, bo'lmasa rangli placeholder qaytaradi.
   Rasm — haqiqiy <img> tegi, shuning uchun brauzer uni ko'rinish maydoniga
   yetib kelgandagina yuklaydi (lazy-load). */
function photoInnerHtml(item, size) {
  if (item.photos && item.photos.length) {
    const url = Api.photoUrl(item, item.photos[0], size === 'big' ? '800x600' : '400x300');
    return `<img class="listing-img" src="${esc(url)}" alt="" loading="lazy" decoding="async">`;
  }
  const p = photoStyle(item.id);
  return `<div class="listing-photo-fallback" style="background:${p.bg}"><span>${p.icon}</span></div>`;
}

function formatDateShort(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function showToast(message) {
  const el = qs('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Til ---------- */
function applyLang() {
  document.documentElement.lang = state.lang;
  qs('lang-label').textContent = state.lang.toUpperCase();
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  buildTabs();
  buildFilters();
  buildAddSelects();
  renderAll();
  if (state.view === 'profile') renderProfile();
}

function toggleLang() {
  state.lang = state.lang === 'uz' ? 'ru' : 'uz';
  writeJson(LANG_KEY, state.lang);
  applyLang();
}

/* ---------- Boshqaruv elementlari ---------- */
function buildTabs() {
  const types = [['all', t('all')], ['daily', t('daily')], ['long', t('long')]];
  qs('type-tabs').innerHTML = types.map(([key, label]) =>
    `<button type="button" data-type="${esc(key)}" class="${state.type === key ? 'active' : ''}">${esc(label)}</button>`
  ).join('');
}

function buildFilters() {
  qs('f-region').innerHTML = `<option value="">${esc(t('allRegions'))}</option>` +
    REGIONS.map((r) => `<option value="${esc(r.key)}"${state.region === r.key ? ' selected' : ''}>${esc(r[state.lang])}</option>`).join('');

  const ds = districtsOf(state.region);
  qs('f-district').hidden = ds.length === 0;
  qs('f-district').innerHTML = `<option value="">${esc(t('allDistricts'))}</option>` +
    ds.map((d) => `<option value="${esc(d.key)}"${state.district === d.key ? ' selected' : ''}>${esc(d[state.lang])}</option>`).join('');

  qs('f-rooms').innerHTML = `<option value="">${esc(t('anyRooms'))}</option>` +
    [1, 2, 3, 4].map((n) => `<option value="${n}"${String(state.rooms) === String(n) ? ' selected' : ''}>${n}+ ${esc(t('rooms'))}</option>`).join('');

  const bands = [['', t('anyPrice')], ['lo', '< 500 000'], ['mid', '500 000 – 3 000 000'], ['hi', '> 3 000 000']];
  qs('f-price').innerHTML = bands.map(([key, label]) =>
    `<option value="${esc(key)}"${state.price === key ? ' selected' : ''}>${esc(label)}</option>`).join('');
}

function buildAddSelects() {
  const keep = { region: qs('a-region').value, type: qs('a-type').value, rooms: qs('a-rooms').value, district: qs('a-district').value };

  qs('a-region').innerHTML = `<option value="">${esc(t('chooseRegion'))}</option>` +
    REGIONS.map((r) => `<option value="${esc(r.key)}">${esc(r[state.lang])}</option>`).join('');
  qs('a-type').innerHTML =
    `<option value="long">${esc(t('long'))}</option><option value="daily">${esc(t('daily'))}</option>`;
  qs('a-rooms').innerHTML = [1, 2, 3, 4, 5].map((n) => `<option value="${n}">${n} ${esc(t('rooms'))}</option>`).join('');

  if (keep.region) qs('a-region').value = keep.region;
  if (keep.type) qs('a-type').value = keep.type;
  if (keep.rooms) qs('a-rooms').value = keep.rooms;
  buildAddDistricts(keep.district);
}

function buildAddDistricts(selected) {
  const ds = districtsOf(qs('a-region').value);
  qs('a-district-wrap').hidden = ds.length === 0;
  qs('a-district').innerHTML = `<option value="">${esc(t('chooseDistrict'))}</option>` +
    ds.map((d) => `<option value="${esc(d.key)}">${esc(d[state.lang])}</option>`).join('');
  if (selected && ds.some((d) => d.key === selected)) qs('a-district').value = selected;
}

/* ---------- Filtrlash ---------- */
function filtered() {
  const q = state.query.trim().toLowerCase();
  const list = listingsCache.filter((item) => {
    if (state.type !== 'all' && item.type !== state.type) return false;
    if (state.region && item.region !== state.region) return false;
    if (state.district && item.district !== state.district) return false;
    if (state.rooms && Number(item.rooms) < Number(state.rooms)) return false;
    if (state.price === 'lo' && item.price >= 500000) return false;
    if (state.price === 'mid' && (item.price < 500000 || item.price > 3000000)) return false;
    if (state.price === 'hi' && item.price <= 3000000) return false;
    if (q) {
      const hay = (titleOf(item) + ' ' + locText(item)).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  /* VIP e'lonlar ro'yxat boshida (tartib ichida esa -created saqlanadi) */
  return [...list].sort((a, b) => (b.vip ? 1 : 0) - (a.vip ? 1 : 0));
}

/* ---------- Chizish ---------- */
function cardHtml(item) {
  const fav = getSaved().includes(item.id);
  return `
    <article class="listing${item.vip ? ' is-vip' : ''}" data-action="open" data-id="${esc(item.id)}">
      <div class="listing-photo">
        ${photoInnerHtml(item)}
        ${item.vip ? `<span class="vip-badge">⭐ VIP</span>` : ''}
        <span class="listing-badge">${esc(item.type === 'daily' ? t('daily') : t('long'))}</span>
        <button type="button" class="listing-fav" data-action="fav" data-id="${esc(item.id)}">${fav ? '♥' : '♡'}</button>
      </div>
      <div class="listing-body">
        <div class="listing-price">${esc(priceText(item))}</div>
        <div class="listing-title">${esc(titleOf(item))}</div>
        <div class="listing-meta-row">
          <span class="meta-chip">📍 ${esc(locText(item))}</span>
          <span class="meta-chip">${esc(item.rooms)} ${esc(t('rooms'))}</span>
          <span class="meta-chip">${esc(item.area || 0)} m²</span>
        </div>
      </div>
    </article>
  `;
}

function emptyStateHtml(icon, text) {
  return `<div class="empty-state"><span class="empty-icon">${icon}</span><span class="empty-text">${esc(text)}</span></div>`;
}

function skeletonCardsHtml(count) {
  return Array.from({ length: count }).map(() => `
    <div class="listing skeleton-card">
      <div class="listing-photo skeleton-shimmer"></div>
      <div class="listing-body">
        <div class="skeleton-line skeleton-shimmer" style="width:45%;height:20px"></div>
        <div class="skeleton-line skeleton-shimmer" style="width:75%;height:14px;margin-top:8px"></div>
        <div class="skeleton-line skeleton-shimmer" style="width:55%;height:12px;margin-top:8px"></div>
      </div>
    </div>
  `).join('');
}

function renderHome() {
  const list = filtered();
  qs('listing-list').innerHTML = list.length
    ? list.map(cardHtml).join('')
    : emptyStateHtml('🏠', t('noResults'));
  qs('home-count').textContent = list.length + ' ' + t('countSuffix');
}

function renderSaved() {
  const ids = getSaved();
  const list = listingsCache.filter((item) => ids.includes(item.id));
  qs('saved-list').innerHTML = list.length
    ? list.map(cardHtml).join('')
    : emptyStateHtml('♡', t('noSaved'));
  qs('saved-count').textContent = list.length + ' ' + t('countSuffix');
}

function renderAll() {
  renderHome();
  renderSaved();
  if (state.view === 'map') renderMap();
}

/* ---------- Xarita ---------- */
function renderMap() {
  if (typeof L === 'undefined') {
    qs('map').innerHTML = emptyStateHtml('🗺️', t('mapOffline'));
    return;
  }
  if (!map) {
    map = L.map('map').setView([41.3, 69.25], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  }
  markerLayer.clearLayers();

  const list = filtered();
  list.forEach((item) => {
    const [lat, lng] = coordsOf(item);
    L.marker([lat, lng]).addTo(markerLayer)
      .bindPopup(`<b>${esc(titleOf(item))}</b><br>${esc(priceText(item))}`)
      .on('click', () => openDetail(item.id));
  });

  qs('map-count').textContent = list.length + ' ' + t('countSuffix');
  setTimeout(() => map.invalidateSize(), 50);
}

/* ---------- Tafsilot ---------- */
function openDetail(id, fromHash) {
  const item = listingsCache.find((x) => x.id === id);
  if (!item) {
    if (fromHash) showToast(t('shareNotFound'));
    return;
  }
  const [lat, lng] = coordsOf(item);
  const fav = getSaved().includes(item.id);

  qs('detail-content').innerHTML = `
    <div class="detail-photo">
      ${item.photos && item.photos.length
        ? `<img class="listing-img" src="${esc(Api.photoUrl(item, item.photos[0], '800x600'))}" alt="" loading="lazy" decoding="async">`
        : `<span class="photo-glyph">${photoStyle(item.id).icon}</span>`}
      <span class="detail-photo-badge">${esc(item.type === 'daily' ? t('daily') : t('long'))}</span>
    </div>
    <div class="detail-head-row">
      <div>
        <div class="detail-price">${esc(priceText(item))}</div>
        <div class="detail-title">${esc(titleOf(item))}</div>
        <div class="detail-meta">${esc(locText(item))}</div>
      </div>
      <button type="button" class="icon-btn fav-btn${fav ? ' active' : ''}" data-action="fav" data-id="${esc(item.id)}">${fav ? '♥' : '♡'}</button>
    </div>

    <div class="detail-grid">
      <div class="detail-cell"><b>${esc(item.rooms)}</b><span>${esc(t('rooms'))}</span></div>
      <div class="detail-cell"><b>${esc(item.area || '—')}</b><span>m²</span></div>
      <div class="detail-cell"><b>${esc(item.floor || '—')}</b><span>${esc(t('floor'))}</span></div>
    </div>

    ${descOf(item) ? `<div class="detail-section"><h4>${esc(t('descTitle'))}</h4><p>${esc(descOf(item))}</p></div>` : ''}

    <div class="detail-section">
      <h4>${esc(t('contactTitle'))}</h4>
      <div class="btn-row">
        <a class="btn btn-primary" href="tel:${esc(String(item.phone).replace(/\s/g, ''))}">📞 ${esc(t('call'))}</a>
        <a class="btn btn-tg" href="${esc(telegramUrl(item))}" target="_blank" rel="noopener">✈️ ${esc(t('telegram'))}</a>
      </div>
      <div class="btn-row">
        <a class="btn btn-outline" href="${esc(googleMapsUrl(lat, lng))}" target="_blank" rel="noopener">${esc(t('onGoogleMap'))}</a>
        <a class="btn btn-outline" href="${esc(yandexMapsUrl(lat, lng))}" target="_blank" rel="noopener">${esc(t('onYandexMap'))}</a>
      </div>
      <button type="button" class="btn btn-outline btn-block" data-action="share-listing" data-id="${esc(item.id)}">📤 ${esc(t('shareBtn'))}</button>
    </div>
  `;
  qs('modal-detail').classList.add('open');
  if (!fromHash && location.hash !== '#/listing/' + id) {
    history.pushState(null, '', '#/listing/' + id);
  }
}

function closeDetailModal() {
  closeModal(qs('modal-detail'));
  if (location.hash.startsWith('#/listing/')) {
    history.pushState(null, '', location.pathname + location.search);
  }
}

async function shareListing(id) {
  const item = listingsCache.find((x) => x.id === id);
  if (!item) return;
  const url = location.origin + location.pathname + '#/listing/' + id;
  if (navigator.share) {
    try { await navigator.share({ title: titleOf(item), text: priceText(item), url }); }
    catch (e) { /* foydalanuvchi bekor qildi — xato emas */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    showToast(t('linkCopied'));
  } catch (e) {
    showToast(url);
  }
}

/* ---------- Joylashuv (Yaqin atrofimda) ---------- */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearMe() {
  if (!navigator.geolocation) { showToast(t('nearMeUnsupported')); return; }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      let nearest = null, best = Infinity;
      REGIONS.forEach((r) => {
        const d = haversineKm(latitude, longitude, r.lat, r.lng);
        if (d < best) { best = d; nearest = r; }
      });
      if (!nearest) return;
      state.region = nearest.key;
      state.district = '';
      buildFilters();
      renderAll();
      showToast(nearest[state.lang] + t('nearMeOk'));
    },
    () => showToast(t('nearMeFail')),
    { timeout: 8000 },
  );
}

/* ---------- Saqlash ---------- */
function toggleFav(id) {
  const saved = getSaved();
  const i = saved.indexOf(id);
  if (i >= 0) { saved.splice(i, 1); showToast(t('unsaved')); }
  else { saved.push(id); showToast(t('saved')); }
  writeJson(SAVED_KEY, saved);
  renderAll();
  if (qs('modal-detail').classList.contains('open')) openDetail(id);
}

/* ---------- Navigatsiya ---------- */
function showView(name) {
  if (name === 'admin' && !Api.isAdminUnlocked()) { requestAdmin(); return; }

  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  qs('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  qs('appbar').classList.toggle('compact', name !== 'home');
  state.view = name;
  window.scrollTo(0, 0);
  if (name === 'map') renderMap();
  if (name === 'saved') renderSaved();
  if (name === 'profile') renderProfile();
  if (name === 'admin') renderAdmin();
  if (name === 'plans') renderPlans();
}

/* ---------- Kirish / ro'yxatdan o'tish ---------- */
function openAuthModal(role) {
  state.authRole = role === 'realtor' ? 'realtor' : 'owner';
  renderAuthForm();
  qs('modal-auth').classList.add('open');
}

function renderAuthForm() {
  document.querySelectorAll('[data-role-tab]').forEach((b) => {
    b.classList.toggle('active', b.dataset.roleTab === state.authRole);
  });
}

const AUTH_FIELD_IDS = ['auth-name', 'auth-phone'];

function setErr(id, msg) {
  const input = qs(id);
  const err = qs('err-' + id);
  if (input) input.classList.toggle('invalid', Boolean(msg));
  if (err) err.textContent = msg || '';
}

function validateAuthForm() {
  let ok = true;
  AUTH_FIELD_IDS.forEach((id) => setErr(id, ''));
  if (!qs('auth-name').value.trim()) { setErr('auth-name', t('errName')); ok = false; }
  const phone = qs('auth-phone').value.trim();
  if (!phone) { setErr('auth-phone', t('errPhone')); ok = false; }
  else if (phone.replace(/\D/g, '').length < 9) { setErr('auth-phone', t('errPhone')); ok = false; }
  return ok;
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  if (!validateAuthForm()) return;

  const fields = {
    role: state.authRole,
    name: qs('auth-name').value.trim(),
    phone: qs('auth-phone').value.trim(),
    telegram: qs('auth-tg').value.trim(),
  };

  const btn = qs('auth-form').querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    const session = await Api.authenticateAccount(fields);
    closeModal(qs('modal-auth'));
    qs('auth-form').reset();
    renderProfile();
    showToast(t('welcome') + session.record.name);
  } catch (err) {
    showToast('Xatolik: ' + err.message);
  } finally {
    btn.disabled = false;
  }
}

function logout() {
  Api.logoutUser();
  renderProfile();
  showToast(t('loggedOut'));
}

/* ---------- Profil ---------- */
async function renderProfile() {
  if (Api.currentUser()) await Api.refreshCurrentUser();
  const acc = Api.currentUser();
  const box = qs('profile-view');

  if (!acc) {
    box.innerHTML = `
      <div class="auth-intro">
        <div class="auth-emoji">👤</div>
        <h3>${esc(t('loginIntro'))}</h3>
        <p>${esc(t('loginIntroNote'))}</p>
      </div>
      <div class="role-cards">
        <button type="button" class="role-card" data-action="open-auth" data-role="owner">
          <span class="role-icon">🏠</span><b>${esc(t('roleOwner'))}</b><small>${esc(t('roleOwnerNote'))}</small>
        </button>
        <button type="button" class="role-card" data-action="open-auth" data-role="realtor">
          <span class="role-icon">🧑‍💼</span><b>${esc(t('roleRealtor'))}</b><small>${esc(t('roleRealtorNote'))}</small>
        </button>
      </div>
      <p class="note">${esc(t('authNote'))}</p>
    `;
    return;
  }

  const plan = planByKey(acc.plan || 'free');
  const expiresText = acc.planExpires ? formatDateShort(acc.planExpires) : t('noExpiry');

  box.innerHTML = `
    <div class="profile-card">
      <div class="avatar" style="background:${avatarColor(acc.id)}">${esc(initials(acc.name))}</div>
      <div class="profile-id">
        <b>${esc(acc.name)}</b>
        <span class="muted">${esc(acc.phone)}</span>
        <span class="role-badge">${acc.role === 'realtor' ? esc(t('roleRealtor')) : esc(t('roleOwner'))}</span>
      </div>
    </div>

    <div class="profile-block">
      <h4>${esc(t('currentPlan'))}</h4>
      <div class="plan-badge-row">
        <span class="plan-badge plan-badge-${esc(plan.key)}">${esc(planName(plan))}</span>
        ${plan.price ? `<span class="muted">${plan.price.toLocaleString('ru-RU')} so'm/oy</span>` : ''}
      </div>
      <p class="muted">${esc(t('planExpiresLabel'))}: ${esc(expiresText)}</p>
      <p class="muted" id="profile-limits">...</p>
      <button type="button" class="link-btn" data-action="go-plans">${esc(t('upgradeBtn'))}</button>
    </div>

    <div class="profile-block">
      <h4>${esc(t('myListings'))}</h4>
      <div id="my-listings-list"></div>
    </div>
    ${Api.isAdminUnlocked() ? `<button type="button" class="btn btn-secondary btn-block" data-action="go-admin">${esc(t('goToAdmin'))}</button>` : ''}
    <button type="button" class="btn btn-secondary btn-block" data-action="logout">${esc(t('logout'))}</button>
  `;

  const mineBox = qs('my-listings-list');
  mineBox.innerHTML = `<p class="muted">...</p>`;
  try {
    const mine = await Api.listMine();
    myListingsCache = mine;

    const limitsEl = qs('profile-limits');
    if (limitsEl) {
      const remainingListings = Math.max(0, plan.listingsLimit - mine.length);
      limitsEl.textContent = `${t('remainingListings')}: ${remainingListings} / ${plan.listingsLimit} · ${t('remainingBoosts')}: ${plan.boostsPerMonth >= 999 ? '∞' : plan.boostsPerMonth}`;
    }

    mineBox.innerHTML = mine.length ? mine.map((item) => `
      <div class="admin-listing-card${item.vip ? ' is-vip' : ''}">
        <div class="admin-listing-top">
          <b>${esc(titleOf(item) || t('listings'))}</b>
          <span class="badge badge-${esc(item.status)}">${esc(t(STATUS_LABEL_KEY[item.status] || 'statusPending'))}</span>
        </div>
        <div class="admin-listing-meta">${esc(locText(item))} · ${esc(priceText(item))}</div>
        ${item.vip ? `<div class="admin-listing-meta">⭐ VIP</div>` : ''}
        ${item.note ? `<div class="admin-listing-meta">${esc(item.note)}</div>` : ''}
        <div class="listing-boost-row">
          <button type="button" class="btn btn-outline" data-action="boost-listing" data-id="${esc(item.id)}">${esc(t('boostBtn'))}</button>
          <button type="button" class="btn btn-outline" data-action="vip-listing" data-id="${esc(item.id)}">${esc(t('vipBtn'))}</button>
        </div>
        <button type="button" class="edit-btn" data-action="edit-listing" data-id="${esc(item.id)}">${esc(t('editListing'))}</button>
        <button type="button" class="remove-btn" data-action="delete-listing" data-id="${esc(item.id)}">${esc(t('deleteListing'))}</button>
      </div>
    `).join('') : `<p class="muted">${esc(t('noMyListings'))}</p>`;
  } catch (e) {
    mineBox.innerHTML = `<p class="muted">${esc(t('loadError'))}</p>`;
  }
}

function deleteListing(id) {
  confirmDialog(t('deleteConfirm'), async () => {
    try {
      await Api.deleteListing(id);
      showToast(t('deleted'));
      await loadListings();
      renderAll();
      renderProfile();
    } catch (e) {
      showToast('Xatolik: ' + e.message);
    }
  });
}

/* ---------- Tariflar ---------- */
function planFeaturesHtml(plan) {
  return planFeatures(plan).map((f) => `
    <li class="${f.on ? '' : 'off'}"><span class="plan-check">${f.on ? '✓' : '✕'}</span><span>${esc(f.text)}</span></li>
  `).join('');
}

async function renderPlans() {
  if (Api.currentUser()) await Api.refreshCurrentUser();
  const acc = Api.currentUser();
  qs('plans-list').innerHTML = PLANS.map((plan) => `
    <div class="plan-card${plan.popular ? ' popular' : ''}">
      ${plan.popular ? `<span class="plan-popular-tag">${esc(t('popularTag'))}</span>` : ''}
      <div class="plan-name">${esc(planName(plan))}</div>
      <div class="plan-price">${plan.price ? plan.price.toLocaleString('ru-RU') + " so'm" : esc(t('freeTag'))}${plan.price ? ` <small>/ ${esc(t('perMonthShort'))}</small>` : ''}</div>
      <ul class="plan-features">${planFeaturesHtml(plan)}</ul>
      ${plan.key === 'free'
        ? ''
        : `<button type="button" class="btn btn-primary btn-block" data-action="buy-plan" data-key="${plan.key}">${acc && acc.plan === plan.key ? esc(t('currentPlanBtn')) : esc(t('chooseBtn'))}</button>`}
    </div>
  `).join('');
}

/* ---------- To'lov oynasi (tarif / ko'tarish / VIP uchun umumiy) ----------
   DIQQAT: to'lov avtomatik tekshirilmaydi. "To'lovni amalga oshirdim"
   bosilganda faqat so'rov yuboriladi — admin uni qo'lda tasdiqlaydi. */
let paymentContext = null;

function openPaymentModal({ title, price, type, planKey, listingId }) {
  if (!Api.currentUser()) { showToast(t('loginFirst')); showView('profile'); return; }
  paymentContext = { type, planKey, listingId, amount: price };
  qs('payment-content').innerHTML = `
    <h3>${esc(title)}</h3>
    <div class="pay-plan-price">${Number(price).toLocaleString('ru-RU')} so'm</div>
    <div class="pay-card-box">
      <span class="pay-demo-tag">DEMO</span>
      <div class="pay-card-number">${esc(DEMO_CARD.number)}</div>
      <div class="pay-card-holder">${esc(DEMO_CARD.holder)}</div>
      <button type="button" class="pay-copy-btn" data-action="pay-copy">${esc(t('payCopy'))}</button>
    </div>
    <button type="button" class="btn btn-primary btn-block" data-action="pay-confirm">${esc(t('payConfirmBtn'))}</button>
    <div id="pay-status-box"></div>
  `;
  qs('modal-payment').classList.add('open');
}

function handlePayCopy() {
  const text = DEMO_CARD.number.replace(/\s/g, '');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast(t('payCopied'))).catch(() => showToast(DEMO_CARD.number));
  } else {
    showToast(DEMO_CARD.number);
  }
}

async function handlePayConfirm(btn) {
  if (!paymentContext) return;
  btn.disabled = true;
  try {
    await Api.createPaymentRequest(paymentContext);
    qs('pay-status-box').innerHTML = `<div class="pay-status">${esc(t('payPending'))}</div>`;
    btn.style.display = 'none';
    showToast(t('requestSent'));
  } catch (e) {
    showToast('Xatolik: ' + e.message);
    btn.disabled = false;
  }
}

/* ---------- Boshqaruv paneli (admin) ---------- */
function requestAdmin() {
  if (Api.isAdminUnlocked()) { showView('admin'); return; }
  qs('pin').value = '';
  setErr('pin', '');
  qs('modal-pin').classList.add('open');
  setTimeout(() => qs('pin').focus(), 50);
}

function exitAdmin() {
  Api.adminLogout();
  if (location.hash === '#admin') history.replaceState(null, '', location.pathname + location.search);
  showView('home');
  showToast(t('loggedOut'));
}

function handleLogoTap() {
  logoTaps += 1;
  clearTimeout(logoTapTimer);
  logoTapTimer = setTimeout(() => { logoTaps = 0; }, 3000);
  if (logoTaps >= LOGO_TAPS_NEEDED) {
    logoTaps = 0;
    requestAdmin();
  }
}

let adminPaymentsCache = [];

function paymentTypeLabel(r) {
  if (r.type === 'plan') return t('paymentTypePlan') + ': ' + planName(planByKey(r.planKey));
  if (r.type === 'boost') return t('paymentTypeBoost');
  if (r.type === 'vip') return t('paymentTypeVip');
  return r.type;
}

async function renderAdminPayments() {
  let items = [];
  try {
    items = await Api.listAllPaymentRequests();
  } catch (e) {
    qs('admin-payments-list').innerHTML = emptyStateHtml('⚠️', t('loadError'));
    return;
  }
  adminPaymentsCache = items;
  qs('admin-payments-count').textContent = items.length ? items.length + ' ' + t('countSuffix') : '';
  qs('admin-payments-list').innerHTML = items.length ? items.map((r) => `
    <div class="admin-listing-card">
      <div class="admin-listing-top">
        <b>${esc(paymentTypeLabel(r))}</b>
        <span class="muted">${Number(r.amount).toLocaleString('ru-RU')} so'm</span>
      </div>
      <div class="admin-listing-meta">${esc(formatDateShort(r.created))}</div>
      <div class="admin-listing-actions">
        <button type="button" class="btn btn-primary" data-action="approve-payment" data-id="${esc(r.id)}">${esc(t('adminApprove'))}</button>
        <button type="button" class="btn btn-danger" data-action="reject-payment" data-id="${esc(r.id)}">${esc(t('adminReject'))}</button>
      </div>
    </div>
  `).join('') : emptyStateHtml('💳', t('adminPaymentsEmpty'));
}

async function approvePayment(id) {
  const rec = adminPaymentsCache.find((x) => x.id === id);
  if (!rec) return;
  try {
    await Api.approvePaymentRequest(rec);
    showToast(t('approved'));
    renderAdminPayments();
    await loadListings();
    renderAll();
  } catch (e) {
    showToast('Xatolik: ' + e.message);
  }
}

function rejectPayment(id) {
  confirmDialog(t('rejectPaymentConfirm'), async () => {
    try {
      await Api.rejectPaymentRequest(id);
      renderAdminPayments();
    } catch (e) {
      showToast('Xatolik: ' + e.message);
    }
  });
}

async function renderAdmin() {
  renderAdminPayments();
  let items = [];
  try {
    items = await Api.listAllForAdmin();
  } catch (e) {
    qs('admin-list').innerHTML = emptyStateHtml('⚠️', t('loadError'));
    return;
  }

  const counts = { pending: 0, approved: 0, rejected: 0 };
  items.forEach((i) => { counts[i.status] = (counts[i.status] || 0) + 1; });

  qs('admin-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${items.length}</div><div class="stat-label">${esc(t('statTotal'))}</div></div>
    <div class="stat-card"><div class="stat-value">${counts.pending}</div><div class="stat-label">${esc(t('statPending'))}</div></div>
    <div class="stat-card"><div class="stat-value">${counts.approved}</div><div class="stat-label">${esc(t('statApproved'))}</div></div>
    <div class="stat-card"><div class="stat-value">${counts.rejected}</div><div class="stat-label">${esc(t('statRejected'))}</div></div>
  `;

  qs('admin-list').innerHTML = items.length ? items.map((item) => `
    <div class="admin-listing-card">
      <div class="admin-listing-top">
        <b>${esc(titleOf(item) || '—')}</b>
        <span class="badge badge-${esc(item.status)}">${esc(t(STATUS_LABEL_KEY[item.status] || 'statusPending'))}</span>
      </div>
      <div class="admin-listing-meta">${esc(locText(item))} · ${esc(priceText(item))} · ${esc(item.phone)}</div>
      <textarea class="admin-note-input" data-id="${esc(item.id)}" placeholder="Izoh (ixtiyoriy, rad etishda ko'rsatiladi)">${esc(item.note || '')}</textarea>
      <div class="admin-listing-actions">
        <button type="button" class="btn btn-primary" data-action="approve-listing" data-id="${esc(item.id)}">${esc(t('adminApprove'))}</button>
        <button type="button" class="btn btn-danger" data-action="reject-listing" data-id="${esc(item.id)}">${esc(t('adminReject'))}</button>
      </div>
    </div>
  `).join('') : emptyStateHtml('📋', t('adminEmpty'));
}

async function setListingStatus(id, status, note) {
  try {
    await Api.updateListingStatus(id, status, note);
    renderAdmin();
    await loadListings();
    renderAll();
  } catch (e) {
    showToast('Xatolik: ' + e.message);
  }
}

/* ---------- E'lon qo'shish ---------- */
function renderPhotoPreview() {
  const box = qs('photo-preview');
  box.innerHTML = '';
  selectedPhotoFiles.forEach((file) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    box.appendChild(img);
  });
}

function resetAddForm() {
  state.editingId = null;
  qs('add-form').reset();
  selectedPhotoFiles = [];
  renderPhotoPreview();
  buildAddDistricts('');
  qs('add-form').querySelector('button[type="submit"]').textContent = t('publish');
  qs('a-photos-wrap').hidden = false;
}

/* "Mening e'lonlarim"dan "Tahrirlash" bosilganda formani to'ldirib, tahrirlash rejimiga o'tadi.
   Rasmlar tahrirlanmaydi (mavjudlari saqlanib qoladi) — shuning uchun rasm maydoni shu rejimda yashiriladi. */
function startEditListing(item) {
  state.editingId = item.id;
  qs('a-title').value = titleOf(item);
  qs('a-region').value = item.region;
  buildAddDistricts(item.district || '');
  qs('a-type').value = item.type;
  qs('a-rooms').value = item.rooms;
  qs('a-area').value = item.area || '';
  qs('a-floor').value = item.floor || '';
  qs('a-price').value = item.price;
  qs('a-phone').value = item.phone;
  qs('a-tg').value = item.telegram || '';
  qs('a-desc').value = descOf(item);
  selectedPhotoFiles = [];
  renderPhotoPreview();
  qs('a-photos-wrap').hidden = true;
  qs('add-form').querySelector('button[type="submit"]').textContent = t('editSave');
  showView('add');
}

async function handleAdd(e) {
  e.preventDefault();

  if (!Api.currentUser()) {
    showToast(t('loginFirst'));
    showView('profile');
    return;
  }

  let ok = true;
  ['a-title', 'a-region', 'a-district', 'a-price', 'a-phone'].forEach((id) => setErr(id, ''));

  if (!qs('a-title').value.trim()) { setErr('a-title', t('errTitle')); ok = false; }
  if (!qs('a-region').value) { setErr('a-region', t('errRegion')); ok = false; }
  if (districtsOf(qs('a-region').value).length && !qs('a-district').value) { setErr('a-district', t('errDistrict')); ok = false; }
  if (!qs('a-price').value || Number(qs('a-price').value) <= 0) { setErr('a-price', t('errPrice')); ok = false; }
  const phone = qs('a-phone').value.trim();
  if (phone.replace(/\D/g, '').length < 9) { setErr('a-phone', t('errPhone')); ok = false; }
  if (!ok) return;

  const regionKey = qs('a-region').value;
  const districtKey = districtsOf(regionKey).length ? qs('a-district').value : '';
  const base = coordsOf({ region: regionKey, district: districtKey });
  const spread = districtKey ? 0.008 : 0.04;

  const fields = {
    title: qs('a-title').value.trim(),
    description: qs('a-desc').value.trim(),
    region: regionKey,
    district: districtKey,
    type: qs('a-type').value,
    rooms: Number(qs('a-rooms').value),
    area: Number(qs('a-area').value) || 0,
    floor: qs('a-floor').value.trim(),
    price: Number(qs('a-price').value),
    phone: phone,
    telegram: qs('a-tg').value.trim().replace('@', ''),
    lat: base[0] + (Math.random() - 0.5) * spread,
    lng: base[1] + (Math.random() - 0.5) * spread,
  };

  const btn = qs('add-form').querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    if (state.editingId) {
      await Api.updateListing(state.editingId, fields);
      showToast(t('editSaved'));
    } else {
      await Api.createListing(fields, selectedPhotoFiles);
      showToast(t('published'));
    }
    resetAddForm();
    showView('profile');
  } catch (err) {
    showToast('Xatolik: ' + err.message);
  } finally {
    btn.disabled = false;
  }
}

/* ---------- Modal yordamchilari ---------- */
function closeModal(modalEl) { modalEl.classList.remove('open'); }

function confirmDialog(message, onConfirm) {
  qs('confirm-message').textContent = message;
  confirmCallback = onConfirm;
  qs('modal-confirm').classList.add('open');
}

/* ---------- Ishga tushirish ---------- */
async function init() {
  state.lang = readJson(LANG_KEY, 'uz') === 'ru' ? 'ru' : 'uz';
  qs('listing-list').innerHTML = skeletonCardsHtml(4);
  await loadListings();
  applyLang();

  qs('lang-btn').addEventListener('click', toggleLang);

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.view === 'add') resetAddForm();
      showView(btn.dataset.view);
    });
  });

  qs('near-me-btn').addEventListener('click', findNearMe);

  qs('type-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-type]');
    if (!b) return;
    state.type = b.dataset.type;
    buildTabs();
    renderAll();
  });

  qs('f-region').addEventListener('change', (e) => {
    state.region = e.target.value;
    state.district = '';
    buildFilters();
    renderAll();
  });
  qs('f-district').addEventListener('change', (e) => { state.district = e.target.value; renderAll(); });
  qs('f-rooms').addEventListener('change', (e) => { state.rooms = e.target.value; renderAll(); });
  qs('f-price').addEventListener('change', (e) => { state.price = e.target.value; renderAll(); });

  qs('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = qs('search-input').value;
    renderHome();
    showView('home');
  });

  qs('add-form').addEventListener('submit', handleAdd);
  qs('a-region').addEventListener('change', () => buildAddDistricts(''));
  ['a-title', 'a-region', 'a-district', 'a-price', 'a-phone'].forEach((id) => {
    qs(id).addEventListener('input', () => setErr(id, ''));
    qs(id).addEventListener('change', () => setErr(id, ''));
  });

  qs('a-photos').addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 6) {
      showToast(t('photoTooMany'));
      selectedPhotoFiles = files.slice(0, 6);
    } else {
      selectedPhotoFiles = files;
    }
    renderPhotoPreview();
  });

  /* --- akkaunt --- */
  document.querySelectorAll('[data-role-tab]').forEach((btn) => {
    btn.addEventListener('click', () => { state.authRole = btn.dataset.roleTab; renderAuthForm(); });
  });
  qs('auth-form').addEventListener('submit', handleAuthSubmit);
  AUTH_FIELD_IDS.forEach((id) => {
    qs(id).addEventListener('input', () => setErr(id, ''));
    qs(id).addEventListener('change', () => setErr(id, ''));
  });

  /* --- boshqaruv paneliga maxfiy kirish --- */
  document.querySelector('.brand-mark').addEventListener('click', handleLogoTap);
  qs('admin-exit').addEventListener('click', exitAdmin);
  qs('pin-cancel').addEventListener('click', () => closeModal(qs('modal-pin')));
  qs('pin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = qs('pin-form').querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      await Api.adminLogin(qs('pin').value.trim());
      setErr('pin', '');
      closeModal(qs('modal-pin'));
      showView('admin');
      showToast(t('adminOpened'));
    } catch (err) {
      setErr('pin', t('pinWrong'));
      qs('pin').value = '';
    } finally {
      btn.disabled = false;
    }
  });
  qs('pin').addEventListener('input', () => setErr('pin', ''));

  /* #/listing/ID -> o'sha e'lonni ochish; #admin -> boshqaruv paneli */
  function routeHash() {
    const m = location.hash.match(/^#\/listing\/(.+)$/);
    if (m) { openDetail(m[1], true); return; }
    if (location.hash === '#admin') requestAdmin();
  }
  routeHash();
  window.addEventListener('hashchange', routeHash);

  function closeAnyModal(modalEl) {
    if (modalEl.id === 'modal-detail') closeDetailModal();
    else modalEl.classList.remove('open');
  }
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeAnyModal(btn.closest('.modal')));
  });
  document.querySelectorAll('.modal').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m) closeAnyModal(m); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeAnyModal);
  });

  qs('confirm-cancel').addEventListener('click', () => {
    confirmCallback = null;
    closeModal(qs('modal-confirm'));
  });
  qs('confirm-ok').addEventListener('click', () => {
    const cb = confirmCallback;
    confirmCallback = null;
    closeModal(qs('modal-confirm'));
    if (cb) cb();
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'fav') { e.stopPropagation(); toggleFav(el.dataset.id); return; }
    if (el.dataset.action === 'open') openDetail(el.dataset.id);
    if (el.dataset.action === 'share-listing') { e.stopPropagation(); shareListing(el.dataset.id); return; }
    if (el.dataset.action === 'open-auth') openAuthModal(el.dataset.role);
    if (el.dataset.action === 'logout') logout();
    if (el.dataset.action === 'go-admin') showView('admin');
    if (el.dataset.action === 'delete-listing') deleteListing(el.dataset.id);
    if (el.dataset.action === 'edit-listing') {
      const item = myListingsCache.find((x) => x.id === el.dataset.id);
      if (item) startEditListing(item);
    }
    if (el.dataset.action === 'approve-listing') {
      const note = document.querySelector(`.admin-note-input[data-id="${el.dataset.id}"]`);
      setListingStatus(el.dataset.id, 'approved', note ? note.value.trim() : '');
    }
    if (el.dataset.action === 'reject-listing') {
      const note = document.querySelector(`.admin-note-input[data-id="${el.dataset.id}"]`);
      setListingStatus(el.dataset.id, 'rejected', note ? note.value.trim() : '');
    }
    if (el.dataset.action === 'go-plans') showView('plans');
    if (el.dataset.action === 'go-profile') showView('profile');
    if (el.dataset.action === 'buy-plan') {
      const plan = planByKey(el.dataset.key);
      openPaymentModal({ title: planName(plan) + ' — ' + t('planSuffix'), price: plan.price, type: 'plan', planKey: plan.key });
    }
    if (el.dataset.action === 'boost-listing') {
      openPaymentModal({ title: t('boostTitle'), price: 5000, type: 'boost', listingId: el.dataset.id });
    }
    if (el.dataset.action === 'vip-listing') {
      openPaymentModal({ title: t('vipTitle'), price: 20000, type: 'vip', listingId: el.dataset.id });
    }
    if (el.dataset.action === 'pay-copy') handlePayCopy();
    if (el.dataset.action === 'pay-confirm') handlePayConfirm(el);
    if (el.dataset.action === 'approve-payment') approvePayment(el.dataset.id);
    if (el.dataset.action === 'reject-payment') rejectPayment(el.dataset.id);
  });
}

document.addEventListener('DOMContentLoaded', init);
