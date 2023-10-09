const outputPass = document.querySelector('.output-pass');
const passOptions = document.querySelectorAll('.option');
const genBtn = document.querySelector('.generate-btn');
const rangeBtn = document.querySelector('.range-btn');
const rangeValue = document.querySelector('.range-value');
const securityLevel = document.querySelector('.pass-security');
const copyBtn = document.getElementById('copy-btn');
const tooltip = document.querySelector('.tooltip');
const optionLabels = document.querySelectorAll('.option-label');
const errorMsg = document.getElementById('error-msg');

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

const maxRange = {
    ONE_OPTION: 26,
    TWO_OPTIONS: 32
}

const mandatoryOptions = ['lowerCase', 'upperCase'];
const otherOptions = ['numbers', 'symbols', 'exclude', 'include'];

const handleOptions = () => {
    handleMaxRange();
    passOptions.forEach(option => {
        option.addEventListener('click', () => {
            handleMaxRange();
            rangeValue.innerHTML = rangeBtn.value;
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

const updateRangeValue = () => {
    rangeValue.innerHTML = rangeBtn.value;
    rangeBtn.addEventListener('input', () => {
        rangeValue.innerHTML = rangeBtn.value;
        generatePassword(rangeBtn.value);
        handleSecurityLevel(outputPass.value);
    })
}

const getRandomChar = (charSet) => {
    return charSet[Math.floor(Math.random() * charSet.length)];
}

const getUserOptions = () => {
    return Array.from(passOptions).filter(option => option.checked).map(option => option.name);
}

const getMandatoryOptions = () => {
    return Array.from(passOptions).filter(option => option.checked && mandatoryOptions.includes(option.name)).map(option => option.name);
}

const disableOptions = (disable) => {
    if(disable) {
        outputPass.value = '';
        errorMsg.classList.add('show')
        optionLabels.forEach(label => {
                label.classList.add('disabled')
            })
        passOptions.forEach(option => {
            if(otherOptions.includes(option.name)) {
                option.disabled = true;
            }
        })
    } else {
        errorMsg.classList.remove('show')
        optionLabels.forEach(label => {
            label.classList.remove('disabled')
        })
        passOptions.forEach(option => {
            if(otherOptions.includes(option.name)) {
                option.disabled = false;
            }
        })
    }
}

const handleError = () => {
    if(getMandatoryOptions().length === 0) {
        disableOptions(true);
        return false;
    }
    else{
        disableOptions(false);
        return true;
    }
}

const handleMaxRange = () => {
    if(getMandatoryOptions().length <= 1){
        rangeBtn.max = maxRange.ONE_OPTION;
    }
    else{
        rangeBtn.max = maxRange.TWO_OPTIONS;
    }
}


const generatePassword = (length) => {
    let password = '';
    let selectedCharSet = getUserOptions().map(option => charSet[option]).join('');
    const excludeDuplicates = getUserOptions().includes(userOptions.EXCLUDE_DUPLICATES);
    const includeSpaces = getUserOptions().includes(userOptions.INCLUDE_SPACES);

    if(!handleError()) {
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