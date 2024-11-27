const MAX_INPUT_LENGTH = 15; // Maksimal karakter yang diizinkan

// Function to append value to display
function appendToDisplay(value) {
    const result = document.getElementById('result');
    const currentValue = result.value;

    if (currentValue.length >= MAX_INPUT_LENGTH) {
        alert('Maksimal karakter tercapai!');
        return;
    }

    if (['+', '-', '*', '/', '%'].includes(value) && currentValue === '') {
        alert('Operator tidak dapat ditempatkan di awal!');
        return;
    }

    if (
        ['+', '-', '*', '/', '%'].includes(value) &&
        ['+', '-', '*', '/', '%'].includes(currentValue.slice(-1))
    ) {
        alert('Dua operator tidak dapat berturut-turut!');
        return;
    }

    result.value += value;
}

// Function to clear the display
function clearDisplay() {
    const result = document.getElementById('result');
    result.value = '';
}

// Function to delete the last character
function deleteLast() {
    const result = document.getElementById('result');
    result.value = result.value.slice(0, -1);
}

// Function to calculate the result
function calculateResult() {
    const result = document.getElementById('result');

    if (result.value.trim() === '') {
        alert('Masukkan operasi matematika yang valid!');
        return;
    }

    if (isInvalidExpression(result.value)) {
        alert('Ekspresi matematika tidak valid!');
        return;
    }

    try {
        const calculation = result.value;
        const evaluated = evaluateExpression(result.value);

        result.value = evaluated;
    } catch (error) {
        alert('Kesalahan saat melakukan perhitungan!');
        result.value = '';
    }
}

// Function to check if the expression is invalid
function isInvalidExpression(expression) {
    const invalidPattern = /[+\-*/]$/; // Check if there's an operator at the end
    return invalidPattern.test(expression);
}

// Function to evaluate expressions with operator precedence
function evaluateExpression(expression) {
    return new Function(`return ${expression}`)(); // Evaluate the mathematical expression
}

// Function to toggle positive/negative sign
function toggleSign() {
    const result = document.getElementById('result');
    if (result.value === '' || isNaN(result.value)) {
        alert('Masukkan angka yang valid!');
        return;
    }
    result.value = parseFloat(result.value) * -1; // Toggle sign
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if ((event.key >= '0' && event.key <= '9') || ['+', '-', '*', '/', '%'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === '.') {
        appendToDisplay('.');
    }
});
