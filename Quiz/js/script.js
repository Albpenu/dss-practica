//Constantes con valores por defecto
const QUESTION_ENUM = {
    type: 'NUMBER',
    colon: '.'
}
const ANSWER_ENUM = {
    type: 'ALPHABET',
    colon: ')'
}

const ALPHABET = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];

class Quiz {
    constructor(props){
        const questionLength = props.questions.length
        this.props = props;
        // Valores asignados||Valores por defecto
        this.props.hits = props.hits || questionLength
        this.props.fails = props.fails || questionLength
        this.quiz = document.getElementById("quiz");
        this.isStarted = false;
        this.counterHits = 0;
        this.counterFails = 0;
        this.questionEnum = createEnum(props.questionEnum || QUESTION_ENUM, questionLength)
        this.answerEnum = createEnum(props.answerEnum || ANSWER_ENUM, questionLength)
        
        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.validate = this.validate.bind(this);
    }
    // Mostrar una pregunta
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
                questionDiv.innerHTML = "<h1>"+this.questionEnum[index]+question+"</h1>";
                questionDiv.style.backgroundImage = `url(${this.props.backgroundQuestion[index]})`;
                questionDiv.style.backgroundSize = "100% 100%";
                questionDiv.style.height = "100vh";

            this.renderAnswers(questionDiv,index);
            this.quiz.appendChild(questionDiv);
        }
    }
    // Contenido del vector de preguntas, y añade una línea divisoria horizontal separando cada una de la anterior
    renderQuestions(){
        var questions = this.props.questions;
             
        for(var i=0; i < questions.length; i++){
            this.renderQuestion(i);
            
            if (i != questions.length-1) {
               var divider = document.createElement("hr");
                this.quiz.appendChild(divider);
            }
        }
    }
    // Renderizar/mostrar el contenido de los vectores de respuestas
    renderAnswers(question, pos) {

        var answers =  document.createElement("div");
            answers.id = "answers" + pos
            answers.className = "answers";

        for(var i=0; i < this.props.answers[pos].length; i++){
            
            var answer =  document.createElement("div");
                answer.id = "answer" + pos + i;
                answer.className = "answer";
                answer.innerHTML = "<div class='checkbox'></div>"+"<p>"+this.answerEnum[i]+this.props.answers[pos][i]+"</p><br/>";
                answer.onclick = this.checkAnswer.bind(this,answer,pos,i);
                answers.appendChild(answer);
        }

        question.appendChild(answers)
    }
    // Renderizar/mostrar imágenes que indiquen respuesta correcta o incorrecta
    checkAnswer(answer,questionPos, answerPos) {
        var answerProps = this.props.answers[questionPos][answerPos];
        var answerClicked = this.props.answers[questionPos][this.props.correctChoice[questionPos]];
        /* Para la respuesta marcada: según sea correcta o incorrecta, se muestran las imágenes correspondientes de "cheched or unchecked", y se actualiza el contador de aciertos y fallos y se muestra a qué corresponde */
        if(answer.className == "answer"){
            answer.className += "-toggled";
            if((answerProps == answerClicked) && this.counterHits<this.props.hits){ //Hit
                var counterH = ++this.counterHits
                this.updateCounter()
                this.props.onHit();
                if (this.props.checked) {
                    var correctimg = document.createElement("img");
                    correctimg.id = "correct";
                    correctimg.src = this.props.checked.src;
                    answer.firstChild.appendChild(correctimg);
                }
    
                if(counterH==this.props.hits){
                    this.props.onFinishHit();
                    this.counterFails = this.props.fails;
                }

            } else if(this.counterFails<this.props.fails) { // Fail
                var counterF = ++this.counterFails
                this.updateCounter()
                this.props.onFail();
                if (this.props.unchecked){
                   var incorrectimg = document.createElement("img")
                    incorrectimg.id = "incorrect"
                    incorrectimg.src = this.props.unchecked.src
                    answer.firstChild.appendChild(incorrectimg);
                }
                
                if (counterF==this.props.fails){
                    this.props.onFinishFail();
                    this.counterHits = this.props.hits;
                }
            }
        }
    }
    // Muestra el recuento de aciertos y fallos cometidos
    updateCounter(){
        var counters = document.getElementById("counters");
        counters.innerHTML = "Aciertos: "+this.counterHits+"<br>"+"Fallos: "+this.counterFails;
    }
    //Crear divs de contador de aciertos y fallos y que se vaya actualizando
    renderCounter(){
        var counters = document.createElement("div");
            counters.id = "counters";
            counters.className = "counters";
        this.quiz.appendChild(counters);
        
        this.updateCounter();
        
    }
    //Ordenar aleatoriamente las preguntas, luego ordenar respuestas y la respuesta correcta de acuerdo a la pregunta
    randomize() {
        var mask = createMask(this.props.questions.length);
        
        sortArray(mask, this.props.questions);
        sortArray(mask, this.props.answers);
        sortArray(mask, this.props.backgroundQuestion);
        sortArray(mask, this.props.correctChoice);
    }
   // Valida la cantidad de preguntas, respuestas, respuesta correcta
   validate() {
       var arraylength = [this.props.questions.length, this.props.answers.length, this.props.correctChoice.length];
       if(this.props.backgroundQuestion) arraylength.push(this.props.backgroundQuestion.length)

       return sameLength(arraylength) && arePositives(this.props.hits, this.props.fails)    

   }
    // Validar si se quiere habilitar la propiedad aleatoria: mostrar aleatoriamente preguntas, sus respuestas y la respuesta correcta. Y si se quieren mostrar las preguntas de una en una o todas a la vez
    start() {
        if(this.validate()) {
            this.isStarted = true
            if(this.props.random) this.randomize()
            if(!this.props.oneByOne) this.renderQuestions()
            this.renderCounter();
        }


    }
    // Borrar/limpiar el cuestionario
    clear(){
        for(var i=this.quiz.children.length-1; i>=0; i--){
            this.quiz.removeChild(this.quiz.children[i]);
        }     
    }
    
    
}
// Enumerar y asignar letras a cada vector de preguntas y respuestas
function createEnum(enumQA, len) {
    var res = []
    switch(enumQA.type){
        case 'NUMBER':
            res = consecutiveNumbers(len, enumQA.colon)
            break;
        case 'ALPHABET':
            for(var i=0;  i<27 && i<len; i++){
                res.push(ALPHABET[i] + enumQA.colon)
            }
            break;

        default:
            res = consecutiveNumbers(len, enumQA.colon)
    }
    return res
}
// Añadir nº y letras (según la posición), y puntuación/símbolo ("." y ")") 
function consecutiveNumbers(len, colon) {
    const res = []
    for(var i=1; i<=len; i++){
        res.push(i + colon)
    }
    return res
}
// Ordenación del vector, sustituyendo los valores del array por los de una máscara que le pasamos
function sortArray(mask, array){ 

    var tmp = array.slice();
    
    for(var i=0; i<array.length; i++){
        array[i] = tmp[mask[i]];
    }
}
// Validación que genera una alerta cuando no hay la misma cantidad de preguntas que sus vectores de respuestas
function sameLength(array) {
    var res = true
    var length = array[0]
    for(var i=0;i<array.length;i++){
        if(length != array[i]){
            alert("¡No hay el mismo número de preguntas que su conjunto de respuestas! ¡Revíselo!");
            res = false;
            break;
        }
    }
    
    return res;
}
// Validación que genera una alerta cuando el nº de aciertos y fallos no es "=/>0"
function arePositives() {
    var positive = true;

    for(var i=0; i<arguments.length; i++){
        if(arguments[i] < 0){
            alert("El nº de aciertos y de fallos tiene valor negativo");
            positive = false;
            break;
        }
    }

    return positive;
}
// Crear máscara
function createMask(length) {
    var randomIndex;
    var positions = Array.from(Array(length).keys())
    var mask = [];
    
    // mientras queden elementos para mostrar
    for(var i=length-1; i>=0; i--){
        randomIndex = Math.floor(Math.random() * positions.length);
        mask[i] = positions.splice(randomIndex,1).pop()
    }
    
    return mask;
}
