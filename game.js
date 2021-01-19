const question = document.querySelector('.question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
let QuestionCounter = document.querySelector('.hud-prefix')
let ScoreCounter = document.querySelector('.scoreCounter')
let progressBar = document.querySelector('.progress-bar-full')
let loader = document.querySelector('.loader')
let game = document.querySelector('.game')


async function c(){

 let response = await  fetch('https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple')
 
 let data = await response.json()

 let dataArray = data.results
 let Questions= []

 let obj;
 let choicesArray
 let rc
 let ch = ['c1','c2','c3','c4'] 

 dataArray.forEach((i)=>{
  
   choicesArray=[...i.incorrect_answers,i.correct_answer]
   randomChoice = [...choicesArray]
   obj = {
   question:i.question,  
 }
  let order = []
   while(randomChoice.length){
    
     let choiceIndex = Math.floor(Math.random()*randomChoice.length)
    obj[ch[ch.length-randomChoice.length]] = randomChoice[choiceIndex]
    
    order.push(randomChoice[choiceIndex])
    obj['array']=order

  randomChoice.splice(choiceIndex,1)
   }
   obj['answer'] = obj.array.indexOf(i.correct_answer)+1
   
 Questions.push(obj)
 })


let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
const MAX_QUESTIONS = Questions.length






let startGame = ()=>{
  questionCounter = 0
  score = 0
  availableQuestions = [...Questions]
  game.classList.remove('hidden')
  loader.classList.add('hidden')
  getQuestion()
 
}



let getQuestion = ()=>{
  if(availableQuestions.length===0||questionCounter>MAX_QUESTIONS){
    window.location.assign('./end.html')
  }
  questionCounter++
  progressBar.style.width = questionCounter<MAX_QUESTIONS?`${(questionCounter/MAX_QUESTIONS)*100}%`:'100%'
  QuestionCounter.innerHTML = questionCounter<MAX_QUESTIONS?`Questions ${questionCounter}/${MAX_QUESTIONS}`:`Questions ${MAX_QUESTIONS}/${MAX_QUESTIONS}`
  let questionIndex = Math.floor(Math.random()*availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
 question.innerHTML = currentQuestion.question

choices.forEach((choice)=>{
  const number = choice.dataset['choice']
  choice.innerHTML = currentQuestion[`c${number}`]
  
})

availableQuestions.splice(questionIndex,1)

}


choices.forEach((choice)=>{
  
 choice.addEventListener('click',e=>{
   const selectedChoice = e.target
   const selectedAnswer = selectedChoice.dataset['choice']
  if(currentQuestion.answer === Number(choice.dataset['choice'])){
   choice.classList.add('green')
   choice.parentElement.classList.add('green')
 
    score+=10
  }else{
    choice.classList.add('red')
    choice.parentElement.classList.add('red')
  }
  localStorage.setItem('mostRecentScore',score)
  
   ScoreCounter.textContent = score
  setTimeout(()=>{
    choice.classList.remove('green') 
    choice.parentElement.classList.remove('green')
    choice.classList.remove('red') 
    choice.parentElement.classList.remove('red')
    getQuestion()
  },1000)

   
 })
})
startGame()

}

c()
