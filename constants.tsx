
import { Dua, Amal, MonthInfo, MasailCategory, Scholar, Reciter, TasbihPreset } from './types';

export interface DayAmaal {
  day: string;
  imam: string;
  tasbih: string;
  wisdom: string;
  color: string;
  ziyaratSnippet: string;
}

export interface Pearl {
  id: string;
  source: string;
  text: string;
  translation: string;
  urduTranslation: string;
  author: string;
  theme: 'Wisdom' | 'Soul' | 'Justice' | 'Love' | 'Patience';
}

export const RECITERS: Reciter[] = [
  { 
    id: 'ar.alafasy', 
    name: 'Alafasy', 
    fullName: 'Mishary Rashid Alafasy', 
    slug: 'mishary_rashid_alafasy',
    country: 'KW',
    bio: 'Renowned for his melodious and emotional recitations. An icon of modern Quranic tajweed.'
  },
  { 
    id: 'ar.abdulsamad', 
    name: 'Abdul Basit', 
    fullName: 'Abdul Basit Abdus Samad', 
    slug: 'abdul_basit_murattal',
    country: 'EG',
    bio: 'One of the greatest Quranic reciters of all time, famous for his powerful breath and golden voice.'
  },
  { 
    id: 'ar.minshawi', 
    name: 'Minshawi', 
    fullName: 'Mohamed Siddiq El-Minshawi', 
    slug: 'muhammad_siddeeq_al-minshaawee',
    country: 'EG',
    bio: 'His recitation is deeply spiritual and distinctively humble. Master of the classic style.'
  },
  { 
    id: 'ar.husary', 
    name: 'Husary', 
    fullName: 'Mahmoud Khalil Al-Husary', 
    slug: 'mahmoud_khaleel_al-husaree',
    country: 'EG',
    bio: 'The standard for Tajweed rules. His recitations are essential for students of the Quran.'
  }
];

export const DIVINE_PEARLS: Pearl[] = [
  { 
    id: 'p1', 
    source: 'Nahj al-Balagha', 
    text: 'الْبُخْلُ عَارٌ، وَالْجُبْنُ مَنْقَصَةٌ، وَالْفَقْرُ يُخْرِسُ الْفَطِينَ عَنْ حُجَّتِهِ', 
    translation: 'Avarice is disgrace; cowardice is a defect; poverty softens the sharp tongue from arguing its case.', 
    urduTranslation: 'بخل عار ہے، بزدلی نقص ہے، اور غربت عقل مند انسان کی زبان کو اس کے دلائل پیش کرنے سے روک دیتی ہے۔',
    author: 'Imam Ali (as)', 
    theme: 'Wisdom' 
  },
  { 
    id: 'p2', 
    source: 'Sahifa al-Sajjadiyya', 
    text: 'يَا مَنْ تُحَلُّ بِهِ عُقَدُ الْمَكَارِهِ، وَيَا مَنْ يُفْثَأُ بِهِ حَدُّ الشَّدَائِدِ', 
    translation: 'O He through whom the knots of detested things are untied, O He through whom the edge of hardships is blunted.', 
    urduTranslation: 'اے وہ جس کے ذریعے ناپسندیدہ گرہیں کھلتی ہیں، اے وہ جس کے ذریعے سختیوں کی دھار کند ہو جاتی ہے۔',
    author: 'Imam Sajjad (as)', 
    theme: 'Soul' 
  },
  { 
    id: 'p3', 
    source: 'Al-Kafi', 
    text: 'مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ', 
    translation: 'He who knows himself has known his Lord.', 
    urduTranslation: 'جس نے اپنے نفس کو پہچان لیا، تحقیق اس نے اپنے رب کو پہچان لیا۔',
    author: 'Prophet Muhammad (saw)', 
    theme: 'Wisdom' 
  },
  { 
    id: 'p4', 
    source: 'Hadith', 
    text: 'حُسَيْنٌ مِنِّي وَأَنَا مِنْ حُسَيْنٍ', 
    translation: 'Hussain is from me and I am from Hussain.', 
    urduTranslation: 'حسینؑ مجھ سے ہے اور میں حسینؑ سے ہوں۔',
    author: 'Prophet Muhammad (saw)', 
    theme: 'Love' 
  }
];

