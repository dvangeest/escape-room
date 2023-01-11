const fadeDiv = document.querySelector('.fade');
const textBox = document.querySelector('.textBox');
const nameTag = document.querySelector('.nameTag');
const redButton = document.querySelector('.redButton');
const displayScreen = document.querySelector('.displayScreen');
const displayVideo = document.querySelector('.displayVideo');
const game1 = document.querySelector('.game1');
const colors = document.querySelector('.colors');
const information = document.querySelector('.information');
const numberAnswer = document.querySelector('.numberAnswer');
const submitButton = document.querySelector('.submit');
const livesElement = document.querySelector('.lives');
const livesAmount = document.querySelector('.livesText');

const game2 = document.querySelector('.game2');
const game3 = document.querySelector('.game3');
const submitGame3 = document.querySelector('.submitGame3');
const numberAnswerGame3 = document.querySelector('.numberAnswerGame3');

let sceneStage = 0;
let bartenderName = '...';
let lives = 5;

livesAmount.innerHTML = lives;

game3.style.animation = "openingFade 0s 1 forwards";

const barmanDialog = [
    'Come on in. Welcome to Quindecim.',
    'null',
    'Congratulations, before we continue, do you remember anything just before you came here?',
    "Congratulations, welcome to the last game, this will determine if you're worthy of reincarnation…  I wish you my luck.",
    "Congratulations, you are free to go.",
    "Congratulations, you are free to go.",

];

const dialogs = [
    {
        'Hello? Where am I?': "I am now about to explain to you what your circumstances are. I ask that you please pay close attention. One: First of all, I cannot answer the question of where you are. Two: We will have you play a game when you're ready. Three: You have a total of 5 lives, you lose them when you make mistakes in the rooms. Four: We will have you stake your lives on the game. Five: Until the game is over, you cannot leave this bar.",
        'Hello? Who are you?': 'I am your bartender, Decim.',
        'I am ready.': 'Press this button for the roulette to start, and the game will be chosen.',
        "What if we refuse to play the game?": 'I would not recommened that.',

    },
    {
        'null': 'null'
    },
    {
        "No I don't remember, I think...": 'Very good. Thank you very much, let us proceed.',
    },
    {
        'null': 'null'
    },
    {
        'Bring it on!': '...'
    },
    {
        'null': '...'
    },
];

let questions = [
    [
        "Hello? Where am I?",
        'Hello? Who are you?',
    ],
    [
        "Let's continue"
    ],
    [
        "No I don't remember, I think..."
    ],
    [
        "null"
    ],
    [
        "Bring it on!"
    ],
];

const sceneFunctions = [
    setDialButtons,
    scene2,
    setDialButtons,
    scene3,
    setDialButtons,
    scene4,
    ending
];

const dialButtons = [
    document.querySelector('.dialButton1'),
    document.querySelector('.dialButton2'),
    document.querySelector('.dialButton3'),
    document.querySelector('.dialButton4'),
];

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

async function blink(keyframeName, seconds) {
    fadeDiv.style.animation = `${keyframeName} ${seconds}s 1 forwards`;
    await delay(1);
}

async function promptText(text, name, nextStage) {
    if (name === undefined) { name = '...'; }
    if (nextStage == true) { sceneStage += 1; }

    nameTag.innerHTML = name;
    textBox.innerHTML = '';

    displayScreen.setAttribute('src', '../images/speakingBarman.png');

    for (let i = 0; i < text.length; i++) {
        textBox.innerHTML += text.charAt(i);
        await delay(.05);
    }

    await delay(.5);

    displayScreen.setAttribute('src', '../images/barman.png');
}

function removeSpecificArrayIndex(arr, value) {
    questions[sceneStage] = arr.filter(function (item) {
        return item !== value;
    })
}

