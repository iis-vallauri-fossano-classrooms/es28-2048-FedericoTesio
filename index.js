"use strict"

const DIM = 4;
let punti = 0;

window.addEventListener("load", function () {
   const wrapper = document.getElementById("wrapper");

   for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM; j++) {
         let div = document.createElement("div");
         div.id = `cella-${i}-${j}`;
         div.classList.add("cella");
         wrapper.appendChild(div);
      }
   }

   let pos1 = [0, 0], pos2 = [0, 0];
   do {
      pos1[0] = generaNumero(0, 4);
      pos1[1] = generaNumero(0, 4);
      pos2[0] = generaNumero(0, 4);
      pos1[1] = generaNumero(0, 4);
   } while (pos1[0] == pos2[0] && pos1[1] == pos2[1]);

   document.getElementById(`cella-${pos1[0]}-${pos1[1]}`).innerText = "2";
   document.getElementById(`cella-${pos2[0]}-${pos2[1]}`).innerText = "2";

   window.addEventListener("keydown", keyClicked);
});

function generaNumero(min, max) {
   return Math.floor((max - min) * Math.random()) + min;
}

function keyClicked(event) {
   switch (event.key) {
      case "ArrowUp":
         arrowUpClicked();
         break;
      case "ArrowDown":
         arrowDownClicked();
         break;
      case "ArrowLeft":
         arrowLeftClicked();
         break;
      case "ArrowRight":
         arrowRightClicked();
         break;
      default:
         alert("Premi una delle freccie");
         return;
   }
}