export const ZIYARATS: Dua[] = [
  {
    id: 'ashura',
    title: 'Ziarat Ashura',
    category: 'Karbala',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا اَبا عَبْدِ اللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ، اَلسَّلامُ عَلَيْكَ يا خِيَرَةَ اللهِ وَابْنَ خِيَرَتِهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ اَميرِ الْمُؤْمِنينَ وَابْنَ سَيِّدِ الْوَصِيّينَ، اَلسَّلامُ عَلَيْكَ يَا بْنَ فاطِمَةَ سَيِّدَةِ نِساءِ الْعالَمينَ، اَلسَّلامُ عَلَيْكَ يا ثارَ اللهِ وَابْنَ ثارِهِ وَالْوِتْرَ الْمَوْتُورَ...',
    translation: 'Peace be upon you, O Abu Abdillah. Peace be upon you, O son of the Messenger of Allah...',
    transliteration: 'Assalamu alayka ya Aba Abdillah...',
    benefits: 'The most powerful means of seeking proximity to Allah through the love of Imam Hussain (as).',
    urduDescription: 'زیارتِ عاشورہ: امام حسین علیہ السلام کے حضور وہ عظیم سلام ہے جو انسان کو اللہ کے مقربین میں شامل کر دیتا ہے۔',
    audio: 'https://www.duas.org/audio/Ziarat_Ashura.mp3'
  },
  {
    id: 'fatima-zahra',
    title: 'Ziarat e Fatima Zahra (sa)',
    category: 'Medina',
    arabic: 'يَا مُمْتَحَنَةُ امْتَحَنَكِ اللهُ الَّذي خَلَقَكِ قَبْلَ اَنْ يَخْلُقَكِ، فَوَجَدَكِ لِمَا امْتَحَنَكِ صابِرَةً، وَزَعَمْنا اَنَّا لَكِ اَوْلِياءُ وَمُصَدِّقُونَ وَصابِرُونَ لِكُلِّ ما اَتانا بِهِ اَبُوكِ صَلَّى اللهُ عَلَيْهِ وَآلِهِ وَاَتى بِهِ وَصِيُّهُ، فَاِنَّا نَسْأَلُكِ اِنْ كُنَّا صَدَّقْناكِ اِلاَّ اَلْحَقْتِنا بِتَصْدیقِنا لَهُما لِنُبَشِّرَ اَنْفُسَنا بِاَنَّا قَدْ طَهُرْنا بِوِلايَتِكِ...',
    translation: 'O tested one! Allah, who created you before He created you, tested you and found you patient in the face of His test...',
    transliteration: 'Ya mumtahanatu imtahanaki Allahu...',
    benefits: 'Seeking the intercession of the Leader of the Women of Paradise.',
    urduDescription: 'زیارتِ شہزادیِ کونین فاطمہ زہرا (س): اللہ کی برگزیدہ بیٹی کے حضور عقیدت کا اظہار۔',
    audio: 'https://www.duas.org/audio/Ziarat_Sayyida_Fatima.mp3'
  },
  {
    id: 'zainab-kubra',
    title: 'Ziarat e Zainab (sa)',
    category: 'Damascus',
    arabic: 'اَلسَّلامُ عَلَيْكِ يا بِنْتَ سَيِّدِ الْاَنْبِياءِ، اَلسَّلامُ عَلَيْكِ يا بِنْتَ صاحِبِ الْحَوْضِ وَاللِّواءِ، اَلسَّلامُ عَلَيْكِ يا بِنْتَ مَنْ عُرِجَ بِهِ اِلَى السَّماءِ، اَلسَّلامُ عَلَيْكِ يا بِنْتَ سَيِّدِ الْاَوْصِياءِ...',
    translation: 'Peace be upon you, O daughter of the Master of Prophets. Peace be upon you, O daughter of the Master of the Pool and the Standard...',
    transliteration: 'Assalamu alayki ya binta sayyidil anbiya...',
    benefits: 'Honor for the Heroine of Karbala and the Protector of the Message.',
    urduDescription: 'زیارتِ ثانیِ زہرا بی بی زینب (س): وہ عظیم ہستی جنہوں نے کربلا کے پیغام کو زندہ رکھا۔',
    audio: 'https://www.duas.org/audio/Ziyarat_Sayyida_Zaynab.mp3'
  },
  {
    id: 'ali-najaf-full',
    title: 'Ziarat e Imam Ali (as)',
    category: 'Najaf',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا أَميرَ الْمُؤْمِنينَ، اَلسَّلامُ عَلَيْكَ يا حَبيبَ اللهِ، اَلسَّلامُ عَلَيْكَ يا صِفْوَةَ اللهِ...',
    translation: 'Peace be upon you, O Commander of the Faithful...',
    transliteration: 'Assalamu alayka ya Amiral Mu\'minin...',
    benefits: 'Strengthens the spiritual bond with the Gate of Knowledge.',
    urduDescription: 'زیارتِ حضرت علی (ع): بابِ علم اور حق و باطل کے درمیان فرق کرنے والے مولا کے حضور سلامِ عقیدت۔',
    audio: 'https://www.duas.org/audio/Ziarat_Imam_Ali.mp3'
  },
  {
    id: 'hassan-muitaba',
    title: 'Ziarat e Imam Hassan (as)',
    category: 'Baqi',
    arabic: 'اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ رَبِّ الْعالَمينَ، اَلسَّلامُ عَلَيْكَ يَا بْنَ اَميرِ الْمُؤْمِنينَ، اَلسَّلامُ عَلَيْكَ يَا بْنَ فاطِمَةَ الزَّهْراءِ، اَلسَّلامُ عَلَيْكَ يا حَبيبَ اللهِ...',
    translation: 'Peace be upon you, O son of the Messenger of the Lord of the worlds. Peace be upon you, O son of the Commander of the Faithful...',
    transliteration: 'Assalamu alayka yabna rasuli rabbil alamin...',
    benefits: 'Peace upon the Generous One of the Ahlulbayt (Kareem-e-Ahlulbayt).',
    urduDescription: 'زیارتِ امام حسن مجتبیٰ (ع): کریمِ اہل بیت کے حضور عقیدت کا نذرانہ۔',
    audio: 'https://www.duas.org/audio/Ziarat_Imam_Hassan.mp3'
  },
  {
    id: 'reza-mashhad',
    title: 'Ziarat e Imam Reza (as)',
    category: 'Mashhad',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا وَلِيَّ اللهِ وَابْنَ وَلِيِّهِ، اَلسَّلامُ عَلَيْكَ يا حُجَّةَ اللهِ وَابْنَ حُجَّتِهِ، اَلسَّلامُ عَلَيْكَ يا اِمامَ الْهُدى وَنُورَ الضُّحى...',
    translation: 'Peace be upon you, O friend of Allah and the son of His friend. Peace be upon you, O proof of Allah and the son of His proof...',
    transliteration: 'Assalamu alayka ya waliyyallah...',
    benefits: 'Intercession of the Eighth Imam, the Stranger of Khorasan.',
    urduDescription: 'زیارتِ امام علی رضا (ع): ضامنِ آہو کے حضور سلام۔',
    audio: 'https://www.duas.org/audio/Ziarat_Imam_Reza.mp3'
  },
  {
    id: 'amin-allah',
    title: 'Ziarat Amin Allah',
    category: 'General',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا اَمينَ اللهِ في اَرْضِهِ وَحُجَّتَهُ عَلى عِبادِهِ...',
    translation: 'Peace be upon you, O trustee of Allah on His earth...',
    transliteration: 'Assalamu alayka ya amina-llahi fi ardihi...',
    benefits: 'Highly authentic and recommended for all occasions.',
    urduDescription: 'زیارتِ امین اللہ: یہ ایک انتہائی معتبر زیارت ہے جو امام سجاد (ع) سے مروی ہے۔',
    audio: 'https://www.duas.org/audio/Ziarat_Aminullah.mp3'
  },
  {
    id: 'warisa',
    title: 'Ziarat Warisa',
    category: 'Karbala',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا وارِثَ آدَمَ صَفْوَةِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ نُوح نَبِيِّ اللهِ...',
    translation: 'Peace be upon you, O inheritor of Adam, the chosen of Allah...',
    transliteration: 'Assalamu alayka ya waritha Adama...',
    benefits: 'Connects the reader to the lineage of prophets.',
    urduDescription: 'زیارتِ وارثہ: یہ زیارت امام حسین علیہ السلام کو تمام انبیاء کا وارث قرار دیتی ہے۔',
    audio: 'https://www.duas.org/audio/Ziarat_Warisa.mp3'
  },
  {
    id: 'mahdi-ziyarat',
    title: 'Ziarat e Imam Mahdi (atfs)',
    category: 'Awaited',
    arabic: 'اَلسَّلامُ عَلَيْكَ يا حُجَّةَ اللهِ في اَرْضِهِ، اَلسَّلامُ عَلَيْكَ يا عَيْنَ اللهِ في خَلْقِهِ...',
    translation: 'Peace be upon you, O Proof of Allah on His earth...',
    transliteration: 'Assalamu alayka ya hujjata-llahi fi ardihi...',
    benefits: 'Strengthens the spiritual bond with the Imam of our time.',
    urduDescription: 'زیارتِ امامِ زمانہ (عج): امامِ وقت سے تجدیدِ عہد کا ذریعہ۔',
    audio: 'https://www.duas.org/audio/Ziarat_Ale_Yasin.mp3'
  }
];

