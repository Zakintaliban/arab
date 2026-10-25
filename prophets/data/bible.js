// Prophets and prophetesses of the Hebrew Bible who are not among the 25
// named in the Qur'an, in rough historical order. Same schema as quran.js.

const JLM = [31.778, 35.235];
const NOT_QURAN = 'Not named in the Qur’an';

export const BIBLE = [
  {
    id: 'miriam',
    names: [['Christianity', 'Miriam'], ['Judaism', 'Miryam'], ['Islam', 'Maryam, sister of Musa']],
    scripts: [['he', 'מרים'], ['el', 'Μαριάμ'], ['ar', 'مريم']],
    era: 'Time of Moses',
    lead: "Miriam, the sister of Moses and Aaron, is the first woman the Bible calls a prophetess. She watched over the infant Moses in his basket on the Nile and led the women in song and dance after the crossing of the sea.",
    life: [
      "When Pharaoh's daughter found the baby Moses, Miriam offered to fetch a Hebrew nurse, his own mother. After the sea closed over the Egyptians she took a tambourine and sang, “Sing to the Lord, for he has triumphed gloriously” (Exodus 15:20–21). Later she and Aaron criticised Moses and she was struck with a skin disease for seven days. She died at Kadesh in the wilderness.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophetess', text: [
        "Miriam is one of the seven prophetesses of Jewish tradition. Later tradition links her with the well that followed Israel through the desert. Some families now place a “Miriam's cup” of water on the Passover table.",
      ] },
      christianity: { role: 'Prophetess', text: [
        "Micah lists Miriam with Moses and Aaron as leaders God sent to Israel (Micah 6:4).",
      ] },
      islam: { role: 'Sister of Musa (unnamed)', text: [
        "The Qur'an tells how Musa's mother sent his sister to follow the basket and how she led Pharaoh's household to his mother (28:11–13), without naming her.",
      ] },
    },
    refs: ['Exodus 2:1–10; 15:20–21; Numbers 12; 20:1; Micah 6:4', "Qur'an 28:11–13"],
    places: [
      { name: 'Nile Delta, Egypt', at: [30.8, 31.6], country: 'eg', kind: 'born', step: 1, note: 'Watched over the infant Moses.' },
      { name: 'Shore of the Red Sea', at: [29.9, 32.6], country: 'eg', kind: 'life', step: 2, note: 'The Song of the Sea; the exact crossing place is unknown.' },
      { name: 'Kadesh', at: [30.65, 34.42], country: 'eg', kind: 'died', step: 3, note: 'Died in the wilderness (Numbers 20:1).' },
    ],
    related: ['musa', 'harun'],
  },
  {
    id: 'joshua',
    names: [['Christianity', 'Joshua'], ['Judaism', 'Yehoshua'], ['Islam', "Yusha' ibn Nun"]],
    scripts: [['he', 'יהושע'], ['el', 'Ιησούς του Ναυή'], ['ar', 'يوشع']],
    era: 'c. 13th century BCE (traditional dating)',
    lead: "Joshua son of Nun was Moses' assistant and his successor, who led the Israelites across the Jordan into Canaan. The Book of Joshua tells of the fall of Jericho and the division of the land among the tribes. In Hebrew his name is the same as Jesus' (Yeshua).",
    life: [
      "Joshua fought the Amalekites while Moses held up his arms, went partway up Sinai with Moses, and was one of the twelve spies sent into Canaan; with Caleb he alone urged the people to trust God. Moses laid hands on him as his successor. He led the crossing of the Jordan, the conquest of Jericho and the campaigns that followed, and in old age renewed the covenant at Shechem.",
    ],
    miracles: [
      'The Jordan stopping so the people could cross (Joshua 3).',
      'The walls of Jericho falling (Joshua 6).',
      'The sun standing still at Gibeon (Joshua 10:12–13).',
    ],
    views: {
      judaism: { role: 'Prophet; successor of Moses', text: [
        "Joshua's book opens the Nevi'im (Prophets) section of the Hebrew Bible. Jewish tradition counts him in the chain that passed on the Torah from Moses.",
      ] },
      christianity: { role: 'Leader of Israel', text: [
        "Christians honour Joshua's faith (Hebrews 11:30–31), and early Christian writers saw the shared name Jesus/Joshua as significant.",
      ] },
      islam: { role: NOT_QURAN, text: [
        "Muslim commentators identify Yusha' with the young companion of Musa in Surah al-Kahf (18:60) and with one of the two God-fearing men who urged the Israelites to enter the land (5:23). Many count him as a prophet.",
      ] },
      samaritanism: { role: 'Successor of Moses', text: [
        "Samaritans honour Joshua and keep their own chronicle known as the Samaritan Book of Joshua.",
      ] },
    },
    refs: ['Exodus 17; 24; Numbers 13–14; 27; Deuteronomy 34; Book of Joshua', "Qur'an 5:23; 18:60–65 (as interpreted)"],
    places: [
      { name: 'Jordan crossing', at: [31.84, 35.55], country: ['jo', 'ps'], kind: 'life', step: 1, note: 'The river stopped for the crossing.' },
      { name: 'Jericho', at: [31.871, 35.444], country: 'ps', kind: 'life', step: 2, note: 'The walls fell.' },
      { name: 'Shechem', at: [32.21, 35.28], country: 'ps', kind: 'life', step: 3, note: 'Renewed the covenant (Joshua 24).' },
      { name: 'Kifl Haris (Timnath-serah)', at: [32.12, 35.15], country: 'ps', kind: 'died', trad: true, note: 'Traditional tomb.' },
    ],
    related: ['musa'],
  },
  {
    id: 'deborah',
    names: [['Christianity', 'Deborah'], ['Judaism', 'Devorah']],
    scripts: [['he', 'דבורה'], ['el', 'Δεββώρα']],
    era: 'c. 12th century BCE (traditional dating)',
    lead: "Deborah was a prophetess and judge of Israel who settled disputes under a palm tree in the hill country of Ephraim. With the commander Barak she led Israel to victory over the Canaanite general Sisera. The Song of Deborah is among the oldest poems in the Hebrew Bible.",
    life: [
      "Deborah summoned Barak and told him God would give him victory over Sisera's chariots. Barak agreed to go only if she came too. Israel won near Mount Tabor and the river Kishon, and Sisera was killed by a woman named Jael.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophetess and judge', text: [
        "Deborah is counted among the seven prophetesses of Israel and is the only woman among the judges.",
      ] },
      christianity: { role: 'Prophetess and judge', text: [
        "Christians honour Deborah as a leader of faith and often cite her as an example of women's leadership in scripture.",
      ] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Judges 4–5'],
    places: [
      { name: 'Palm of Deborah, between Ramah and Bethel', at: [31.9, 35.22], country: 'ps', kind: 'life', note: 'Where she judged Israel (Judges 4:5).' },
      { name: 'Mount Tabor', at: [32.687, 35.39], country: 'il', kind: 'life', note: 'Where Barak gathered the army.' },
    ],
    related: ['joshua', 'samuel'],
  },
  {
    id: 'samuel',
    names: [['Christianity', 'Samuel'], ['Judaism', 'Shmuel'], ['Islam', 'Shamwil']],
    scripts: [['he', 'שמואל'], ['el', 'Σαμουήλ'], ['ar', 'صموئيل']],
    era: '11th century BCE',
    lead: "Samuel was the last of Israel's judges and the prophet who anointed its first two kings, Saul and David. His mother Hannah prayed for a son and dedicated him to serve at the sanctuary of Shiloh, where as a boy he heard God call his name.",
    life: [
      "Raised by the priest Eli at Shiloh, Samuel became a prophet recognised “from Dan to Beersheba”. He led Israel against the Philistines and judged the people from Ramah. When the people asked for a king he warned them of the cost but anointed Saul, and later, when Saul disobeyed, secretly anointed the young David in Bethlehem.",
    ],
    miracles: [
      'Thunder and rain at harvest time as a sign at his word (1 Samuel 12:18).',
    ],
    views: {
      judaism: { role: 'Prophet and judge', text: [
        "Jewish tradition ranks Samuel among the greatest prophets and credits him with writing the books that bear his name.",
      ] },
      christianity: { role: 'Prophet', text: [
        "The New Testament treats Samuel as the first of the line of prophets (Acts 3:24; 13:20).",
      ] },
      islam: { role: 'Prophet (unnamed in the Qur’an)', text: [
        "The Qur'an tells of a prophet whom the Israelites asked for a king, who appointed Talut (Saul) (2:246–248). Commentators identify this prophet as Shamwil.",
      ] },
    },
    refs: ['1 Samuel 1–25', "Qur'an 2:246–248"],
    places: [
      { name: 'Ramah', at: [31.83, 35.18], country: 'ps', kind: 'born', step: 1, note: 'Home town and base as judge.' },
      { name: 'Shiloh', at: [32.055, 35.29], country: 'ps', kind: 'life', step: 2, note: 'Served at the sanctuary as a boy.' },
      { name: 'Nabi Samwil', at: [31.833, 35.18], country: 'ps', kind: 'died', trad: true, note: 'Traditional tomb, a mosque above a synagogue.' },
    ],
    related: ['dawud', 'nathan'],
  },
  {
    id: 'nathan',
    names: [['Christianity', 'Nathan'], ['Judaism', 'Natan']],
    scripts: [['he', 'נתן'], ['el', 'Νάθαν']],
    era: '10th century BCE',
    lead: "Nathan was the court prophet of King David. He brought God's promise that David's dynasty would endure, confronted David with a parable after the affair with Bathsheba, and helped secure the throne for Solomon.",
    life: [
      "When David wanted to build a temple, Nathan told him that his son would build it instead and that his house would last forever (2 Samuel 7). After David had Uriah killed, Nathan told him a story of a rich man who stole a poor man's only lamb, then said, “You are the man” (2 Samuel 12:7). In David's old age he helped Bathsheba ensure Solomon was crowned.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: [
        "Nathan's oracle in 2 Samuel 7 is the foundation of the Jewish hope in a Messiah from the house of David.",
      ] },
      christianity: { role: 'Prophet', text: [
        "Christians read Nathan's promise of an everlasting throne as fulfilled in Jesus, the Son of David.",
      ] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['2 Samuel 7; 12; 1 Kings 1'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Prophet at David’s court.' },
    ],
    related: ['dawud', 'sulayman'],
  },
  {
    id: 'hosea',
    names: [['Christianity', 'Hosea'], ['Judaism', 'Hoshea']],
    scripts: [['he', 'הושע'], ['el', 'Ωσηέ']],
    era: '8th century BCE',
    lead: "Hosea prophesied in the northern kingdom of Israel in its last decades before the Assyrian conquest. He used his own troubled marriage to an unfaithful wife as a picture of Israel's unfaithfulness to God and of God's persistent love.",
    life: [
      "Hosea married Gomer, who left him, and gave their children symbolic names. He took her back as a sign that God would take back his people. His book accuses Israel of idolatry and empty ritual: “I desire steadfast love and not sacrifice” (6:6).",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Hosea opens the Book of the Twelve (the Minor Prophets)."] },
      christianity: { role: 'Prophet', text: ["Jesus twice quotes “I desire mercy, not sacrifice” (Matthew 9:13; 12:7), and Matthew applies “Out of Egypt I called my son” (Hosea 11:1) to Jesus."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Hosea'],
    places: [
      { name: 'Samaria, northern kingdom', at: [32.28, 35.19], country: 'ps', kind: 'life', note: 'Prophesied to the northern kingdom.' },
    ],
    related: ['amos'],
  },
  {
    id: 'amos',
    names: [['Christianity', 'Amos'], ['Judaism', 'Amos']],
    scripts: [['he', 'עמוס'], ['el', 'Αμώς']],
    era: '8th century BCE',
    lead: "Amos was a shepherd and tender of sycamore figs from Tekoa in Judah, sent to preach in the prosperous northern kingdom. He condemned the rich for crushing the poor and is remembered as the great prophet of social justice.",
    life: [
      "Amos said he was “no prophet, nor a prophet's son” but a herdsman whom God took from the flock (7:14). At the royal shrine of Bethel he denounced luxury, bribery and false worship, and was told to go home to Judah.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Amos is one of the Twelve. His call, “Let justice roll down like waters” (5:24), is central to Jewish social ethics."] },
      christianity: { role: 'Prophet', text: ["James quotes Amos 9:11–12 at the council of Jerusalem (Acts 15:16–17). Martin Luther King Jr. famously quoted Amos 5:24."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Amos'],
    places: [
      { name: 'Tekoa', at: [31.64, 35.24], country: 'ps', kind: 'born', step: 1, note: 'His home town in Judah.' },
      { name: 'Bethel', at: [31.93, 35.22], country: 'ps', kind: 'life', step: 2, note: 'Preached at the royal shrine.' },
    ],
    related: ['hosea', 'micah'],
  },
  {
    id: 'isaiah',
    names: [['Christianity', 'Isaiah'], ['Judaism', 'Yeshayahu'], ['Islam', "Sha'ya"]],
    scripts: [['he', 'ישעיהו'], ['el', 'Ησαΐας'], ['ar', 'إشعياء']],
    era: '8th century BCE',
    lead: "Isaiah son of Amoz prophesied in Jerusalem under four kings of Judah, during the threat from Assyria. The book that bears his name, one of the longest in the Bible, contains famous visions of judgment, comfort and a coming age of peace.",
    life: [
      "In the year King Uzziah died, Isaiah saw God enthroned in the Temple with seraphim calling “Holy, holy, holy” (Isaiah 6). He advised kings Ahaz and Hezekiah, and when the Assyrian king Sennacherib besieged Jerusalem in 701 BCE he promised that the city would not fall.",
    ],
    miracles: [
      'The shadow on the sundial going back ten steps as a sign to Hezekiah (2 Kings 20:9–11; Isaiah 38:8).',
      'Hezekiah healed and given fifteen more years (Isaiah 38).',
    ],
    views: {
      judaism: { role: 'Prophet', text: ["Isaiah is the first of the Latter Prophets, and his words of comfort (“Comfort, comfort my people”, 40:1) are read in synagogues after the fast of Tisha B'Av. Jewish tradition reads the “servant” passages as describing the people of Israel."] },
      christianity: { role: 'Prophet', text: ["Christians read many passages of Isaiah as prophecies of Christ, such as the virgin who will bear a son called Immanuel (7:14) and the suffering servant (52:13–53:12). The New Testament quotes him more than any other prophet."] },
      islam: { role: NOT_QURAN, text: ["Muslim histories of the prophets include Sha'ya among the prophets sent to the Israelites."] },
    },
    refs: ['Book of Isaiah; 2 Kings 18–20'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Prophesied in the city and the Temple.' },
    ],
    related: ['micah', 'hosea'],
  },
  {
    id: 'micah',
    names: [['Christianity', 'Micah'], ['Judaism', 'Mikhah']],
    scripts: [['he', 'מיכה'], ['el', 'Μιχαίας']],
    era: '8th century BCE',
    lead: "Micah, from the village of Moresheth in Judah, was a contemporary of Isaiah. He spoke for the rural poor against the powerful of Jerusalem and summed up true religion in one of the best-known verses of the Bible.",
    life: [
      "Micah warned that Jerusalem would become a heap of ruins because of its leaders' corruption. He also foresaw a ruler coming from Bethlehem and a time when nations would beat their swords into ploughshares.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["“Do justice, love mercy and walk humbly with your God” (6:8) is often quoted as a summary of Jewish ethics."] },
      christianity: { role: 'Prophet', text: ["Matthew cites Micah 5:2, the ruler from Bethlehem, in the story of Jesus' birth (Matthew 2:6)."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Micah'],
    places: [
      { name: 'Moresheth', at: [31.6, 34.92], country: 'il', kind: 'born', note: 'His home village.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Target of his warnings.' },
    ],
    related: ['isaiah', 'amos'],
  },
  {
    id: 'joel',
    names: [['Christianity', 'Joel'], ['Judaism', 'Yoel']],
    scripts: [['he', 'יואל'], ['el', 'Ιωήλ']],
    era: 'Uncertain (between the 9th and 4th centuries BCE)',
    lead: "Joel son of Pethuel saw a devastating plague of locusts as a warning of the Day of the Lord and called Judah to repent. He promised that God would pour out his spirit on all people.",
    life: [
      "Little is known of Joel's life. His short book moves from a call to fast and mourn over the ruined land to promises of restored harvests and of signs in the heavens.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Joel is one of the Twelve."] },
      christianity: { role: 'Prophet', text: ["At Pentecost, Peter quotes Joel's prophecy, “I will pour out my spirit on all flesh” (Joel 2:28–32), as fulfilled (Acts 2:16–21)."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Joel'],
    places: [
      { name: 'Judah', at: [31.7, 35.1], country: ['il', 'ps'], kind: 'life', note: 'Prophesied in Judah; his home is unknown.' },
    ],
    related: [],
  },
  {
    id: 'nahum',
    names: [['Christianity', 'Nahum'], ['Judaism', 'Nahum']],
    scripts: [['he', 'נחום'], ['el', 'Ναούμ']],
    era: '7th century BCE',
    lead: "Nahum the Elkoshite foretold the fall of Nineveh, the Assyrian capital that had conquered Israel, which was destroyed by the Babylonians and Medes in 612 BCE. His book is a vivid poem of the city's ruin.",
    life: [
      "Nahum's book says nothing about his life beyond his home, Elkosh. Its whole message is that the oppressor will fall.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Nahum is one of the Twelve. A traditional tomb at Alqosh in northern Iraq was cared for by its Jewish community for centuries."] },
      christianity: { role: 'Prophet', text: ["Christians read Nahum among the Minor Prophets."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Nahum'],
    places: [
      { name: 'Nineveh', at: [36.36, 43.15], country: 'iq', kind: 'life', note: 'The city whose fall he foretold.' },
      { name: 'Alqosh', at: [36.735, 43.096], country: 'iq', kind: 'died', trad: true, note: 'Traditional tomb.' },
    ],
    related: ['yunus'],
  },
  {
    id: 'zephaniah',
    names: [['Christianity', 'Zephaniah'], ['Judaism', 'Tzefanyah']],
    scripts: [['he', 'צפניה'], ['el', 'Σοφονίας']],
    era: '7th century BCE',
    lead: "Zephaniah prophesied in the reign of King Josiah of Judah. He announced a coming Day of the Lord, “a day of wrath”, against idolatry, followed by the restoration of a humble remnant.",
    life: [
      "Zephaniah traces his ancestry to Hezekiah, perhaps the king. His warnings may have encouraged Josiah's religious reforms.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Zephaniah is one of the Twelve."] },
      christianity: { role: 'Prophet', text: ["The Latin hymn Dies irae, long part of the Catholic requiem, takes its opening words from Zephaniah 1:15."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Zephaniah'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Prophesied in Judah.' },
    ],
    related: ['jeremiah'],
  },
  {
    id: 'habakkuk',
    names: [['Christianity', 'Habakkuk'], ['Judaism', 'Havakuk']],
    scripts: [['he', 'חבקוק'], ['el', 'Αββακούμ'], ['fa', 'حبقوق']],
    era: 'Late 7th century BCE',
    lead: "Habakkuk questioned God openly: why does injustice go unpunished, and why use the cruel Babylonians as an instrument? God's answer, that “the righteous shall live by his faith”, became one of the most influential verses in Christian theology.",
    life: [
      "His book is a dialogue with God followed by a prayer-psalm ending in trust: even if the fig tree does not blossom, “yet I will rejoice in the Lord” (3:17–18).",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Habakkuk is one of the Twelve. His verse “the righteous shall live by his faith” (2:4) is part of Jewish tradition too."] },
      christianity: { role: 'Prophet', text: ["Paul quotes Habakkuk 2:4 in Romans 1:17 and Galatians 3:11; the verse was central to Martin Luther and the Reformation."] },
      islam: { role: NOT_QURAN, text: ["A shrine in Tuyserkan, western Iran, is honoured as Habakkuk's tomb and is protected as a national heritage site."] },
    },
    refs: ['Book of Habakkuk'],
    places: [
      { name: 'Judah', at: [31.7, 35.1], country: ['il', 'ps'], kind: 'life', note: 'Prophesied before the Babylonian conquest.' },
      { name: 'Tuyserkan', at: [34.55, 48.45], country: 'ir', kind: 'died', trad: true, note: 'Traditional tomb.' },
    ],
    related: ['jeremiah'],
  },
  {
    id: 'jeremiah',
    names: [['Christianity', 'Jeremiah'], ['Judaism', 'Yirmeyahu'], ['Islam', 'Irmiya']],
    scripts: [['he', 'ירמיהו'], ['el', 'Ιερεμίας'], ['ar', 'إرميا']],
    era: 'c. 650–570 BCE',
    lead: "Jeremiah of Anathoth prophesied for some forty years as Babylon rose to power, and lived to see Jerusalem and the First Temple destroyed in 587/586 BCE. Called “the weeping prophet”, he is traditionally credited with the Book of Lamentations.",
    life: [
      "Called as a youth (“I am only a boy”, 1:6), Jeremiah warned that Jerusalem would fall unless it repented and urged surrender to Babylon. For this he was beaten, put in stocks and thrown into a muddy cistern. He wore a wooden yoke as a sign of submission to Babylon.",
      "After the city fell he stayed with the remnant, and was taken against his will to Egypt, where he is last heard of at Tahpanhes.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Lamentations, traditionally attributed to Jeremiah, is read on Tisha B'Av, the fast that mourns the destruction of the Temples."] },
      christianity: { role: 'Prophet', text: ["Jeremiah's promise of a “new covenant” written on the heart (31:31–34) is quoted in Hebrews 8 and gives the New Testament its name."] },
      islam: { role: NOT_QURAN, text: ["Muslim histories count Irmiya among the prophets of the Israelites. Some commentators identify him with the man in Qur'an 2:259 who passed a ruined town, died for a hundred years and was raised again; others say this was Uzayr (Ezra)."] },
    },
    refs: ['Book of Jeremiah; Lamentations'],
    places: [
      { name: 'Anathoth', at: [31.81, 35.26], country: 'ps', kind: 'born', step: 1, note: 'His home village (1:1).' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', step: 2, note: 'Witnessed the destruction of the city.' },
      { name: 'Tahpanhes, Egypt', at: [30.86, 32.04], country: 'eg', kind: 'died', step: 3, note: 'Last place he is recorded (Jeremiah 43).' },
    ],
    related: ['ezekiel', 'habakkuk'],
  },
  {
    id: 'obadiah',
    names: [['Christianity', 'Obadiah'], ['Judaism', 'Ovadyah']],
    scripts: [['he', 'עבדיה'], ['el', 'Αβδιού']],
    era: '6th century BCE',
    lead: "Obadiah wrote the shortest book of the Hebrew Bible, a single chapter of 21 verses, condemning the kingdom of Edom for gloating over Jerusalem's fall and joining in its plunder.",
    life: [
      "Nothing is known of his life. His name means “servant of the Lord”. Some scholars have suggested he is the figure the Qur'an calls Dhu al-Kifl.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Obadiah is one of the Twelve."] },
      christianity: { role: 'Prophet', text: ["Christians read Obadiah among the Minor Prophets."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Obadiah'],
    places: [
      { name: 'Edom', at: [30.6, 35.6], country: 'jo', kind: 'life', note: 'The kingdom his prophecy is addressed to.' },
    ],
    related: ['dhulkifl'],
  },
  {
    id: 'ezekiel',
    names: [['Christianity', 'Ezekiel'], ['Judaism', 'Yehezkel'], ['Islam', 'Hizqil']],
    scripts: [['he', 'יחזקאל'], ['el', 'Ιεζεκιήλ'], ['ar', 'حزقيال']],
    era: '6th century BCE',
    identity: 'Some Muslim scholars identify Ezekiel with Dhu al-Kifl.',
    lead: "Ezekiel was a priest deported to Babylonia in 597 BCE, where he prophesied among the exiles. His book is full of extraordinary visions: God's throne-chariot, the valley of dry bones and a rebuilt temple.",
    life: [
      "By the Chebar canal near Nippur, Ezekiel saw a vision of four living creatures and wheels within wheels bearing God's glory. He acted out the coming siege of Jerusalem and, after the city fell, preached hope. In the valley of dry bones he saw bones come together and live again, a picture of Israel's restoration.",
    ],
    miracles: [
      'The vision of dry bones brought to life (Ezekiel 37).',
    ],
    views: {
      judaism: { role: 'Prophet', text: ["Ezekiel's vision of the chariot (merkavah) inspired a whole tradition of Jewish mysticism. Jews venerated his tomb at al-Kifl in Iraq for centuries."] },
      christianity: { role: 'Prophet', text: ["The four living creatures of Ezekiel 1 reappear in Revelation 4 and became symbols of the four evangelists."] },
      islam: { role: NOT_QURAN, text: ["Muslim commentators link Qur'an 2:243, about people who fled their homes, died and were brought back to life, with Hizqil. The shrine at al-Kifl is honoured by Muslims as Dhu al-Kifl."] },
    },
    refs: ['Book of Ezekiel'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'born', step: 1, note: 'A priest of the Temple before the exile.' },
      { name: 'Chebar canal, near Nippur', at: [32.13, 45.23], country: 'iq', kind: 'life', step: 2, note: 'Where he received his visions.' },
      { name: 'Al-Kifl', at: [32.227, 44.37], country: 'iq', kind: 'died', trad: true, note: 'Traditional tomb.' },
    ],
    related: ['dhulkifl', 'jeremiah', 'daniel'],
  },
  {
    id: 'daniel',
    names: [['Christianity', 'Daniel'], ['Judaism', 'Daniyyel'], ['Islam', 'Danyal']],
    scripts: [['he', 'דניאל'], ['el', 'Δανιήλ'], ['ar', 'دانيال']],
    era: '6th century BCE (setting)',
    lead: "Daniel was a young Judean taken to Babylon who rose to high office at the courts of Babylonian and Persian kings. He is known for interpreting dreams, for surviving the lions' den and for apocalyptic visions of empires and the end of days. Judaism and Christianity differ on whether he is a prophet.",
    life: [
      "Daniel and his three friends were trained for royal service in Babylon and kept the Jewish dietary laws. Daniel interpreted Nebuchadnezzar's dream of a statue of four metals and read the writing on the wall at Belshazzar's feast. Under Darius the Mede he kept praying to God despite a ban and was thrown to the lions, but was unharmed.",
    ],
    miracles: [
      'Unharmed in the lions’ den (Daniel 6).',
      'Interpreting the king’s dream without being told it (Daniel 2).',
    ],
    views: {
      judaism: { role: 'Visionary (not counted among the Prophets)', text: ["The Book of Daniel is placed among the Ketuvim (Writings), not the Prophets. Daniel is honoured as a righteous visionary."] },
      christianity: { role: 'Prophet', text: ["Christianity counts Daniel among the major prophets. Jesus speaks of “Daniel the prophet” (Matthew 24:15), and “Son of Man” in Daniel 7:13 is a title Jesus uses of himself."] },
      islam: { role: NOT_QURAN, text: ["Danyal is honoured in Muslim tradition, and a tomb at Shush (ancient Susa) in Iran is one of the country's best-known shrines, visited by Muslims and Jews."] },
    },
    refs: ['Book of Daniel'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'born', step: 1, note: 'Taken from Judah as a youth.' },
      { name: 'Babylon', at: [32.54, 44.42], country: 'iq', kind: 'life', step: 2, note: 'Served at the royal court.' },
      { name: 'Susa (Shush)', at: [32.19, 48.26], country: 'ir', kind: 'died', trad: true, step: 3, note: 'Tomb of Daniel.' },
    ],
    related: ['ezekiel', 'ezra'],
  },
  {
    id: 'haggai',
    names: [['Christianity', 'Haggai'], ['Judaism', 'Haggai']],
    scripts: [['he', 'חגי'], ['el', 'Αγγαίος']],
    era: '520 BCE',
    lead: "Haggai prophesied in Jerusalem after the return from exile. In a few months of 520 BCE he urged the governor Zerubbabel and the high priest Joshua to stop delaying and rebuild the Temple.",
    life: [
      "Haggai told the returned exiles that their poor harvests came from neglecting God's house while they built their own panelled houses. Work on the Second Temple resumed, and it was completed in 516 BCE.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Haggai is one of the Twelve and one of the last prophets of the Hebrew Bible."] },
      christianity: { role: 'Prophet', text: ["Hebrews 12:26 quotes Haggai's promise that God will “shake the heavens and the earth”."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Haggai; Ezra 5:1'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Called for the Second Temple to be built.' },
    ],
    related: ['zechariah', 'ezra'],
  },
  {
    id: 'zechariah',
    names: [['Christianity', 'Zechariah'], ['Judaism', 'Zekharyah']],
    scripts: [['he', 'זכריה'], ['el', 'Ζαχαρίας']],
    era: '520–518 BCE',
    identity: 'Not the same person as Zakariyya, the father of John the Baptist.',
    lead: "Zechariah, a contemporary of Haggai, encouraged the rebuilding of the Temple with a series of night visions. The second half of his book looks ahead to a coming king and is quoted often in the New Testament.",
    life: [
      "His visions include horsemen patrolling the earth, a golden lampstand between two olive trees and a flying scroll. Later chapters picture a humble king entering Jerusalem on a donkey.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Zechariah is one of the Twelve. His verse “On that day the Lord will be one and his name one” (14:9) closes the daily Aleinu prayer."] },
      christianity: { role: 'Prophet', text: ["The Gospels see Zechariah 9:9, the king on a donkey, fulfilled in Jesus' entry into Jerusalem (Matthew 21:5)."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Zechariah'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Prophesied among the returned exiles.' },
    ],
    related: ['haggai', 'malachi', 'zakariyya'],
  },
  {
    id: 'malachi',
    names: [['Christianity', 'Malachi'], ['Judaism', 'Malakhi']],
    scripts: [['he', 'מלאכי'], ['el', 'Μαλαχίας']],
    era: '5th century BCE',
    lead: "Malachi, whose name means “my messenger”, is the last of the Twelve and the last book of the Christian Old Testament. He rebuked careless priests and broken marriages, and promised that God would send Elijah before the great day of the Lord.",
    life: [
      "Nothing is known of Malachi's life; some think the name is a title rather than a personal name. His book is set out as a series of disputes between God and the people.",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Prophet', text: ["Malachi closes the Nevi'im. His promise of Elijah's return (3:23–24 in Hebrew Bibles) is why Elijah is awaited at the Passover table."] },
      christianity: { role: 'Prophet', text: ["The Gospels identify the messenger of Malachi 3:1 with John the Baptist (Mark 1:2)."] },
      islam: { role: NOT_QURAN, text: [] },
    },
    refs: ['Book of Malachi'],
    places: [
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', note: 'Addressed the restored community.' },
    ],
    related: ['zechariah', 'ilyas', 'yahya'],
  },
  {
    id: 'ezra',
    names: [['Christianity', 'Ezra'], ['Judaism', 'Ezra'], ['Islam', 'Uzayr']],
    scripts: [['he', 'עזרא'], ['el', 'Έσδρας'], ['ar', 'عزير']],
    era: '5th century BCE',
    lead: "Ezra was a priest and scribe “skilled in the law of Moses” who led a group of exiles back from Babylon to Jerusalem and read the Torah aloud to the people. Judaism remembers him as the restorer of the Torah. The Qur'an mentions him once, as Uzayr.",
    life: [
      "With the authority of the Persian king Artaxerxes, Ezra travelled from Babylon to Jerusalem to teach and enforce the law. He gathered the people at the Water Gate, read the Torah from morning to midday and had it explained to them (Nehemiah 8).",
    ],
    miracles: [],
    views: {
      judaism: { role: 'Scribe and leader', text: ["Ezra is honoured as a second Moses who re-established the Torah after the exile. He is not usually counted among the prophets."] },
      christianity: { role: 'Priest and scribe', text: ["Christians read the books of Ezra and Nehemiah as the history of the return from exile."] },
      islam: { role: 'Named in the Qur’an; status debated', text: ["Qur'an 9:30 mentions Uzayr in criticising a claim that he was the son of God. Muslim scholars differ on whether he was a prophet, and some link him with the man raised after a hundred years in 2:259. A shrine at al-Uzayr on the Tigris in southern Iraq is honoured as his tomb."] },
    },
    refs: ['Ezra 7–10; Nehemiah 8', "Qur'an 9:30; 2:259 (as interpreted)"],
    places: [
      { name: 'Babylon', at: [32.54, 44.42], country: 'iq', kind: 'born', step: 1, note: 'Grew up among the exiles.' },
      { name: 'Jerusalem', at: JLM, country: ['il', 'ps'], kind: 'life', step: 2, note: 'Read the Torah to the people.' },
      { name: 'Al-Uzayr', at: [31.33, 47.43], country: 'iq', kind: 'died', trad: true, note: 'Traditional tomb by the Tigris.' },
    ],
    related: ['daniel', 'haggai'],
  },
];
