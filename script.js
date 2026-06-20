const display = document.getElementById('display');

function appendValue(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

function calculatePercentage() {
    if (display.value.trim() === "") return;
    try {
        let currentVal = eval(display.value);
        display.value = currentVal / 100;
    } catch (error) {
        display.value = "Error";
    }
}

function calculateSquareRoot() {
    if (display.value.trim() === "") return;
    try {
        let currentVal = eval(display.value);
        if (currentVal < 0) {
            display.value = "Error";
        } else {
            display.value = Math.sqrt(currentVal);
        }
    } catch (error) {
        display.value = "Error";
    }
}

function calculate() {
    if (display.value.trim() === "") return;
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

/* Theme Toggle */
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

/* Keyboard Support */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    let targetKeyId = `key-${key}`;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === '%') {
        calculatePercentage();
    } else if (key === '^') {
        appendValue('**');
    } else if (key.toLowerCase() === 'r') {
        calculateSquareRoot();
        targetKeyId = 'key-r';
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else {
        return; 
    }

    const buttonElement = document.getElementById(targetKeyId);
    if (buttonElement) {
        buttonElement.classList.add('active-key');
    }
});

document.addEventListener('keyup', function(event) {
    let targetKeyId = `key-${event.key}`;
    if (event.key.toLowerCase() === 'r') targetKeyId = 'key-r';
    
    const buttonElement = document.getElementById(targetKeyId);
    if (buttonElement) {
        buttonElement.classList.remove('active-key');
    }
});
