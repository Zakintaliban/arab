// The religions whose views appear in the entries. Colours are tokens in
// prophets/prophets.css (--rel-<id>). Adherent numbers are rounded estimates.

const JLM = [31.778, 35.235];

export const RELIGIONS = [
  {
    id: 'judaism',
    name: 'Judaism',
    adherents: 'about 15 million',
    origin: 'Ancient Israel and Judah, from the 2nd–1st millennium BCE',
    scripture: "Tanakh: Torah (Teaching), Nevi'im (Prophets), Ketuvim (Writings)",
    lead: "Judaism is the religion of the Jewish people, founded on the covenant between God and Abraham and the Torah given through Moses at Sinai. Its scripture, the Tanakh, is also the Old Testament of Christianity.",
    prophecy: "In the Tanakh a prophet (navi) is someone through whom God speaks to Israel, often to call kings and people back to the covenant. Moses is the greatest of them. The Nevi'im section contains the books of the Former Prophets (Joshua to Kings) and the Latter Prophets (Isaiah, Jeremiah, Ezekiel and the Twelve). Several women are called prophetesses.",
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Site of the First and Second Temples; the Western Wall.' },
      { name: 'Hebron', at: [31.524, 35.111], country: 'ps', kind: 'life', note: 'Cave of the Patriarchs.' },
      { name: 'Mount Sinai', at: [28.539, 33.975], country: 'eg', kind: 'life', note: 'Where the Torah was given.' },
      { name: 'Babylon', at: [32.54, 44.42], country: 'iq', kind: 'life', note: 'Centre of Jewish life after the exile.' },
    ],
  },
  {
    id: 'christianity',
    name: 'Christianity',
    adherents: 'about 2.4 billion',
    origin: 'Judea and Galilee, 1st century CE',
    scripture: 'The Bible: Old Testament and New Testament',
    lead: "Christianity began among the followers of Jesus of Nazareth, whom it proclaims as the Messiah (Christ) and Son of God. It spread from Jerusalem across the Roman world, and the Middle East is still home to ancient churches such as the Coptic, Maronite, Assyrian, Armenian and Greek Orthodox.",
    prophecy: "Christianity accepts the prophets of the Hebrew Bible, whose words it reads as pointing to Christ, and regards John the Baptist as the last prophet before Jesus. Jesus is more than a prophet: he is the Word of God made flesh. The New Testament also mentions prophets in the early church.",
    places: [
      { name: 'Bethlehem', at: [31.705, 35.2], country: 'ps', kind: 'born', note: 'Birthplace of Jesus.' },
      { name: 'Nazareth', at: [32.70, 35.30], country: 'il', kind: 'life', note: 'Where Jesus grew up.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Church of the Holy Sepulchre.' },
      { name: 'Antioch (Antakya)', at: [36.2, 36.16], country: 'tr', kind: 'life', note: 'Where followers were first called Christians (Acts 11:26).' },
    ],
  },
  {
    id: 'islam',
    name: 'Islam',
    adherents: 'about 2 billion',
    origin: 'Mecca and Medina, 7th century CE',
    scripture: "The Qur'an",
    lead: "Islam teaches submission to the one God (Allah) as revealed in the Qur'an to the Prophet Muhammad. It sees itself as the restoration of the faith of Ibrahim and all earlier prophets, and it is the majority religion across most of the Middle East and North Africa.",
    prophecy: "Islam teaches that God sent a prophet (nabi) to every people, and that some were also messengers (rasul) who brought a scripture: the Tawrat to Musa, the Zabur to Dawud, the Injil to Isa and the Qur'an to Muhammad, the last prophet. The Qur'an names 25 prophets. Belief in all of them, without distinction, is an article of faith (2:285).",
    places: [
      { name: 'Mecca', at: [21.4225, 39.8262], country: 'sa', kind: 'born', note: 'The Kaaba and the Hajj.' },
      { name: 'Medina', at: [24.4672, 39.6111], country: 'sa', kind: 'life', note: 'The Prophet’s Mosque.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Al-Aqsa Mosque, the third holiest site.' },
    ],
  },
  {
    id: 'zoroastrianism',
    name: 'Zoroastrianism',
    adherents: 'about 100,000–200,000',
    origin: 'Ancient Iran, 2nd–1st millennium BCE',
    scripture: 'The Avesta, including the Gathas of Zarathustra',
    lead: "Zoroastrianism is the ancient religion of Iran, founded on the teaching of Zarathustra and the worship of Ahura Mazda. It was the faith of the Achaemenid, Parthian and Sasanian empires. Today small communities live in Iran, mainly in Yazd, Kerman and Tehran, and in India, where they are known as Parsis.",
    prophecy: "Zoroastrianism has one prophet, Zarathustra, who received the revelation of Ahura Mazda. It also looks forward to the Saoshyant, a future saviour who will bring the final renewal of the world.",
    places: [
      { name: 'Yazd', at: [31.88, 54.37], country: 'ir', kind: 'life', note: 'Atash Behram fire temple.' },
      { name: 'Persepolis', at: [29.935, 52.891], country: 'ir', kind: 'life', note: 'Ceremonial capital of the Achaemenid kings.' },
      { name: 'Balkh', at: [36.76, 66.90], country: null, kind: 'life', note: 'Linked by tradition with Zarathustra.' },
    ],
  },
  {
    id: 'mandaeism',
    name: 'Mandaeism',
    adherents: 'about 60,000–100,000',
    origin: 'Lower Mesopotamia and Khuzestan, early centuries CE',
    scripture: 'The Ginza Rabba (“Great Treasure”)',
    lead: "Mandaeism is a small baptismal religion whose followers lived for centuries along the rivers of southern Iraq and south-western Iran. Its central rite is repeated baptism in flowing water. Many scholars identify the Mandaeans with the Sabians mentioned in the Qur'an. War has driven most of them abroad.",
    prophecy: "Mandaeans honour Adam, Seth, Noah, Shem and above all John the Baptist (Yahya Yuhana) as true teachers. They regard Abraham, Moses and Jesus as false prophets.",
    places: [
      { name: 'Southern Iraq', at: [31.05, 46.3], country: 'iq', kind: 'life', note: 'Historic communities along the Tigris and Euphrates.' },
      { name: 'Ahvaz', at: [31.32, 48.67], country: 'ir', kind: 'life', note: 'Mandaean community on the Karun river.' },
      { name: 'Baghdad', at: [33.31, 44.36], country: 'iq', kind: 'life', note: 'Centre of the community in modern times.' },
    ],
  },
  {
    id: 'druze',
    name: 'Druze faith',
    the: true,
    adherents: 'about 1 million',
    origin: 'Fatimid Egypt and the Levant, 11th century CE',
    scripture: 'The Epistles of Wisdom (Rasa’il al-Hikma)',
    lead: "The Druze faith emerged in 1017 from a movement within Ismaili Islam in Fatimid Cairo and took root in the mountains of Lebanon, Syria and Galilee. Its teachings are kept by initiates, and it does not accept converts. It honours many prophets, as well as Greek philosophers such as Plato.",
    prophecy: "The Druze revere a long line of prophets, from Adam to Muhammad. Above all they honour Shu'ayb, whom they identify with Jethro, the father-in-law of Moses; his shrine at Hittin is their chief pilgrimage site.",
    places: [
      { name: 'Cairo', at: [30.04, 31.24], country: 'eg', kind: 'born', note: 'Where the movement began under the Fatimid caliph al-Hakim.' },
      { name: 'Chouf, Mount Lebanon', at: [33.65, 35.6], country: 'lb', kind: 'life', note: 'Historic Druze heartland.' },
      { name: 'Jabal al-Druze (Suwayda)', at: [32.71, 36.57], country: 'sy', kind: 'life', note: 'Largest Druze community.' },
      { name: 'Nabi Shu’ayb, Hittin', at: [32.80, 35.47], country: 'il', kind: 'life', note: 'Chief shrine.' },
    ],
  },
  {
    id: 'samaritanism',
    name: 'Samaritanism',
    adherents: 'about 900',
    origin: 'Samaria, with roots in ancient Israel',
    scripture: 'The Samaritan Torah (the five books of Moses)',
    lead: "The Samaritans are a small people who descend from ancient Israelites and keep their own form of Israelite religion, centred on Mount Gerizim rather than Jerusalem. Fewer than a thousand remain, living on Mount Gerizim near Nablus and in Holon near Tel Aviv.",
    prophecy: "Samaritans accept only the Torah as scripture and recognise Moses as the one and only prophet. They await the Taheb, “the restorer”, a prophet like Moses (Deuteronomy 18:18).",
    places: [
      { name: 'Mount Gerizim', at: [32.2, 35.27], country: 'ps', kind: 'life', note: 'Their holy mountain, where they celebrate Passover with a sacrifice.' },
      { name: 'Holon', at: [32.01, 34.78], country: 'il', kind: 'life', note: 'Second community.' },
    ],
  },
];

export const RELIGION_BY_ID = Object.fromEntries(RELIGIONS.map((r) => [r.id, r]));
