const bcrypt = require("bcryptjs");
const prisma = require("../src/models/prisma");

const password1 = bcrypt.hashSync("admin01");
const password2 = bcrypt.hashSync("admin02");
const password3 = bcrypt.hashSync("admin03");
const password4 = bcrypt.hashSync("admin04");

const userData = [
  { username: "admin01", password: password1, email: "admin01@admin.com", isAdmin: true },
  { username: "admin02", password: password2, email: "admin02@admin.com", isAdmin: true },
  { username: "admin03", password: password3, email: "admin03@admin.com", isAdmin: true },
  { username: "admin04", password: password4, email: "admin04@admin.com", isAdmin: true },
];

const topicData = [
  { topicName: "Mathematics" },
  { topicName: "Coding" },
  { topicName: "English" },
  { topicName: "Sports" },
  { topicName: "Science" },
  { topicName: "Manga" },
  { topicName: "Movie" },
  { topicName: "Geography" },
  { topicName: "Music" },
  { topicName: "Common" }
]
// topic 1 Math
const mathQuestion = [
  {
    question: "What number makes this number sentence true? 4 x 3 = _____ x 4",
    choice1: "4",
    choice2: "3",
    choice3: "5",
    choice4: "2",
    answer: "B",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: `Spiders are a type of arachnid. Arachnids normally have 8 legs. How many legs on 3 spiders?`,
    choice1: "32",
    choice2: "26",
    choice3: "24",
    choice4: "40",
    answer: "C",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: "What number makes this number sentence true? 4 x 3 = _____ x 4",
    choice1: "4",
    choice2: "3",
    choice3: "5",
    choice4: "2",
    answer: "B",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: "Which number is an example of a square number?",
    choice1: "7",
    choice2: "8",
    choice3: "9",
    choice4: "10",
    answer: "C",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: "What three numbers complete this pattern? 9, 12, 15, 18, ........",
    choice1: "19,23,25",
    choice2: "21,25,27,30",
    choice3: "20,22,24",
    choice4: "21,24,27",
    answer: "D",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: "What is the area of a playground that measures 20 ft by 40 ft?",
    choice1: "60 sq ft",
    choice2: "800 sq ft",
    choice3: "80 sq ft",
    choice4: "120 sq ft",
    answer: "B",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    questionPicture: "https://images-cdn.kahoot.it/e1761f04-f28a-4a2f-b5ee-8d00139c422c?auto=webp&width=1000",
    question: "Find the answer",
    choice1: "100",
    choice2: "20",
    choice3: "400",
    choice4: "40",
    answer: "D",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    question: "A jumbo jet is traveling at a speed of 520 mph. How far will the jet travel in 4 hours?",
    choice1: "1,940 miles",
    choice2: "2,000 miles",
    choice3: "2,040 miles",
    choice4: "2,080 miles",
    answer: "D",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    questionPicture: "https://images-cdn.kahoot.it/b0772a9a-aa70-45a7-89a6-d5e1bea1c395?auto=webp&width=1000",
    question: "How many sides does a cube have?",
    choice1: "4",
    choice2: "6",
    choice3: "8",
    choice4: "10",
    answer: "B",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
  {
    questionPicture: "https://images-cdn.kahoot.it/fd1ad34b-0b68-433c-99ac-6b29aa7d9917?auto=webp&width=1000",
    question: "If Jordan eats 1/6 of a pizza and her brother eats 1/2, how much is left?",
    choice1: "1/4",
    choice2: "2/6 or 1/3",
    choice3: "3/6 or 1/2",
    choice4: "1/6",
    answer: "B",
    isPublic: false,
    topicId: 1,
    creatorId: 1,
  },
];
// topic 2 Code
const codeQuestion = [
  {
    question: "What is programming language for C language?",
    choice1: "low level language",
    choice2: "mid level language",
    choice3: "high level language",
    choice4: "boss level language2",
    answer: "C",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: `let a = "1"
let b = 2
let c = a + b
What is result of c ?`,
    choice1: "12",
    choice2: "3",
    choice3: "undefined",
    choice4: "NaN",
    answer: "A",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: `const result = "" || 100

What is result?`,
    choice1: "TRUE",
    choice2: "FALSE",
    choice3: `"100"`,
    choice4: "100",
    answer: "D",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "What is command to create new branch in git",
    choice1: "git remote",
    choice2: "git checkout -b branch-name",
    choice3: "git init",
    choice4: "git stash",
    answer: "B",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "What is command to copy project on remote to local computer",
    choice1: "git add",
    choice2: "git push",
    choice3: "git clone",
    choice4: "git pull",
    answer: "C",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "What is the correct to create hyperlink in HTML",
    choice1: `<a rel="https://google.co.th">Google</a>`,
    choice2: `<a src="https://google.co.th">Google</a>`,
    choice3: `<a href="https://google.co.th">Google</a>`,
    choice4: `<a to="https://google.co.th">Google</a>`,
    answer: "C",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "Which HTML Element is create list that have number?",
    choice1: "<nl>",
    choice2: "<li>",
    choice3: "<ul>",
    choice4: "<ol>",
    answer: "D",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "How to comment code in file CSS",
    choice1: "//comment",
    choice2: "{/*comment*/}",
    choice3: "/*comment*/",
    choice4: "<!-- comment -->",
    answer: "C",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "Which library do not use in create react app",
    choice1: "ReactDom",
    choice2: "jQuery",
    choice3: "React",
    choice4: "webpack",
    answer: "B",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
  {
    question: "Which compiler that React use to compile jsx",
    choice1: "barbel",
    choice2: "webpack",
    choice3: "ReactDom",
    choice4: "No correct answer",
    answer: "A",
    isPublic: false,
    topicId: 2,
    creatorId: 1,
  },
];
// topic 3 English
const englishQuestion = [
  {
    question: "Which sentence is grammatically correct?",
    choice1: " He don't like pizza.",
    choice2: "He doesn't like pizza.",
    choice3: "He doesn't likes pizza.",
    choice4: "He don't likes pizza.",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: ` Choose the correct form of the verb to complete the sentence: "She _____ to the store every Saturday."`,
    choice1: "go",
    choice2: "goes",
    choice3: "going",
    choice4: "gone",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: `Which sentence uses the correct past tense?`,
    choice1: "I runned to the park.",
    choice2: "I ran to the park.",
    choice3: ` I run to the park.`,
    choice4: "I run to the park yesterday.",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: `Select the correct word to complete the sentence: "They _____ their homework every day."`,
    choice1: "do",
    choice2: "does",
    choice3: "doing",
    choice4: "done",
    answer: "A",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: " Identify the grammatically correct sentence.",
    choice1: "She can sings well.",
    choice2: " She can sing well.",
    choice3: "She cans sing well.",
    choice4: "She can to sing well.",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: `Choose the correct article to complete the sentence: "_____ apple a day keeps the doctor away."`,
    choice1: `A`,
    choice2: `An`,
    choice3: `The`,
    choice4: `No article needed`,
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: "Which sentence is correct?",
    choice1: "There is some books on the table.",
    choice2: "There are some books on the table.",
    choice3: "There is some book on the table.",
    choice4: "There are some book on the table.",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: `Choose the correct form of the adjective: "This is the _____ movie I have ever seen."`,
    choice1: " bad",
    choice2: "worse",
    choice3: "worst",
    choice4: "badder",
    answer: "C",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: " Identify the sentence with correct subject-verb agreement.",
    choice1: "The dogs barks loudly.",
    choice2: "The dogs bark loudly.",
    choice3: "The dog bark loudly.",
    choice4: "The dog barking loudly",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
  {
    question: `Choose the correct pronoun to complete the sentence: "Maria and _____ went to the market."`,
    choice1: "me",
    choice2: "I",
    choice3: "mine",
    choice4: "myself",
    answer: "B",
    isPublic: false,
    topicId: 3,
    creatorId: 1,
  },
];
// topic 4 Sports
const sportsQuestion = [
  {
    question: `Which sport is known as "the beautiful game"?`,
    choice1: " Basketball",
    choice2: "Soccer",
    choice3: "Tennis",
    choice4: "Baseball",
    answer: "B",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `In which sport would you perform a slam dunk?`,
    choice1: "Volleyball",
    choice2: "Tennis",
    choice3: "Basketball",
    choice4: "Rugby",
    answer: "C",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `Which country is known for originating the sport of cricket?`,
    choice1: "Australia",
    choice2: "India",
    choice3: `South Africa`,
    choice4: "England",
    answer: "D",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `Rugby football was origin in which country?`,
    choice1: "USA",
    choice2: "England",
    choice3: "New Zealand",
    choice4: "Australia",
    answer: "B",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: "Who is the champion in FIFA world CUP 2022?",
    choice1: "France",
    choice2: "Croatia",
    choice3: "Morocco",
    choice4: "Argentina",
    answer: "D",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `Which city is the origin of rugby football?`,
    choice1: `Los Angeles, USA`,
    choice2: `London,England`,
    choice3: `Rugby,England`,
    choice4: `New York, USA`,
    answer: "C",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: "Basketball is play with 5 players per team",
    choice1: "TRUE",
    choice2: "FALSE",
    answer: "A",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `The winner in golf is the player who have a highest score?`,
    choice1: " TRUE",
    choice2: "FALSE",
    answer: "B",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    questionPicture: "https://contents.mediadecathlon.com/p2158565/k$b2bb0c6e7474c838760d9e5e5f44fff3/squash-racket-power-105-perfly-8583108.jpg",
    question: "Which sport use this racquet?",
    choice1: "Squash",
    choice2: "Fives",
    choice3: "Racquetball",
    choice4: "Tennis",
    answer: "A",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
  {
    question: `Olympic in 2024 is in Paris ?`,
    choice1: "TRUE",
    choice2: "FALSE",
    answer: "A",
    isPublic: false,
    topicId: 4,
    creatorId: 1,
  },
];
// topic 5 Movie
const sciecneQuestion = [
  {
    question: `Who perform this equation?`,
    questionPicture: `https://st2.depositphotos.com/2110015/10379/v/450/depositphotos_103793594-stock-illustration-mass-energy-equivalence.jpg`,
    choice1: "Albert Einstein",
    choice2: "Thomas Alva Edison",
    choice3: "Sir Issac Newton",
    choice4: "Nikola Tesla",
    answer: "A",
    isPublic: false,
    topicId: 5,
    creatorId: 1,
  },
  {
    question: `Who found gravity?`,
    choice1: "Albert Einstein",
    choice2: "Thomas Alva Edison",
    choice3: "Sir Issac Newton",
    choice4: "Nikola Tesla",
    answer: "C",
    isPublic: false,
    topicId: 5,
    creatorId: 1,
  },
  {
    question: `Who was developed light blub?`,
    choice1: "Albert Einstein",
    choice2: "Thomas Alva Edison",
    choice3: "Sir Issac Newton",
    choice4: "Nikola Tesla",
    answer: "B",
    isPublic: false,
    topicId: 5,
    creatorId: 1,
  },
  {
    question: `Who was develeoped AC Current?`,
    choice1: "Albert Einstein",
    choice2: "Thomas Alva Edison",
    choice3: "Sir Issac Newton",
    choice4: "Nikola Tesla",
    answer: "D",
    isPublic: false,
    topicId: 5,
    creatorId: 1,
  },
];
// topic 6 Manga
const mangaQuestion = [
  {
    question: `ใครคือผู้แต่งมังงะเรื่อง "Naruto"?`,
    choice1: "อาคิระ โทริยามะ (Akira Toriyama)",
    choice2: "มาซาชิ คิชิโมโตะ (Masashi Kishimoto)",
    choice3: "เออิจิโร โอดะ (Eiichiro Oda)",
    choice4: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)",
    answer: "B",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `ในมังงะ "One Piece" โกล ดี โรเจอร์ เป็นที่รู้จักในฐานะอะไร?`,
    choice1: "ราชาแห่งโจรสลัด (Pirate King)",
    choice2: "ผู้เป็นอมตะ (The Immortal)",
    choice3: "นักล่าวิญญาณ (Soul Reaper)",
    choice4: "อัศวินผู้กล้า (Brave Knight)",
    answer: "A",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `มังงะเรื่อง "Attack on Titan" สร้างสรรค์โดยใคร?`,
    choice1: "ฮาจิเมะ อิซายามะ (Hajime Isayama)",
    choice2: "เคน อากาโมโตะ (Ken Akamatsu)",
    choice3: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)",
    choice4: "ซุย อิชิดะ (Sui Ishida)",
    answer: "A",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `มังงะเรื่อง "Death Note" ใครเป็นผู้ถือสมุดบันทึกแห่งความตายคนแรกที่ปรากฏในเรื่อง?
`,
    choice1: "เอล (L)",
    choice2: "ไลท์ ยางามิ (Light Yagami)",
    choice3: "มิสะ อามาเนะ (Misa Amane)",
    choice4: "นีอา (Near)",
    answer: "B",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `มังงะเรื่อง "Dragon Ball" ดราก้อนบอลมีกี่ลูกเมื่อรวบรวมครบจะสามารถขอพรได้?`,
    choice1: "5 ลูก",
    choice2: "6 ลูก",
    choice3: "7 ลูก",
    choice4: "8 ลูก",
    answer: "C",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `ใครคือผู้แต่งมังงะเรื่อง "Fullmetal Alchemist"?`,
    choice1: "อาคิระ โทริยามะ (Akira Toriyama)",
    choice2: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)",
    choice3: "มาซาชิ คิชิโมโตะ (Masashi Kishimoto)",
    choice4: "ทาเคชิ โอบาตะ (Takeshi Obata)",
    answer: "B",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `มังงะเรื่อง "My Hero Academia" ฮีโร่หมายเลขหนึ่งที่เป็นครูของมิโดริยะ อิซึคุ คือใคร?`,
    choice1: "เอ็นเดเวอร์ (Endeavor)",
    choice2: "ออลไมท์ (All Might)",
    choice3: "พรีเซนท์ไมค์ (Present Mic)",
    choice4: "เออิจิโร โอดะ (Eiichiro Oda)",
    answer: "B",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `ใครคือผู้สร้างมังงะเรื่อง "Tokyo Ghoul"?`,
    choice1: " อายะ อาซาโนะ (Aya Asano)",
    choice2: "เคน อากาโมโตะ (Ken Akamatsu)",
    choice3: "ฮาจิเมะ อิซายามะ (Hajime Isayama)",
    choice4: "ซุย อิชิดะ (Sui Ishida)",
    answer: "D",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
  {
    question: `มังงะเรื่อง "One Punch Man" ใครเป็นผู้วาดภาพประกอบ?`,
    choice1: "อาคิระ โทริยามะ (Akira Toriyama)",
    choice2: "ยูสุเกะ มูราตะ (Yusuke Murata)",
    choice3: "ทาเคชิ โอบาตะ (Takeshi Obata)",
    choice4: "เออิจิโร โอดะ (Eiichiro Oda)",
    answer: "B",
    isPublic: false,
    topicId: 6,
    creatorId: 1,
  },
];
// topic 7 Movie
const movieQuestion = [
  {
    question: `Avengers: Infinity War
How many possibilities that Dr.Strange see to fight with Tanos?`,
    questionPicture: `https://static1.srcdn.com/wordpress/wp-content/uploads/2019/03/Doctor-Strange-seeing-the-future-in-Avengers-Infinity-War.jpg`,
    choice1: "14000605",
    choice2: "1",
    choice3: "3000",
    choice4: "14605000",
    answer: "A",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Avengers: End Game
What does Iron Man said?`,
    questionPicture: `https://images.indianexpress.com/2022/03/robert-downey-jr-1200.jpg?w=414`,
    choice1: "Hale Hydra",
    choice2: "I am Iron Man",
    choice3: "I love you 3000",
    choice4: "Take the stairs, HATE stairs!!",
    answer: "B",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Fast and Furious
Which charactor that Paul Walker act?`,
    choice1: "Roman Pearce",
    choice2: "Domic Toretto",
    choice3: "Luke Hobbs",
    choice4: "Brian O'Corner",
    answer: "D",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Harry Potter
What is the spell to lift things?`,
    choice1: "Alohomora",
    choice2: "Stupefy ",
    choice3: "Wingardium Leviosa",
    choice4: "Expecto patronum",
    answer: "C",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Harry Potter
How many Horcrux that Lord Voldemort created? `,
    choice1: "5",
    choice2: "6",
    choice3: "7",
    choice4: "10",
    answer: "C",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Conjuring 2
Where was the case that happened in Conjuring 2?`,
    choice1: "England",
    choice2: "USA",
    choice3: "Romania",
    choice4: "Canada",
    answer: "A",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
  {
    question: `Inside out
What color of Sadness`,
    choice1: "Yellow",
    choice2: "Green",
    choice3: "Red",
    choice4: "Blue",
    answer: "D",
    isPublic: false,
    topicId: 7,
    creatorId: 1,
  },
];
// topic 8 Geography
const geographyQuestion = [
  {
    question: `What is the biggest country ?`,
    choice1: "Russia",
    choice2: "China",
    choice3: "India",
    choice4: "Canada",
    answer: "A",
    isPublic: false,
    topicId: 8,
    creatorId: 1,
  },
  {
    question: `Which state in U.S.A have border only 1 state?`,
    choice1: "Hawaii",
    choice2: "Alaska",
    choice3: "Maine",
    choice4: "Florida",
    answer: "C",
    isPublic: false,
    topicId: 8,
    creatorId: 1,
  },
  {
    question: `Where is Angel Waterfall?`,
    questionPicture: `https://upload.wikimedia.org/wikipedia/commons/e/e9/SaltoAngel1.jpg`,
    choice1: "Brazil",
    choice2: "Columbia",
    choice3: "Venezuela",
    choice4: "Argentina",
    answer: "C",
    isPublic: false,
    topicId: 8,
    creatorId: 1,
  },
  {
    question: `The biggest ocean is Pacific Ocean ? `,
    choice1: "TRUE",
    choice2: "FALSE",
    answer: "A",
    isPublic: false,
    topicId: 8,
    creatorId: 1,
  },
];
// topic 9 Music
const musicQuestion = [
  {
    question: `Which song is in Album "Plus" from "Ed Sheeran" ?`,
    choice1: "Bad Habits",
    choice2: "Shape of You",
    choice3: "LegoHouse",
    choice4: "Thinking out loud",
    answer: "C",
    isPublic: false,
    topicId: 9,
    creatorId: 1,
  },
  {
    question: `Which song is in Album "Multiply" from "Ed Sheeran" ?`,
    choice1: "Bad Habits",
    choice2: "Shape of You",
    choice3: "LegoHouse",
    choice4: "Thinking out loud",
    answer: "D",
    isPublic: false,
    topicId: 9,
    creatorId: 1,
  },
  {
    question: `Which song is in Album "Devided" from "Ed Sheeran" ?`,
    choice1: "Bad Habits",
    choice2: "Shape of You",
    choice3: "LegoHouse",
    choice4: "Thinking out loud",
    answer: "B",
    isPublic: false,
    topicId: 9,
    creatorId: 1,
  },
  {
    question: `Which song is in Album "Equal" from "Ed Sheeran" ?`,
    choice1: "Bad Habits",
    choice2: "Shape of You",
    choice3: "LegoHouse",
    choice4: "Thinking out loud",
    answer: "A",
    isPublic: false,
    topicId: 9,
    creatorId: 1,
  },
  {
    question: `Which song is in Album "Substract" from "Ed Sheeran" ?`,
    choice1: "Bad Habits",
    choice2: "Shape of You",
    choice3: "Boat",
    choice4: "Thinking out loud",
    answer: "C",
    isPublic: false,
    topicId: 9,
    creatorId: 1,
  },
];
// topic 10 Common
const commonQuestion = [
  {
    question: `What is Capital City of Australia?`,
    choice1: "Canberra",
    choice2: "Ottawa",
    choice3: "Oslo",
    choice4: "Jakarta",
    answer: "A",
    isPublic: false,
    topicId: 10,
    creatorId: 1,
  },
  {
    question: `What is Capital City of Indonesia?`,
    choice1: "Canberra",
    choice2: "Ottawa",
    choice3: "Oslo",
    choice4: "Jakarta",
    answer: "D",
    isPublic: false,
    topicId: 10,
    creatorId: 1,
  },
  {
    question: `What is Capital City of Canada?`,
    choice1: "Canberra",
    choice2: "Ottawa",
    choice3: "Oslo",
    choice4: "Jakarta",
    answer: "B",
    isPublic: false,
    topicId: 10,
    creatorId: 1,
  },
  {
    question: `What is Capital City of Norway?`,
    choice1: "Canberra",
    choice2: "Ottawa",
    choice3: "Oslo",
    choice4: "Jakarta",
    answer: "C",
    isPublic: false,
    topicId: 10,
    creatorId: 1,
  },
];

const eventList = [
  { eventName: "Mathematics Question?", description: "Basic Math question", eventImage: "", topicId: 1, timeLimit: 30, creatorId: 1 },
  { eventName: "Code Question?", description: "Basic Code question", eventImage: "", topicId: 2, timeLimit: 30, creatorId: 1 },
  { eventName: "English Question?", description: "Basic English question", eventImage: "", topicId: 3, timeLimit: 30, creatorId: 1 },
  { eventName: "Sports Question?", description: "Basic Sports question", eventImage: "", topicId: 4, timeLimit: 30, creatorId: 1 },
  { eventName: "Manga Question?", description: "Basic Manga question", eventImage: "", topicId: 5, timeLimit: 30, creatorId: 1 },
  { eventName: "Movie Question?", description: "Basic Movie question", eventImage: "", topicId: 6, timeLimit: 30, creatorId: 1 },
  { eventName: "Science Question?", description: "Basic Science question", eventImage: "", topicId: 7, timeLimit: 30, creatorId: 1 },
  { eventName: "Geography Question?", description: "Basic Geography question", eventImage: "", topicId: 8, timeLimit: 30, creatorId: 1 },
  { eventName: "Music Question?", description: "Basic Music question", eventImage: "", topicId: 9, timeLimit: 30, creatorId: 1 },
  { eventName: "Common Question?", description: "Basic Common question", eventImage: "", topicId: 10, timeLimit: 30, creatorId: 1 },
];

const assignList = [
  { eventId: 1, questionId: 1, order: 1 },
  { eventId: 1, questionId: 2, order: 2 },
  { eventId: 1, questionId: 3, order: 3 },
  { eventId: 1, questionId: 4, order: 4 },
  { eventId: 1, questionId: 5, order: 5 },
  { eventId: 1, questionId: 6, order: 6 },
  { eventId: 1, questionId: 7, order: 7 },
  { eventId: 1, questionId: 8, order: 8 },
  { eventId: 1, questionId: 9, order: 9 },
  { eventId: 1, questionId: 10, order: 10 },

  { eventId: 2, questionId: 11, order: 1 },
  { eventId: 2, questionId: 12, order: 2 },
  { eventId: 2, questionId: 13, order: 3 },
  { eventId: 2, questionId: 14, order: 4 },
  { eventId: 2, questionId: 15, order: 5 },
  { eventId: 2, questionId: 16, order: 6 },
  { eventId: 2, questionId: 17, order: 7 },
  { eventId: 2, questionId: 18, order: 8 },
  { eventId: 2, questionId: 19, order: 9 },
  { eventId: 2, questionId: 20, order: 10 },

  { eventId: 3, questionId: 21, order: 1 },
  { eventId: 3, questionId: 22, order: 2 },
  { eventId: 3, questionId: 23, order: 3 },
  { eventId: 3, questionId: 24, order: 4 },
  { eventId: 3, questionId: 25, order: 5 },
  { eventId: 3, questionId: 26, order: 6 },
  { eventId: 3, questionId: 27, order: 7 },
  { eventId: 3, questionId: 28, order: 8 },
  { eventId: 3, questionId: 29, order: 9 },
  { eventId: 3, questionId: 30, order: 10 },

  { eventId: 4, questionId: 31, order: 1 },
  { eventId: 4, questionId: 32, order: 2 },
  { eventId: 4, questionId: 33, order: 3 },
  { eventId: 4, questionId: 34, order: 4 },
  { eventId: 4, questionId: 35, order: 5 },
  { eventId: 4, questionId: 36, order: 6 },
  { eventId: 4, questionId: 37, order: 7 },
  { eventId: 4, questionId: 38, order: 8 },
  { eventId: 4, questionId: 39, order: 9 },
  { eventId: 4, questionId: 40, order: 10 },

  { eventId: 5, questionId: 57, order: 1 },
  { eventId: 5, questionId: 58, order: 2 },
  { eventId: 5, questionId: 59, order: 3 },
  { eventId: 5, questionId: 60, order: 4 },

  { eventId: 6, questionId: 41, order: 1 },
  { eventId: 6, questionId: 42, order: 2 },
  { eventId: 6, questionId: 43, order: 3 },
  { eventId: 6, questionId: 44, order: 4 },
  { eventId: 6, questionId: 45, order: 5 },
  { eventId: 6, questionId: 46, order: 6 },
  { eventId: 6, questionId: 47, order: 7 },
  { eventId: 6, questionId: 48, order: 8 },
  { eventId: 6, questionId: 49, order: 9 },

  { eventId: 7, questionId: 50, order: 1 },
  { eventId: 7, questionId: 51, order: 2 },
  { eventId: 7, questionId: 52, order: 3 },
  { eventId: 7, questionId: 53, order: 4 },
  { eventId: 7, questionId: 54, order: 5 },
  { eventId: 7, questionId: 55, order: 6 },
  { eventId: 7, questionId: 56, order: 7 },

  { eventId: 8, questionId: 61, order: 1 },
  { eventId: 8, questionId: 62, order: 2 },
  { eventId: 8, questionId: 63, order: 3 },
  { eventId: 8, questionId: 64, order: 4 },

  { eventId: 9, questionId: 65, order: 1 },
  { eventId: 9, questionId: 66, order: 2 },
  { eventId: 9, questionId: 67, order: 3 },
  { eventId: 9, questionId: 68, order: 4 },
  { eventId: 9, questionId: 69, order: 5 },

  { eventId: 10, questionId: 70, order: 1 },
  { eventId: 10, questionId: 71, order: 2 },
  { eventId: 10, questionId: 72, order: 3 },
  { eventId: 10, questionId: 73, order: 4 },
];


const heroData = [
  {
    title: "We are Hahoot !", detail: `The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated steel divider separates active cards from new ones, or can be used to archive important task lists.`,
    quiz1: 1, quiz2: 21, quiz3: 31, quiz4: 41, isActive: true
  },
  {
    title: "Hahoot Maths Days!", detail: `The National Mathematics Day is celebrated on 22nd December to celebrate the birthday of eminent mathematician Srinivasa Ramanujan. It was designated by the Indian Government in 2011. Despite his lack of formal education, Ramanujan is noted as one of the greatest mathematicians of all time. `,
    quiz1: 1, quiz2: 2, quiz3: 3, quiz4: 4, isActive: false
  },
  {
    title: "We are Develophoot !", detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a vestibulum dolor. Donec luctus neque ac odio vehicula, in congue enim volutpat. Nulla facilisi. Mauris eget ipsum ut urna feugiat lacinia ut sed metus. Vestibulum in feugiat erat. Nulla id tincidunt risus, et vestibulum est. Integer auctor velit nec urna malesuada, sed bibendum lacus suscipit. Morbi in rutrum tellus. Sed maximus rhoncus dolor quis viverra. Maecenas auctor rutrum pharetra. Ut sagittis nisl vel purus mattis gravida. Vestibulum imperdiet auctor nisl ut viverra. Quisque vulputate augue tristique, lacinia dui a, posuere purus. Nunc et quam ac leo congue dapibus. Donec aliquam sapien quis interdum hendrerit.`,
    quiz1: 11, quiz2: 12, quiz3: 13, quiz4: 14, isActive: false
  },
  {
    title: "We are Englishoot !", detail: `School is a vital part of our lives. It serves as a starting point for our general growth in addition to being a place to acquire reading and writing skills. It helps us learn about the world and moulds our personalities. It's the perfect starting point for our understanding of the real world. Schools are academic institutions where students are taught about various knowledge aspects. As a student, we are often told to write an essay or present a speech at my school. Speech on my school requires you to write some basic details and features of your school, how your life at school was or is, things you have learned there and what was the best part of your school life. Below we have discussed a 1-minute speech on my school for students with a paragraph and some lines that you can add to your speech on my school.`,
    quiz1: 21, quiz2: 22, quiz3: 23, quiz4: 24, isActive: false
  },
  {
    title: "Hahoot Sport's Day !", detail: `Germany coach Julian Nagelsmann says Spain's Lamine Yamal is a "talented" and "fun" player - but questioned whether the teenager can cope with the demands of a high stakes Euro 2024 quarter-final.

The 16-year-old winger has provided two assists for Spain so far, just the third teenager on record (since 1980) to provide multiple assists in the competition after Enzo Scifo (1984) and Cristiano Ronaldo (2004).`,
    quiz1: 31, quiz2: 32, quiz3: 33, quiz4: 34, isActive: false
  },
  {
    title: "We are ScienceHoot !", detail: `Peace cannot be kept by force; it can only be achieved by understanding.

Albert Einstein`,
    quiz1: 57, quiz2: 58, quiz3: 59, quiz4: 60, isActive: false
  },
  {
    title: "We are Anime fans !", detail: `“The strong should aid and protect the weak. Then, the weak will become strong, and they in turn will aid and protect those weaker than them. That is the law of nature.”—Tanjiro Kamado, Demon Slayer
`,
    quiz1: 41, quiz2: 42, quiz3: 43, quiz4: 44, isActive: false,
    eventPicture: 'https://www.linearity.io/blog/content/images/2024/02/Quote-4.png'
  },
  {
    title: "Hahoot in Cinema !", detail: `Peace cannot be kept by force; it can only be achieved by understanding.

Albert Einstein`,
    quiz1: 50, quiz2: 52, quiz3: 53, quiz4: 56, isActive: false
  },
  {
    title: "Hahoot around the Worlds !", detail: `New Zealand's flora and fauna differs from every other large land-mass on earth due to its long isolation and uniqueness as a (near) mammal-free environment. The isolated species living here were affected dramatically around 800 years ago, when humans from Polynesia settled in New Zealand. Not long afterwards the first Europeans arrived and both, with the help of introduced pests, began to deplete species around them and clear vast tracts of land. They brought with them a multitude of mammalian pests. Still chewing the life out of our New Zealand bush, these pests are bringing about a grim ending to an almost inconceivably long history of unique and beautiful life.

This trend continued into the early 1990's, when Wellington was in a biologically poor state with native flora and fauna in danger of local extinction and very little happening on the ground other than small-scale planting schemes. Drastic measures needed to be taken to ensure the survival of our species.

ref: https://www.visitzealandia.com/About`,
    quiz1: 61, quiz2: 62, quiz3: 63, quiz4: 64, isActive: false
  },
  {
    title: "Ed Sheeran VS Hooter", detail: `"Everything will be okay in the end. If it's not okay, then it's not the end."
― Ed Sheeran`,
    quiz1: 65, quiz2: 66, quiz3: 67, quiz4: 68, isActive: false
  },
]

const run = async () => {
  await prisma.user.createMany({ data: userData });
  await prisma.topic.createMany({ data: topicData });
  await prisma.question.createMany({ data: mathQuestion });
  await prisma.question.createMany({ data: codeQuestion });
  await prisma.question.createMany({ data: englishQuestion });
  await prisma.question.createMany({ data: sportsQuestion });
  await prisma.question.createMany({ data: mangaQuestion });
  await prisma.question.createMany({ data: movieQuestion });
  await prisma.question.createMany({ data: sciecneQuestion });
  await prisma.question.createMany({ data: geographyQuestion });
  await prisma.question.createMany({ data: musicQuestion });
  await prisma.question.createMany({ data: commonQuestion });
  await prisma.event.createMany({ data: eventList });
  await prisma.assignOfBridge.createMany({ data: assignList });
  await prisma.hero.createMany({ data: heroData });

};

const runadmin = async () => {
  await prisma.user.createMany({ data: userData });
};
const runQuestion = async () => {
  // await prisma.question.createMany({ data: mathQuestion })
  // await prisma.question.createMany({ data: codeQuestion })
  // await prisma.question.createMany({ data: englishQuestion })
  // await prisma.question.createMany({ data: sportsQuestion })
  // await prisma.question.createMany({ data: mangaQuestion })
  // await prisma.question.createMany({ data: movieQuestion })
  // await prisma.question.createMany({ data: sciecneQuestion })
  // await prisma.question.createMany({ data: geographyQuestion })
  // await prisma.question.createMany({ data: musicQuestion })
  // await prisma.question.createMany({ data: commonQuestion })
};

const runEvent = async () => {
  await prisma.event.createMany({ data: eventList });
};

const runAssign = async () => {
  await prisma.assignOfBridge.createMany({ data: assignList });
};

const runHero = async () => {
  await prisma.hero.createMany({ data: heroData });
};
// run();
// runadmin()
// runQuestion()
// runEvent()
// runAssign()
// runHero()
