// Story mode for the five Ulul Azmi ("those of firm resolve", Qur'an 46:35),
// whom most commentators identify from 33:7 and 42:13 as Nuh, Ibrahim, Musa,
// Isa and Muhammad.
//
// Each chapter:
//   when       label on the timeline strip (traditional ages and dates are marked so)
//   text       one storyline; details from outside scripture carry a tag:
//              [sirah] [hadith] [tafsir] [midrash] [church tradition] [tradition] [apocrypha] [scholarship]
//   notes      how the accounts differ: [religion id, source, text]
//   places     event pins; alt: disputed candidate sites (dashed rings)
//   route      the leg drawn for this chapter; altRoutes: uncertain legs, drawn as beads
//
// Coordinates are [lat, lon]; country is the map tile a pin sits on (null: a neighbouring country).

const p = (name, at, country, trad) => ({ name, at, country, trad: Boolean(trad) });

const P = {
  // Mesopotamia and Anatolia
  ur: p('Ur', [30.96, 46.10], 'iq'),
  kutha: p('Kutha', [32.73, 44.66], 'iq', 1),
  urfa: p('Şanlıurfa, pool of Abraham', [37.146, 38.785], 'tr', 1),
  harran: p('Harran', [36.86, 39.03], 'tr'),
  kufa: p('Kufa', [32.03, 44.40], 'iq', 1),
  shuruppak: p('Shuruppak', [31.78, 45.51], 'iq'),
  judi: p('Mount Judi (Cudi Dağı)', [37.37, 42.35], 'tr', 1),
  ararat: p('Mount Ararat', [39.70, 44.30], 'tr', 1),
  thamanin: p('Thamanin, near Cizre', [37.36, 42.25], 'tr', 1),
  karakNuh: p('Karak Nuh, Beqaa', [33.83, 35.92], 'lb', 1),
  najaf: p('Najaf', [31.996, 44.314], 'iq', 1),
  // Levant
  shechem: p('Shechem (Nablus)', [32.21, 35.28], 'ps'),
  bethel: p('Bethel', [31.93, 35.22], 'ps'),
  mamre: p('Mamre, by Hebron', [31.55, 35.10], 'ps'),
  hebron: p('Cave of Machpelah, Hebron', [31.524, 35.111], 'ps'),
  sodom: p('Sodom, by the Dead Sea', [31.05, 35.42], ['il', 'jo']),
  beersheba: p('Beersheba', [31.25, 34.79], 'il'),
  moriah: p('Mount Moriah (Temple Mount)', [31.778, 35.235], ['il', 'ps']),
  gerizim: p('Mount Gerizim', [32.20, 35.27], 'ps'),
  jerusalem: p('Jerusalem', [31.778, 35.235], ['il', 'ps']),
  aqsa: p('Al-Aqsa, Jerusalem', [31.776, 35.236], ['il', 'ps']),
  nazareth: p('Nazareth', [32.70, 35.30], 'il'),
  bethlehem: p('Bethlehem', [31.705, 35.20], 'ps'),
  qasrYahud: p('Qasr al-Yahud', [31.838, 35.538], 'ps', 1),
  maghtas: p('Al-Maghtas, Bethany beyond the Jordan', [31.837, 35.551], 'jo'),
  temptation: p('Mount of Temptation, Jericho', [31.87, 35.43], 'ps', 1),
  capernaum: p('Capernaum', [32.88, 35.575], 'il'),
  beatitudes: p('Mount of Beatitudes', [32.881, 35.556], 'il', 1),
  tabgha: p('Tabgha', [32.873, 35.549], 'il', 1),
  kafrKanna: p('Kafr Kanna (Cana?)', [32.746, 35.342], 'il', 1),
  khirbetQana: p('Khirbet Qana (Cana?)', [32.81, 35.29], 'il', 1),
  tabor: p('Mount Tabor', [32.687, 35.39], 'il', 1),
  hermon: p('Mount Hermon', [33.42, 35.86], ['lb', 'sy'], 1),
  bethany: p('Bethany (al-Eizariya)', [31.771, 35.262], 'ps'),
  gethsemane: p('Gethsemane', [31.779, 35.240], ['il', 'ps']),
  sepulchre: p('Church of the Holy Sepulchre', [31.7784, 35.2296], ['il', 'ps']),
  olives: p('Mount of Olives', [31.779, 35.244], ['il', 'ps']),
  ramla: p('Ramla', [31.93, 34.87], 'il', 1),
  damascus: p('Damascus', [33.511, 36.306], 'sy', 1),
  bosra: p('Bosra', [32.518, 36.481], 'sy'),
  nebo: p('Mount Nebo', [31.768, 35.726], 'jo'),
  nabiMusa: p('Nabi Musa, near Jericho', [31.79, 35.43], 'ps', 1),
  jebelHarun: p('Jebel Harun (Mount Hor)', [30.317, 35.407], 'jo', 1),
  kadesh: p('Kadesh-Barnea', [30.64, 34.42], 'eg'),
  // Egypt and Sinai
  egypt: p('Nile Delta, Egypt', [30.6, 31.5], 'eg'),
  piRamesses: p('Pi-Ramesses (Qantir)', [30.80, 31.83], 'eg'),
  memphis: p('Memphis', [29.85, 31.25], 'eg'),
  matariya: p('Matariya (Heliopolis)', [30.13, 31.31], 'eg', 1),
  muharraq: p('Deir al-Muharraq', [27.40, 30.90], 'eg', 1),
  bardawil: p('Lake Bardawil (northern route)', [31.15, 33.10], 'eg', 1),
  bitterLakes: p('Bitter Lakes (central route)', [30.35, 32.38], 'eg', 1),
  suez: p('Gulf of Suez (southern route)', [29.95, 32.55], 'eg', 1),
  nuweiba: p('Nuweiba, Gulf of Aqaba', [28.97, 34.65], 'eg', 1),
  ayunMusa: p('ʿUyun Musa (Marah?)', [29.88, 32.65], 'eg', 1),
  gharandal: p('Wadi Gharandal (Elim?)', [29.33, 32.97], 'eg', 1),
  feiran: p('Wadi Feiran (Rephidim?)', [28.70, 33.63], 'eg', 1),
  jabalMusa: p('Jabal Musa', [28.539, 33.975], 'eg', 1),
  lawz: p('Jabal al-Lawz', [28.65, 35.31], 'sa', 1),
  karkom: p('Har Karkom', [30.29, 34.73], 'il', 1),
  rasMuhammad: p('Ras Muhammad', [27.73, 34.25], 'eg', 1),
  midian: p('Midian (al-Badʿ)', [28.48, 35.02], 'sa'),
  // Arabia
  mecca: p('Mecca, the Kaaba', [21.4225, 39.8262], 'sa'),
  mina: p('Mina', [21.413, 39.893], 'sa', 1),
  arafat: p('Arafat', [21.355, 39.984], 'sa'),
  banuSad: p('Lands of the Banu Saʿd', [21.2, 40.6], 'sa', 1),
  abwa: p('Al-Abwa', [23.1, 38.9], 'sa', 1),
  hira: p('Cave of Hira', [21.457, 39.859], 'sa'),
  taif: p('Taʾif', [21.27, 40.42], 'sa'),
  nakhla: p('Nakhla', [21.5, 40.1], 'sa', 1),
  thawr: p('Cave of Thawr', [21.377, 39.849], 'sa'),
  quba: p('Quba', [24.439, 39.617], 'sa'),
  medina: p('Medina, the Prophet’s Mosque', [24.4672, 39.6111], 'sa'),
  badr: p('Badr', [23.73, 38.77], 'sa'),
  uhud: p('Mount Uhud', [24.50, 39.61], 'sa'),
  trench: p('The Trench, north of Medina', [24.478, 39.598], 'sa'),
  hudaybiyya: p('Al-Hudaybiyya', [21.44, 39.62], 'sa'),
  khaybar: p('Khaybar', [25.69, 39.29], 'sa'),
  hunayn: p('Hunayn', [21.5, 40.08], 'sa', 1),
  tabuk: p('Tabuk', [28.38, 36.57], 'sa'),
  aksum: p('Aksum', [14.13, 38.72], null),
};

