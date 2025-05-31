let baseUrl = "https://v6.exchangerate-api.com/v6/7e005f1fa426267edeeff169/latest/";
let dropdowns = document.querySelectorAll(".dropdown select");


for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(code==="USD" && select.name ==="from") newOption.selected = "selected";
        if(code==="INR" && select.name ==="to") newOption.selected = "selected";
        select.append(newOption);
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })
}

function updateFlag(event){
    let code = event.value;
    let currencyCode = countryList[code];

    let newSrc = `https://flagsapi.com/${currencyCode}/flat/64.png`;

    let loc = `.${event.name} img`;
    document.querySelector(loc).src = newSrc;
}

let btn = document.querySelector("button");
let message = document.querySelector(".message");

btn.addEventListener("click",update);

async function update(e){
    // stop the form reloading
    e.preventDefault();

    console.log("getting data .......");

    let amount = document.querySelector(".amount input");
    let val = amount.value;
    if(val ==="" || val <= "0"){
        val = 1;
        amount.value = 1;
    }
    
    let from = document.querySelector(".from select");
    let fromCountryCode = from.value;

    let to = document.querySelector(".to select");
    let toCountryCode = to.value;

    // getting data
    let response = await fetch(`${baseUrl}${fromCountryCode}`);
    let data = await response.json();
    
    let conversion_rates = data.conversion_rates;

    let exchangerate = conversion_rates[toCountryCode];

    let finalVal = val*exchangerate;
    let text = `${val} ${fromCountryCode} = ${finalVal} ${toCountryCode}`;

    message.innerText = text;
    
}