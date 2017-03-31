class Quiz{
    constructor(props){
        this.props = props;
        
        this.quiz = document.getElementById("quiz")
        this.counterHits = 0;
        this.counterFails = 0;
        this.renderQuestions = this.renderQuestions.bind(this);
        
    }
    //TODO
    renderQuestions(){
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
        var answerClicked = this.props.answers[questionPos][this.props.correctchoice[questionPos]];
        
        if(answer.className == "answer"){
            answer.className += "-toggled";
            if((answerProps == answerClicked) && this.counterHits<this.props.hits){ //Hit
                
                this.props.onHit();
                if(++this.counterHits==this.props.hits){
                    this.props.onFinishHit();
                }

            } else if(this.counterFails<this.props.fails) { // Fail
                this.props.onFail();
                if (++this.counterFails==this.props.fails){
                    this.props.onFinishFail();
                }
            }
        }
    }
      
   
    render() {
        this.renderQuestions();
    }
    
    abort() {
        console.log(this.props.correctchoice[1]);
    }
    
           

}