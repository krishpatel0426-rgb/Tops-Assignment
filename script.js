// function convertCurrency() {
//     let amount = document.getElementById("amount").value;
//     let from = document.getElementById("fromCurrency").value;
//     let to = document.getElementById("toCurrency").value;

    
//     const rates = {
//         USD: 1,
//         INR: 90.24,
//         EUR: 104.72,
//         GBP: 0.78,
//         JPY: 148,
//         BTC: 0.000016,
//         ETH: 0.00025
//     };

//     if (amount === "" || amount <= 0) {
//         document.getElementById("result").innerHTML = "Please enter a valid amount";
//         return;
//     }

//     let usdAmount = amount / rates[from];
//     let convertedAmount = usdAmount * rates[to];

//     document.getElementById("result").innerHTML =
//         `${amount} ${from} = ${convertedAmount.toFixed(6)} ${to}`;
// }







const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Free public API
const currencyAPI = "https://open.er-api.com/v6/latest/USD";

// Load all currencies
fetch(currencyAPI)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    });

function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (amount === "" || amount <= 0) {
        result.innerHTML = "❌ Enter a valid amount";
        return;
    }

    fetch(`https://open.er-api.com/v6/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            let rate = data.rates[to];
            let converted = (amount * rate).toFixed(4);
            result.innerHTML = `✅ ${amount} ${from} = ${converted} ${to}`;
        })
        .catch(() => {
            result.innerHTML = "⚠️ Error fetching exchange rates";
        });
}
