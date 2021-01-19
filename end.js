let saveButton = document.querySelector('.saveScoreBtn')
let h2 = document.querySelector('.name')

let finalScore = document.querySelector('.finalScore')
let highScore = JSON.parse(localStorage.getItem('HighScore'))||[]
let Name = localStorage.getItem('PlayerName')
let mostRecentScore = localStorage.getItem('mostRecentScore')

finalScore.textContent = mostRecentScore
Name = Name.toUpperCase()
h2.innerHTML = `${Name},your Score is <span class="finalScore">${finalScore.textContent}</span> `
h2.style.textTransform = 'capitalize'



let saveHighScore = (e)=>{


let Score = {
  score:mostRecentScore,
  User:Name
}

highScore.push(Score)

highScore.sort((a,b)=>b.score-a.score)
highScore.splice(5)

localStorage.setItem('HighScore',JSON.stringify(highScore))
window.location.assign('/index.html')
}