function arrowUpClicked() {
   let spostamenti = false;
   for (let i = DIM - 1; i > 0; i--) {
      for (let j = DIM - 1; j > -1; j--) {
         let z = DIM - 1;
         while (z > i) {
            if (document.getElementById(`cella-${z - 1}-${j}`).innerText == "") {
               document.getElementById(`cella-${z - 1}-${j}`).innerText = document.getElementById(`cella-${z}-${j}`).innerText;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
            }
            else if (document.getElementById(`cella-${z}-${j}`).innerText == document.getElementById(`cella-${z - 1}-${j}`).innerText) {
               document.getElementById(`cella-${z - 1}-${j}`).innerText = parseInt(document.getElementById(`cella-${z}-${j}`).innerText) * 2;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${z - 1}-${j}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z--;
         }
         z = i;
         while (z > 0) {
            if (document.getElementById(`cella-${z - 1}-${j}`).innerText == "") {
               document.getElementById(`cella-${z - 1}-${j}`).innerText = document.getElementById(`cella-${z}-${j}`).innerText;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
            }
            else if (document.getElementById(`cella-${z}-${j}`).innerText == document.getElementById(`cella-${z - 1}-${j}`).innerText) {
               document.getElementById(`cella-${z - 1}-${j}`).innerText = parseInt(document.getElementById(`cella-${z}-${j}`).innerText) * 2;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${z - 1}-${j}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z--;
         }
      }
   }

   if (!spostamenti) {
      let lose = checkLose();
      if (lose) {
         return;
      }
   }

   generaCella();
}

function arrowDownClicked() {
   let spostamenti = false;
   for (let i = 0; i < DIM - 1; i++) {
      for (let j = 0; j < DIM; j++) {
         let z = 0;
         while (z < i) {
            if (document.getElementById(`cella-${z + 1}-${j}`).innerText == "") {
               document.getElementById(`cella-${z + 1}-${j}`).innerText = document.getElementById(`cella-${z}-${j}`).innerText;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${z}-${j}`).innerText == document.getElementById(`cella-${z + 1}-${j}`).innerText) {
               document.getElementById(`cella-${z + 1}-${j}`).innerText = parseInt(document.getElementById(`cella-${z}-${j}`).innerText) * 2;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               punti = parseInt(document.getElementById(`cella-${z + 1}-${j}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z++;
         }
         z = i;
         while (z < DIM - 1) {
            if (document.getElementById(`cella-${z + 1}-${j}`).innerText == "") {
               document.getElementById(`cella-${z + 1}-${j}`).innerText = document.getElementById(`cella-${z}-${j}`).innerText;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${z}-${j}`).innerText == document.getElementById(`cella-${z + 1}-${j}`).innerText) {
               document.getElementById(`cella-${z + 1}-${j}`).innerText = parseInt(document.getElementById(`cella-${z}-${j}`).innerText) * 2;
               document.getElementById(`cella-${z}-${j}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${z + 1}-${j}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z++;
         }
      }
   }

   if (!spostamenti) {
      let lose = checkLose();
      if (lose) {
         return;
      }
   }

   generaCella();
}

function arrowLeftClicked() {
   let spostamenti = false;
   for (let i = DIM - 1; i > -1; i--) {
      for (let j = DIM - 1; j > 0; j--) {
         let z = DIM - 1;
         while (z > j) {
            if (document.getElementById(`cella-${i}-${z - 1}`).innerText == "") {
               document.getElementById(`cella-${i}-${z - 1}`).innerText = document.getElementById(`cella-${i}-${z}`).innerText;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${i}-${z}`).innerText == document.getElementById(`cella-${i}-${z - 1}`).innerText) {
               document.getElementById(`cella-${i}-${z - 1}`).innerText = parseInt(document.getElementById(`cella-${i}-${z}`).innerText) * 2;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${i}-${z - 1}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z--;
         }
         z = j;
         while (z > 0) {
            if (document.getElementById(`cella-${i}-${z - 1}`).innerText == "") {
               document.getElementById(`cella-${i}-${z - 1}`).innerText = document.getElementById(`cella-${i}-${z}`).innerText;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${i}-${z}`).innerText == document.getElementById(`cella-${i}-${z - 1}`).innerText) {
               document.getElementById(`cella-${i}-${z - 1}`).innerText = parseInt(document.getElementById(`cella-${i}-${z}`).innerText) * 2;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${i}-${z - 1}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z--;
         }
      }
   }

   if (!spostamenti) {
      let lose = checkLose();
      if (lose) {
         return;
      }
   }

   generaCella();
}

function arrowRightClicked() {
   let spostamenti = false;
   for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM - 1; j++) {
         let z = 0;
         while (z < j) {
            if (document.getElementById(`cella-${i}-${z + 1}`).innerText == "") {
               document.getElementById(`cella-${i}-${z + 1}`).innerText = document.getElementById(`cella-${i}-${z}`).innerText;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${i}-${z}`).innerText == document.getElementById(`cella-${i}-${z + 1}`).innerText) {
               document.getElementById(`cella-${i}-${z + 1}`).innerText = parseInt(document.getElementById(`cella-${i}-${z}`).innerText) * 2;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${i}-${z + 1}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z++;
         }
         z = j;
         while (z < DIM - 1) {
            if (document.getElementById(`cella-${i}-${z + 1}`).innerText == "") {
               document.getElementById(`cella-${i}-${z + 1}`).innerText = document.getElementById(`cella-${i}-${z}`).innerText;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               spostamenti = true;
            }
            else if (document.getElementById(`cella-${i}-${z}`).innerText == document.getElementById(`cella-${i}-${z + 1}`).innerText) {
               document.getElementById(`cella-${i}-${z + 1}`).innerText = parseInt(document.getElementById(`cella-${i}-${z}`).innerText) * 2;
               document.getElementById(`cella-${i}-${z}`).innerText = "";
               punti += parseInt(document.getElementById(`cella-${i}-${z + 1}`).innerText);
               document.getElementsByTagName("span")[0].innerText = punti;
               spostamenti = true;
            }
            z++;
         }
      }
   }

   if (!spostamenti) {
      let lose = checkLose();
      if (lose) {
         return;
      }
   }

   generaCella();
}

function generaCella() {
   let pos1 = [0, 0];
   do {
      pos1[0] = generaNumero(0, 4);
      pos1[1] = generaNumero(0, 4);
   } while (document.getElementById(`cella-${pos1[0]}-${pos1[1]}`).innerText != "");

   document.getElementById(`cella-${pos1[0]}-${pos1[1]}`).innerText = "2";
}

function checkLose() {
   let i = 0;
   let lose = true;
   while (i < DIM && lose) {
      let j = 0;
      while (j < DIM && lose) {
         if (document.getElementById(`cella-${i}-${j}`).innerText == "") {
            lose = false;
         }
         j++
      }
      i++
   }

   if (lose) {
      alert(`Hai perso!\nIl tuo punteggio è ${punti}`);
      window.removeEventListener("keydown", keyClicked);
   }

   return lose;
}