function setDialButtons(textsArray) {
    let texts = [undefined, undefined, undefined, undefined];
    if (textsArray !== undefined) {
        texts = [textsArray[0], textsArray[1], textsArray[2], textsArray[3]];
    }

    for (let i = 0; i < texts.length; i++) {
        const value = texts[i];
        const button = dialButtons[i];
        if (value === undefined) {
            button.style.display = 'none';
        } else {
            let questionsStage = questions[sceneStage];
            button.style.display = 'inline';
            button.innerHTML = value;

            button.onclick = async function () {
                setDialButtons();
                let nextStage = false;

                if (value == 'Hello? Who are you?') {
                    bartenderName = 'Decim';
                    removeSpecificArrayIndex(questionsStage, value);
                } else if (value == 'Hello? Where am I?') {
                    livesElement.style.animation = "closingFade 3s 1 forwards";;
                    questionsStage.shift();
                    questionsStage.push('I am ready.');
                    questionsStage.push("What if we refuse to play the game?");
                } else if (value == 'I am ready.') {
                    nextStage = true;

                    displayVideo.setAttribute('Autoplay', true);
                    displayVideo.setAttribute('src', '../media/buttonVideo.mp4');
                    displayVideo.style.display = 'inline';
                    displayVideo.load();
                } else if (value == "What if we refuse to play the game?") {
                    removeSpecificArrayIndex(questionsStage, value);
                    promptText('...', bartenderName, nextStage);

                    displayVideo.setAttribute('Autoplay', true);
                    displayVideo.setAttribute('src', '../media/notRecommended.mp4');
                    displayVideo.style.display = 'inline';
                    displayVideo.load();
                    await delay(11)
                    displayVideo.style.display = 'none';
                    displayVideo.setAttribute('Autoplay', false);
                } else if (value == "No I don't remember, I think...") {
                    nextStage = true;
                } else if (value == 'Bring it on!') {
                    nextStage = true;
                }

                displayScreen.setAttribute('src', '../images/speakingBarman.png');

                console.log(sceneStage, value);

                await promptText(dialogs[sceneStage][value], bartenderName, nextStage);
                displayScreen.setAttribute('src', '../images/barman.png');
                await delay(2);
                questionsStage = questions[sceneStage];
                sceneFunctions[sceneStage](questionsStage);
            }
        }
    }
}

async function scene1() {
    colors.style.animation = "openingFade 0s 1 forwards";
    information.style.animation = "openingFade 0s 1 forwards";

    displayScreen.style['-webkit-filter'] = 'blur(8px)';
    displayScreen.style.filter = 'blur(8px)';

    setDialButtons();

    displayScreen.setAttribute('src', '../images/welcome.png');

    await delay(1);
    await blink('openingFade', 2);
    await delay(.5);
    await blink('closingFade', 2);
    await delay(.5);

    displayScreen.style.animation = `removeBlur 4s 1 forwards`;

    await blink('openingFade', 1);
    await delay(2);
    await blink('closingFade', .3);

    promptText(barmanDialog[sceneStage], bartenderName);

    await delay(.1);
    await blink('openingFade', .3);
    await delay(2);
    await blink('closingFade', .3);

    blink('openingFade', .3);
    sceneFunctions[sceneStage](questions[sceneStage]);
}

function scene2() {
    const possibleColors = [
        'green',
        'red',
        'blue',
        'orange',
        'grey',
        'yellow',

        10000000000,
        100000000,
        1000000,
        10000,
        100,
        1,

        100000000000,
        2000000000,
        30000000,
        400000,
        5000,
        60,
    ];

    redButton.style.display = 'inline';

    redButton.onclick = async function () {
        redButton.onclick = null;
        redButton.style.display = 'none';

        let code = 0;
        let usedColors = {};

        for (let index = 0; index < 6; index++) {
            const randomNum = Math.floor(Math.random() * 6);
            const colorBlock = document.querySelector('.block' + index);

            colorBlock.style['background-color'] = possibleColors[randomNum];
            code += possibleColors[randomNum + 6];

            if (usedColors[possibleColors[randomNum]] !== true) {
                usedColors[possibleColors[randomNum]] = true;

                code += possibleColors[randomNum + 12];
            }
        }

        code = code.toString().replaceAll("0", "");

        console.log(code);

        textBox.style.animation = "openingFade 3s 1 forwards";
        nameTag.style.animation = "openingFade 3s 1 forwards";

        await blink('closingFade', 2);
        await delay(1);

        displayScreen.setAttribute('src', '../images/barman.png');
        displayVideo.style.display = 'none';

        colors.style.animation = "closingFade 3s 1 forwards";
        information.style.animation = "closingFade 3s 1 forwards";

        promptText('...', '...', true);

        submitButton.onclick = async function () {
            if (numberAnswer.value == code) {
                submitButton.onclick = null;
                colors.style.animation = "openingFade 3s 1 forwards";
                information.style.animation = "openingFade 3s 1 forwards";

                await blink('openingFade', 2);

                textBox.style.animation = "closingFade 3s 1 forwards";
                nameTag.style.animation = "closingFade 3s 1 forwards";

                await delay(3);
                await promptText(barmanDialog[sceneStage], bartenderName);

                questionsStage = questions[sceneStage];
                sceneFunctions[sceneStage](questionsStage);
            } else {
                lives -= 1;
                livesAmount.innerHTML = lives;

                if (lives <= 0) {
                    ending();
                }
            }
        }
    }
}

