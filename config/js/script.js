/* script */

const grid = document.querySelector(".grid");
const jMsg = document.querySelector(".jMsg");
const btJogar = document.querySelector("#btJogar");

const jMemoria = {

  cartasDisponiveis: [
  
    "Bob-Esponja-E+",
    "Patrick",
    "Sandy",
    "srSiriguejo",
    "Perola",
    "Lula-Molusco",
    "Plankton",
    "Bob-Esponja-casa",
    "Patrick-casa",
    "Lula-Molusco-casa",
  
  ],
  
  selecionadas: {
  
    primeira: "",
    segunda: "",
  
  },
  
  criarCartas(carta) {
  
    let card = this.criarElemento("div", "card");
    let frente = this.criarElemento("div", "cardFace cardFrente");
    let atras = this.criarElemento("div", "cardFace cardAtras");
    
        frente.style.backgroundImage = `url('../config/imagens/${carta}.jpeg')`;
    
    grid.appendChild(card);
    card.appendChild(frente);
    card.appendChild(atras);
    card.setAttribute("data-carta", carta);
    card.addEventListener("click", ({target}) => {
    
      jMemoria.revelarCarta(target);
    
    });
    
  },
  
  revelarCarta(target) {
  
    if(target.parentNode.className.includes("ativarCard")) {
    
      return;
      
    }
    
    else {
    
      if(this.selecionadas.primeira == "") {
      
         target.parentNode.classList.add("ativarCard");
         this.selecionadas.primeira = target.parentNode;
      
      }
      
      else if(this.selecionadas.segunda == "") {
      
         target.parentNode.classList.add("ativarCard");
         this.selecionadas.segunda = target.parentNode;
      
      };
      
      this.verificarCartas();
      
    };
  
  },
  
  verificarCartas() {
  
    let primeiraCarta = this.selecionadas.primeira.getAttribute("data-carta");
    let segundaCarta = this.selecionadas.segunda.getAttribute("data-carta");
    
      if(primeiraCarta != "" && segundaCarta != "" && primeiraCarta == segundaCarta) {
      
         this.selecionadas.primeira.firstChild.classList.add("cardDesabilitado");
         this.selecionadas.segunda.firstChild.classList.add("cardDesabilitado");
         this.selecionadas.primeira = "";
         this.selecionadas.segunda = "";
         
         if(this.jogoFinalizado()) {
         
            jMsg.style.display = "flex";
         
         };
      
      }
      
      else if(primeiraCarta != "" && segundaCarta != "" && primeiraCarta != segundaCarta) {
      
          setTimeout(() => {
          
            this.selecionadas.primeira.classList.remove("ativarCard");
            this.selecionadas.segunda.classList.remove("ativarCard");
            this.selecionadas.primeira = "";
            this.selecionadas.segunda = "";
          
          }, 500);
      
      };
  
  },
  
  jogoFinalizado() {
  
    let cartasAbertas = document.querySelectorAll(".cardDesabilitado");
    
      if(cartasAbertas.length == 20) {
      
        return true;
      
      };
  
  },
    
  criarElemento(tagHtml, classe) {
  
    let novoElemento = document.createElement(tagHtml, classe);
        novoElemento.className = classe;
        return novoElemento;
  
  },

};

/* página carregada */
 
const createCard = () => {

  let spread = [...jMemoria.cartasDisponiveis, ...jMemoria.cartasDisponiveis];
  
  let embSort = spread.sort(() => Math.random() - 0.5);
  
  embSort.forEach((carta) => {
    
    jMemoria.criarCartas(carta);
  
  });

};

window.onload = () => { createCard(); };

if(btJogar) {

   btJogar.addEventListener("click", () => {
   
     grid.textContent = "";
     jMsg.style.display = "none";
     createCard();
     
   });
   
};