var canvas = document.getElementById('zone');
var ctx = canvas.getContext('2d');

var largeur=hauteur=20;
var x = Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;

var depX=depY=0;

var trace=[];
var tailleTrace=tailleInitTrace=5;
var sautTrace=1;
var tailleMaxTrace=100;

var hist, distance;
var compteBoucle = 0;
var sautBoucle = 10;
var PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
var PommeRadius = 10;
var score = 0;

window.onload=function() {
 var intervalID = setInterval(game,100);

document.addEventListener("keydown",keyboard);

}

function game(){

ctx.clearRect(0, 0, canvas.width, canvas.height);

x+=depX*largeur;
 y+=depY*hauteur;
 // On augmente tailleTrace toutes les secondes (soit 100 boucles)
 if(tailleTrace <= tailleMaxTrace){
 if((compteBoucle++)%10 == 1){
 sautBoucle--;
 if(sautBoucle<0){
 tailleTrace+=sautTrace;
 }
 }
 }
 // On insére la valeur de x et y dans le tableau
 trace.push({x:x,y:y});

// tant que la taille du tableau (soit la trace) depasse la taille maximum
 while(trace.length>tailleTrace){
 // alors on enlève un élément
 trace.shift();
 }
 ctx.fillStyle="#f1c40f"; //#f39c12
 for(var i=0;i<trace.length;i++) {
 ctx.fillRect(trace[i].x,trace[i].y, largeur-3, hauteur-3);

}


if(x==PommeX && y==PommeY){
 score+=10 + 2 * ((tailleTrace - tailleInitTrace)/sautTrace); 
 // collision
 // Si la taille a été augmenté on enlève un saut d'expansion de trace
 if(tailleTrace>tailleInitTrace){
 tailleTrace-=sautTrace;
 }
 // On réinitialise le compte à rebours pour relancer l'expansion
 sautBoucle=10;
 // On choisit une autre position pour la pomme
 PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
 PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;


}
 
 ctx.beginPath();
 ctx.arc(PommeX+PommeRadius, PommeY+PommeRadius,PommeRadius, 0, Math.PI * 2);
 ctx.fillStyle="#e74c3c";
 ctx.fill();
 ctx.closePath();

// Affichage du score
 ctx.font = '16px Arial';
 ctx.fillStyle = '#fff';
 ctx.fillText('Score: ' + score, 5, 20);

}

function keyboard(evt){
 switch(evt.keyCode) {
 case 37:
 // touche gauche
 if(hist==39){break;}
 depX=-1;
 depY=0;
 hist=evt.keyCode;
 break;
 case 38:
 // touche haut
 if(hist==40){break;}
 depX=0;
 depY=-1;
 hist=evt.keyCode;
 break;
 case 39:
 // touche droite
 if(hist==37){break;}
 depX=1;
 depY=0;
 hist=evt.keyCode;
 break;
 case 40:
 // touche bas
 if(hist==38){break;}
 depX=0;
 depY=1;
 hist=evt.keyCode;
 break;
 case 32:
 // touche espace pour l'arrêt
 depX=0;
 depY=0;
 break;
 }
 
}