export const POPULAR_DUAS: Dua[] = [
  {
    id: 'imame-zamana',
    title: 'Dua-e-Imam-e-Zamana (atfs)',
    category: 'Awaited',
    arabic: 'اَللَّهُمَّ كُنْ لِوَلِيِّكَ الْحُجَّةِ بْنِ الْحَسَنِ صَلَوَاتُكَ عَلَيْهِ وَعَلَى آبَائِهِ فِي هَذِهِ السَّاعَةِ وَفِي كُلِّ سَاعَةٍ وَلِيّاً وَحَافِظاً وَقَائِداً وَنَاصِراً وَدَلِيلاً وَعَيْناً حَتَّى تُسْكِنَهُ أَرْضَكَ طَوْعاً وَتُمَتِّعَهُ فِيهَا طَوِيلاً.',
    translation: 'O Allah, be, for Your representative, the Hujjat (proof), son of Al-Hasan, Your blessings be on him and his forefathers, in this hour and in every hour, a guardian, a protector, a leader, a helper, a proof, and an eye, until You make him live on the earth, in obedience (to You), and cause him to live in it for a long time.',
    benefits: 'Dua al-Faraj for the safety and reappearance of the Imam of our time.',
    urduDescription: 'دعاِ سلامتی امامِ زمانہ (عج): اپنے امام کی سلامتی اور ان کے ظہور کی دعا۔',
    audio: 'https://www.duas.org/audio/Dua_Faraj.mp3'
  },
  {
    id: 'kumail',
    title: 'Dua-e-Kumail',
    category: 'Spiritual',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ، وَبِقُوَّتِكَ الَّتِي قَهَرْتَ بِهَا كُلَّ شَيْءٍ...',
    translation: 'O Allah, I ask You by Your mercy which encompasses all things...',
    benefits: 'Taught by Imam Ali (as) to Kumail ibn Ziyad.',
    urduDescription: 'دعاِ کمیل: امیر المومنین حضرت علی علیہ السلام کی سکھائی ہوئی عظیم دعا۔',
    audio: 'https://www.duas.org/audio/Dua_Kumayl.mp3'
  },
  {
    id: 'tawassul',
    title: 'Dua-e-Tawassul',
    category: 'Intercession',
    arabic: 'اللَّهُمَّ إِنِّي أَSأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَآلِهِ...',
    translation: 'O Allah, I ask You and turn towards You by Your Prophet...',
    benefits: 'A prayer of intercession seeking the help of the 14 Infallibles.',
    urduDescription: 'دعاِ توسل: اللہ کی بارگاہ میں چودہ معصومین علیہم السلام کا وسیلہ۔',
    audio: 'https://www.duas.org/audio/Dua_Tawassul.mp3'
  }
];