async function scene3() {
    const boardElement = document.querySelector('.board');
    boardElement.style.display = 'inline';
    boardElement.style.animation = "closingFade 3s 1 forwards";

    let rows = 3;
    let columns = 3;
    let currTile;
    let otherTile; //blank tile
    let turns = 0;
    let imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

    textBox.style.animation = "openingFade 3s 1 forwards";
    nameTag.style.animation = "openingFade 3s 1 forwards";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img class="0-0" src="1.jpg">

            let tile = document.createElement("img");

            tile.setAttribute('class', r.toString() + "-" + c.toString());
            tile.setAttribute('src', '../images/' + imgOrder.shift() + ".png");
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.querySelector('.board').append(tile);
        }
    }

    await blink('closingFade', 2)
    await delay(1)

    function dragStart() {
        currTile = this; //this refers to the img tile being dragged
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
    }

    function dragDrop() {
        otherTile = this; //this refers to the img tile being dropped on
    }

    async function dragEnd() {
        if (!otherTile.src.includes("3.png")) {
            return;
        }

        let currCoords = currTile.getAttribute('class').split("-"); //ex) "0-0" -> ["0", "0"]
        let r = parseInt(currCoords[0]);
        let c = parseInt(currCoords[1]);

        let otherCoords = otherTile.getAttribute('class').split("-");
        let r2 = parseInt(otherCoords[0]);
        let c2 = parseInt(otherCoords[1]);

        let moveLeft = r == r2 && c2 == c - 1;
        let moveRight = r == r2 && c2 == c + 1;

        let moveUp = c == c2 && r2 == r - 1;
        let moveDown = c == c2 && r2 == r + 1;

        let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

        if (isAdjacent) {
            let currImg = currTile.getAttribute('src');
            let otherImg = otherTile.getAttribute('src');

            currTile.setAttribute('src', otherImg);
            otherTile.setAttribute('src', currImg);

            turns += 1;

            document.querySelector(".turns").innerText = turns;
        }

        let zeroZero = false;
        let zeroOne = false;
        let zeroTwo = false;
        let oneZero = false;
        let oneOne = false;
        let oneTwo = false;
        let twoZero = false;
        let twoOne = false;
        let twoTwo = false;

        let children = boardElement.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.getAttribute('class') == '0-0' && child.getAttribute('src') == '../images/1.png') {
                zeroZero = true;
            }

            if (child.getAttribute('class') == '0-1' && child.getAttribute('src') == '../images/2.png') {
                zeroOne = true;
            }

            if (child.getAttribute('class') == '0-2' && child.getAttribute('src') == '../images/3.png') {
                zeroTwo = true;
            }

            if (child.getAttribute('class') == '1-0' && child.getAttribute('src') == '../images/4.png') {
                oneZero = true;
            }

            if (child.getAttribute('class') == '1-1' && child.getAttribute('src') == '../images/5.png') {
                oneOne = true;
            }

            if (child.getAttribute('class') == '1-2' && child.getAttribute('src') == '../images/6.png') {
                oneTwo = true;
            }

            if (child.getAttribute('class') == '2-0' && child.getAttribute('src') == '../images/7.png') {
                twoZero = true;
            }

            if (child.getAttribute('class') == '2-1' && child.getAttribute('src') == '../images/8.png') {
                twoOne = true;
            }

            if (child.getAttribute('class') == '2-2' && child.getAttribute('src') == '../images/9.png') {
                twoTwo = true;
            }
        }

        if (zeroZero == true && zeroOne == true && zeroTwo == true && oneZero == true && oneOne == true && oneTwo == true && twoZero == true && twoOne == true && twoZero == true && twoTwo == true) {
            boardElement.style.animation = "openingFade 3s 1 forwards";
            promptText('...', '...')
            await blink('openingFade', 2)
            textBox.style.animation = "closingFade 3s 1 forwards";
            nameTag.style.animation = "closingFade 3s 1 forwards";
            await delay(3);
            await promptText(barmanDialog[sceneStage], bartenderName, true);
            questionsStage = questions[sceneStage];
            sceneFunctions[sceneStage](questionsStage);
        }
    }
}

async function scene4() {
    textBox.style.animation = "openingFade 3s 1 forwards";
    nameTag.style.animation = "openingFade 3s 1 forwards";
    await blink('closingFade', 2);
    game1.style.display = 'none';
    game2.style.display = 'none';
    game3.style.animation = "closingFade 3s 1 forwards";

    promptText('...', '...');

    submitGame3.onclick = async function () {
        if (numberAnswerGame3.value == '6210001000') {
            game3.style.animation = "openingFade 3s 1 forwards";
            await blink('openingFade', 2);
            textBox.style.animation = "closingFade 3s 1 forwards";
            nameTag.style.animation = "closingFade 3s 1 forwards";
            await delay(2);
            await promptText(barmanDialog[sceneStage], bartenderName, true);
            questionsStage = questions[sceneStage];
            sceneFunctions[sceneStage](questionsStage);
        } else {
            lives -= 1;
            livesAmount.innerHTML = lives;
            if (lives <= 0) {
                ending();
            }
        }
    }
}

async function ending() {
    await blink('closingFade', 3);
    await delay(4);
    window.location.href = "../pages/credits.html";
}

scene1();