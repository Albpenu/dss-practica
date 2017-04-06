class Quiz{
    constructor(props){
        this.props = props;
        this.quiz = document.getElementById("quiz");
        this.counterHits = 0;
        this.counterFails = 0;
        this.renderQuestionsAndAnswers = this.renderQuestionsAndAnswers.bind(this);
        this.questionEnum = [];
        for (var i=1; i<=this.props.questions.length; i++){
            this.questionEnum.push(i);
        }
        this.answerEnum = [];
    }

    //TODO
    renderQuestionsAndAnswers(){
        var questions = this.props.questions;
             
        for(var i=0; i < questions.length; i++){
            var question = document.createElement("div");
                question.id = "question"+i;
                question.className = "question";
                question.innerHTML = "<h1>"+this.questionEnum[i]+". "+questions[i]+"</h1>";
            
            this.renderAnswers(question,i);
            this.quiz.appendChild(question);
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
                
                answer.innerHTML = "<div class='correct'></div>";
                if(counterH==this.props.hits){
                    this.props.onFinishHit();
                    this.counterFails = this.props.fails;
                }

            } else if(this.counterFails<this.props.fails) { // Fail
                var counterF = ++this.counterFails
                this.updateCounter()
                this.props.onFail();
                
                answer.innerHTML = "<div class='incorrect'></div>";
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
        sortArray(mask, this.props.correctChoice);
    }
   
    render() {
        this.props.random ? this.randomize() : null;  //if(this.props.random) this.randomize()
        this.renderQuestionsAndAnswers();
        this.renderCounter();
    }
    
    clear(){
        for(var i=this.quiz.children.length-1; i>=0; i--){
            this.quiz.removeChild(this.quiz.children[i]);
        }     
    }
    
}

function sortArray(mask, array){ // new positions: [2,3,0,1]
    //TODO 
    var tmp = array.slice();
    
    for(var i=0; i<array.length; i++){
        array[i] = tmp[mask[i]];
    }
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