export const ULUL_AZMI = ['nuh', 'ibrahim', 'musa', 'isa', 'muhammad'];

export const STORIES = {
  // ───────────────────────────── Nuh ─────────────────────────────
  nuh: {
    intro: "The Flood story is told in Genesis 6–9 and across several surahs of the Qur'an, one of them named after Nuh. Both tell of a righteous man in a corrupt world, a great ship and a new beginning for humanity. Older Mesopotamian poems, such as the Epic of Gilgamesh, tell a similar story of a flood hero.",
    chapters: [
      {
        when: 'Before the Flood',
        title: 'A world that forgot God',
        text: [
          "Ten generations after Adam, Genesis says, “the earth was corrupt in God's sight and full of violence” (6:11). The Qur'an describes Nuh's people clinging to their idols, Wadd, Suwaʿ, Yaghuth, Yaʿuq and Nasr (71:23).",
          "Neither scripture names Nuh's land. Muslim tradition places him in southern Iraq, around Kufa [tradition]. Historians note that the oldest flood stories come from Mesopotamia, where the flood hero of the Sumerian king list and the Epic of Gilgamesh lived at Shuruppak [scholarship].",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 6)', "God regrets having made humankind, but “Noah found favour in the eyes of the Lord” and was “blameless in his generation”."],
          ['islam', "Qur'an (71:23)", "Names the five idols of Nuh's people; later commentators say they were statues of righteous men that came to be worshipped [tafsir]."],
        ],
        places: [P.kufa, P.shuruppak],
      },
      {
        when: 'Nine and a half centuries',
        title: 'Nuh calls his people',
        text: [
          "The Qur'an gives most of its account to Nuh's preaching. He called his people “night and day”, in public and in private, and they “put their fingers in their ears and covered themselves with their garments” (71:5–9). He stayed among them “a thousand years less fifty” (29:14). The leaders mocked him for being followed only by the lowly (11:27).",
          "His own son and his wife did not believe; the Qur'an later gives Nuh's wife as an example of a disbeliever (66:10).",
        ],
        notes: [
          ['judaism', 'Torah', "Genesis records no preaching by Noah; it gives his age as 950 at his death (9:29)."],
          ['christianity', 'New Testament', "2 Peter 2:5 calls Noah “a herald of righteousness”, so Christian tradition also remembers him as a preacher."],
          ['islam', "Qur'an", "The 950 years are the length of his mission among his people (29:14)."],
        ],
        places: [P.kufa],
      },
      {
        when: 'Noah aged 600',
        title: 'Building the ark',
        text: [
          "God told Nuh to build the ark “under Our eyes” (11:37). Each time the chiefs passed by they laughed at him, and he answered that they would laugh in turn (11:38).",
          "Genesis gives the measurements: 300 cubits long, 50 wide and 30 high, about 135 by 22 by 13 metres, made of gopher wood, sealed with pitch and built with three decks and a door in the side (6:14–16). Shiite tradition shows the place where the ark was built inside the Great Mosque of Kufa [tradition].",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 6–7)', "Noah takes seven pairs of every clean animal and one pair of the others (7:2–3)."],
          ['islam', "Qur'an (11:40)", "Nuh is told to take “two of every kind, a pair”, his family except the one already condemned, and those who believed, who were few."],
        ],
        places: [P.kufa],
      },
      {
        when: 'Year 600 of Noah',
        title: 'The waters rise',
        text: [
          "“The oven gushed”, says the Qur'an (11:40): the gates of heaven opened with pouring water and the earth burst with springs (54:11–12). Genesis says “all the fountains of the great deep burst forth, and the windows of the heavens were opened”, with rain for forty days and forty nights (7:11–12).",
          "In the Qur'an, Nuh calls to his son to come aboard. The son answers that he will take refuge on a mountain, and a wave comes between them (11:42–43). Nuh pleads for him and is told, “he is not of your family” (11:46).",
        ],
        notes: [
          ['judaism', 'Torah', "All three of Noah's sons, Shem, Ham and Japheth, and their wives are saved. The waters prevail for 150 days (7:24)."],
          ['islam', "Qur'an", "One son refuses and drowns, a lesson that faith, not kinship, saves."],
        ],
        places: [P.kufa],
      },
      {
        when: 'After 150 days',
        title: 'Where the ark came to rest',
        text: [
          "“O earth, swallow your water; O sky, withhold”, and the ark settled on al-Judi (11:44). Genesis says it came to rest “on the mountains of Ararat” (8:4), the old name of the kingdom of Urartu around Lake Van.",
          "Noah sent out a raven, then a dove three times; the second time it came back with an olive leaf, and the third time it did not return (8:6–12). Both resting places have pilgrims: Mount Judi (Cudi Dağı) near Cizre has an old shrine on its summit [tradition], and Armenian tradition chose the great snowy peak now called Mount Ararat [tradition].",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 8:4)', "“Mountains of Ararat”, a region rather than one peak."],
          ['islam', "Qur'an (11:44)", "Al-Judi, which Muslim geographers identified with the mountain above Cizre."],
          ['christianity', 'Church tradition', "Armenian Christians link the ark with Mount Ararat (Masis); Syriac Christians long honoured Mount Judi (Qardu) [church tradition]."],
        ],
        places: [],
        alt: [P.judi, P.ararat],
        altRoutes: [[P.kufa, P.judi], [P.kufa, P.ararat]],
      },
      {
        when: 'A new beginning',
        title: 'The covenant and the rainbow',
        text: [
          "Noah built an altar, and God promised never again to destroy the earth by a flood; the rainbow would be the sign of that covenant (Genesis 9:12–17). God blessed Noah and his sons and gave them laws for all humanity, including the sanctity of human life (9:6).",
          "In the Qur'an, Nuh is told to “go down in peace from Us, and blessings on you and on nations from those with you” (11:48). Muslim geographers wrote that the eighty survivors founded a village at the foot of Judi called Thamanin, “eighty” [tradition].",
        ],
        notes: [
          ['judaism', 'Torah and Jewish law', "From the covenant with Noah, Judaism derives the seven Noahide laws that it holds binding on all people [midrash]."],
          ['christianity', 'Genesis 10', "The Table of Nations traces all peoples to Shem, Ham and Japheth."],
        ],
        places: [P.thamanin, P.judi],
      },
      {
        when: 'Legacy',
        title: 'The first of the resolute',
        text: [
          "Nuh's last recorded prayer asks forgiveness for himself, his parents and all believing men and women (71:28). The Qur'an names him first among the five prophets with whom God made a solemn covenant (33:7).",
          "Several places claim his tomb: Karak Nuh in Lebanon's Beqaa valley, the summit of Judi above Cizre, and the shrine of Imam Ali at Najaf, where Shiite tradition says Adam and Nuh are buried [tradition].",
        ],
        notes: [
          ['christianity', 'New Testament', "Jesus compares the coming of the Son of Man to “the days of Noah”, when people went on with life until the flood came (Matthew 24:37–39)."],
        ],
        places: [],
        alt: [P.karakNuh, P.judi, P.najaf],
      },
    ],
  },

  // ───────────────────────────── Ibrahim ─────────────────────────────
  ibrahim: {
    intro: "Genesis follows Abraham from Ur to Canaan in fourteen chapters; the Qur'an returns to him in more than twenty surahs, focusing on his argument against idols and his family's story in Mecca. The two accounts meet and part in instructive ways, above all over which son was to be sacrificed.",
    chapters: [
      {
        when: 'c. 2000–1800 BCE (traditional)',
        title: 'A son of Ur',
        text: [
          "Genesis says Abram was born to Terah in “Ur of the Chaldeans” (11:28–31). The Qur'an calls his father Azar (6:74). Other traditions place his birth at Kutha in Iraq or at Urfa in south-east Turkey [tradition].",
          "Ur was one of the great cities of Sumer, with a ziggurat to the moon god Nanna, excavated in the 1920s [scholarship].",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 11)', "Gives his family tree back to Shem, son of Noah."],
          ['islam', "Qur'an (6:74)", "Names his father Azar, a maker of idols in later tradition [tafsir]."],
        ],
        places: [P.ur],
        alt: [P.kutha, P.urfa],
      },
      {
        when: 'Youth',
        title: 'The star, the moon and the sun',
        text: [
          "The Qur'an tells how young Ibrahim looked at a star and said “this is my lord”, until it set; then the moon, then the sun. When each one set he said, “I do not love things that set,” and turned to “the One who created the heavens and the earth” (6:75–79).",
        ],
        notes: [
          ['judaism', 'Midrash', "Rabbinic legend tells a very similar story of the young Abraham reasoning from the sun and moon to the one Creator [midrash]."],
        ],
        places: [P.ur],
      },
      {
        when: 'Youth',
        title: 'The idols and the fire',
        text: [
          "Ibrahim broke the idols of his people, all but the largest, and when questioned said, “Ask them, if they can speak” (21:58–63). He argued with a king who claimed power over life and death: “God brings the sun from the east; bring it from the west” (2:258). The people threw him into a great fire, and God said, “O fire, be cool and safe for Ibrahim” (21:68–69).",
          "In Urfa, tradition says the fire became the pool of sacred carp, Balıklıgöl, and the burning logs became the fish [tradition].",
        ],
        notes: [
          ['judaism', 'Midrash', "Jewish legend also tells of Abraham smashing the idols in his father's shop and being thrown into the furnace of King Nimrod [midrash]. Genesis itself does not tell this story."],
          ['islam', "Qur'an", "The king is unnamed; commentators identify him as Nimrod [tafsir]."],
        ],
        places: [P.urfa],
        alt: [P.ur, P.kutha],
      },
      {
        when: 'Leaving Ur',
        title: 'To Harran',
        text: [
          "Terah took Abram, his wife Sarai and his grandson Lot and set out for Canaan, but they settled at Harran, a trading city on the upper Euphrates plains (Genesis 11:31). In the Qur'an, Lut believed in Ibrahim, who said, “I am emigrating to my Lord” (29:26).",
        ],
        notes: [],
        places: [P.harran],
        route: [P.ur, P.harran],
      },
      {
        when: 'Abraham aged 75',
        title: 'Go forth',
        text: [
          "“Go from your country and your kindred and your father's house to the land that I will show you. I will make of you a great nation, and in you all the families of the earth shall be blessed” (Genesis 12:1–3). Abram travelled to Canaan with Sarai and Lot, built an altar at the oak of Moreh near Shechem and another between Bethel and Ai.",
        ],
        notes: [
          ['christianity', 'New Testament', "Hebrews 11:8 praises Abraham for going out “not knowing where he was going”."],
          ['samaritanism', 'Samaritan tradition', "Shechem and nearby Mount Gerizim are the heart of Samaritan holy geography."],
        ],
        places: [P.shechem, P.bethel],
        route: [P.harran, P.shechem, P.bethel],
      },
      {
        when: 'A famine',
        title: 'Into Egypt and back',
        text: [
          "When famine struck Canaan, Abram went down to Egypt. Fearing for his life, he presented Sarai as his sister; Pharaoh took her into his house until plagues revealed the truth, and sent them away with their flocks (Genesis 12:10–20).",
          "Hadith tells a parallel story of a tyrant who tried to seize Sarah and was struck powerless each time; he released her and gave her a servant, Hajar [hadith].",
        ],
        notes: [
          ['judaism', 'Torah', "Abram returns rich in livestock, silver and gold (13:2)."],
          ['islam', 'Hadith (Bukhari)', "Hajar, mother of Ismail, comes into the family through this episode [hadith]."],
        ],
        places: [P.egypt],
        route: [P.bethel, P.egypt, P.bethel],
      },
      {
        when: 'Abraham aged 99',
        title: 'Guests at Mamre',
        text: [
          "Abram and Lot parted ways: Lot chose the Jordan plain and Sodom, Abram settled by the oaks of Mamre at Hebron (Genesis 13). God made a covenant with him, changed his name to Abraham and Sarai's to Sarah, and commanded circumcision (17).",
          "Three visitors came to his tent; he hurried to serve them a calf. They promised Sarah a son, and she laughed (18). The Qur'an tells it the same way: the guests did not touch the roasted calf, Ibrahim grew uneasy, and they gave the good news of Ishaq while his wife laughed (11:69–73; 51:24–30). Abraham then pleaded with God to spare Sodom for the sake of the righteous (Genesis 18:23–33).",
        ],
        notes: [
          ['judaism', 'Torah', "The visitors are described as men, and one of them speaks as the Lord."],
          ['islam', "Qur'an", "They are angels on their way to the people of Lut (11:70)."],
        ],
        places: [P.mamre],
        alt: [P.sodom],
        route: [P.bethel, P.mamre],
      },
      {
        when: 'Ishmael born, Abraham aged 86',
        title: 'Hajar, Ismail and the well',
        text: [
          "Hagar bore Abraham his first son, Ishmael (Genesis 16). After Isaac's birth Sarah asked Abraham to send them away. In the wilderness of Beersheba the water ran out; God heard the boy and showed Hagar a well (21:14–19).",
          "The Qur'an has Ibrahim pray: “I have settled some of my offspring in a valley without crops, near Your sacred House” (14:37). Hadith tells how Hajar ran seven times between the hills of Safa and Marwa looking for help until the spring of Zamzam welled up at the child's feet [hadith]. Pilgrims repeat her run, the saʿy, to this day.",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 21)', "Ishmael grows up in the wilderness of Paran and marries an Egyptian."],
          ['islam', "Qur'an and hadith", "Mother and son settle in the valley of Mecca, and the Jurhum tribe comes to live by the water [hadith]."],
        ],
        places: [P.beersheba, P.mecca],
        route: [P.mamre, P.beersheba],
        altRoutes: [[P.beersheba, P.mecca]],
      },
      {
        when: 'When the son was grown',
        title: 'The sacrifice',
        text: [
          "God tested Abraham: “Take your son, your only son Isaac, whom you love, and go to the land of Moriah” (Genesis 22:2). On the mountain Abraham bound him on the altar and raised the knife; an angel stopped him and a ram caught in a thicket took the boy's place.",
          "In the Qur'an, Ibrahim tells his son of a dream in which he sacrifices him; the son answers, “Father, do as you are commanded” (37:102). As he lays him down, God calls out that he has fulfilled the vision and ransoms the son with “a great sacrifice” (37:107). The son is not named. Most Muslim scholars hold he was Ismail, and place the event at Mina [tafsir].",
        ],
        notes: [
          ['judaism', 'Torah (Genesis 22)', "Isaac on Mount Moriah, identified with the Temple Mount in Jerusalem (2 Chronicles 3:1)."],
          ['christianity', 'New Testament', "Read as a foreshadowing of Christ's sacrifice; “God will provide the lamb” (Genesis 22:8)."],
          ['islam', "Qur'an (37:99–113)", "The son is unnamed; the good news of Ishaq comes after the story (37:112), which most scholars take to mean the son was Ismail."],
          ['samaritanism', 'Samaritan tradition', "The binding took place on Mount Gerizim."],
        ],
        places: [],
        alt: [P.moriah, P.mina, P.gerizim],
      },
      {
        when: 'Later life',
        title: 'Raising the House',
        text: [
          "“And when Ibrahim was raising the foundations of the House, with Ismail: ‘Our Lord, accept this from us’” (2:127). God told him to purify the House for those who walk around it and to proclaim the pilgrimage to all people (22:26–27).",
          "The stone he stood on while building, the Maqam Ibrahim, is kept beside the Kaaba [tradition]; the Qur'an mentions the “station of Ibrahim” as a place of prayer (2:125).",
        ],
        notes: [
          ['judaism', 'Torah', "Genesis does not mention Mecca or the Kaaba."],
          ['islam', "Qur'an", "The Kaaba as the first house of worship for humanity (3:96)."],
        ],
        places: [P.mecca],
        route: [P.mamre, P.mecca],
      },
      {
        when: 'Abraham aged 175',
        title: 'The cave at Machpelah',
        text: [
          "When Sarah died at Hebron, Abraham bought the cave of Machpelah from Ephron the Hittite for four hundred shekels of silver (Genesis 23). He died “in a good old age, an old man and full of years”, and his sons Isaac and Ishmael buried him beside Sarah (25:8–9).",
          "Over the cave stands a building begun by Herod the Great, now divided into a mosque and a synagogue: the Ibrahimi Mosque, or the Cave of the Patriarchs.",
        ],
        notes: [
          ['judaism', 'Torah', "Isaac, Rebekah, Jacob and Leah were later buried in the same cave."],
          ['islam', 'Tradition', "Muslims honour the site as al-Haram al-Ibrahimi [tradition]."],
        ],
        places: [P.hebron],
        route: [P.mecca, P.hebron],
      },
    ],
  },

  // ───────────────────────────── Musa ─────────────────────────────
  musa: {
    intro: "Moses' story fills four books of the Torah and is the story most often told in the Qur'an. Both follow the same arc, from the basket on the Nile to the mountain where he died within sight of the promised land, but they differ in telling details, and almost every place on the route is debated.",
    chapters: [
      {
        when: 'Birth (traditional c. 13th century BCE)',
        title: 'A basket on the Nile',
        text: [
          "A new Pharaoh enslaved the Israelites, set them to build the store cities of Pithom and Raamses, and ordered every Hebrew boy thrown into the Nile (Exodus 1). Moses' mother hid him for three months, then set him in a basket among the reeds; Pharaoh's daughter found him and raised him as her son, with his own mother as his nurse (2:1–10).",
          "In the Qur'an God inspires Musa's mother to cast him into the river, and Pharaoh's wife says, “a joy of the eye for me and for you; do not kill him” (28:7–9). He refuses every wet-nurse until his sister leads them to his mother (28:12–13). Later tradition names Pharaoh's wife Asiya [tradition].",
        ],
        notes: [
          ['judaism', 'Torah (Exodus 2)', "Pharaoh's daughter adopts and names him."],
          ['islam', "Qur'an (28:9)", "Pharaoh's wife adopts him; she is honoured as one of the best of women (66:11)."],
          ['christianity', 'Scholarship', "Raamses is usually identified with Pi-Ramesses, the delta capital of Ramesses II, at Qantir [scholarship]."],
        ],
        places: [P.piRamesses],
        alt: [P.memphis],
      },
      {
        when: 'Moses aged 40 (Acts 7:23)',
        title: 'A blow and a flight',
        text: [
          "Grown up, Moses saw an Egyptian beating a Hebrew, struck him and killed him. When the deed became known he fled from Pharaoh to the land of Midian (Exodus 2:11–15). The Qur'an adds that he repented at once, “My Lord, I have wronged myself, so forgive me”, and that a man came running to warn him that the chiefs were plotting to kill him (28:15–21).",
        ],
        notes: [],
        places: [P.midian],
        route: [P.piRamesses, P.midian],
      },
      {
        when: 'Years in Midian',
        title: 'At the well of Midian',
        text: [
          "At a well in Midian Moses drove off shepherds who were keeping two women from watering their flock. Their father invited him home and gave him a daughter in marriage (Exodus 2:16–22).",
          "In the Qur'an one of the women comes “walking shyly” to invite him, and her father offers a marriage if Musa will work for him eight years, or ten if he chooses (28:23–28). Many scholars identify the father with Shuʿayb, the prophet of Midian [tafsir].",
        ],
        notes: [
          ['judaism', 'Torah', "The father is Jethro (Reuel), priest of Midian; the wife is Zipporah."],
          ['druze', 'Druze tradition', "Jethro is Nabi Shuʿayb, the chief prophet of the Druze."],
        ],
        places: [P.midian],
      },
      {
        when: 'Moses aged 80 (Exodus 7:7)',
        title: 'The bush that burned',
        text: [
          "Leading the flock to Horeb, “the mountain of God”, Moses saw a bush burning without being consumed. God called to him from it, told him to remove his sandals, revealed the name “I am who I am” and sent him back to Pharaoh (Exodus 3).",
          "In the Qur'an Musa sees a fire on the way and goes to fetch a brand. He is called by name, “I am your Lord, so remove your sandals; you are in the sacred valley of Tuwa” (20:12). His staff becomes a moving snake, his hand comes out white without harm, and he asks for his brother Harun as a helper (20:17–36).",
        ],
        notes: [
          ['judaism', 'Torah (Exodus 4)', "Moses' hand turns white “as snow” with a skin disease and is then restored."],
          ['islam', "Qur'an (20:22)", "His hand comes out white “without any harm”."],
          ['christianity', 'Church tradition', "Saint Catherine's Monastery at the foot of Jabal Musa has guarded a bush said to be the burning bush since the 6th century [church tradition]."],
        ],
        places: [],
        alt: [P.jabalMusa, P.lawz],
        route: [P.midian, P.jabalMusa],
      },
      {
        when: 'Back in Egypt',
        title: 'Before Pharaoh',
        text: [
          "With Aaron, Moses asked Pharaoh to “let my people go” (Exodus 5:1). Pharaoh made the slaves' work harder. Aaron's staff became a serpent and swallowed the staffs of Pharaoh's magicians (7:10–12).",
          "In the Qur'an the magicians, seeing the staff swallow their illusions, fall down in prostration and believe. Pharaoh threatens to cut off their hands and feet and crucify them; they answer, “we will never prefer you over the clear proofs that have come to us” (20:70–72).",
        ],
        notes: [
          ['judaism', 'Torah', "Pharaoh is not named; God “hardens Pharaoh's heart”."],
          ['islam', "Qur'an", "Pharaoh claims, “I am your lord, most high” (79:24)."],
          ['christianity', 'Scholarship', "Ramesses II is the most popular identification of Pharaoh, but there is no consensus [scholarship]."],
        ],
        places: [P.piRamesses],
        route: [P.jabalMusa, P.piRamesses],
      },
      {
        when: 'The year of the Exodus',
        title: 'Plagues and Passover',
        text: [
          "Ten plagues struck Egypt: blood, frogs, gnats, flies, the death of livestock, boils, hail, locusts, darkness and finally the death of the firstborn. The Israelites marked their doors with the blood of a lamb and ate the Passover meal in haste, and Pharaoh let them go (Exodus 7–12).",
          "The Qur'an lists flood, locusts, lice, frogs and blood as “clear signs” (7:133) and speaks of “nine clear signs” given to Musa (17:101).",
        ],
        notes: [
          ['judaism', 'Torah (Exodus 12)', "The Passover is commanded as an everlasting festival; Jews retell the Exodus every year at the Seder."],
          ['christianity', 'New Testament', "Jesus' Last Supper takes place at Passover, and Paul calls Christ “our Passover lamb” (1 Corinthians 5:7)."],
          ['islam', 'Hadith', "Muslims fast on ʿAshura, which hadith links to the day God saved Musa [hadith]."],
        ],
        places: [P.piRamesses],
      },
      {
        when: 'The Exodus',
        title: 'The sea divides',
        text: [
          "Pharaoh's chariots pursued the Israelites to the sea. Moses stretched out his hand, a strong east wind drove the sea back all night, and the people crossed on dry ground; the waters returned over the Egyptians (Exodus 14).",
          "In the Qur'an Musa strikes the sea with his staff and it parts, “each part like a great mountain” (26:63). As he drowns, Pharaoh declares his belief, and is told, “today We will preserve your body so that you may be a sign for those after you” (10:90–92).",
          "Exodus calls the sea Yam Suph, “sea of reeds”. Where the crossing happened is unknown; the routes on the map show the main proposals [scholarship].",
        ],
        notes: [
          ['judaism', 'Torah (Exodus 15)', "Moses and Miriam lead the Song of the Sea."],
          ['islam', "Qur'an (10:90–92)", "Pharaoh's late repentance is refused, and his body is kept as a sign."],
        ],
        places: [],
        alt: [P.bardawil, P.bitterLakes, P.suez, P.nuweiba],
        altRoutes: [[P.piRamesses, P.bardawil], [P.piRamesses, P.bitterLakes], [P.piRamesses, P.suez], [P.piRamesses, P.nuweiba]],
      },
      {
        when: 'The first months',
        title: 'Bitter water, manna and the rock',
        text: [
          "At Marah the water was bitter until Moses threw in a piece of wood; at Elim there were twelve springs and seventy palms (Exodus 15:23–27). God sent quails in the evening and manna each morning (16). At Rephidim Moses struck a rock and water flowed (17:1–7).",
          "The Qur'an recalls the cloud that shaded them, the manna and quails (2:57), and the rock from which twelve springs gushed, one for each tribe (2:60).",
        ],
        notes: [
          ['islam', "Qur'an (2:60)", "Twelve springs from the struck rock, where Exodus gives twelve springs at Elim."],
        ],
        places: [P.ayunMusa, P.gharandal, P.feiran],
        route: [P.suez, P.ayunMusa, P.gharandal, P.feiran],
      },
      {
        when: 'The third month',
        title: 'The Law at Sinai',
        text: [
          "At Mount Sinai the mountain smoked and trembled, and God gave the Ten Commandments (Exodus 19–20). Moses went up for forty days and nights and came down with two stone tablets (24:18; 31:18).",
          "In the Qur'an Musa spends forty nights with his Lord and receives the Tablets (7:142–145). He asks to see God and is told to look at the mountain; when God reveals Himself to it, it crumbles to dust and Musa falls unconscious (7:143).",
          "Monks have identified Sinai with Jabal Musa in southern Sinai since the 4th century [church tradition]. Others propose Jabal al-Lawz in Saudi Arabia, nearer Midian, or Har Karkom in the Negev [scholarship].",
        ],
        notes: [
          ['judaism', 'Torah', "The giving of the Torah is celebrated at Shavuot."],
          ['islam', "Qur'an (2:63)", "The mountain is raised above the people as they take the covenant."],
        ],
        places: [],
        alt: [P.jabalMusa, P.lawz, P.karkom],
        route: [P.feiran, P.jabalMusa],
      },
      {
        when: 'At the foot of Sinai',
        title: 'The golden calf',
        text: [
          "While Moses was on the mountain, the people made a golden calf. Moses came down, broke the tablets, burned the calf and ground it to powder (Exodus 32).",
          "The Qur'an names the maker as al-Samiri. Harun pleads, “Son of my mother, do not seize me by my beard; I feared you would say I had divided the Children of Israel” (20:94). Al-Samiri is condemned to say all his life, “No touching” (20:97).",
        ],
        notes: [
          ['judaism', 'Torah (Exodus 32)', "Aaron makes the calf at the people's demand."],
          ['islam', "Qur'an (20:85–97)", "Al-Samiri makes the calf; Harun tries to stop it and is blameless."],
        ],
        places: [P.jabalMusa],
      },
      {
        when: 'Forty years',
        title: 'Wandering in the wilderness',
        text: [
          "From Kadesh-Barnea Moses sent twelve spies into Canaan. Ten brought back a frightening report, and the people refused to go on; God decreed that they would wander forty years until a new generation grew up (Numbers 13–14). Aaron died on Mount Hor (20:28).",
          "The Qur'an tells the same refusal, “Go, you and your Lord, and fight; we will sit here” (5:24), and the forty years of wandering (5:26). It also tells of Musa's journey with a wise servant of God to “the meeting of the two seas” (18:60–82); its place is unknown, and one suggestion is the tip of Sinai where two gulfs meet [tafsir].",
        ],
        notes: [
          ['judaism', 'Torah', "Only Joshua and Caleb of the adult generation enter the land."],
          ['islam', "Qur'an (18:65)", "The servant is unnamed; hadith calls him al-Khidr [hadith]."],
        ],
        places: [P.kadesh, P.jebelHarun],
        alt: [P.rasMuhammad],
        route: [P.jabalMusa, P.kadesh, P.jebelHarun],
      },
      {
        when: 'Moses aged 120',
        title: 'The view from Nebo',
        text: [
          "Moses climbed Mount Nebo, and God showed him the whole land he would not enter. He died there and was buried in a valley in Moab, “and no one knows his grave to this day” (Deuteronomy 34:1–7).",
          "Hadith says Musa asked God to bring him a stone's throw from the holy land, and that his grave lies by the red sandhill on the road [hadith]. In 1269 the Mamluk sultan Baybars built the shrine of Nabi Musa in the hills west of Jericho [tradition].",
        ],
        notes: [
          ['judaism', 'Torah', "“There has not arisen a prophet since in Israel like Moses, whom the Lord knew face to face” (Deuteronomy 34:10)."],
          ['christianity', 'Church tradition', "A Byzantine church on Nebo marks the place [church tradition]."],
          ['samaritanism', 'Samaritan belief', "Moses is the only prophet; Samaritans await a prophet like him, the Taheb."],
        ],
        places: [P.nebo],
        alt: [P.nabiMusa],
        route: [P.jebelHarun, P.nebo],
      },
    ],
  },

  // ───────────────────────────── Isa ─────────────────────────────
  isa: {
    intro: "Christians read the life of Jesus in the four Gospels; Muslims meet Isa in the Qur'an, above all in Surah Maryam and Surah Al ʿImran. Both honour his virgin birth, his miracles and his title of Messiah, and they part over the cross. Judaism does not regard him as the Messiah.",
    chapters: [
      {
        when: 'c. 6–5 BCE',
        title: 'The angel and Maryam',
        text: [
          "In Nazareth the angel Gabriel came to Mary, a virgin engaged to Joseph, and told her she would conceive by the Holy Spirit and bear a son named Jesus (Luke 1:26–38).",
          "In the Qur'an Maryam withdraws “to a place in the east”, and the spirit of God appears to her as a man. She asks, “How can I have a son when no man has touched me?” and is told, “It is easy for Me” (19:16–21; 3:45–47).",
        ],
        notes: [
          ['christianity', 'Gospels', "Mary is engaged to Joseph, a descendant of David."],
          ['islam', "Qur'an", "Maryam is the only woman named in the Qur'an, and a surah bears her name."],
        ],
        places: [P.nazareth],
      },
      {
        when: 'c. 5–4 BCE',
        title: 'A birth in Bethlehem',
        text: [
          "Luke tells how a census took Joseph and Mary to Bethlehem, where Jesus was born and laid in a manger, and shepherds came to see him (2:1–20). Matthew tells of Magi from the east who followed a star (2:1–12). The Church of the Nativity has stood over the traditional cave since the 4th century [church tradition].",
          "In the Qur'an the pains of childbirth drive Maryam to the trunk of a palm tree; a voice tells her not to grieve, a stream flows below her and ripe dates fall when she shakes the tree (19:23–26).",
        ],
        notes: [
          ['christianity', 'Gospels', "Matthew and Luke both place the birth in Bethlehem, the town of David."],
          ['islam', "Qur'an", "The place is “a remote place”; many commentators accept Bethlehem [tafsir]."],
        ],
        places: [P.bethlehem],
        route: [P.nazareth, P.bethlehem],
      },
      {
        when: 'Infancy',
        title: 'A voice from the cradle',
        text: [
          "When Maryam brought the child to her people, they reproached her. She pointed to him, and he spoke: “I am the servant of God; He has given me the Scripture and made me a prophet” (19:27–33).",
          "Luke tells how the infant Jesus was presented in the Temple, where the old man Simeon took him in his arms and blessed God (2:22–38).",
        ],
        notes: [
          ['islam', "Qur'an (19:30)", "The child's first words declare that he is a servant of God."],
          ['christianity', 'Gospels', "Simeon's song, the Nunc dimittis, is sung in evening prayer."],
        ],
        places: [P.jerusalem],
        route: [P.bethlehem, P.jerusalem],
      },
      {
        when: 'Early childhood',
        title: 'Refuge in Egypt',
        text: [
          "Warned in a dream that King Herod sought the child's life, Joseph took Mary and Jesus to Egypt and stayed until Herod's death; they then settled in Nazareth (Matthew 2:13–23). The Coptic Church traces the Holy Family's route through the Delta to Deir al-Muharraq in Upper Egypt [church tradition].",
          "The Qur'an says God gave mother and son shelter “on a high ground with rest and flowing water” (23:50); commentators suggest Damascus, Ramla, Jerusalem or Egypt [tafsir].",
        ],
        notes: [
          ['christianity', 'Coptic tradition', "Sites such as Matariya and Deir al-Muharraq are pilgrimage places [church tradition]."],
        ],
        places: [P.matariya, P.muharraq],
        alt: [P.damascus, P.ramla],
        altRoutes: [[P.bethlehem, P.matariya, P.muharraq], [P.muharraq, P.nazareth]],
      },
      {
        when: 'Aged 12 (Luke 2:42)',
        title: 'In his Father’s house',
        text: [
          "On a Passover pilgrimage the twelve-year-old Jesus stayed behind in Jerusalem. His parents found him three days later in the Temple, listening to the teachers and asking them questions: “Did you not know that I must be in my Father's house?” (Luke 2:41–52).",
        ],
        notes: [],
        places: [P.jerusalem],
        route: [P.nazareth, P.jerusalem],
      },
      {
        when: 'About age 30 (Luke 3:23)',
        title: 'Baptism and the wilderness',
        text: [
          "Jesus came to John at the Jordan to be baptised. The Spirit descended like a dove and a voice from heaven said, “You are my beloved Son” (Mark 1:9–11). He then fasted forty days in the wilderness and was tempted by Satan (Matthew 4:1–11).",
          "Both banks of the Jordan near Jericho claim the baptism site: Al-Maghtas in Jordan and Qasr al-Yahud on the west bank [church tradition].",
        ],
        notes: [
          ['christianity', 'Gospels', "The baptism reveals the Father, the Son and the Spirit together."],
          ['mandaeism', 'Mandaean belief', "John the Baptist is the true prophet; baptism in flowing water is the central Mandaean rite."],
        ],
        places: [P.temptation],
        alt: [P.maghtas, P.qasrYahud],
        route: [P.nazareth, P.maghtas],
      },
      {
        when: 'c. 28–30 CE',
        title: 'Galilee: teacher and healer',
        text: [
          "Jesus made Capernaum on the Sea of Galilee his base and called fishermen, Peter, Andrew, James and John, to follow him. He taught in parables and in the Sermon on the Mount (Matthew 5–7), healed the sick and fed five thousand people from five loaves and two fish (Mark 6:30–44). At a wedding in Cana he turned water into wine (John 2), and on a high mountain he was transfigured before three disciples (Mark 9:2–8).",
          "In the Qur'an Isa's disciples, al-hawariyyun, declare “we are God's helpers” (3:52; 61:14), and ask for a table spread with food from heaven, which is sent as a sign (5:112–115).",
        ],
        notes: [
          ['christianity', 'Church tradition', "Churches mark the Beatitudes and the feeding at Tabgha; the Transfiguration is placed on Mount Tabor or Mount Hermon [church tradition]."],
          ['islam', "Qur'an (5:114)", "The surah al-Maʾida, “the Table”, is named after this sign."],
        ],
        places: [P.capernaum, P.beatitudes, P.tabgha],
        alt: [P.kafrKanna, P.khirbetQana, P.tabor, P.hermon],
        route: [P.maghtas, P.capernaum],
      },
      {
        when: 'Throughout his ministry',
        title: 'Signs by God’s permission',
        text: [
          "The Qur'an lists Isa's signs in his own words: “I make for you from clay the shape of a bird and breathe into it, and it becomes a bird by God's permission; I heal the blind and the leper and bring the dead to life by God's permission” (3:49; 5:110).",
          "The Gospels tell of many healings and of the raising of Lazarus, dead four days, at Bethany near Jerusalem (John 11). The story of the clay birds is not in the Gospels; a similar story appears in the Infancy Gospel of Thomas, a 2nd-century Christian text outside the Bible [apocrypha].",
        ],
        notes: [
          ['christianity', 'Gospels', "Miracles are signs of the Kingdom of God and of Jesus' divine authority."],
          ['islam', "Qur'an", "Every sign is “by God's permission”, stressing that Isa is God's servant."],
        ],
        places: [P.bethany],
        route: [P.capernaum, P.bethany],
      },
      {
        when: 'Passover, c. 30–33 CE',
        title: 'Jerusalem: the last week',
        text: [
          "Jesus rode into Jerusalem on a donkey while crowds waved palm branches (Mark 11:1–11), drove the money-changers out of the Temple and taught there daily. On the night of Passover he shared a last supper with his disciples, then prayed in the garden of Gethsemane, where he was arrested (Mark 14).",
        ],
        notes: [
          ['christianity', 'Gospels', "The Last Supper is the origin of the Eucharist; Holy Week retraces these days."],
          ['judaism', 'Jewish view', "Judaism does not regard Jesus as the Messiah; in its expectation the Messiah brings an age of peace that has not yet come."],
        ],
        places: [P.gethsemane, P.jerusalem],
        route: [P.bethany, P.gethsemane],
      },
      {
        when: 'Good Friday and Easter (Christian belief)',
        title: 'The cross',
        text: [
          "The Gospels tell how Jesus was tried before the high priest Caiaphas and the Roman governor Pontius Pilate, crucified at Golgotha outside the city wall, and buried in a nearby tomb. On the third day the tomb was found empty, and he appeared to his disciples (Mark 15–16; John 19–21). The Church of the Holy Sepulchre has stood over the traditional sites since the 4th century [church tradition].",
          "The Qur'an says: “they did not kill him, nor did they crucify him, but it was made to appear so to them… rather, God raised him up to Himself” (4:157–158). Many commentators held that another man was made to look like him [tafsir].",
        ],
        notes: [
          ['christianity', 'Gospels', "Christ's death and resurrection are the centre of Christian faith (1 Corinthians 15:3–4)."],
          ['islam', "Qur'an (4:157–158)", "Isa was not crucified; God raised him."],
        ],
        places: [P.sepulchre],
        route: [P.gethsemane, P.sepulchre],
      },
      {
        when: 'Forty days later (Acts 1:3)',
        title: 'Raised up, and the return',
        text: [
          "Acts tells how, forty days after the resurrection, Jesus was taken up into heaven from the Mount of Olives, and angels promised he would return in the same way (1:9–11).",
          "Muslims also expect Isa's return before the end of time. Hadith says he will descend at the white minaret east of Damascus [hadith]; the eastern minaret of the Umayyad Mosque is called the Minaret of Isa [tradition].",
        ],
        notes: [
          ['christianity', 'New Testament', "The Second Coming, when Christ will judge the living and the dead."],
          ['islam', 'Hadith', "Isa will return, defeat the false messiah (al-Dajjal) and rule with justice [hadith]."],
        ],
        places: [P.olives],
        alt: [P.damascus],
        route: [P.sepulchre, P.olives],
      },
    ],
  },

  // ───────────────────────────── Muhammad ─────────────────────────────
  muhammad: {
    intro: "The Qur'an speaks to events in Muhammad's life but does not narrate it in order. The chronology below comes mainly from the sirah, the biography by Ibn Ishaq as edited by Ibn Hisham, and from hadith collections such as Bukhari and Muslim; details from these are marked. Judaism and Christianity do not regard Muhammad as a prophet.",
    chapters: [
      {
        when: '570 CE, the Year of the Elephant',
        title: 'An orphan of Mecca',
        text: [
          "Muhammad was born in Mecca into the clan of Hashim of the Quraysh [sirah]. Tradition places his birth in the year an Abyssinian army came against Mecca with an elephant, which Surah al-Fil recalls (105) [sirah].",
          "His father Abdullah had died before he was born. As an infant he was nursed in the desert by Halima of the Banu Saʿd. His mother Amina died at al-Abwa when he was six, and he was raised by his grandfather Abd al-Muttalib, then by his uncle Abu Talib [sirah].",
        ],
        notes: [
          ['islam', "Qur'an (93:6)", "“Did He not find you an orphan and give you shelter?”"],
        ],
        places: [P.mecca, P.banuSad, P.abwa],
      },
      {
        when: 'c. 582–595 CE',
        title: 'Caravans to Syria',
        text: [
          "At about twelve he travelled with Abu Talib's caravan to Syria; at Bosra a Christian monk named Bahira is said to have recognised signs of prophethood in him [sirah]. As a young man he became known as al-Amin, “the trustworthy”, and led the caravan of the merchant Khadija to Syria. She proposed marriage, and they married when he was about twenty-five [sirah].",
        ],
        notes: [
          ['christianity', 'Sirah', "The Bahira story is told in Muslim sources; Christian texts of the Middle Ages tell their own versions of a monk who met Muhammad [sirah]."],
        ],
        places: [P.bosra],
        route: [P.mecca, P.bosra],
      },
      {
        when: 'c. 605 CE',
        title: 'The Black Stone',
        text: [
          "When the Quraysh rebuilt the Kaaba, the clans quarrelled over who would set the Black Stone back in place. They agreed to accept the judgement of the next man to enter, who was Muhammad. He placed the stone on a cloak, had every clan lift a corner, and set it in place with his own hands [sirah].",
        ],
        notes: [],
        places: [P.mecca],
        route: [P.bosra, P.mecca],
      },
      {
        when: '610 CE, aged 40',
        title: '“Read!”',
        text: [
          "Muhammad would retreat to the cave of Hira on a mountain above Mecca. There, in Ramadan, the angel Gabriel came to him and said, “Read!”, and the first verses were revealed: “Read in the name of your Lord who created” (96:1–5). He returned trembling to Khadija, who comforted him and took him to her Christian cousin Waraqa ibn Nawfal, who said this was the same angel that had come to Moses [hadith].",
        ],
        notes: [
          ['islam', "Qur'an (97)", "The Night of Power, laylat al-qadr, in which revelation began, is “better than a thousand months”."],
        ],
        places: [P.hira],
        route: [P.mecca, P.hira],
      },
      {
        when: '613–619 CE',
        title: 'Preaching in Mecca',
        text: [
          "After three years he preached openly, calling the clans from Mount Safa [hadith]. He taught the oneness of God, the judgement to come and care for the poor and the orphan. The early believers included Khadija, Ali, Abu Bakr, Zayd and the enslaved Abyssinian Bilal, who was tortured for his faith [sirah].",
          "The Quraysh boycotted the Hashim clan, who were confined to a valley of Mecca for about two years [sirah].",
        ],
        notes: [
          ['islam', "Qur'an (111)", "Surah al-Masad condemns his uncle Abu Lahab, a leading opponent."],
        ],
        places: [P.mecca],
        route: [P.hira, P.mecca],
      },
      {
        when: '615 CE',
        title: 'Refuge with a Christian king',
        text: [
          "To escape persecution, a group of Muslims crossed the Red Sea to the Christian kingdom of Aksum. When the Quraysh demanded them back, Jaʿfar ibn Abi Talib recited the passage of Surah Maryam on the birth of Jesus, and the Negus wept and refused to hand them over [sirah].",
        ],
        notes: [
          ['christianity', 'Sirah', "The protection given by the Christian king of Aksum is remembered in Islamic tradition as a model of hospitality [sirah]."],
        ],
        places: [P.aksum],
        altRoutes: [[P.mecca, P.aksum]],
      },
      {
        when: '619 CE',
        title: 'The year of sorrow',
        text: [
          "Khadija and Abu Talib died in the same year [sirah]. Muhammad went to Taʾif to seek support and was driven out, pelted with stones. Resting in a garden, he was offered grapes by Addas, a Christian slave from Nineveh, who was moved to learn he knew of the prophet Yunus [sirah].",
          "On the way back, at Nakhla, a company of jinn listened to the Qur'an and believed (46:29–32; 72:1–2).",
        ],
        notes: [],
        places: [P.taif, P.nakhla],
        route: [P.mecca, P.taif, P.nakhla, P.mecca],
      },
      {
        when: 'c. 620–621 CE',
        title: 'The Night Journey',
        text: [
          "“Glory be to Him who took His servant by night from the Sacred Mosque to the Farthest Mosque” (17:1). Hadith tells how he rode the Buraq to Jerusalem, led the earlier prophets in prayer, and ascended through the heavens, meeting Adam, Yahya and Isa, Yusuf, Idris, Harun, Musa and Ibrahim [hadith].",
          "There the five daily prayers were prescribed; on Musa's advice he returned several times to ask that they be reduced from fifty to five [hadith].",
        ],
        notes: [
          ['islam', "Qur'an (53:13–18)", "He saw the angel “at the lote tree of the utmost boundary”."],
          ['islam', 'Tradition', "The Dome of the Rock (691) and al-Aqsa Mosque stand where tradition places the ascension [tradition]."],
        ],
        places: [P.aqsa],
        route: [P.mecca, P.aqsa],
      },
      {
        when: '622 CE, year 1 of the Hijra',
        title: 'The emigration to Medina',
        text: [
          "Pilgrims from Yathrib pledged to protect him at al-ʿAqaba near Mina [sirah]. The Muslims left Mecca in small groups, and Muhammad and Abu Bakr slipped out last, hiding three days in the cave of Thawr: “when the two were in the cave, and he said to his companion, ‘Do not grieve; God is with us’” (9:40).",
          "Taking a coastal route, they reached Quba, where he founded its mosque, then entered Yathrib, which became Madinat al-Nabi, “the city of the Prophet”. He joined the emigrants (muhajirun) with the helpers (ansar) as brothers and agreed a written pact, the Constitution of Medina, with the city's tribes, including its Jewish clans [sirah].",
        ],
        notes: [
          ['islam', 'Islamic calendar', "The Hijra marks year 1 of the Islamic calendar."],
        ],
        places: [P.thawr, P.quba, P.medina],
        route: [P.mecca, P.thawr, P.quba, P.medina],
      },
      {
        when: '624 CE, 2 AH',
        title: 'Badr',
        text: [
          "In 624 the qibla, the direction of prayer, was turned from Jerusalem to the Kaaba (2:144). That year about 313 Muslims met a Meccan force of about a thousand at the wells of Badr and won [sirah]. The Qur'an says God sent angels in support (8:9; 3:123).",
        ],
        notes: [
          ['islam', "Qur'an (8)", "Surah al-Anfal reflects on the battle and the sharing of its spoils."],
        ],
        places: [P.badr],
        route: [P.medina, P.badr, P.medina],
      },
      {
        when: '625–627 CE',
        title: 'Uhud and the Trench',
        text: [
          "At Uhud in 625 the archers left their post to gather spoils; the Meccan cavalry turned the battle, Muhammad was wounded and his uncle Hamza was killed (3:121–175; [sirah]). In 627 a confederacy of tribes besieged Medina. On the advice of Salman the Persian, the Muslims dug a trench, and the siege broke up in wind and cold (33:9–27; [sirah]).",
          "Medina's Jewish clans of Qaynuqaʿ and al-Nadir were expelled in these years after disputes with the Muslims; after the Trench, the men of Qurayza were executed and the women and children enslaved for siding with the besiegers. These events are recorded in the sirah, and historians debate their details [sirah].",
        ],
        notes: [
          ['islam', "Qur'an (33)", "Surah al-Ahzab, “the Confederates”, is named after the siege."],
          ['judaism', 'Historical view', "The fate of Medina's Jewish tribes is known only from Muslim sources; modern historians discuss their reliability [scholarship]."],
        ],
        places: [P.uhud, P.trench],
        route: [P.medina, P.uhud],
      },
      {
        when: '628 CE, 6 AH',
        title: 'Hudaybiyya: “a clear victory”',
        text: [
          "Setting out for pilgrimage, Muhammad and some 1,400 companions were stopped at al-Hudaybiyya. Under a tree they pledged loyalty to him (48:18), and he agreed a ten-year truce with Quraysh that seemed a setback but which the Qur'an called “a clear victory” (48:1).",
          "That year the oasis of Khaybar was taken [sirah], and letters calling rulers to Islam were sent to the Byzantine emperor Heraclius, the Persian king, the Negus and the governor of Egypt [hadith].",
        ],
        notes: [],
        places: [P.hudaybiyya, P.khaybar],
        route: [P.medina, P.hudaybiyya],
        altRoutes: [[P.medina, P.khaybar]],
      },
      {
        when: '630 CE, 8 AH',
        title: 'Return to Mecca',
        text: [
          "After an ally of Quraysh broke the truce, Muhammad marched on Mecca with about ten thousand men, and the city surrendered almost without fighting. He cleared the 360 idols from the Kaaba, reciting “the truth has come and falsehood has vanished” (17:81), and declared a general amnesty [sirah]. Weeks later the Muslims won at Hunayn (9:25).",
          "Later that year he led an expedition north to Tabuk, near the Byzantine frontier, which ended without a battle (9:38–49; [sirah]).",
        ],
        notes: [],
        places: [P.mecca, P.hunayn, P.tabuk],
        route: [P.medina, P.mecca, P.hunayn],
        altRoutes: [[P.medina, P.tabuk]],
      },
      {
        when: '632 CE, 10–11 AH',
        title: 'The Farewell Pilgrimage',
        text: [
          "In 632 Muhammad made his only full pilgrimage, the Farewell Pilgrimage. At Arafat he gave a sermon on the sanctity of life and property, the rights of women and the equality of believers [hadith], and the verse was revealed: “Today I have perfected your religion for you” (5:3).",
          "Back in Medina he fell ill and died in the room of his wife Aisha, at about sixty-three. He was buried there, in what is now the Prophet's Mosque [hadith].",
        ],
        notes: [
          ['islam', "Qur'an (33:40)", "“Muhammad is not the father of any of your men, but the Messenger of God and the Seal of the Prophets.”"],
        ],
        places: [P.arafat, P.medina],
        route: [P.medina, P.mecca, P.arafat, P.mecca, P.medina],
      },
    ],
  },
};

// Self-check: every chapter has a title, text and something to show on the map.
for (const [id, s] of Object.entries(STORIES)) {
  console.assert(ULUL_AZMI.includes(id), `story for unknown figure ${id}`);
  s.chapters.forEach((c, i) => {
    console.assert(c.title && c.text?.length && c.when, `${id} chapter ${i + 1} incomplete`);
    const pins = [...(c.places || []), ...(c.alt || [])];
    console.assert(pins.length || c.altRoutes?.length, `${id} chapter ${i + 1} has nothing to map`);
    for (const pl of [...pins, ...(c.route || []), ...(c.altRoutes || []).flat()]) console.assert(pl?.at, `${id} chapter ${i + 1}: unknown place`);
  });
}
