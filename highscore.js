let ul = document.querySelector('.highScoreList')
let highScores = JSON.parse(localStorage.getItem('HighScore')) || []







ul.innerHTML = highScores.map((user)=>{
  return `<div class="good"><li class="high-score user">${user.User}</li><li class="high-score userScore"> ${user.score}</li></div>`
}).join("")

