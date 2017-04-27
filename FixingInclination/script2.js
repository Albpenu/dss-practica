function Pregunta(enunciado, respuestas, correcta) {
    this.enunciado = enunciado;
    this.respuestas = respuestas;
    this.correcta = correcta;
}

Pregunta.prototype.escorrecta = function(correcta) {
    var resultado;
    if (this.correcta == correcta) {
        resultado = true;
    } else {
        resultado = false;
    }
}

function Encuesta(preguntas){
    this.preguntas = preguntas;
    
}