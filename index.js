"use strict"

const DIM = 4;

window.addEventListener("load", function(){
   const wrapper = document.getElementById("wrapper");

   for(let i = 0; i < DIM; i++){
      for(let j = 0; j < DIM; j++){
         let div = document.createElement("div");
         div.id = `cella-${i}-${j}`;
         div.classList.add("cella");
         wrapper.appendChild(div);
      }
   }

   let pos1 = [0, 0], pos2 = [0, 0];
   do{
      pos1[0] = generaNumero(0, 4);
      pos1[1] = generaNumero(0, 4);
      pos2[0] = generaNumero(0, 4);
      pos1[1] = generaNumero(0, 4);
   } while (pos1[0] == pos2[0] && pos1[1] == pos2[1]);

   document.getElementById(`cella-${pos1[0]}-${pos1[1]}`).innerText = "2";
   document.getElementById(`cella-${pos2[0]}-${pos2[1]}`).innerText = "2";

   window.addEventListener("keydown", keyClicked);
});

function generaNumero(min, max){
   return Math.floor((max - min) * Math.random()) + min;   
}

function keyClicked(event){
   switch(event.key){
      case "ArrowUp":
         alert("↑");
         break;
      case "ArrowDown":
         alert("↓");
         break;
      case "ArrowLeft":
         alert("←");
         break;
      case "ArrowRight":
         alert("→");
         break;
      default:
         alert("Premi una delle freccie");
         return;
   }
}