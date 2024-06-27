const bcrypt = require('bcryptjs')
const prisma = require("../src/models/prisma");

const password1 = bcrypt.hashSync('admin01')
const password2 = bcrypt.hashSync('admin02')
const password3 = bcrypt.hashSync('admin03')
const password4 = bcrypt.hashSync('admin04')
const userData = [
    { username: "admin01", password: password1, email: "admin01@admin.com", isAdmin: true },
    { username: "admin02", password: password2, email: "admin02@admin.com", isAdmin: true },
    { username: "admin03", password: password3, email: "admin03@admin.com", isAdmin: true },
    { username: "admin04", password: password4, email: "admin04@admin.com", isAdmin: true },
]

const topicData = [
    { topicName: "Mathematis" },
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
        choice1: "4", choice2: "3", choice3: "5", choice4: "2", answer: "B", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: `Spiders are a type of arachnid. Arachnids normally have 8 legs. How many legs on 3 spiders?`,
        choice1: "32", choice2: "26", choice3: "24", choice4: "40", answer: "C", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: "What number makes this number sentence true? 4 x 3 = _____ x 4",
        choice1: "4", choice2: "3", choice3: "5", choice4: "2", answer: "B", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: "Which number is an example of a square number?",
        choice1: "7", choice2: "8", choice3: "9", choice4: "10", answer: "C", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: "What three numbers complete this pattern? 9, 12, 15, 18, ........",
        choice1: "19,23,25", choice2: "21,25,27,30", choice3: "20,22,24", choice4: "21,24,27", answer: "D", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: "What is the area of a playground that measures 20 ft by 40 ft?",
        choice1: "60 sq ft", choice2: "800 sq ft", choice3: "80 sq ft", choice4: "120 sq ft", answer: "B", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        questionPicture: "https://images-cdn.kahoot.it/e1761f04-f28a-4a2f-b5ee-8d00139c422c?auto=webp&width=1000", question: "Find the answer",
        choice1: "100", choice2: "20", choice3: "400", choice4: "40", answer: "D", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        question: "A jumbo jet is traveling at a speed of 520 mph. How far will the jet travel in 4 hours?",
        choice1: "1,940 miles", choice2: "2,000 miles", choice3: "2,040 miles", choice4: "2,080 miles", answer: "D", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        questionPicture: "https://images-cdn.kahoot.it/b0772a9a-aa70-45a7-89a6-d5e1bea1c395?auto=webp&width=1000", question: "How many sides does a cube have?",
        choice1: "4", choice2: "6", choice3: "8", choice4: "10", answer: "B", isPublic: false, topicId: 1, creatorId: 1
    },
    {
        questionPicture: "https://images-cdn.kahoot.it/fd1ad34b-0b68-433c-99ac-6b29aa7d9917?auto=webp&width=1000", question: "If Jordan eats 1/6 of a pizza and her brother eats 1/2, how much is left?",
        choice1: "1/4", choice2: "2/6 or 1/3", choice3: "3/6 or 1/2", choice4: "1/6", answer: "B", isPublic: false, topicId: 1, creatorId: 1
    },
]
// topic 2 Code
const codeQuestion = [
    {
        question: "What is programming language for C language?",
        choice1: "low level language", choice2: "mid level language", choice3: "high level language", choice4: "boss level language2", answer: "C", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: `let a = "1"
let b = 2
let c = a + b
What is result of c ?`,
        choice1: "12", choice2: "3", choice3: "undefined", choice4: "NaN", answer: "A", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: `const result = "" || 100

What is result?`,
        choice1: "TRUE", choice2: "FALSE", choice3: `"100"`, choice4: "100", answer: "D", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "What is command to create new branch in git",
        choice1: "git remote", choice2: "git checkout -b branch-name", choice3: "git init", choice4: "git stash", answer: "B", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "What is command to copy project on remote to local computer",
        choice1: "git add", choice2: "git push", choice3: "git clone", choice4: "git pull", answer: "C", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "What is the correct to create hyperlink in HTML",
        choice1: `<a rel="https://google.co.th">Google</a>`, choice2: `<a src="https://google.co.th">Google</a>`, choice3: `<a href="https://google.co.th">Google</a>`, choice4: `<a to="https://google.co.th">Google</a>`, answer: "C", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "Which HTML Element is create list that have number?",
        choice1: "<nl>", choice2: "<li>", choice3: "<ul>", choice4: "<ol>", answer: "D", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "How to comment code in file CSS",
        choice1: "//comment", choice2: "{/*comment*/}", choice3: "/*comment*/", choice4: "<!-- comment -->", answer: "C", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "Which library do not use in create react app",
        choice1: "ReactDom", choice2: "jQuery", choice3: "React", choice4: "webpack", answer: "B", isPublic: false, topicId: 2, creatorId: 1
    },
    {
        question: "Which compiler that React use to compile jsx",
        choice1: "barbel", choice2: "webpack", choice3: "ReactDom", choice4: "No correct answer", answer: "A", isPublic: false, topicId: 2, creatorId: 1
    },
]
// topic 3 English
const englishQuestion = [
    {
        question: "Which sentence is grammatically correct?",
        choice1: " He don't like pizza.", choice2: "He doesn't like pizza.", choice3: "He doesn't likes pizza.", choice4: "He don't likes pizza.", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: ` Choose the correct form of the verb to complete the sentence: "She _____ to the store every Saturday."`,
        choice1: "go", choice2: "goes", choice3: "going", choice4: "gone", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: `Which sentence uses the correct past tense?`,
        choice1: "I runned to the park.", choice2: "I ran to the park.", choice3: ` I run to the park.`, choice4: "I run to the park yesterday.", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: `Select the correct word to complete the sentence: "They _____ their homework every day."`,
        choice1: "do", choice2: "does", choice3: "doing", choice4: "done", answer: "A", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: " Identify the grammatically correct sentence.",
        choice1: "She can sings well.", choice2: " She can sing well.", choice3: "She cans sing well.", choice4: "She can to sing well.", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: `Choose the correct article to complete the sentence: "_____ apple a day keeps the doctor away."`,
        choice1: `A`, choice2: `An`, choice3: `The`, choice4: `No article needed`, answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: "Which sentence is correct?",
        choice1: "There is some books on the table.", choice2: "There are some books on the table.", choice3: "There is some book on the table.", choice4: "There are some book on the table.", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: `Choose the correct form of the adjective: "This is the _____ movie I have ever seen."`,
        choice1: " bad", choice2: "worse", choice3: "worst", choice4: "badder", answer: "C", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: " Identify the sentence with correct subject-verb agreement.",
        choice1: "The dogs barks loudly.", choice2: "The dogs bark loudly.", choice3: "The dog bark loudly.", choice4: "The dog barking loudly", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
    {
        question: `Choose the correct pronoun to complete the sentence: "Maria and _____ went to the market."`,
        choice1: "me", choice2: "I", choice3: "mine", choice4: "myself", answer: "B", isPublic: false, topicId: 3, creatorId: 1
    },
]
// topic 4 Sports
const sportsQuestion = [
    {
        question: `Which sport is known as "the beautiful game"?`,
        choice1: " Basketball", choice2: "Soccer", choice3: "Tennis", choice4: "Baseball", answer: "B", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `In which sport would you perform a slam dunk?`,
        choice1: "Volleyball", choice2: "Tennis", choice3: "Basketball", choice4: "Rugby", answer: "C", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `Which country is known for originating the sport of cricket?`,
        choice1: "Australia", choice2: "India", choice3: `South Africa`, choice4: "England", answer: "D", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `Rugby football was origin in which country?`,
        choice1: "USA", choice2: "England", choice3: "New Zealand", choice4: "Australia", answer: "B", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: "Who is the champion in FIFA world CUP 2022?",
        choice1: "France", choice2: "Croatia", choice3: "Morocco", choice4: "Argentina", answer: "D", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `Which city is the origin of rugby football?`,
        choice1: `Los Angeles, USA`, choice2: `London,England`, choice3: `Rugby,England`, choice4: `New York, USA`, answer: "C", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: "Basketball is play with 5 players per team",
        choice1: "TRUE", choice2: "FALSE", answer: "A", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `The winner in golf is the player who have a highest score?`,
        choice1: " TRUE", choice2: "FALSE", answer: "B", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        questionPicture: "https://contents.mediadecathlon.com/p2158565/k$b2bb0c6e7474c838760d9e5e5f44fff3/squash-racket-power-105-perfly-8583108.jpg", question: "Which sport use this racquet?",
        choice1: "Squash", choice2: "Fives", choice3: "Racquetball", choice4: "Tennis", answer: "A", isPublic: false, topicId: 4, creatorId: 1
    },
    {
        question: `Olympic in 2024 is in Paris ?`,
        choice1: "TRUE", choice2: "FALSE", answer: "A", isPublic: false, topicId: 4, creatorId: 1
    },
]

// topic 6 Manga
const mangaQuestion = [
    {
        question: `ใครคือผู้แต่งมังงะเรื่อง "Naruto"?`,
        choice1: "อาคิระ โทริยามะ (Akira Toriyama)", choice2: "มาซาชิ คิชิโมโตะ (Masashi Kishimoto)", choice3: "เออิจิโร โอดะ (Eiichiro Oda)", choice4: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)", answer: "B", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `ในมังงะ "One Piece" โกล ดี โรเจอร์ เป็นที่รู้จักในฐานะอะไร?`,
        choice1: "ราชาแห่งโจรสลัด (Pirate King)", choice2: "ผู้เป็นอมตะ (The Immortal)", choice3: "นักล่าวิญญาณ (Soul Reaper)", choice4: "อัศวินผู้กล้า (Brave Knight)", answer: "A", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `มังงะเรื่อง "Attack on Titan" สร้างสรรค์โดยใคร?`,
        choice1: "ฮาจิเมะ อิซายามะ (Hajime Isayama)", choice2: "เคน อากาโมโตะ (Ken Akamatsu)", choice3: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)", choice4: "ซุย อิชิดะ (Sui Ishida)", answer: "A", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `มังงะเรื่อง "Death Note" ใครเป็นผู้ถือสมุดบันทึกแห่งความตายคนแรกที่ปรากฏในเรื่อง?
`,
        choice1: "เอล (L)", choice2: "ไลท์ ยางามิ (Light Yagami)", choice3: "มิสะ อามาเนะ (Misa Amane)", choice4: "นีอา (Near)", answer: "B", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `มังงะเรื่อง "Dragon Ball" ดราก้อนบอลมีกี่ลูกเมื่อรวบรวมครบจะสามารถขอพรได้?`,
        choice1: "5 ลูก", choice2: "6 ลูก", choice3: "7 ลูก", choice4: "8 ลูก", answer: "C", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `ใครคือผู้แต่งมังงะเรื่อง "Fullmetal Alchemist"?`,
        choice1: "อาคิระ โทริยามะ (Akira Toriyama)", choice2: "ฮิโรมุ อาราคาวะ (Hiromu Arakawa)", choice3: "มาซาชิ คิชิโมโตะ (Masashi Kishimoto)", choice4: "ทาเคชิ โอบาตะ (Takeshi Obata)", answer: "B", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `มังงะเรื่อง "My Hero Academia" ฮีโร่หมายเลขหนึ่งที่เป็นครูของมิโดริยะ อิซึคุ คือใคร?`,
        choice1: "เอ็นเดเวอร์ (Endeavor)", choice2: "ออลไมท์ (All Might)", choice3: "พรีเซนท์ไมค์ (Present Mic)", choice4: "เออิจิโร โอดะ (Eiichiro Oda)", answer: "B", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `ใครคือผู้สร้างมังงะเรื่อง "Tokyo Ghoul"?`,
        choice1: " อายะ อาซาโนะ (Aya Asano)", choice2: "เคน อากาโมโตะ (Ken Akamatsu)", choice3: "ฮาจิเมะ อิซายามะ (Hajime Isayama)", choice4: "ซุย อิชิดะ (Sui Ishida)", answer: "D", isPublic: false, topicId: 6, creatorId: 1
    },
    {
        question: `มังงะเรื่อง "One Punch Man" ใครเป็นผู้วาดภาพประกอบ?`,
        choice1: "อาคิระ โทริยามะ (Akira Toriyama)", choice2: "ยูสุเกะ มูราตะ (Yusuke Murata)", choice3: "ทาเคชิ โอบาตะ (Takeshi Obata)", choice4: "เออิจิโร โอดะ (Eiichiro Oda)", answer: "B", isPublic: false, topicId: 6, creatorId: 1
    },
]


const run = async () => {
    await prisma.user.createMany({ data: userData })
    await prisma.topic.createMany({ data: topicData })
    await prisma.question.createMany({ data: mathQuestion })
    await prisma.question.createMany({ data: codeQuestion })
    await prisma.question.createMany({ data: englishQuestion })
    await prisma.question.createMany({ data: sportsQuestion })
    await prisma.question.createMany({ data: mangaQuestion })

}

// run()

const runadmin = async () => {
    await prisma.user.createMany({ data: userData })
}
const runQuestion = async () => {
    // await prisma.question.createMany({ data: mathQuestion })
    // await prisma.question.createMany({ data: codeQuestion })
    // await prisma.question.createMany({ data: englishQuestion })
    // await prisma.question.createMany({ data: sportsQuestion })
    await prisma.question.createMany({ data: mangaQuestion })
}

// runadmin()
runQuestion()