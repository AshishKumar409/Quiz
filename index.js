
let input = document.getElementById('User')
let button = document.querySelector('.saveName')
let warning = document.querySelector('.warning')


let playerName;
input.addEventListener('keyup',()=>{
  playerName = input.value
  button.disabled =!playerName
  if(input.value===''){
  warning.style.visibility = 'visible'
}else{
  warning.style.visibility = 'hidden'
}
})



saveName=(e)=>{
  e.preventDefault()
  
  localStorage.setItem('PlayerName',playerName)
  window.location.assign('./game.html')
}