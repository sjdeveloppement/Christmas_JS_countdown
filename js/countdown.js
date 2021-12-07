const MINUTES = 60
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS

const elements = {
    days: document.getElementById('days'),
    hours : document.getElementById('hours'),
    minutes : document.getElementById('minutes'),
    seconds : document.getElementById('seconds')
}

let previousDiff = {}

// function recursive refresh every seconds the countdown with the window.setTimeout requestAnimationFrame permet de mettre en pause quand l'utilisateur n'est pas sur la page pour sauver de l'énergie
function refreshCountdown(){
    const countdown = document.querySelector('#countdown')
    const launchDate = Date.parse(countdown.dataset.time) / 1000  // le nombre de secondes  écoulées depuis 01/1970 divisé par 1000 pour travailler en seconde
    const difference = launchDate - Date.now() /1000 //comparer a l'heure actuelle du navigateur
    const diff = {
        days: Math.floor(difference / DAYS),
        hours: Math.floor(difference % DAYS / HOURS),
        minutes: Math.floor(difference % HOURS / MINUTES),
        seconds: Math.floor(difference % MINUTES)
    }
    updateDom(diff)
    window.setTimeout(()=>{
        window.requestAnimationFrame(refreshCountdown)
    }, 1000)
}

//sauvegarde la valeur précedente du compteur


/* Met à jour la structure html en fonction d'un nouvel interval
diff {{days:number, hours: number, minutes:number,seconds:number
    */
function updateDom(diff){
    Object.keys(diff).forEach((key)=>{
        if (previousDiff[key] !== diff[key]){
            elements[key].innerText = diff[key]
            console.log(`updating ${key}`)
        }
    })
   
    previousDiff = diff
}
refreshCountdown()


