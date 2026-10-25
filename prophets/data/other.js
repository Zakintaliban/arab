// Prophets outside the Abrahamic scriptures. Same schema as quran.js.

export const OTHER = [
  {
    id: 'zarathustra',
    names: [['Zoroastrianism', 'Zarathustra'], ['Greek and English', 'Zoroaster'], ['Persian', 'Zartosht']],
    scripts: [['fa', 'زرتشت'], ['el', 'Ζωροάστρης']],
    era: 'Between c. 1500 and 500 BCE (debated)',
    lead: "Zarathustra, known to the Greeks as Zoroaster, was an ancient Iranian priest and poet who taught that the wise lord Ahura Mazda is the one supreme God and that every person must choose between truth and falsehood. His religion, Zoroastrianism, was the faith of the Persian empires for over a thousand years.",
    life: [
      "His own words survive in the Gathas, seventeen hymns in Old Avestan, a language close to the oldest Sanskrit. From their language most scholars date him between about 1500 and 1000 BCE, though a later tradition placed him in the 6th century BCE. Where he lived is also debated: traditions point to Ray near Tehran, to the region of Lake Urmia, and to Balkh or Sistan in the east.",
      "The tradition says that at thirty he received a vision of Ahura Mazda on the bank of a river, preached for years with little success, and then converted King Vishtaspa, who protected the new faith. Later Persian texts say he was killed at seventy-seven while praying at a fire temple, traditionally at Balkh.",
    ],
    miracles: [
      'Later Zoroastrian tradition, also reported by the Roman writer Pliny, says he laughed at his birth instead of crying.',
      'The tradition tells of a vision of Ahura Mazda and the holy immortals at the age of thirty.',
    ],
    views: {
      zoroastrianism: { role: 'Prophet and founder', text: [
        "Zarathustra is the prophet who received the revelation of Ahura Mazda. His teaching sets the good spirit, Spenta Mainyu, against the destructive spirit, Angra Mainyu, and asha (truth and right order) against druj (the lie). Humans are free to choose and are judged by their deeds.",
        "The ethic is summed up as humata, hukhta, hvarshta: good thoughts, good words, good deeds. Fire is honoured as a symbol of Ahura Mazda's light and purity, not worshipped as a god.",
      ] },
      islam: { role: 'Not named in the Qur’an', text: [
        "The Qur'an mentions the Majus (Zoroastrians) once, among the religious communities God will judge between (22:17). In practice Muslim rulers extended to Zoroastrians the protected status of the People of the Book. Muslim scholars disagreed about whether Zarathustra himself was a prophet.",
      ] },
      christianity: { role: 'Not in the Bible', text: [
        "Zarathustra is not mentioned in the Bible. The Magi who came from the east to honour the infant Jesus (Matthew 2) are traditionally understood to have been Persian priests of his religion.",
      ] },
      judaism: { role: 'Not in the Bible', text: [
        "Zarathustra is not mentioned in the Hebrew Bible. The Persian king Cyrus, who allowed the Jews to return from exile, is called God's “anointed” in Isaiah 45:1. Scholars have long discussed how Persian rule shaped Jewish ideas about angels, judgment and the afterlife.",
      ] },
    },
    refs: ['The Gathas (Yasna 28–34, 43–51, 53)', "Qur'an 22:17 (al-Majus)", 'Matthew 2:1–12; Isaiah 44:28–45:1'],
    places: [
      { name: 'Ray (Rhages)', at: [35.59, 51.44], country: 'ir', kind: 'born', trad: true, note: 'One tradition’s birthplace, near Tehran.' },
      { name: 'Lake Urmia region', at: [37.55, 45.07], country: 'ir', kind: 'born', trad: true, note: 'Another tradition places his birth in Azerbaijan.' },
      { name: 'Balkh', at: [36.76, 66.90], country: null, kind: 'died', trad: true, note: 'Where tradition says he converted Vishtaspa and was killed.' },
      { name: 'Yazd', at: [31.88, 54.37], country: 'ir', kind: 'life', note: 'Heart of Zoroastrian life in Iran today; its fire temple houses a flame said to have burned since the 5th century.' },
    ],
    related: [],
  },
];
