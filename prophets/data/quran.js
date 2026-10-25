// The 25 prophets named in the Qur'an, in the order commonly taught.
// One entry per person: where traditions identify the same figure, their
// views are sections of that entry, not separate people.
//
// Places: kind is 'born' | 'life' | 'died'; trad: true marks a location that
// comes from later tradition rather than scripture; step orders the journey
// line drawn on the map. country is the map tile(s) the pin sits on.
// Scripture references use the Hebrew Bible/Christian Old Testament
// chapter:verse numbering and the standard Cairo numbering of the Qur'an.

const JLM = [31.778, 35.235];

export const QURAN = [
  {
    id: 'adam',
    n: 1,
    names: [['Islam', 'Adam'], ['Christianity', 'Adam'], ['Judaism', 'Adam']],
    scripts: [['ar', 'آدم'], ['he', 'אדם'], ['el', 'Αδάμ']],
    era: 'The first human, in scripture',
    lead: "Adam is the first human being in the scriptures of Judaism, Christianity and Islam, and the father of humankind with his wife Eve (Hawwa). All three describe him as formed from the earth and placed in a garden from which he was sent out after eating from a forbidden tree. Islam also counts him as the first prophet.",
    life: [
      "Genesis says God formed Adam from the dust of the ground and breathed life into him, and the Qur'an says he was created from clay. He was placed in the Garden of Eden with Eve, ate from the one tree they had been told to avoid, and was sent out of the garden. Genesis names his sons Cain, Abel and Seth.",
      "The Qur'an adds that God taught Adam “the names of all things” and told the angels to bow to him. Iblis refused out of pride.",
    ],
    miracles: [
      "Created directly by God, without parents.",
      "Taught the names of all things (Qur'an 2:31).",
    ],
    views: {
      judaism: { role: 'First human', text: [
        "In the Torah Adam is the first human, made in the image of God (Genesis 1:27) and given care of the garden. Jewish thought treats the story as the origin of human moral choice. It does not teach a doctrine of inherited original sin.",
      ] },
      christianity: { role: 'First human', text: [
        "Christianity reads Adam's disobedience as the entry of sin and death into the world. Paul contrasts Adam with Christ, the “last Adam” who brings life (Romans 5:12–19; 1 Corinthians 15:22, 45). Most churches teach some form of original sin derived from this.",
      ] },
      islam: { role: 'First prophet; father of humankind', text: [
        "In Islam Adam is the first human and the first prophet. After the slip in the garden he repented and God forgave him (Qur'an 2:37), so Islam does not hold that his sin passes to his descendants. He was made God's khalifa, a steward or successor, on earth (2:30).",
        "Later tradition says Adam and Hawwa were reunited at Mount Arafat near Mecca.",
      ] },
      mandaeism: { role: 'First Mandaean', text: [
        "Mandaeans regard Adam as the first man to receive their religion and the ancestor of their priestly line.",
      ] },
    },
    refs: ['Genesis 1–5', "Qur'an 2:30–39; 7:11–25; 15:26–44; 20:115–123"],
    places: [
      { name: 'Eden, between the Tigris and Euphrates', at: [31.0, 47.4], country: 'iq', kind: 'life', note: 'Genesis names the Tigris and Euphrates among the rivers of Eden; the exact place is unknown.' },
      { name: 'Mount Arafat', at: [21.355, 39.984], country: 'sa', kind: 'life', trad: true, note: 'Where tradition says Adam and Hawwa met again on earth.' },
    ],
    related: ['idris', 'nuh'],
  },
  {
    id: 'idris',
    n: 2,
    names: [['Islam', 'Idris'], ['Christianity', 'Enoch'], ['Judaism', 'Hanokh']],
    scripts: [['ar', 'إدريس'], ['he', 'חנוך'], ['el', 'Ενώχ']],
    era: 'Before the Flood, in scripture',
    lead: "Idris is a prophet named twice in the Qur'an, praised as truthful and patient and “raised to a high place”. Most Muslim scholars identify him with Enoch, the great-grandfather of Noah, who in Genesis “walked with God” and was taken by God without dying.",
    life: [
      "Genesis gives Enoch only a few verses: he lived 365 years, “walked with God, and he was not, for God took him”. The Qur'an is just as brief. Later traditions fill the gap: Muslim writers say Idris was the first to write with a pen and to sew clothing, and some linked him with the sage Hermes.",
    ],
    miracles: [
      "Taken up by God without dying (Genesis 5:24), or “raised to a high place” (Qur'an 19:57).",
    ],
    views: {
      judaism: { role: 'Antediluvian ancestor', text: [
        "Enoch appears in Genesis among the ten generations from Adam to Noah. He is not counted as a prophet in the Hebrew Bible.",
      ] },
      christianity: { role: 'Example of faith', text: [
        "The Letter to the Hebrews lists Enoch as an example of faith who was taken up “so that he should not see death” (Hebrews 11:5). The Letter of Jude quotes a prophecy attributed to him. The Ethiopian Orthodox Church includes the Book of Enoch in its Bible.",
      ] },
      islam: { role: 'Prophet', text: [
        "The Qur'an calls Idris “a man of truth, a prophet” and counts him among the patient (19:56–57; 21:85–86). The identification with Enoch is the majority view, though not stated in the Qur'an itself.",
      ] },
    },
    refs: ['Genesis 5:18–24', 'Hebrews 11:5; Jude 14–15', "Qur'an 19:56–57; 21:85–86"],
    places: [
      { name: 'Babylon', at: [32.54, 44.42], country: 'iq', kind: 'life', trad: true, note: 'Some Muslim histories place his early life here.' },
      { name: 'Memphis, Egypt', at: [29.85, 31.25], country: 'eg', kind: 'life', trad: true, note: 'Other traditions say he taught in Egypt.' },
    ],
    related: ['adam', 'nuh'],
  },
  {
    id: 'nuh',
    n: 3,
    names: [['Islam', 'Nuh'], ['Christianity', 'Noah'], ['Judaism', 'Noach']],
    scripts: [['ar', 'نوح'], ['he', 'נח'], ['el', 'Νώε']],
    era: 'Time of the Flood, in scripture',
    lead: "Nuh, or Noah, is the righteous man who built the ark and survived the great Flood with his family and the animals. The story is told in Genesis and in several chapters of the Qur'an, one of which (Surah 71) is named after him. All three traditions see him as a second father of humankind.",
    life: [
      "God told Noah to build a great ship before a flood that would destroy a corrupt world. He took his family and pairs of animals on board, and when the waters went down the ark came to rest on a mountain.",
      "Genesis says Noah lived 950 years. The Qur'an says he preached to his people for 950 years, and that few believed him.",
      "The accounts differ on the landing place. Genesis says “the mountains of Ararat”, and the Qur'an says Mount Judi. The Qur'an also says one of Nuh's sons refused to board and drowned, while in Genesis all three sons, Shem, Ham and Japheth, are saved.",
    ],
    miracles: [
      'Survival of the Flood in the ark.',
      'The waters receding at God’s command; in Genesis, the rainbow as the sign of God’s covenant (Genesis 9:13).',
    ],
    views: {
      judaism: { role: 'Righteous man; ancestor of all nations', text: [
        "Genesis calls Noah “a righteous man, blameless in his generation”. After the Flood God makes a covenant with Noah and all living things. Judaism derives from it a set of basic laws for all humanity, known as the Noahide laws.",
      ] },
      christianity: { role: 'Righteous man; preacher of righteousness', text: [
        "The New Testament presents Noah as a model of faith (Hebrews 11:7) and a “herald of righteousness” (2 Peter 2:5). Early Christians read the ark as a symbol of salvation through baptism (1 Peter 3:20–21).",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "Nuh is one of the five greatest messengers in Islam, with Ibrahim, Musa, Isa and Muhammad. The Qur'an emphasises his long, patient preaching and his people's mockery, and records his prayer against the persistent unbelievers (71:26).",
      ] },
      mandaeism: { role: 'Righteous ancestor', text: [
        "Mandaean scripture honours Noah and his son Shem as righteous ancestors of the Mandaeans.",
      ] },
    },
    refs: ['Genesis 6–9', "Qur'an 11:25–49; 23:23–30; 29:14–15; 71"],
    places: [
      { name: 'Mesopotamia', at: [32.1, 45.3], country: 'iq', kind: 'life', trad: true, step: 1, note: 'Tradition places Nuh’s people in southern Iraq.' },
      { name: 'Mount Judi (Cudi Dağı)', at: [37.37, 42.35], country: 'tr', kind: 'life', step: 2, note: 'Landing place of the ark in the Qur’an (11:44), traditionally this mountain near Cizre.' },
      { name: 'Mount Ararat', at: [39.70, 44.30], country: 'tr', kind: 'life', note: 'Genesis says “the mountains of Ararat” (8:4); later tradition chose this peak.' },
    ],
    related: ['idris', 'hud', 'ibrahim'],
  },
  {
    id: 'hud',
    n: 4,
    names: [['Islam', 'Hud']],
    scripts: [['ar', 'هود']],
    era: 'After Nuh, before Ibrahim (Islamic tradition)',
    lead: "Hud is one of four Arabian prophets in the Qur'an. He was sent to the ʿAd, a mighty people of southern Arabia who built Iram, “the city of lofty pillars”. When they rejected him they were destroyed by a howling wind. He is not named in the Bible.",
    life: [
      "Hud called the ʿAd to worship one God and to give up their arrogance. They were proud of their strength and their buildings and scorned him. The Qur'an describes a cold, roaring wind that blew for seven nights and eight days and left them “like hollow trunks of palm trees” (69:6–7). Hud and those who believed were saved.",
      "The Qur'an places the ʿAd at al-Ahqaf, “the sand dunes” (46:21), usually understood as the sands between Yemen and Oman.",
    ],
    miracles: [
      "Saved, with the believers, from the destroying wind.",
    ],
    views: {
      islam: { role: 'Prophet and messenger', text: [
        "Surah 11 of the Qur'an is named after Hud. A shrine in the Hadramawt valley of Yemen, Qabr Nabi Hud, is traditionally his tomb and is visited every year in the month of Shaʿban. Some Muslim scholars identified Hud with Eber, an ancestor of Abraham in Genesis 10–11, but this is not in the Qur'an.",
      ] },
    },
    refs: ["Qur'an 7:65–72; 11:50–60; 26:123–140; 46:21–26; 69:6–8; 89:6–8"],
    places: [
      { name: 'Al-Ahqaf (southern Arabian sands)', at: [17.6, 50.5], country: ['ye', 'om'], kind: 'life', note: 'Homeland of the ʿAd in the Qur’an (46:21).' },
      { name: 'Qabr Nabi Hud, Hadramawt', at: [16.0, 49.4], country: 'ye', kind: 'died', trad: true, note: 'Traditional tomb and pilgrimage site.' },
    ],
    related: ['nuh', 'salih'],
  },
  {
    id: 'salih',
    n: 5,
    names: [['Islam', 'Salih']],
    scripts: [['ar', 'صالح']],
    era: 'After Hud (Islamic tradition)',
    lead: "Salih is an Arabian prophet sent to the Thamud, a people who carved homes into mountains at al-Hijr in north-western Arabia. God gave them a she-camel as a sign; they killed it and were destroyed. He is not named in the Bible.",
    life: [
      "Salih urged the Thamud to worship God alone and to share their water fairly with the she-camel sent as a sign: the camel drank one day and the people the next. Nine men of the city plotted against him, and the camel was hamstrung. Three days later an earthquake and a terrible blast destroyed them; Salih and the believers were spared.",
    ],
    miracles: [
      "The she-camel of God, given to the Thamud as a sign (Qur'an 7:73; 11:64). Later tradition says she came out of a rock.",
    ],
    views: {
      islam: { role: 'Prophet and messenger', text: [
        "The Qur'an names al-Hijr (15:80), now identified with Hegra (Mada'in Salih, “the cities of Salih”) near al-ʿUla. The rock-cut tombs visible there today were carved by the Nabataeans around the 1st century; the Thamud themselves are mentioned in Assyrian records of the 8th century BCE.",
      ] },
    },
    refs: ["Qur'an 7:73–79; 11:61–68; 15:80–84; 26:141–159; 27:45–53; 91:11–15"],
    places: [
      { name: 'Al-Hijr (Hegra)', at: [26.79, 37.95], country: 'sa', kind: 'life', note: 'Home of the Thamud in the Qur’an (15:80).' },
    ],
    related: ['hud', 'ibrahim'],
  },
  {
    id: 'ibrahim',
    n: 6,
    names: [['Islam', 'Ibrahim'], ['Christianity', 'Abraham'], ['Judaism', 'Avraham']],
    scripts: [['ar', 'إبراهيم'], ['he', 'אברהם'], ['el', 'Αβραάμ']],
    era: 'c. 2000–1700 BCE (traditional dating)',
    lead: "Ibrahim, or Abraham, is the shared patriarch of the faiths often called Abrahamic. He left his homeland at God's call, rejected the idols of his people and was promised that his descendants would be blessed. Judaism traces the covenant through his son Isaac, Christianity calls him the father of all who believe, and Islam honours him as Khalil Allah, the “Friend of God”, who built the Kaaba with Ismail.",
    life: [
      "Genesis says Abram was born in Ur of the Chaldeans and moved with his father Terah to Harran. At seventy-five he set out at God's command for Canaan, where he lived as a herdsman near Shechem, Bethel and Hebron, with a stay in Egypt during a famine. God renamed him Abraham, “father of many nations”.",
      "His first son, Ishmael (Ismail), was born to Hagar, and his second, Isaac (Ishaq), to Sarah in her old age. Abraham was buried with Sarah in the Cave of Machpelah at Hebron.",
      "The Qur'an focuses on Ibrahim as a young man who argued with his father and his people about idols, smashed the idols of the temple and was thrown into a fire. Later he settled Hajar and Ismail in the valley of Mecca and, with Ismail, raised the foundations of the Kaaba (2:127).",
    ],
    miracles: [
      'The fire made “cool and safe” for him (Qur’an 21:69).',
      'Four birds brought back to life to show him how God raises the dead (Qur’an 2:260).',
      'Sons born in old age: Isaac to Sarah at ninety (Genesis 17–21).',
      'The ram provided in place of his son at the sacrifice (Genesis 22:13; Qur’an 37:107).',
    ],
    views: {
      judaism: { role: 'First patriarch', text: [
        "Avraham is the first of the three patriarchs, with Isaac and Jacob, and the founder of the covenant between God and the Jewish people, sealed by circumcision (Genesis 17). The binding of Isaac on Mount Moriah (Genesis 22), identified with the Temple Mount in Jerusalem, is read on Rosh Hashanah.",
      ] },
      christianity: { role: 'Father of faith', text: [
        "For Paul, Abraham is the model of faith, because he “believed God, and it was counted to him as righteousness” (Romans 4). The New Testament calls him the father of all who believe, Jews and Gentiles alike. Christians often read the near-sacrifice of Isaac as a foreshadowing of Christ.",
      ] },
      islam: { role: 'Prophet and messenger; Friend of God', text: [
        "Ibrahim is one of the greatest prophets, a hanif (pure monotheist) who was “neither a Jew nor a Christian” (3:67). The Qur'an does not name the son he was willing to sacrifice (37:102–107); most Muslim scholars hold it was Ismail. Eid al-Adha and several Hajj rites, such as the running between Safa and Marwa and the stoning at Mina, recall his family's story.",
      ] },
      samaritanism: { role: 'Patriarch', text: [
        "Samaritans honour Abraham as a patriarch and hold that the binding of Isaac took place on Mount Gerizim, not in Jerusalem.",
      ] },
      mandaeism: { role: 'Not recognised as a prophet', text: [
        "Mandaean scripture does not accept Abraham as a true prophet.",
      ] },
    },
    refs: ['Genesis 11:26–25:10', 'Romans 4; Galatians 3; Hebrews 11:8–19', "Qur'an 2:124–133, 258–260; 6:74–83; 14:35–41; 19:41–50; 21:51–73; 37:83–113"],
    places: [
      { name: 'Ur', at: [30.96, 46.10], country: 'iq', kind: 'born', step: 1, note: 'Birthplace in Genesis 11:28–31.' },
      { name: 'Şanlıurfa', at: [37.15, 38.79], country: 'tr', kind: 'born', trad: true, note: 'Turkish and Islamic tradition places his birth and the fire here.' },
      { name: 'Harran', at: [36.86, 39.03], country: 'tr', kind: 'life', step: 2, note: 'Where his father Terah settled (Genesis 11:31).' },
      { name: 'Shechem (Nablus)', at: [32.21, 35.28], country: 'ps', kind: 'life', step: 3, note: 'First stop in Canaan (Genesis 12:6).' },
      { name: 'Egypt', at: [30.6, 31.5], country: 'eg', kind: 'life', step: 4, note: 'Sojourn during a famine (Genesis 12:10).' },
      { name: 'Hebron', at: [31.524, 35.111], country: 'ps', kind: 'died', step: 5, note: 'Burial in the Cave of Machpelah (Genesis 25:9).' },
      { name: 'Mecca', at: [21.4225, 39.8262], country: 'sa', kind: 'life', step: 6, note: 'Raised the Kaaba with Ismail (Qur’an 2:127).' },
    ],
    related: ['lut', 'ismail', 'ishaq', 'yaqub'],
  },
  {
    id: 'lut',
    n: 7,
    names: [['Islam', 'Lut'], ['Christianity', 'Lot'], ['Judaism', 'Lot']],
    scripts: [['ar', 'لوط'], ['he', 'לוט'], ['el', 'Λωτ']],
    era: 'Time of Ibrahim',
    lead: "Lut, or Lot, was Abraham's nephew. He travelled with him to Canaan and settled in Sodom near the Dead Sea. When Sodom and Gomorrah were destroyed for their wickedness, Lot and his daughters were led out by angels; his wife looked back and perished.",
    life: [
      "Lot went with Abraham from Harran to Canaan. When their herds grew too large to share the land, he chose the well-watered plain of the Jordan and lived in Sodom. Angels came to warn him, the men of the city surrounded his house, and he fled at dawn before fire and brimstone fell on the cities of the plain.",
      "In Genesis his wife looked back and became a pillar of salt. In the Qur'an she is among those left behind (7:83) and is given as an example of a disbelieving wife (66:10).",
    ],
    miracles: [
      'Rescued by angels from the destruction of Sodom.',
    ],
    views: {
      judaism: { role: 'Nephew of Abraham', text: [
        "In Genesis Lot is Abraham's kinsman, rescued for Abraham's sake, and the ancestor of the Moabites and Ammonites (Genesis 19:37–38). He is not called a prophet.",
      ] },
      christianity: { role: 'Righteous man', text: [
        "The New Testament calls Lot “righteous” and distressed by the lawlessness around him (2 Peter 2:7–8). Jesus cites Lot's wife as a warning (Luke 17:32).",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "In Islam Lut is a prophet sent to warn his people against their sins. Because Islam holds that prophets are protected from grave sin, Muslim scholars reject later episodes in Genesis that attribute wrongdoing to him.",
      ] },
    },
    refs: ['Genesis 11:27–14:16; 19', "Qur'an 7:80–84; 11:77–83; 15:57–77; 26:160–175; 66:10"],
    places: [
      { name: 'Harran', at: [36.86, 39.03], country: 'tr', kind: 'life', step: 1, note: 'Left with Abraham for Canaan.' },
      { name: 'Sodom, by the Dead Sea', at: [31.05, 35.42], country: ['il', 'jo'], kind: 'life', step: 2, note: 'The cities of the plain, traditionally at the south end of the Dead Sea.' },
      { name: 'Zoar', at: [31.05, 35.5], country: 'jo', kind: 'life', step: 3, note: 'The town he fled to (Genesis 19:22–23).' },
    ],
    related: ['ibrahim'],
  },
  {
    id: 'ismail',
    n: 8,
    names: [['Islam', "Isma'il"], ['Christianity', 'Ishmael'], ['Judaism', 'Yishmael']],
    scripts: [['ar', 'إسماعيل'], ['he', 'ישמעאל'], ['el', 'Ισμαήλ']],
    era: 'Time of Ibrahim',
    lead: "Ismail, or Ishmael, is Abraham's first son, born to Hagar. In Genesis he grows up in the wilderness and becomes the father of twelve princes. In Islam he is a prophet who helped his father build the Kaaba in Mecca, and Muslim tradition sees him as the ancestor of the northern Arabs and of the Prophet Muhammad.",
    life: [
      "Genesis tells how Hagar and the boy were sent away and nearly died of thirst in the wilderness of Beersheba, until God opened her eyes to a well. Ishmael became an archer in the wilderness of Paran and had twelve sons.",
      "Islamic tradition tells a parallel story set in the valley of Mecca. Hajar ran seven times between the hills of Safa and Marwa searching for water until the spring of Zamzam appeared, and later Ismail helped Ibrahim raise the walls of the Kaaba.",
    ],
    miracles: [
      'A spring found in the desert when he and his mother were dying of thirst (Genesis 21:19). Islamic tradition identifies it with Zamzam.',
      'Spared at the sacrifice, in the majority Muslim reading of Qur’an 37:102–107.',
    ],
    views: {
      judaism: { role: 'Son of Abraham', text: [
        "Ishmael is blessed and promised to become a great nation (Genesis 17:20; 21:18), while the covenant passes through Isaac. Later Jewish tradition regarded Ishmael as the ancestor of the Arabs.",
      ] },
      christianity: { role: 'Son of Abraham', text: [
        "Christianity reads Genesis much as Judaism does. Paul uses Hagar and Sarah as an allegory of two covenants (Galatians 4:21–31).",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "The Qur'an praises Ismail as “true to his promise, a messenger and a prophet” (19:54). Most Muslim scholars hold that he was the son Ibrahim was ready to sacrifice, which Eid al-Adha commemorates. The semicircular Hijr Ismail beside the Kaaba is traditionally linked to him and Hajar.",
      ] },
    },
    refs: ['Genesis 16; 17:18–26; 21:8–21; 25:12–18', "Qur'an 2:125–129; 19:54–55; 37:100–107"],
    places: [
      { name: 'Beersheba wilderness', at: [31.25, 34.79], country: 'il', kind: 'life', step: 1, note: 'Where Hagar found the well in Genesis 21.' },
      { name: 'Mecca', at: [21.4225, 39.8262], country: 'sa', kind: 'life', step: 2, note: 'Zamzam and the Kaaba in Islamic tradition.' },
    ],
    related: ['ibrahim', 'ishaq', 'muhammad'],
  },
  {
    id: 'ishaq',
    n: 9,
    names: [['Islam', 'Ishaq'], ['Christianity', 'Isaac'], ['Judaism', 'Yitzhak']],
    scripts: [['ar', 'إسحاق'], ['he', 'יצחק'], ['el', 'Ισαάκ']],
    era: 'Time of Ibrahim',
    lead: "Ishaq, or Isaac, is the son promised to Abraham and Sarah in their old age; his name means “he laughs”. He is the second patriarch of Judaism and the father of Jacob and Esau. The Qur'an names him as a prophet and a gift to Ibrahim.",
    life: [
      "Isaac was born when Abraham was a hundred and Sarah ninety. As a young man he was bound on an altar on Mount Moriah before an angel stopped the sacrifice. He married Rebekah, lived around Beersheba and Gerar, and in old age gave his blessing to Jacob instead of the elder twin, Esau. He was buried at Hebron.",
    ],
    miracles: [
      'Born to parents past the age of having children (Genesis 18; Qur’an 11:71–72).',
    ],
    views: {
      judaism: { role: 'Second patriarch', text: [
        "The binding of Isaac, the Akedah (Genesis 22), is a central story of faith and is read on Rosh Hashanah. Through Isaac and Jacob the covenant passes to the people of Israel.",
      ] },
      christianity: { role: 'Child of the promise', text: [
        "The New Testament calls Isaac the child of promise (Galatians 4:28). Many Christian writers see in his near-sacrifice a figure of Christ's sacrifice (Hebrews 11:17–19).",
      ] },
      islam: { role: 'Prophet', text: [
        "The Qur'an gives the good news of Ishaq to Ibrahim and Sarah (11:71) and names him a prophet among the righteous (37:112). In the majority Muslim view the son of the sacrifice was Ismail, not Ishaq.",
      ] },
      samaritanism: { role: 'Patriarch', text: [
        "Samaritans place the binding of Isaac on Mount Gerizim.",
      ] },
    },
    refs: ['Genesis 17:15–28:9; 35:27–29', "Qur'an 11:71–73; 37:112–113"],
    places: [
      { name: 'Beersheba', at: [31.25, 34.79], country: 'il', kind: 'life', note: 'Where he lived for much of his life.' },
      { name: 'Mount Moriah', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Site of the binding in Jewish and Christian tradition.' },
      { name: 'Hebron', at: [31.524, 35.111], country: 'ps', kind: 'died', note: 'Buried in the Cave of Machpelah.' },
    ],
    related: ['ibrahim', 'ismail', 'yaqub'],
  },
  {
    id: 'yaqub',
    n: 10,
    names: [['Islam', "Ya'qub"], ['Christianity', 'Jacob'], ['Judaism', "Ya'akov"]],
    scripts: [['ar', 'يعقوب'], ['he', 'יעקב'], ['el', 'Ιακώβ']],
    era: 'Patriarchal age (traditional dating)',
    lead: "Yaqub, or Jacob, is the son of Isaac, also called Israel. His twelve sons became the twelve tribes of Israel, which is why the Jewish people are called the Children of Israel. The Qur'an names him a prophet and records his deathbed advice to his sons to hold to the one God.",
    life: [
      "Jacob received his father's blessing ahead of his twin, Esau, and fled to his uncle Laban in Harran. On the way, at Bethel, he dreamed of a ladder reaching to heaven. He worked twenty years for Laban, married Leah and Rachel, and returned to Canaan. At the Jabbok river he wrestled through the night with a mysterious figure and was renamed Israel.",
      "His favourite son, Joseph, was sold into slavery by his brothers. Years later the family moved to Egypt during a famine, and Jacob died there and was buried at Hebron.",
    ],
    miracles: [
      'The vision of a ladder to heaven at Bethel (Genesis 28:12).',
      'His sight restored when Yusuf’s shirt was laid on his face (Qur’an 12:93–96).',
    ],
    views: {
      judaism: { role: 'Third patriarch', text: [
        "Jacob is the third patriarch and the father of the twelve tribes. His name Israel, explained as “one who struggles with God” (Genesis 32:28), became the name of the people.",
      ] },
      christianity: { role: 'Patriarch', text: [
        "Jacob is honoured as a patriarch and an ancestor of Jesus. Jesus refers to Jacob's ladder when he tells Nathanael he will see “angels ascending and descending” (John 1:51).",
      ] },
      islam: { role: 'Prophet', text: [
        "The Qur'an calls him Yaqub and also Isra'il (3:93). He is a model of patience in his grief for Yusuf, saying “patience is most fitting” (12:18, 83). On his deathbed he asked his sons whom they would worship (2:133).",
      ] },
    },
    refs: ['Genesis 25:19–50:14', "Qur'an 2:132–133; 12; 19:49"],
    places: [
      { name: 'Beersheba', at: [31.25, 34.79], country: 'il', kind: 'born', step: 1, note: 'Grew up in his father’s camp.' },
      { name: 'Bethel', at: [31.93, 35.22], country: 'ps', kind: 'life', step: 2, note: 'The dream of the ladder.' },
      { name: 'Harran', at: [36.86, 39.03], country: 'tr', kind: 'life', step: 3, note: 'Twenty years with Laban.' },
      { name: 'Shechem', at: [32.21, 35.28], country: 'ps', kind: 'life', step: 4, note: 'Returned to Canaan.' },
      { name: 'Goshen, Egypt', at: [30.8, 31.8], country: 'eg', kind: 'died', step: 5, note: 'Died in Egypt and was carried to Hebron for burial.' },
    ],
    related: ['ishaq', 'yusuf'],
  },
  {
    id: 'yusuf',
    n: 11,
    names: [['Islam', 'Yusuf'], ['Christianity', 'Joseph'], ['Judaism', 'Yosef']],
    scripts: [['ar', 'يوسف'], ['he', 'יוסף'], ['el', 'Ιωσήφ']],
    era: 'Patriarchal age (traditional dating)',
    lead: "Yusuf, or Joseph, is Jacob's favourite son, sold into slavery by his jealous brothers, who rose to govern Egypt and saved his family from famine. Genesis devotes fourteen chapters to his story, and the Qur'an gives him a whole surah, calling it “the best of stories” (12:3).",
    life: [
      "As a boy Joseph dreamed that the sun, moon and stars bowed to him. His brothers threw him into a pit and he was sold to traders who took him to Egypt. There he served in the house of an official, resisted the advances of the official's wife and was imprisoned.",
      "In prison he interpreted dreams. He was called to explain the ruler's dream of seven fat and seven lean cows, predicted seven years of plenty and seven of famine, and was put in charge of Egypt's grain. When his brothers came to buy food he eventually revealed himself, forgave them and brought his father to Egypt.",
    ],
    miracles: [
      'Gift of interpreting dreams.',
      'His shirt restoring his father’s sight (Qur’an 12:93–96).',
    ],
    views: {
      judaism: { role: 'Son of Jacob; ancestor of two tribes', text: [
        "Joseph's sons, Ephraim and Manasseh, each became a tribe of Israel. Joseph asked that his bones be carried out of Egypt, and they were buried at Shechem (Genesis 50:25; Joshua 24:32).",
      ] },
      christianity: { role: 'Patriarch; type of Christ', text: [
        "Christian writers have often seen Joseph, betrayed by his brothers and then their saviour, as a foreshadowing of Christ. Stephen retells his story in Acts 7:9–16.",
      ] },
      islam: { role: 'Prophet', text: [
        "Surah Yusuf (12) tells the story as a single narrative. It stresses his chastity, his patience and his trust in God. Its ruler of Egypt is called “the king”, and the official's wife is known in later tradition as Zulaykha.",
      ] },
      samaritanism: { role: 'Patriarch', text: [
        "Samaritans revere Joseph's Tomb in Nablus, beside their holy mountain, Gerizim.",
      ] },
    },
    refs: ['Genesis 37–50', "Qur'an 12"],
    places: [
      { name: 'Hebron', at: [31.524, 35.111], country: 'ps', kind: 'born', step: 1, note: 'His father’s home when he was sold (Genesis 37:14).' },
      { name: 'Dothan', at: [32.43, 35.24], country: 'ps', kind: 'life', step: 2, note: 'Where his brothers sold him.' },
      { name: 'Egypt (Memphis region)', at: [29.85, 31.25], country: 'eg', kind: 'life', step: 3, note: 'Rose to govern the land.' },
      { name: 'Joseph’s Tomb, Nablus', at: [32.213, 35.285], country: 'ps', kind: 'died', trad: true, note: 'Traditional burial place at ancient Shechem.' },
    ],
    related: ['yaqub', 'musa'],
  },
  {
    id: 'ayyub',
    n: 12,
    names: [['Islam', 'Ayyub'], ['Christianity', 'Job'], ['Judaism', 'Iyov']],
    scripts: [['ar', 'أيوب'], ['he', 'איוב'], ['el', 'Ιώβ']],
    era: 'Uncertain',
    lead: "Ayyub, or Job, is the righteous man who kept his faith through the loss of his wealth, his children and his health. The Book of Job explores why the innocent suffer, and the Qur'an holds him up as the model of patience. His name has become a byword for endurance across the region.",
    life: [
      "The Book of Job opens in heaven, where the Satan claims Job is faithful only because he is prosperous. Job loses his herds, his children and his health, and sits covered in sores. Three friends insist he must have sinned. Job protests his innocence and demands an answer, and God speaks to him from a whirlwind. In the end Job is restored with twice what he had.",
      "The Qur'an's account is brief: Ayyub called on God in his affliction, was told to strike the ground with his foot, and a spring appeared to wash and drink from (38:41–44).",
    ],
    miracles: [
      'Healing through a spring that gushed where he struck the ground (Qur’an 38:42).',
      'Restoration of his family and wealth (Job 42:10–17).',
    ],
    views: {
      judaism: { role: 'Righteous man', text: [
        "The Book of Job is part of the Ketuvim (Writings). Its land of Uz is unknown. Jewish interpreters have long debated whether Job was a historical person and whether he was even an Israelite.",
      ] },
      christianity: { role: 'Righteous sufferer', text: [
        "The Letter of James points to “the patience of Job” (James 5:11). Passages such as “I know that my Redeemer lives” (Job 19:25) became central to Christian hope in resurrection.",
      ] },
      islam: { role: 'Prophet', text: [
        "Ayyub is a prophet praised as “an excellent servant” who always turned to God (38:44). Shrines associated with him include a tomb near Salalah in Oman and the cave of Eyyüp Peygamber in Şanlıurfa, Turkey.",
      ] },
      druze: { role: 'Revered prophet', text: [
        "The Druze revere a shrine of Nabi Ayyub at Niha in the Chouf mountains of Lebanon.",
      ] },
    },
    refs: ['Book of Job; James 5:11', "Qur'an 4:163; 6:84; 21:83–84; 38:41–44"],
    places: [
      { name: 'Land of Uz', at: [30.5, 36.2], country: 'jo', kind: 'life', trad: true, note: 'Location unknown; often placed east of the Jordan, in Edom or the Hauran.' },
      { name: 'Şanlıurfa', at: [37.15, 38.79], country: 'tr', kind: 'life', trad: true, note: 'Cave of Eyyüp Peygamber.' },
      { name: 'Niha, Chouf', at: [33.6, 35.6], country: 'lb', kind: 'died', trad: true, note: 'Druze shrine of Nabi Ayyub.' },
      { name: 'Salalah', at: [17.07, 53.97], country: 'om', kind: 'died', trad: true, note: 'A traditional tomb of Nabi Ayyub.' },
    ],
    related: ['yaqub'],
  },
  {
    id: 'shuayb',
    n: 13,
    names: [['Islam', "Shu'ayb"], ['Christianity', 'Jethro'], ['Judaism', 'Yitro']],
    scripts: [['ar', 'شعيب'], ['he', 'יתרו'], ['el', 'Ιοθόρ']],
    era: 'Time of Musa',
    identity: 'Many Muslim scholars and the Druze identify Shu’ayb with Jethro, the priest of Midian; others think they were different men.',
    lead: "Shu'ayb is the prophet of Midian in the Qur'an, sent to a trading people who cheated with false weights and measures. Many identify him with Jethro, the priest of Midian in Exodus who gave Moses shelter and his daughter in marriage. He is the most important prophet of the Druze faith.",
    life: [
      "The Qur'an says Shu'ayb told the people of Midian to give full measure and weight and not to spread corruption in the land. They threatened to drive him out, and were destroyed by an earthquake and a dark cloud.",
      "In Exodus, Jethro (also called Reuel) is the priest of Midian. He welcomes Moses after he flees Egypt, gives him his daughter Zipporah as a wife, and later advises him to appoint judges to share the work of leadership. The Qur'an tells of an old man of Midian whose daughter Musa married (28:22–28) but does not name him.",
    ],
    miracles: [
      'Saved, with the believers, when his people were destroyed (Qur’an 11:94).',
    ],
    views: {
      judaism: { role: 'Priest of Midian; father-in-law of Moses', text: [
        "Jethro is remembered as a wise non-Israelite who recognised the God of Israel (Exodus 18:11). The Torah portion that contains the Ten Commandments is named after him.",
      ] },
      christianity: { role: 'Father-in-law of Moses', text: [
        "Christianity reads Jethro through Exodus as a righteous Gentile and wise counsellor.",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "Shu'ayb is known as the “orator of the prophets” for his eloquent appeals. The Qur'an does not say he is Jethro; the identification comes from scholars, and some reject it on grounds of chronology.",
      ] },
      druze: { role: 'Chief prophet', text: [
        "For the Druze, Nabi Shu'ayb, identified with Jethro, is the principal prophet. His shrine near Hittin, above the Sea of Galilee, is their most important pilgrimage site, visited every April.",
      ] },
    },
    refs: ['Exodus 2:15–22; 3:1; 18', "Qur'an 7:85–93; 11:84–95; 26:176–191; 28:22–28"],
    places: [
      { name: 'Midian (al-Badʿ)', at: [28.48, 35.02], country: 'sa', kind: 'life', note: 'Midian lay in north-western Arabia; tradition points to al-Badʿ.' },
      { name: 'Nabi Shu’ayb, Hittin', at: [32.80, 35.47], country: 'il', kind: 'died', trad: true, note: 'Druze shrine and traditional tomb.' },
    ],
    related: ['musa'],
  },
  {
    id: 'musa',
    n: 14,
    names: [['Islam', 'Musa'], ['Christianity', 'Moses'], ['Judaism', 'Moshe']],
    scripts: [['ar', 'موسى'], ['he', 'משה'], ['el', 'Μωυσής']],
    era: 'c. 13th century BCE (traditional dating)',
    lead: "Musa, or Moses, led the Israelites out of slavery in Egypt and received God's law at Mount Sinai. He is the greatest prophet of Judaism, the lawgiver of the Christian Old Testament, and the prophet most often named in the Qur'an. For Samaritans he is the one and only prophet.",
    life: [
      "Born in Egypt when Pharaoh had ordered Hebrew baby boys to be killed, Moses was hidden in a basket on the Nile and raised in the royal household. After killing an Egyptian who was beating a Hebrew, he fled to Midian, married there, and kept sheep until God spoke to him from a burning bush and sent him back to Pharaoh.",
      "After a series of plagues Pharaoh let the people go, then pursued them to the sea, which parted for the Israelites and closed over the Egyptians. At Mount Sinai Moses received the Ten Commandments. He led the people through the wilderness for forty years and died on Mount Nebo, in sight of the promised land.",
    ],
    miracles: [
      'The burning bush (Exodus 3; Qur’an 20:9–14).',
      'His staff turning into a serpent, and his hand shining white (Exodus 4; Qur’an 20:17–22).',
      'The plagues of Egypt (Exodus 7–12; Qur’an 7:133).',
      'The parting of the sea (Exodus 14; Qur’an 26:63).',
      'Water from the rock and manna from heaven (Exodus 16–17; Qur’an 2:57, 60).',
      'God speaking to him directly at Sinai.',
    ],
    views: {
      judaism: { role: 'Greatest prophet; lawgiver', text: [
        "Moshe Rabbenu, “Moses our teacher”, is the prophet through whom the Torah was given. Deuteronomy says no prophet arose like him, whom God knew face to face (34:10). The Exodus is retold every year at Passover.",
      ] },
      christianity: { role: 'Prophet and lawgiver', text: [
        "Christianity honours Moses as the giver of the Law and a forerunner of Christ. He appears with Elijah at the Transfiguration (Matthew 17:3), and Christians read Deuteronomy 18:15, “a prophet like me”, as pointing to Jesus (Acts 3:22).",
      ] },
      islam: { role: 'Prophet and messenger; one who spoke with God', text: [
        "Musa is Kalim Allah, the one to whom God spoke, and received the Tawrat (Torah). His story is told across many surahs, including his encounter with a wise servant of God (18:60–82), traditionally identified as al-Khidr. Muslims fast on ʿAshura, which tradition links to the crossing of the sea.",
      ] },
      samaritanism: { role: 'The only prophet', text: [
        "Samaritans accept only the five books of Moses as scripture and regard Moses as the one true prophet. They await the Taheb, a prophet like Moses.",
      ] },
      mandaeism: { role: 'Not recognised as a prophet', text: [
        "Mandaean texts reject Moses and the religion of the Torah.",
      ] },
    },
    refs: ['Exodus; Leviticus; Numbers; Deuteronomy', "Qur'an 2:49–74; 7:103–162; 20:9–98; 26:10–68; 28:3–46"],
    places: [
      { name: 'Nile Delta, Egypt', at: [30.8, 31.6], country: 'eg', kind: 'born', step: 1, note: 'Born among the Hebrews in Egypt.' },
      { name: 'Midian', at: [28.48, 35.02], country: 'sa', kind: 'life', step: 2, note: 'Took refuge and married.' },
      { name: 'Mount Sinai (Jabal Musa)', at: [28.539, 33.975], country: 'eg', kind: 'life', step: 3, note: 'Received the Law; traditional site.' },
      { name: 'Mount Nebo', at: [31.768, 35.726], country: 'jo', kind: 'died', step: 4, note: 'Viewed the promised land and died (Deuteronomy 34).' },
      { name: 'Nabi Musa, near Jericho', at: [31.79, 35.43], country: 'ps', kind: 'died', trad: true, note: 'Islamic shrine of Musa.' },
    ],
    related: ['harun', 'miriam', 'shuayb', 'joshua'],
  },
  {
    id: 'harun',
    n: 15,
    names: [['Islam', 'Harun'], ['Christianity', 'Aaron'], ['Judaism', 'Aharon']],
    scripts: [['ar', 'هارون'], ['he', 'אהרן'], ['el', 'Ααρών']],
    era: 'Time of Musa',
    lead: "Harun, or Aaron, is the elder brother of Moses, his spokesman before Pharaoh and the first high priest of Israel. The scriptures differ sharply over the golden calf: in Exodus Aaron makes it, while in the Qur'an a man called the Samiri makes it and Harun tries to stop the people.",
    life: [
      "Moses said he was slow of speech, so God appointed Aaron to speak for him. Aaron stood beside Moses before Pharaoh, and his staff swallowed the staffs of Pharaoh's magicians. In the wilderness he was consecrated high priest, and his rod budded and bore almonds as a sign of God's choice. He died on Mount Hor before the people reached Canaan.",
    ],
    miracles: [
      'His rod budding overnight (Numbers 17).',
      'His staff swallowing the magicians’ staffs (Exodus 7:12).',
    ],
    views: {
      judaism: { role: 'First high priest', text: [
        "Aaron is the ancestor of the kohanim, the Jewish priestly families. Rabbinic tradition remembers him as one who “loved peace and pursued peace”.",
      ] },
      christianity: { role: 'High priest', text: [
        "The Letter to the Hebrews contrasts Aaron's priesthood with the eternal priesthood of Christ (Hebrews 5–7).",
      ] },
      islam: { role: 'Prophet', text: [
        "Musa asked God to make Harun his helper (20:29–32). In the Qur'an Harun warns the people against the calf and pleads with Musa on his return (20:90–94), so he bears no blame for it.",
      ] },
      samaritanism: { role: 'High priest', text: [
        "The Samaritan high priests trace their line back to Aaron.",
      ] },
    },
    refs: ['Exodus 4:14–16; 7; 28–29; 32; Numbers 17; 20:22–29', "Qur'an 20:29–36, 85–94; 28:34–35"],
    places: [
      { name: 'Egypt', at: [30.8, 31.6], country: 'eg', kind: 'born', step: 1, note: 'Spoke for Moses before Pharaoh.' },
      { name: 'Mount Sinai', at: [28.539, 33.975], country: 'eg', kind: 'life', step: 2, note: 'Ordained as high priest.' },
      { name: 'Jebel Harun, near Petra', at: [30.317, 35.407], country: 'jo', kind: 'died', step: 3, note: 'Traditional Mount Hor, with a shrine on the summit.' },
    ],
    related: ['musa', 'miriam'],
  },
  {
    id: 'dhulkifl',
    n: 16,
    names: [['Islam', 'Dhu al-Kifl']],
    scripts: [['ar', 'ذو الكفل']],
    era: 'Uncertain',
    identity: 'His identity is debated. A common view identifies him with the prophet Ezekiel; others suggest Obadiah or Joshua.',
    lead: "Dhu al-Kifl, “the one of the pledge” or “of the portion”, is named twice in the Qur'an among the patient and the best of men, with no story attached. Muslim scholars have debated who he was. A popular view identifies him with Ezekiel, whose shrine stands in the Iraqi town of al-Kifl.",
    life: [
      "Nothing is known of his life from the Qur'an. Commentators told of a man who pledged to pray through the night, fast by day and judge without anger, and kept his word, which may explain the name.",
    ],
    miracles: [],
    views: {
      islam: { role: 'Prophet', text: [
        "He is listed with Ismail and Idris as “all among the patient” (21:85) and with Ismail and al-Yasa as “among the best” (38:48). Most scholars count him as a prophet; a few regarded him as a righteous man only.",
      ] },
      judaism: { role: 'If Ezekiel: prophet', text: [
        "Jews have long venerated the tomb at al-Kifl as the tomb of the prophet Ezekiel (Yehezkel). See the entry on Ezekiel.",
      ] },
    },
    refs: ["Qur'an 21:85–86; 38:48"],
    places: [
      { name: 'Al-Kifl', at: [32.227, 44.37], country: 'iq', kind: 'died', trad: true, note: 'Shrine honoured by Muslims as Dhu al-Kifl and by Jews as Ezekiel.' },
    ],
    related: ['ezekiel'],
  },
  {
    id: 'dawud',
    n: 17,
    names: [['Islam', 'Dawud'], ['Christianity', 'David'], ['Judaism', 'David']],
    scripts: [['ar', 'داود'], ['he', 'דוד'], ['el', 'Δαβίδ']],
    era: 'c. 1000 BCE',
    lead: "Dawud, or David, the shepherd boy who killed the giant Goliath, became king of Israel and made Jerusalem his capital. Judaism and Christianity honour him as the king from whose line the Messiah comes and the singer of the Psalms. Islam honours him as a prophet-king who received the Zabur.",
    life: [
      "David was born in Bethlehem, the youngest son of Jesse, and anointed by the prophet Samuel. As a youth he killed the Philistine champion Goliath with a sling. After years at Saul's court and as a fugitive, he became king, ruling seven years at Hebron and thirty-three at Jerusalem, which he captured and made the capital.",
      "He is remembered as a poet and musician; many of the Psalms are attributed to him. Scripture also records his failings and his repentance.",
    ],
    miracles: [
      'Killing Goliath (1 Samuel 17; Qur’an 2:251).',
      'Mountains and birds joining his praise of God (Qur’an 34:10; 38:18–19).',
      'Iron made soft in his hands to make coats of mail (Qur’an 34:10–11).',
    ],
    views: {
      judaism: { role: 'King of Israel', text: [
        "David is the ideal king and the founder of the royal dynasty promised to last forever (2 Samuel 7). Jewish tradition expects the Messiah to be a descendant of David. Many Psalms are attributed to him, though Judaism counts him as a king more than a prophet.",
      ] },
      christianity: { role: 'King and prophet', text: [
        "Jesus is called “Son of David”, and the Gospels trace his descent from David. The New Testament also calls David a prophet (Acts 2:29–30).",
      ] },
      islam: { role: 'Prophet and king', text: [
        "God gave Dawud the Zabur (17:55), kingship and wisdom (2:251). The Qur'an praises his worship and his justice in judgment. It tells of two litigants who climbed into his prayer chamber, after which he sought forgiveness (38:21–25). Islam does not accept the Bathsheba narrative as told in 2 Samuel 11.",
      ] },
    },
    refs: ['1 Samuel 16 – 1 Kings 2; Psalms', "Qur'an 2:251; 4:163; 21:78–80; 34:10–11; 38:17–26"],
    places: [
      { name: 'Bethlehem', at: [31.705, 35.2], country: 'ps', kind: 'born', step: 1, note: 'His home town (1 Samuel 16).' },
      { name: 'Valley of Elah', at: [31.69, 34.96], country: 'il', kind: 'life', step: 2, note: 'Where he fought Goliath.' },
      { name: 'Hebron', at: [31.524, 35.111], country: 'ps', kind: 'life', step: 3, note: 'First royal capital.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'died', step: 4, note: 'Capital for 33 years; buried in the City of David.' },
    ],
    related: ['sulayman', 'samuel', 'nathan'],
  },
  {
    id: 'sulayman',
    n: 18,
    names: [['Islam', 'Sulayman'], ['Christianity', 'Solomon'], ['Judaism', 'Shlomo']],
    scripts: [['ar', 'سليمان'], ['he', 'שלמה'], ['el', 'Σολομών']],
    era: '10th century BCE',
    lead: "Sulayman, or Solomon, son of David, was famed for his wisdom and wealth and built the First Temple in Jerusalem. In the Qur'an he is a prophet-king who understood the speech of birds and ants and commanded the wind and the jinn. Both traditions tell of his meeting with the Queen of Sheba.",
    life: [
      "Solomon succeeded David and asked God for wisdom rather than riches. The Bible tells how he settled the dispute of two women claiming the same baby. He built the Temple and a great palace, traded widely and received the Queen of Sheba, who came to test him with hard questions.",
      "The Qur'an tells how a hoopoe brought him news of Sheba and its queen, how her throne was brought to him in the blink of an eye, and how she submitted to God with him (27:20–44).",
    ],
    miracles: [
      'Understanding the speech of birds and of an ant (Qur’an 27:16–19).',
      'The wind made to serve him (Qur’an 21:81; 34:12).',
      'Jinn working at his command (Qur’an 34:12–13).',
      'The throne of the Queen of Sheba brought instantly (Qur’an 27:38–40).',
    ],
    views: {
      judaism: { role: 'King; builder of the Temple', text: [
        "Shlomo is the builder of the First Temple and, by tradition, the author of Proverbs, Ecclesiastes and the Song of Songs. 1 Kings 11 says that in old age his foreign wives turned his heart to other gods.",
      ] },
      christianity: { role: 'King and sage', text: [
        "Christianity honours Solomon's wisdom literature. Jesus mentions Solomon's glory and the Queen of the South who came to hear his wisdom (Matthew 6:29; 12:42).",
      ] },
      islam: { role: 'Prophet and king', text: [
        "The Qur'an stresses that “Sulayman did not disbelieve” (2:102). It tells that he died leaning on his staff, and the jinn did not realise it until a creature of the earth gnawed through the staff (34:14).",
      ] },
    },
    refs: ['1 Kings 1–11; 2 Chronicles 1–9', "Qur'an 2:102; 21:78–82; 27:15–44; 34:12–14; 38:30–40"],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', step: 1, note: 'Capital and site of the First Temple.' },
      { name: 'Saba (Sheba), Marib', at: [15.43, 45.35], country: 'ye', kind: 'life', step: 2, note: 'Kingdom of the queen who visited him.' },
    ],
    related: ['dawud'],
  },
  {
    id: 'ilyas',
    n: 19,
    names: [['Islam', 'Ilyas'], ['Christianity', 'Elijah'], ['Judaism', 'Eliyahu']],
    scripts: [['ar', 'إلياس'], ['he', 'אליהו'], ['el', 'Ηλίας']],
    era: '9th century BCE',
    lead: "Ilyas, or Elijah, is the fiery prophet who challenged the worship of the god Baal in the northern kingdom of Israel. The Bible says he was taken up to heaven in a whirlwind, and Judaism and Christianity both expect his return. The Qur'an names him among the messengers.",
    life: [
      "Elijah of Tishbe, in Gilead east of the Jordan, confronted King Ahab and Queen Jezebel and announced a drought. He was fed by ravens, and stayed with a widow in Zarephath whose flour and oil did not run out; he raised her son to life. On Mount Carmel he challenged the prophets of Baal, and fire fell from heaven on his offering.",
      "Fleeing Jezebel, he heard God not in wind, earthquake or fire but in “a still small voice” at Horeb. He named Elisha his successor and was taken up in a whirlwind with a chariot of fire.",
    ],
    miracles: [
      'Fed by ravens; the widow’s flour and oil that did not run out (1 Kings 17).',
      'Raising the widow’s son (1 Kings 17:22).',
      'Fire from heaven on Mount Carmel (1 Kings 18:38).',
      'Taken up to heaven in a whirlwind (2 Kings 2:11).',
    ],
    views: {
      judaism: { role: 'Prophet; herald of the Messiah', text: [
        "Malachi foretells that Elijah will return before the great day of the Lord (Malachi 4:5). At the Passover Seder a cup is poured for Elijah and the door is opened for him.",
      ] },
      christianity: { role: 'Prophet', text: [
        "The Gospels describe John the Baptist as coming “in the spirit and power of Elijah” (Luke 1:17). Elijah appears with Moses at the Transfiguration (Matthew 17:3).",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "The Qur'an says Ilyas asked his people, “Will you call on Baal and abandon the best of creators?” (37:125). Some Muslim traditions associate him with al-Khidr.",
      ] },
      druze: { role: 'Revered prophet', text: [
        "The Druze honour Elijah, whom they associate with al-Khidr, at shrines on Mount Carmel.",
      ] },
    },
    refs: ['1 Kings 17 – 2 Kings 2; Malachi 4:5–6', "Qur'an 6:85; 37:123–132"],
    places: [
      { name: 'Tishbe, Gilead', at: [32.36, 35.73], country: 'jo', kind: 'born', step: 1, note: 'His home town; traditionally near Ajloun.' },
      { name: 'Zarephath (Sarafand)', at: [33.45, 35.30], country: 'lb', kind: 'life', step: 2, note: 'Stayed with the widow.' },
      { name: 'Mount Carmel', at: [32.67, 35.05], country: 'il', kind: 'life', step: 3, note: 'Contest with the prophets of Baal.' },
      { name: 'Jordan river near Jericho', at: [31.84, 35.55], country: ['jo', 'ps'], kind: 'died', step: 4, note: 'Taken up in the whirlwind (2 Kings 2).' },
    ],
    related: ['ilyasa', 'yahya'],
  },
  {
    id: 'ilyasa',
    n: 20,
    names: [['Islam', "al-Yasa'"], ['Christianity', 'Elisha'], ['Judaism', 'Elisha']],
    scripts: [['ar', 'اليسع'], ['he', 'אלישע'], ['el', 'Ελισαιέ']],
    era: '9th century BCE',
    lead: "Al-Yasa, or Elisha, was the disciple and successor of Elijah. He asked for a double portion of his master's spirit, and the Bible records more miracles for him than for any other prophet of the Hebrew Bible. The Qur'an names him among the best of men.",
    life: [
      "Elisha was ploughing when Elijah threw his cloak over him. He followed Elijah, saw him taken up, and took up his cloak, with which he parted the Jordan. He served as a prophet in the northern kingdom for decades, advising kings and helping ordinary people.",
    ],
    miracles: [
      'Parting the Jordan with Elijah’s cloak (2 Kings 2:14).',
      'Healing the spring of Jericho (2 Kings 2:19–22).',
      'The widow’s oil and the raising of the Shunammite woman’s son (2 Kings 4).',
      'Healing Naaman the Syrian of leprosy (2 Kings 5).',
      'A dead man revived on touching his bones (2 Kings 13:21).',
    ],
    views: {
      judaism: { role: 'Prophet', text: [
        "Elisha is the great wonder-working prophet of the Book of Kings and continued Elijah's struggle against Baal worship.",
      ] },
      christianity: { role: 'Prophet', text: [
        "Jesus mentions Elisha's healing of Naaman as an example of God's mercy to outsiders (Luke 4:27).",
      ] },
      islam: { role: 'Prophet', text: [
        "Al-Yasa is listed with Ismail, Yunus and Lut among those favoured above the worlds (6:86), and among the best (38:48). A shrine attributed to him stands at Eğil, near Diyarbakır in Turkey.",
      ] },
    },
    refs: ['1 Kings 19:16–21; 2 Kings 2–13', "Qur'an 6:86; 38:48"],
    places: [
      { name: 'Abel-meholah', at: [32.35, 35.55], country: ['jo', 'ps'], kind: 'born', note: 'His home in the Jordan valley.' },
      { name: 'Jericho spring', at: [31.871, 35.444], country: 'ps', kind: 'life', note: 'Healed the waters; still called Elisha’s Spring.' },
      { name: 'Samaria (Sebastia)', at: [32.28, 35.19], country: 'ps', kind: 'life', note: 'Capital of the northern kingdom.' },
      { name: 'Eğil', at: [38.26, 40.08], country: 'tr', kind: 'died', trad: true, note: 'Traditional tomb in Islamic tradition.' },
    ],
    related: ['ilyas'],
  },
  {
    id: 'yunus',
    n: 21,
    names: [['Islam', 'Yunus'], ['Christianity', 'Jonah'], ['Judaism', 'Yonah']],
    scripts: [['ar', 'يونس'], ['he', 'יונה'], ['el', 'Ιωνάς']],
    era: '8th century BCE',
    lead: "Yunus, or Jonah, is the prophet who fled from God's command, was swallowed by a great fish and, after he repented, preached to the city of Nineveh, which repented and was spared. The Qur'an calls him Dhu al-Nun, “the one of the fish”, and names a surah after him.",
    life: [
      "Jonah son of Amittai, from Gath-hepher in Galilee, was told to warn Nineveh, the Assyrian capital. Instead he took a ship from Jaffa going the other way. In a storm the sailors threw him overboard and a great fish swallowed him. From inside it he prayed, and after three days and nights it cast him onto dry land.",
      "He then went to Nineveh, whose people repented, and God spared the city. Jonah was angry, and God taught him a lesson about mercy with a plant that grew and withered to shade him.",
    ],
    miracles: [
      'Surviving three days inside the great fish (Jonah 1:17; Qur’an 37:139–145).',
      'The plant God caused to grow over him (Jonah 4:6; Qur’an 37:146).',
    ],
    views: {
      judaism: { role: 'Prophet', text: [
        "The Book of Jonah is one of the Twelve Minor Prophets and is read in the afternoon of Yom Kippur as a lesson in repentance and in God's mercy, even to Israel's enemies.",
      ] },
      christianity: { role: 'Prophet', text: [
        "Jesus speaks of “the sign of Jonah”: as Jonah was three days in the fish, the Son of Man would be three days in the earth (Matthew 12:39–41).",
      ] },
      islam: { role: 'Prophet and messenger', text: [
        "The Qur'an says the people of Yunus were the one town that believed in time and so benefited from its faith (10:98). His prayer in the darkness, “There is no god but You; glory be to You; I was among the wrongdoers” (21:87), is often recited by Muslims in times of distress.",
      ] },
    },
    refs: ['Book of Jonah; 2 Kings 14:25; Matthew 12:38–41', "Qur'an 10:98; 21:87–88; 37:139–148; 68:48–50"],
    places: [
      { name: 'Gath-hepher', at: [32.74, 35.33], country: 'il', kind: 'born', step: 1, note: 'His home town (2 Kings 14:25).' },
      { name: 'Jaffa (Joppa)', at: [32.05, 34.75], country: 'il', kind: 'life', step: 2, note: 'Where he boarded the ship.' },
      { name: 'Nineveh (Mosul)', at: [36.36, 43.15], country: 'iq', kind: 'life', step: 3, note: 'The city that repented.' },
      { name: 'Nabi Yunus, Mosul', at: [36.355, 43.16], country: 'iq', kind: 'died', trad: true, note: 'Traditional tomb, destroyed in 2014.' },
    ],
    related: ['ilyasa'],
  },
  {
    id: 'zakariyya',
    n: 22,
    names: [['Islam', 'Zakariyya'], ['Christianity', 'Zechariah (Zacharias)'], ['Judaism', 'Zekharyah']],
    scripts: [['ar', 'زكريا'], ['he', 'זכריה'], ['el', 'Ζαχαρίας']],
    era: '1st century BCE',
    identity: 'Not the same person as the Old Testament prophet Zechariah, who lived five centuries earlier.',
    lead: "Zakariyya, or Zechariah, was a priest of the Temple in Jerusalem and the father of John the Baptist. In old age he was promised a son, and was struck silent until the child was born. In the Qur'an he is also the guardian of Maryam, the mother of Jesus.",
    life: [
      "Luke's Gospel tells that while Zechariah was serving in the Temple, the angel Gabriel announced that his elderly wife Elizabeth would bear a son. Because he doubted, he could not speak until the boy was born and named John.",
      "The Qur'an tells the same story (19:2–11) and adds that Zakariyya cared for the young Maryam in the Temple. Whenever he entered her prayer niche he found food with her, and she said it came from God (3:37).",
    ],
    miracles: [
      'A son born to him and his barren wife in old age.',
      'Unable to speak for three days as a sign (Qur’an 19:10) or until the birth (Luke 1:20).',
    ],
    views: {
      christianity: { role: 'Priest; father of John the Baptist', text: [
        "Zechariah's song at John's birth, the Benedictus (Luke 1:68–79), is sung daily in the morning prayer of many churches.",
      ] },
      islam: { role: 'Prophet', text: [
        "Zakariyya is a prophet whose quiet prayer for an heir (19:3–6) is a model of humble supplication. A shrine in the Great Mosque of Aleppo is traditionally associated with him.",
      ] },
      judaism: { role: 'Not in Jewish scripture', text: [
        "This Zechariah appears only in the New Testament and the Qur'an.",
      ] },
    },
    refs: ['Luke 1', "Qur'an 3:37–41; 19:2–11; 21:89–90"],
    places: [
      { name: 'Temple, Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Where the angel appeared to him.' },
      { name: 'Ein Karem', at: [31.768, 35.16], country: 'il', kind: 'life', trad: true, note: 'Traditional home of Zechariah and Elizabeth.' },
      { name: 'Great Mosque of Aleppo', at: [36.199, 37.157], country: 'sy', kind: 'died', trad: true, note: 'Shrine traditionally linked to him.' },
    ],
    related: ['yahya', 'isa'],
  },
  {
    id: 'yahya',
    n: 23,
    names: [['Islam', 'Yahya'], ['Christianity', 'John the Baptist'], ['Judaism', 'Yohanan'], ['Mandaeism', 'Yuhana']],
    scripts: [['ar', 'يحيى'], ['he', 'יוחנן'], ['el', 'Ιωάννης']],
    era: '1st century CE',
    lead: "Yahya, or John the Baptist, was an ascetic preacher who called people to repentance and baptised them in the Jordan river, including Jesus. He was executed by Herod Antipas. He is a prophet in Christianity and Islam, and the greatest of the prophets for the Mandaeans.",
    life: [
      "Born to the elderly priest Zechariah and Elizabeth, John lived in the wilderness, wore camel hair and ate locusts and wild honey. He preached a baptism of repentance in the Jordan and announced that one greater than he was coming.",
      "He baptised Jesus. Later he condemned Herod Antipas for marrying Herodias, his brother's wife, and was imprisoned and beheaded. The historian Josephus says this happened at the fortress of Machaerus, east of the Dead Sea.",
    ],
    miracles: [
      'His birth to aged parents, announced by an angel.',
      'Given wisdom while still a child (Qur’an 19:12).',
    ],
    views: {
      christianity: { role: 'Prophet; forerunner of Christ', text: [
        "John is the last prophet before Christ and his forerunner. Jesus called him more than a prophet (Matthew 11:9). His head is venerated as a relic in several churches, and his birth is celebrated on 24 June.",
      ] },
      islam: { role: 'Prophet', text: [
        "The Qur'an praises Yahya as noble, chaste and a prophet who would “confirm a word from God” (3:39), and blesses him: “peace be upon him the day he was born, the day he dies and the day he is raised alive” (19:15). A shrine in the Umayyad Mosque in Damascus is said to hold his head.",
      ] },
      mandaeism: { role: 'Greatest prophet', text: [
        "For the Mandaeans, Yahya Yuhana is the last and greatest prophet, though not the founder of their religion. Repeated baptism in flowing water (masbuta), which they call yardena after the Jordan, is their central rite.",
      ] },
      judaism: { role: 'Not in Jewish scripture', text: [
        "John is not part of Jewish scripture. Josephus, a Jewish historian of the 1st century, describes him as a good man who urged virtue and baptism.",
      ] },
    },
    refs: ['Matthew 3; 11; 14; Mark 1; 6; Luke 1; 3; John 1', "Qur'an 3:39; 6:85; 19:7–15; 21:90"],
    places: [
      { name: 'Ein Karem', at: [31.768, 35.16], country: 'il', kind: 'born', trad: true, step: 1, note: 'Traditional birthplace.' },
      { name: 'Bethany beyond the Jordan', at: [31.837, 35.551], country: 'jo', kind: 'life', step: 2, note: 'Where he baptised (John 1:28).' },
      { name: 'Machaerus', at: [31.56, 35.63], country: 'jo', kind: 'died', step: 3, note: 'Fortress where Josephus says he was executed.' },
      { name: 'Umayyad Mosque, Damascus', at: [33.511, 36.306], country: 'sy', kind: 'died', trad: true, note: 'Shrine of his head.' },
    ],
    related: ['zakariyya', 'isa', 'ilyas'],
  },
  {
    id: 'isa',
    n: 24,
    names: [['Islam', "'Isa"], ['Christianity', 'Jesus'], ['Judaism', 'Yeshua']],
    scripts: [['ar', 'عيسى'], ['he', 'ישוע'], ['el', 'Ιησούς']],
    era: 'c. 4 BCE – c. 30 CE',
    lead: "Isa, or Jesus of Nazareth, was a Jewish preacher and healer in Galilee and Judea. Christians believe he is the Son of God and the Messiah, who died by crucifixion and rose from the dead. Muslims believe he is the Messiah and one of the greatest prophets, born of the Virgin Mary, who was not crucified but raised to God. Judaism does not regard him as the Messiah or a prophet.",
    life: [
      "Born in Bethlehem to Mary and raised in Nazareth, Jesus was baptised by John in the Jordan. For a few years he taught in Galilee, especially around Capernaum, in parables and in sermons such as the Sermon on the Mount, gathered twelve disciples and healed the sick.",
      "He went to Jerusalem at Passover, where, according to the Gospels, he was arrested, tried and crucified under the Roman governor Pontius Pilate. The Gospels report that his tomb was found empty and that he appeared to his followers.",
    ],
    miracles: [
      'Virgin birth (Matthew 1; Luke 1; Qur’an 19:16–22).',
      'Speaking as a newborn in the cradle (Qur’an 19:29–33).',
      'Healing the blind and lepers and raising the dead (the Gospels; Qur’an 3:49; 5:110).',
      'Giving life, by God’s permission, to a bird shaped from clay (Qur’an 3:49).',
      'Turning water into wine, feeding five thousand and walking on water (the Gospels).',
      'In Christian belief, his resurrection.',
    ],
    views: {
      christianity: { role: 'Son of God; Messiah', text: [
        "Christianity holds that Jesus is the Christ (Messiah) and the incarnate Son of God, the second person of the Trinity. His death and resurrection bring forgiveness of sins and reconciliation with God. The Gospels of Matthew, Mark, Luke and John are the main sources for his life, and Christians expect his return.",
      ] },
      islam: { role: 'Prophet and messenger; the Messiah', text: [
        "Islam honours Isa as al-Masih (the Messiah), a Word from God and a spirit from Him, to whom God gave the Injil (Gospel). He is a human prophet and servant of God, not divine (5:75; 19:30). The Qur'an says he was not killed or crucified, “though it was made to appear so to them”, and that God raised him up (4:157–158). Muslims widely believe he will return before the end of time.",
      ] },
      judaism: { role: 'Not recognised as Messiah or prophet', text: [
        "Judaism does not regard Jesus as the Messiah, a prophet or divine. In Jewish expectation the Messiah is to rebuild the Temple, gather the exiles and bring universal peace, which Jews do not believe has yet happened.",
      ] },
      mandaeism: { role: 'Rejected', text: [
        "Mandaean texts portray Jesus negatively, as a false messiah who misled people from John's teaching.",
      ] },
    },
    refs: ['Matthew; Mark; Luke; John', "Qur'an 3:42–59; 4:157–159, 171; 5:72–75, 110–118; 19:16–36; 61:6"],
    places: [
      { name: 'Bethlehem', at: [31.705, 35.2], country: 'ps', kind: 'born', step: 1, note: 'Birthplace in Matthew and Luke.' },
      { name: 'Nazareth', at: [32.70, 35.30], country: 'il', kind: 'life', step: 2, note: 'Where he grew up.' },
      { name: 'Bethany beyond the Jordan', at: [31.837, 35.551], country: 'jo', kind: 'life', step: 3, note: 'Baptised by John.' },
      { name: 'Capernaum, Galilee', at: [32.88, 35.575], country: 'il', kind: 'life', step: 4, note: 'Centre of his ministry.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'died', step: 5, note: 'Crucifixion and resurrection in Christian belief; raised to God in Islamic belief.' },
    ],
    related: ['yahya', 'zakariyya', 'muhammad'],
  },
  {
    id: 'muhammad',
    n: 25,
    names: [['Islam', 'Muhammad']],
    scripts: [['ar', 'محمد']],
    era: 'c. 570–632 CE',
    lead: "Muhammad ibn Abdullah, born in Mecca, is in Islam the final prophet and messenger of God, the “Seal of the Prophets” (33:40), through whom the Qur'an was revealed. Beginning in 610 he preached in Mecca, emigrated to Medina in 622 and, by his death in 632, had united most of Arabia under Islam. Judaism and Christianity do not regard him as a prophet.",
    life: [
      "Muhammad was born into the Quraysh tribe of Mecca and orphaned young; he was raised by his grandfather and then his uncle Abu Talib. He worked as a merchant, was known as al-Amin (“the trustworthy”), and married Khadija.",
      "At about forty, while in retreat in the cave of Hira, he received the first revelation, “Read in the name of your Lord” (96:1). He preached the oneness of God in Mecca and faced growing hostility. In 622 he and his followers emigrated to Yathrib, later called Medina, an event that begins the Islamic calendar.",
      "In Medina he led the community and set out the Constitution of Medina. After years of conflict with Mecca, including the battles of Badr and Uhud and the Treaty of Hudaybiyya, he entered Mecca peacefully in 630 and cleared the Kaaba of idols. He made the Farewell Pilgrimage in 632 and died in Medina later that year.",
    ],
    miracles: [
      'The Qur’an itself, which Muslims regard as his greatest and enduring miracle (2:23).',
      'The Night Journey (Isra) from Mecca to “the farthest mosque” and the ascension (Miʿraj) through the heavens (17:1; 53:13–18).',
      'The splitting of the moon, as many commentators read Qur’an 54:1.',
    ],
    views: {
      islam: { role: 'Final prophet and messenger', text: [
        "Muslims believe Muhammad brought the final revelation, restoring the monotheism of Ibrahim and all earlier prophets. His example (Sunna) guides Muslim life alongside the Qur'an. The Qur'an says Isa foretold a messenger named Ahmad (61:6), and Muslim scholars also point to passages in the Torah and Gospels as foretelling him.",
      ] },
      christianity: { role: 'Not recognised as a prophet', text: [
        "Christian churches do not regard Muhammad as a prophet. They read the biblical passages cited by Muslims, such as the promised Paraclete in John 14, as referring to the Holy Spirit.",
      ] },
      judaism: { role: 'Not recognised as a prophet', text: [
        "Judaism does not regard Muhammad as a prophet. Jewish communities lived under Muslim rule for centuries, and Jewish thinkers such as Maimonides wrote about Islam as a strictly monotheistic faith.",
      ] },
    },
    refs: ["Qur'an 3:144; 17:1; 33:40; 47:2; 48:29; 61:6; 96:1–5"],
    places: [
      { name: 'Mecca', at: [21.4225, 39.8262], country: 'sa', kind: 'born', step: 1, note: 'Birthplace and first years of preaching.' },
      { name: 'Cave of Hira', at: [21.457, 39.859], country: 'sa', kind: 'life', note: 'First revelation in 610.' },
      { name: 'Ta’if', at: [21.27, 40.42], country: 'sa', kind: 'life', note: 'Preached here in 619 and was driven out.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Destination of the Night Journey in Islamic tradition.' },
      { name: 'Medina', at: [24.4672, 39.6111], country: 'sa', kind: 'died', step: 2, note: 'Emigration (Hijra) in 622; died and buried here in 632.' },
    ],
    related: ['ibrahim', 'ismail', 'isa'],
  },
];
