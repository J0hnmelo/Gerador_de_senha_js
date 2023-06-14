const inputPassword = document.querySelector("#ipassword")
const buttonCopy = document.querySelector("#copiarsenha")
const iconCopy = document.querySelector("#copy")
const iconRefresh = document.querySelector("#refresh")
const checkUppers = document.querySelector("#iMaisculas")
const checkNumbers = document.querySelector("#iNumeros")
const checkSimbol = document.querySelector("#iSimbolos")
const SecurityBar = document.querySelector("#security-indicator-bar")
const headerEl = document.querySelector("#header")
let rangeValue = document.querySelector("#ipassword-length")
let numberRange = 8


buttonCopy.addEventListener("click", copy)
iconCopy.addEventListener("click", copy)
iconRefresh.addEventListener("click",generatePassword)
checkUppers.addEventListener("click", generatePassword)
checkNumbers.addEventListener("click", generatePassword)
checkSimbol.addEventListener("click", generatePassword)

rangeValue.addEventListener("input", function() {
    numberRange = rangeValue.value
    console.log(numberRange)
    const passwordNumberLen = document.querySelector("#tamanho").innerText = numberRange
    generatePassword()
})// evento input captura a ação do input que está ali

function copy(){
    navigator.clipboard.writeText(inputPassword.value)
}//API para copiar um texto especifico de algum lugar para area de transferencia

function generatePorcent(){
    let percent = Math.round((numberRange/64)*40) + (checkNumbers.checked ? 20 : 0) + (checkSimbol.checked ? 30 : 0) + (checkUppers.checked ? 10 : 0)
    SecurityBar.style.width = `${percent}%` 

    if (percent > 69){
        SecurityBar.classList.remove("critical")
        SecurityBar.classList.remove("warning")
        SecurityBar.classList.add("safe")
        headerEl.classList.remove("critical")
        headerEl.classList.remove("warning")
        headerEl.classList.add("safe")
    } else if (percent > 39){
        SecurityBar.classList.remove("critical")
        SecurityBar.classList.add("warning")
        SecurityBar.classList.remove("safe")
        headerEl.classList.remove("critical")
        headerEl.classList.add("warning")
        headerEl.classList.remove("safe")
    } else if (percent < 39){
        SecurityBar.classList.add("critical")
        SecurityBar.classList.remove("warning")
        SecurityBar.classList.remove("safe")
        headerEl.classList.add("critical")
        headerEl.classList.remove("warning")
        headerEl.classList.remove("safe")
    }else if ( percent >= 100){
        SecurityBar.classList.remove("critical")
        SecurityBar.classList.remove("warning")
        SecurityBar.classList.add("safe")
    }
}

function calculateFontSize(){
    if (numberRange > 45){
        inputPassword.classList.add("small")
        inputPassword.classList.remove("medium")
        inputPassword.classList.remove("large")
    }else if (numberRange > 32){
        inputPassword.classList.remove("small")
        inputPassword.classList.add("medium")
        inputPassword.classList.remove("large")
    }else if ( numberRange > 22){
        inputPassword.classList.remove("small")
        inputPassword.classList.remove("medium")
        inputPassword.classList.add("large")
    }
}

function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz" // LOCAL ONDE VAMOS FILTRAR OS CARACTERES PARA GERAR UMA SENHA  

    const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charsNumber = "123456789"
    const charsSimbol = "?!@#$%&()[]"

    if(checkNumbers.checked){
        chars += charsNumber
    }
    if(checkUppers.checked){
        chars += charsUpper
    }
    if(checkSimbol.checked){
        chars += charsSimbol
    }

    let password = ""

    for(let i = 0; i < numberRange; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)//faz com que o numero n tenha casas decimais - gera numero aleatorio - faz com que o numero aleatorio esteja dentro da quantia de caracteres da string que gera os chars da senha

        password += chars.substring(randomNumber, randomNumber + 1)//faz o cursor ir até a posiçao randomnumber e pega o que tiver a frente dele ( 1 é por isso )
    }
    inputPassword.value= `${password}`
    generatePorcent()
    calculateFontSize()
}


copy()
generatePassword()
generatePorcent()
calculateFontSize()