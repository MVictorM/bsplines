//configurações do canvas
function resizeCanvas() {
    canvas.width = parseFloat(window.getComputedStyle(canvas).width);
    canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
resizeCanvas();

jQuery(window).resize(function() {
    resizeCanvas();
    if(pontos.length >0) {
        desenhar();
    }
});

//array de pontos de controle
var pontos = [];
//variável indica que o ponto está sendo movido
var move = false;

//cria o ponto se clicar fora de outros pontos e faz o desenho
canvas.addEventListener("click", function(e) {
    if(findPoint(e) === false){
        var d = {
            x: "",
            y: ""
        };
        d.x = e.offsetX;
        d.y = e.offsetY;
        pontos.push(d);
        desenhar();
    }

});

//verifica se o click foi no raio de um ponto
function findPoint(click){
    for(var i = 0; i < pontos.length; i++){
        var v = {
            x: pontos[i].x - click.x,
            y: pontos[i].y - click.y
        };
        if(Math.sqrt(v.x * v.x + v.y * v.y) <= 5){
            return pontos[i];
        }
    }
    return false;
}

//se der double click num ponto, exclui ele do array e refaz o desenho
canvas.addEventListener('dblclick', function(e){
    var point = findPoint(e);
    if(point !== false){
        pontos.splice(pontos.indexOf(point), 1);
        desenhar();
    }
});

//se clicou num ponto, habilita a variável move
canvas.addEventListener('mousedown', function(e) {
    move = findPoint(e);
});

//se o ponto estiver clicado, calcula as novas coordenadas e refaz o desenho
canvas.addEventListener('mousemove', function(e) {
    if (move !== false) {
        move.x = e.offsetX;
        move.y = e.offsetY;
        desenhar();
    }
});

//libera a variável move
canvas.addEventListener('mouseup', function() {
    move = false;
});

//desenha os pontos de acordo com o array pontos que contem as coordenadas
function desenharPontos() {
    for(var i = 0; i < pontos.length; i++){
        ctx.beginPath();
        ctx.arc(pontos[i].x, pontos[i].y, 4, 0, 2*Math.PI);
        ctx.fillStyle = "rgb(173,216,230)";
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fill();
    }
}

function ligarPontos(pontos) {
    for(var z = 0; z < pontos.length - 1; z++){
        ctx.beginPath();
        ctx.moveTo(pontos[z].x, pontos[z].y);
        ctx.lineTo(pontos[z+1].x, pontos[z+1].y);
        ctx.stroke();
    }
}

function desenharRetas() {
    ctx.strokeStyle = "white";
    ligarPontos(pontos);
}

//desenha na tela
function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharPontos();
    desenharRetas();
}

desenharPontos();
