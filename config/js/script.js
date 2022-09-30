/* elementos */

const grid = document.querySelector(".grid");
const jogoMenu = document.querySelector(".jogoMenu");
const btJogar = document.querySelector("#btJogar");
const btSobre = document.querySelector("#btSobre");

/* cartas disponíveis para o jogo */

const cartasDisponiveis = [

  "turma",
  "Patrick",
  "Lula-Molusco",
  "Sandy",
  "srSiriguejo",
  "Perola",
  "Plankton",
  "Bob-Esponja-casa",
  "Patrick-casa",
  "Lula-Molusco-casa",
  
];

const comecarJogo = () => {

  /* preparar cartas */
  
  grid.textContent = "";
  let spread = [...cartasDisponiveis, ...cartasDisponiveis];
  let embCartas = spread.sort(() => Math.random() - 0.5);
      embCartas.forEach((carta) => {
      
        criarCartas(carta);
      
      });

};

const selecionadas = {

  primeira: "",
  segunda: "",

};

const criarCartas = (carta) => {

  let card = criarElemento("div", "card");
  let frente = criarElemento("div", "cardFace cardFrente");
  let atras = criarElemento("div", "cardFace cardAtras");
      
      frente.style.backgroundImage = `url('config/imagens/${carta}.jpg')`;
       
      grid.appendChild(card);
      card.appendChild(frente);
      card.appendChild(atras);
      
      card.setAttribute("data-carta", carta);
      card.addEventListener("click", ({target}) => {
      
        if(target.parentNode.className.includes("cardAtivado")) {
        
          return;
        
        }
        
        else {
        
          if(selecionadas.primeira == "") {
          
             card.classList.add("cardAtivado");
             selecionadas.primeira = target.parentNode;
          
          }
          
          else if(selecionadas.segunda == "") {
          
             card.classList.add("cardAtivado");
             selecionadas.segunda = target.parentNode;
             verificarCartas();
          
          };
        
        };
      
      });

};

const verificarCartas = () => {

  let primeiraCarta = selecionadas.primeira.getAttribute("data-carta");
  let segundaCarta = selecionadas.segunda.getAttribute("data-carta");
  
    if(primeiraCarta == segundaCarta) {
    
       selecionadas.primeira.firstChild.classList.add("cardDesativado");
       selecionadas.segunda.firstChild.classList.add("cardDesativado");
       
       selecionadas.primeira = "";
       selecionadas.segunda = "";
         
         if(jogoFinalizado()) {
         
           setTimeout(() => {
           
             jogoMenu.style.left = 0;
           
           }, 500);
         
         };
    
    }
    
    else {
    
      setTimeout(() => {
      
        selecionadas.primeira.classList.remove("cardAtivado");
        selecionadas.segunda.classList.remove("cardAtivado");
        
        selecionadas.primeira = "";
        selecionadas.segunda = "";
      
      }, 500);
    
    };
  
};

const jogoFinalizado = () => {

  let cartasDesativadas = document.querySelectorAll(".cardDesativado");
  
    if(cartasDesativadas.length == cartasDisponiveis.length*2) {
    
       return true;
    
    };

};

const criarElemento = (tagHtml, classe) => {

  let novoElemento = document.createElement(tagHtml);
      novoElemento.className = classe;
      return novoElemento;

};

/* página carregada */

window.onload = () => {

/* começar o jogo */

  comecarJogo();

};

if(btJogar) {

   btJogar.addEventListener("click", () => {
   
     jogoMenu.style.left = "-100%";
     comecarJogo();
   
   });

};

if(btSobre) {

  btSobre.addEventListener("click", () => {
  
    window.location.href = "sobre.html";
  
  });

};