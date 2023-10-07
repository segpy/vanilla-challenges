const countBtn = document.querySelector('#count-btn');
const spanCount = document.querySelector('#span-count');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}


const count = (handleElement, element) => {
    const setCounter = (count) => {
        element.innerHTML = `${count}`;
    }
    handleElement.addEventListener('click', () => setCounter(parseInt(element.innerHTML) + 1));
}
count(countBtn, spanCount);

const generatePassword = (length, chars) => {
    let password = "";
    console.log('chars: ', chars);
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;

}

console.log(generatePassword(10, characters.lowercase + characters.uppercase + characters.numbers + characters.symbols));