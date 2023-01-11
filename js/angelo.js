// const fadeDiv = document.querySelector('.fade')

// function delay(n) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, n * 1000);
//     });
// }

// async function blink(keyframeName, seconds) {
//     fadeDiv.style.animation = `${keyframeName} ${seconds}s 1 forwards`;

//     await delay(1)
// }

// async function introBlink() {
//     await delay(1)
//     await blink('openingFade', 1)
//     await blink('closingFade', 1)
//     await blink('openingFade', .5)
// }

// introBlink()

function home() {  
    location.href = "../index.html";  
    }   
function play() {  
    location.href = "pages/game.html";  
    }  
function credits() {  
    location.href = "pages/credits.html";  
    } 