export const SPECIAL_AMALS: Amal[] = [
  {
    id: 'namaz-ghafila',
    title: 'Namaz-e-Ghafila',
    description: 'Specific 2-rakat prayer for fulfilling urgent needs.',
    steps: [
      'Recite 1st Rakat: After Hamd, recite Yunus: 87-88',
      'Recite 2nd Rakat: After Hamd, recite Anam: 59',
      'In Qunoot: Recite the supplication "Allahumma inni as-aluka bi-mafatih al-ghayb..."'
    ],
    reward: 'Immediate attention to your hajat.',
    urduDescription: 'نمازِ غفیلہ: مغرب اور عشاء کے درمیان کی مخصوص نماز۔'
  }
];

export const TASBIH_PRESETS: TasbihPreset[] = [
  { id: 'zahra', name: 'Fatima (sa)', label: 'Zahra\'s Tasbih', max: 100 },
  { id: 'salawat', name: 'Salawat', label: 'Salawat', max: 100 },
  { id: 'mahdi', name: 'Ya Mahdi', label: 'Al-Ajal', max: 313 },
  { id: 'astaghfir', name: 'Istighfar', label: 'Astaghfirullah', max: 100 },
  { id: 'subhan', name: 'Subhanallah', label: 'Glorification', max: 33 },
  { id: 'alhamd', name: 'Alhamdulillah', label: 'Gratitude', max: 33 },
  { id: 'akbar', name: 'Allahu Akbar', label: 'Greatness', max: 34 },
  { id: 'lailaha', name: 'Tahlil', label: 'La ilaha illallah', max: 100 },
  { id: 'ya-allah', name: 'Ya Allah', label: 'Divine Presence', max: 100 },
  { id: 'ya-ali', name: 'Ya Ali', label: 'Lion of Allah', max: 110 },
  { id: 'ya-hussain', name: 'Ya Hussain', label: 'Master of Martyrs', max: 128 },
  { id: 'ya-zahra', name: 'Ya Zahra', label: 'Mistress of Light', max: 135 },
  { id: 'ya-abbas', name: 'Ya Abbas', label: 'Moon of Banu Hashim', max: 133 }
];

