class Quiz{
    constructor(props){
        this.props = props;
        this.quiz = document.getElementById("quiz");
        this.isStarted = false;
        this.counterHits = 0;
        this.counterFails = 0;
        this.questionEnum = [];
        for (var i=1; i<=this.props.questions.length; i++){
            this.questionEnum.push(i);
        }
        this.answerEnum = [];
        
        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.validate = this.validate.bind(this);
    }

    renderQuestion(index){
        if(this.isStarted){
            var questions = document.getElementsByClassName("question")
            if (this.props.oneByOne && questions.length > 0){
                for(var i=0; i<questions.length; i++){
                    this.quiz.removeChild(questions[i]);
                }
            }
            var question = this.props.questions[index];

            var questionDiv = document.createElement("div");
                questionDiv.id = "question"+index;
                questionDiv.className = "question";
                questionDiv.innerHTML = "<h1>"+this.questionEnum[index]+". "+question+"</h1>";
                questionDiv.style.backgroundImage = `url(${this.props.backgroundQuestion[index]})`;
                questionDiv.style.backgroundSize = "100% 100%";
                questionDiv.style.height = "100vh";

            this.renderAnswers(questionDiv,index);
            this.quiz.appendChild(questionDiv);
        }
    }
    
    
    renderQuestions(){
        var questions = this.props.questions;
             
        for(var i=0; i < questions.length; i++){
            this.renderQuestion(i);
        }
    }
    
    renderAnswers(question, pos) {
        for(var i=0; i < this.props.answers[pos].length; i++){
            
            var answer =  document.createElement("div");
                answer.id = "answer" + pos + i;
                answer.className = "answer";
                answer.innerHTML = "<div class='checkbox'></div>"+"<p>"+abecedario[i]+this.props.answers[pos][i]+"</p><br/>";
                answer.onclick = this.checkAnswer.bind(this,answer,pos,i);
                question.appendChild(answer);
        }
    }
 
    checkAnswer(answer,questionPos, answerPos) {
        var answerProps = this.props.answers[questionPos][answerPos];
        var answerClicked = this.props.answers[questionPos][this.props.correctChoice[questionPos]];
        
        if(answer.className == "answer"){
            answer.className += "-toggled";
            if((answerProps == answerClicked) && this.counterHits<this.props.hits){ //Hit
                var counterH = ++this.counterHits
                this.updateCounter()
                this.props.onHit();
                var correctimg = document.createElement("img");
                correctimg.id = "correct";
                answer.appendChild(correctimg);
                var flecha = document.createElement("div");
                flecha.id = "flecha";
                if(counterH==this.props.hits){
                    this.props.onFinishHit();
                    this.counterFails = this.props.fails;
                }

            } else if(this.counterFails<this.props.fails) { // Fail
                var counterF = ++this.counterFails
                this.updateCounter()
                this.props.onFail();
                answer.firstChild.innerHTML = "<img id='incorrect' src='resources/img/unchecked.png' />";
                if (counterF==this.props.fails){
                    this.props.onFinishFail();
                    this.counterHits = this.props.hits;
                }
            }
        }
    }
    
    updateCounter(){
        var counters = document.getElementById("counters");
        counters.innerHTML = "Aciertos: "+this.counterHits+"<br>"+"Fallos: "+this.counterFails;
    }
    
    renderCounter(){
        var counters = document.createElement("div");
            counters.id = "counters";
            counters.className = "counters";
        this.quiz.appendChild(counters);
        
        this.updateCounter();
        
    }
    
    randomize() {
        //TODO Sort randomly question, then sorted answers and correctChoice according to question.
        var mask = createMask(this.props.questions.length);
        
        sortArray(mask, this.props.questions);
        sortArray(mask, this.props.answers);
        sortArray(mask, this.props.backgroundQuestion);
        sortArray(mask, this.props.correctChoice);
    }
    
    
    
   validate() {
       var arraylength = [this.props.questions.length, this.props.answers.length, this.props.correctChoice.length];
       if(this.props.backgroundQuestion) arraylength.push(this.props.backgroundQuestion.length)
       return sameLength(arraylength)
   }
    
    start() {
        if(this.validate()) {
            this.isStarted = true
            if(this.props.random) this.randomize()
            if(!this.props.oneByOne) this.renderQuestions()
            this.renderCounter();
        }
    }
    
    clear(){
        for(var i=this.quiz.children.length-1; i>=0; i--){
            this.quiz.removeChild(this.quiz.children[i]);
        }     
    }
    
    
}

function sortArray(mask, array){ 

    var tmp = array.slice();
    
    for(var i=0; i<array.length; i++){
        array[i] = tmp[mask[i]];
    }
}

function sameLength(array) {
    var res = true
    var length = array[0]
    for(var i=0;i<array.length;i++){
        if(length != array[i]){
            alert("¡No hay el mismo número de preguntas que su conjunto de respuestas! ¡Revíselo!");
            res = false
            break;
        }
    }
    
    return res;
}

function createMask(length) {
    var randomIndex;
    var positions = Array.from(Array(length).keys())
    var mask = [];
    
    // While there remain elements to shuffle...
    for(var i=length-1; i>=0; i--){
        randomIndex = Math.floor(Math.random() * positions.length);
        mask[i] = positions.splice(randomIndex,1).pop()
    }
    
    return mask;
}

var abecedario = ["a) ","b) ","c) ","d) ","e) ","f) ","g) ","h) ","i) ","j) ","k) ","l) ","m) ","n) ","o) ","p) ","q) ","r) ","s) ","u) ","v) ","w) ","x) ","y) ","z) "];

