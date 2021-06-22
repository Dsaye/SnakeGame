var canvas = document.getElementById('zone');
var ctx = canvas.getContext('2d');

var largeur=hauteur=20;
var x = Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;


var depX=depY=0;

var trace=[];
var tailleTrace=tailleInitTrace=10;
var sautTrace=1;
var tailleMaxTrace=100;

trace.push({x:x,y:y});

var hist, distance;
var compteBoucle = 0;
var sautBoucle = 10;
var PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
var PommeRadius = 10;
var CoeurX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var CoeurY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
var AfficheCoeur = false;
var compteurCoeur = 0;
var score = 0;
var vie = 5;
var intervalID;
var timeout = 0;
var randomColor=0;
var collisionTrace = false;
var vitesse = vitesseInit = 300; // temps d'attente
var niveau = 1; // utilisé pour savoir si le niveau a changé.
var tailleNiveau = 50;



var radial = ctx.createRadialGradient(200,100,50,200,100,775);

radial.addColorStop(0,'#34495e');
radial.addColorStop(0.25, '#2c3e50');


// window.onload=function() {
 intervalID = setInterval(game,300);

document.addEventListener("keydown",keyboard);

// }

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

ctx.fillStyle="#f1c40f";
if(compteurCoeur++ > 115){
    compteurCoeur = 0;
    if(Math.random()*100 > 75){ //1 chance sur 4
    // Affichage des gain de vies
   
   CoeurX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
    CoeurY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
    AfficheCoeur= true
   
   } else {
    CoeurX = -9999;
    CoeurY = -9999;
    AfficheCoeur= false;
   
   }
   
   }
   
   if(AfficheCoeur == true){
   
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff';
    // La ligne suivante permet de voir où sont CoeurX et CoeurY dans la zone
    // ctx.fillRect(CoeurX, CoeurY, largeur, hauteur); 
    // Je modifie la position du text pour qu'il soit dans le Rect ci dessus
    // En le decommentant on voit que l'ecriture n'est pas vraiment sa place
    ctx.fillText('❤', CoeurX-3, CoeurY+16);
   
   } 
    if(x==CoeurX && y==CoeurY){
    vie++;
    CoeurX = -9999;
    CoeurY = -9999;
    AfficheCoeur= false;
   
   }

if(x==PommeX && y==PommeY){
 document.getElementById('collision').play();
 randomColor++;
 randomColor%=3;
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
 timeout = 0;




} else if(timeout++ > 100) { // 10 secondes
 timeout = 0;

PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
 PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
 }
 
 ctx.beginPath();
 ctx.arc(PommeX+PommeRadius, PommeY+PommeRadius,PommeRadius, 0, Math.PI * 2);
 ctx.fillStyle="#e74c3c";
 ctx.fill();
 ctx.closePath();
 // Sortes de reflets

// Sauvegarde du contexte
 ctx.save();

// On change les proportions du context en horizontale
 ctx.scale(1, 1.5);

// On dessine notre rond mais en changeant Y (puisque tout est divisé par 1.5)
 // il faut donc divisé par 1.5 pour avoir le même Y que dans le contexte d'origine
 ctx.beginPath();
 ctx.arc(PommeX+PommeRadius + 3, (PommeY+PommeRadius)/1.5,PommeRadius/3, 0, Math.PI * 2);
 ctx.fillStyle="#ed7365";
 ctx.fill();
 ctx.closePath();

// On restaure le contexte d'origine
 ctx.restore();




// Affichage d'un v pour donner l'impression d'une feuille
 ctx.font = '16px Arial';
 ctx.fillStyle = '#2ecc71';
 ctx.fillText('√', PommeX+3, PommeY+3 );




// Affichage du score
 ctx.font = '16px Arial';
 ctx.fillStyle = '#fff';
 ctx.fillText('Score: ' + score, 5, 20);

//On fait un test du niveau atteint 
 if(parseInt(Math.trunc(score/tailleNiveau) + 1) > niveau){
 niveau++;
 // On enlève 1/10 du temps d'attente
 vitesse = vitesse - vitesse / 10

clearTimeout(intervalID);
 intervalID = setInterval(game,vitesse);
 }

// Affichage du niveau
 ctx.font = '20px Arial';
 ctx.fillStyle = '#fff';
 ctx.fillText('Niveau: ' + niveau, canvas.width/2 - 40, 20);




// Affichage des vies restantes
 ctx.font = '16px Arial';
 ctx.fillStyle = '#fff';
 ctx.fillText('Vies : ' + vie, canvas.width - 130, 20);

 var collisionTrace = false;

 //...
 
 if(trace.length>5){
  for(var i=0;i<trace.length-1;i++) {
 // la position lenngth - 1 est celle de la tête elle n'a pas besoin d'être inclut dans le test avec elle même!
  if(trace[i].x==trace[trace.length-1].x && trace[i].y==trace[trace.length-1].y){
  collisionTrace= true;
  break
  }
  }
 
 }
 
 // On vérifie si collision == true
 if(x < 0 || x > (canvas.width - largeur) || y < 0 || y > (canvas.height - hauteur) || collisionTrace == true){
  // perte de vie
  timeout = 0;
  // On réinitialise la trace en effacant les valeurs sauvegardées
 
 trace = [];
  // On rechoisit une position du serpent
  x = Math.trunc(Math.random()*canvas.width/largeur)*largeur;
  y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
  trace.push({x:x,y:y});
  // On redonne la taille initiale de la trace
  tailleTrace=tailleInitTrace;
  // On rechoisit une autre position pour la pomme
  PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
  PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
  // On décrémente le nombre de vie
  vie--;
  // le test de collision avec le corps a été fait on le remet à faux 
  collisionTrace=false;
  
  if(vie == 0){
  // Affichage la fin de la partie
  ctx.font = '40px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('JEU TERMINE', canvas.width / 2 - 130, canvas.height / 2);
  document.getElementById('game-over').play();
  clearTimeout(intervalID);
  } else {
  document.getElementById('life').play();
  }
  }
}

function keyboard(evt){
 console.log(evt.keyCode);
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
 case 27:
 // touche echappe
 clearTimeout(intervalID);
 // On réinitialise ce qui doit être (les valeurs qui ont changé pendant le jeu)
 x = Math.trunc(Math.random()*canvas.width/largeur)*largeur;
 y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
 trace=[];
 trace.push({x:x,y:y});
 tailleTrace=tailleInitTrace;
 sautTrace=1;
 depX=depY=0;
 compteBoucle = 0;
 PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
 PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
 score = 0;
 vie = 5;
 timeout = 0;
 randomColor=0;
 collisionTrace = false;
 vitesse = vitesseInit;
 intervalID = setInterval(game,vitesseInit);
 break;
 }
 
} 