export const SCHOLARS: Scholar[] = [
  { name: 'Ayatullah Sistani', title: 'Grand Marja', keyWisdom: "Patience and adherence to the laws of Allah is the only path to salvation." }
];

export const MASAIL: MasailCategory[] = [
  {
    title: 'Prayer (Salat)',
    rulings: [
      { question: 'What is the rule for Qadha prayers?', answer: 'One must fulfill all missed prayers in order before death.' }
    ]
  }
];

export const ALL_MONTHS_AMAAL: (MonthInfo & { description: string, detailedAmals: string[], urduDescription?: string })[] = [
  { 
      name: 'Muharram', 
      significance: 'Gham-e-Hussain', 
      description: 'Month of mourning for the Master of Martyrs.', 
      recommendedAmals: ['Ziarat Ashura', 'Matam-e-Hussain'], 
      detailedAmals: ['Daily Mourning'] 
  },
  { 
      name: 'Ramadan', 
      significance: 'Month of the Quran', 
      description: 'The holiest month of fasting.', 
      recommendedAmals: ['Recitation of Quran', 'Laylatul Qadr Amaal'], 
      detailedAmals: ['Iftaar Hosting'] 
  }
];

export const WEEKLY_AMAAL: DayAmaal[] = [
  { day: 'Saturday', imam: 'Holy Prophet (saw)', tasbih: 'Salawat', wisdom: "The best of you are those with best character.", color: 'emerald-400', ziyaratSnippet: "Peace on the Prophet..." },
  { day: 'Sunday', imam: 'Imam Ali (as) & Lady Fatima (sa)', tasbih: 'Ya Ali / Ya Zahra', wisdom: "Knowledge is better than wealth.", color: 'blue-400', ziyaratSnippet: "Peace on the Commander..." },
  { day: 'Monday', imam: 'Imam Hassan (as) & Imam Hussain (as)', tasbih: 'Ya Hussain', wisdom: "Death with dignity is better than life with humiliation.", color: 'red-400', ziyaratSnippet: "Peace on the Masters of Youth..." },
  { day: 'Tuesday', imam: 'Imam Sajjad, Baqir & Sadiq (as)', tasbih: 'Subhanallah', wisdom: "The truth is a heavy burden.", color: 'yellow-400', ziyaratSnippet: "Peace on the Lights..." },
  { day: 'Wednesday', imam: 'Imam Kadhim, Reza, Jawad & Hadi (as)', tasbih: 'Ya Allah', wisdom: "Silence is a door to wisdom.", color: 'purple-400', ziyaratSnippet: "Peace on the Casket..." },
  { day: 'Thursday', imam: 'Imam Hassan al-Askari (as)', tasbih: 'Al-Hamdulillah', wisdom: "Generosity has a limit.", color: 'orange-400', ziyaratSnippet: "Peace on the Pure One..." },
  { day: 'Friday', imam: 'Imam Mahdi (atfs)', tasbih: 'Salawat', wisdom: "Focus on your deeds.", color: 'teal-400', ziyaratSnippet: "Salam to the Expected One..." }
];
