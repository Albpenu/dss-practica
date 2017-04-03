class Quiz{
    constructor(props){
        this.props = props;
        
        this.quiz = document.getElementById("quiz");
        this.counterHits = 0;
        this.counterFails = 0;
        this.renderQuestionsAndAnswers = this.renderQuestionsAndAnswers.bind(this);
    }

    //TODO
    renderQuestionsAndAnswers(){
        var questions = this.props.questions;
             
        for(var i=0; i < questions.length; i++){
            var question = document.createElement("div");
                question.id = "question"+i;
                question.className = "question";
                question.innerHTML = questions[i];
            
            this.renderAnswers(question,i);
            this.quiz.appendChild(question);
        }
    }
    
    renderAnswers(question, pos) {
        for(var i=0; i < this.props.answers[pos].length; i++){
            var answer =  document.createElement("div");
                answer.id = "answer" + pos + i;
                answer.className = "answer";
                answer.innerHTML = "<br/><p style='cursor: pointer'>"+this.props.answers[pos][i]+"</p><br/>";
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
                if(counterH==this.props.hits){
                    this.props.onFinishHit();
                    this.counterFails = this.props.fails;
                }

            } else if(this.counterFails<this.props.fails) { // Fail
                var counterF = ++this.counterFails
                this.updateCounter()
                this.props.onFail();
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
        var mask = createMask(this.props.questions);
        sortArray(mask, this.props.questions);
        sortArray(mask,this.props.answers);
        sortArray(mask, this.props.correctChoice)
    }
   
    render() {
        this.props.random ? this.randomize() : null;  //if(this.props.random) this.randomize()
        this.renderQuestionsAndAnswers();
        this.renderCounter();
    }
    
    clean(){
        //TODO clean quiz
        
    }
    
    abort() {
        console.log(this.props.correctChoice[1]);
    }
    
}

function sortArray(mask, array){ // new positions: [2,3,0,1]
    //TODO 
    
}

function createMask(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  var mask = []

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

    return mask;
  // return [2,3,0,1]
  // return array;
}