const paragraphs = ["Where there is a will,there is way.Awake arise and stop not until your goal is not achieved. Study Study Your rank is ready.Success is not a ladder,it's a staircase.you have to climb up one step at a time.",
"Life is like a camera,focus on what's important,capture the good time,develop from negatives, and if things don't work out take onather shot.Never study to be successful,study for self efficiency.Don't run behind success.Follow behind excellence,success will come all way behind you",
"We learned something about human behaviour that day.If your friend fails,you feel bad.But your friend comes in first you feel worse.Remember life is a race.if you don't run fast,someone will overtake you by crushing you",
"These engineers are very clever.No such machines has been mad which can measure the pressure of brain.Do something that you have talent for.If Lata Mangeshkar's father told  her to become a fast bowler.Or sachin Tendulkar's father told him to be a singer",
"Some great man has said,study to be capable,not to be successful.But you be whatever your heart tells you to.And if he scares you too much Keep a hand over your heart and say,AAL IZZ WELL.I love machines.Engineering is my passion.Don't be afraid of future.Focus on today"
];

const typingText = document.querySelector((".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".timeLeft span b"),
    errorTag = document.querySelector(".errors span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"));

let timer, maxTime = 60, timeLeft = maxTime,
    charIndex = errors = isTyping = 0;

function loadParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
   typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex <= characters.length - 1 && timeLeft > 0) {
        if (!isTyping){
            timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    if (typedChar == null) {
        if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    errors--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                errors++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span =>
            span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round(((charIndex - errors) / paragraphs.length) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        errorTag.innerText = errors;
        cpmTag.innerText = charIndex - errors;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - errors) / paragraphs.length) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetTest() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = 0;
    charIndex = errors = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpm.innerText = "3";
    errorTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTest);