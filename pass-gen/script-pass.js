const outputPass = document.querySelector('.output-pass');
const passOptions = document.querySelectorAll('.option');
const genBtn = document.querySelector('.generate-btn');
const rangeBtn = document.querySelector('.range-btn');
const rangeValue = document.querySelector('.range-value');
const securityLevel = document.querySelector('.pass-security');
const copyBtn = document.getElementById('copy-btn');
const tooltip = document.querySelector('.tooltip');

const charSet = {
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,./<>?'
}

const userOptions = {
    EXCLUDE_DUPLICATES: 'exclude',
    INCLUDE_SPACES: 'include'
}

const userSecurityLevel = {
    LOW: 12,
    MEDIUM: 22
}

const handleOptions = () => {
    passOptions.forEach(option => {
        option.addEventListener('click', () => {
            generatePassword(rangeBtn.value);
        })
    })
}

const copyPassword = (element) => {
    const copyBtnText = element.innerHTML;
    navigator.clipboard.writeText(outputPass.value);

    element.innerHTML = 'Done';
    tooltip.classList.toggle('tooltip-clicked');
    setTimeout(() => {
        element.innerHTML = copyBtnText;
        tooltip.classList.toggle('tooltip-clicked');
    }, 1000);      
}

const handleCopyBtn = () => {
    copyBtn.addEventListener('click', () => {
        copyPassword(copyBtn);
    })
}

const handleSecurityLevel = (password) => {
    if(password.length <= userSecurityLevel.LOW) {
        securityLevel.classList.replace(securityLevel.classList[1], 'low');
    } else if(password.length <= userSecurityLevel.MEDIUM) {
        securityLevel.classList.replace(securityLevel.classList[1], 'medium');
    } else {
        securityLevel.classList.replace(securityLevel.classList[1], 'high');
    }
}

const checkOptions = () => {
    return Array.from(passOptions).some(option => option.checked);
}

const updateRangeValue = () => {
    rangeValue.innerHTML = rangeBtn.value;
    rangeBtn.addEventListener('input', () => {
        rangeValue.innerHTML = rangeBtn.value;
        generatePassword(rangeBtn.value);
        handleSecurityLevel(outputPass.value);
    })
}

const excludeDuplicates = (password) => {

}

const getRandomChar = (charSet) => {
    return charSet[Math.floor(Math.random() * charSet.length)];
}

const getUserOptions = () => {
    return Array.from(passOptions).filter(option => option.checked).map(option => option.name);
}

// TODO: Fix bug where app is blocked when exclude duplicates is checked
const generatePassword = (length) => {
    let password = '';
    let selectedCharSet = getUserOptions().map(option => charSet[option]).join('');
    const excludeDuplicates = getUserOptions().includes(userOptions.EXCLUDE_DUPLICATES);
    const includeSpaces = getUserOptions().includes(userOptions.INCLUDE_SPACES);
    
    if(!checkOptions()) {
        outputPass.value = '';
        return;
    }

    for(let i = 0; i < length; i++) {
        let newChar = getRandomChar(selectedCharSet);
        if (excludeDuplicates) {
            while (password.includes(newChar)) {
                newChar = getRandomChar(selectedCharSet);
            }
        }
        if (includeSpaces) {
            if (Math.random() < 0.1) {
                newChar = ' ';
            }
        }
        password += newChar;

    }
    outputPass.value = password;
}

updateRangeValue();
handleOptions();
handleCopyBtn();
genBtn.addEventListener('click', () => {
    generatePassword(rangeBtn.value);
})