const select = document.querySelectorAll('.currency');
const btnConvert = document.getElementById('convert');
const initialValue = document.getElementById('initialValue');
const resultValue = document.getElementById('resultValue');

fetch("https://api.frankfurter.app/currencies")
    .then(res => {
        return res.json()
    })
    .then(body => {
        showData(body);
    });

function showData(data) {
    const symbols = Object.entries(data);
    console.log(symbols)
    for (let i = 0; i < symbols.length; i++) {
        select[0].innerHTML += `<option value="${symbols[i][0]}">${symbols[i][0]}</option>`;
        select[1].innerHTML += `<option value="${symbols[i][0]}">${symbols[i][0]}</option>`;
    }
}

btnConvert.addEventListener("click", () => {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = initialValue.value;

    if (currency1 != currency2) {
        convert(currency1, currency2, value);
    } else {
        setTimeout(() => {
            const alert = document.getElementById('alert');
            alert.style.opacity = '1';
            if (alert.style.opacity == '1') {
                setTimeout(() => {
                    alert.style.opacity = '0';
                }, 1500)
            }
        })
    }
});

function convert(initialCurrency, resultCurrency, value) {
    fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${initialCurrency}&to=${resultCurrency}`)
        .then(res => {
            return res.json()
        })
        .then(body => {
            resultValue.value = Object.values(body.rates)[0].toFixed(2);
        });
}
