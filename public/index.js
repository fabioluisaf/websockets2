import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");
console.log(tokenJwt);

const listaDocumentosDOM = document.getElementById("lista-documentos");
const formDOM = document.getElementById("form-adiciona-documento");
const inputDocumentoDOM = document.getElementById("input-documento");
const botaoLogoutDOM = document.getElementById("botao-logout");

botaoLogoutDOM.addEventListener("click", () => {
  removerCookie("tokenJwt");
  alert("Usuario deslogado com sucesso");
  window.location.href = "/login"
});

formDOM.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAdicionarDocumento(inputDocumentoDOM.value);
  inputDocumentoDOM.value = "";
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentosDOM.innerHTML += `
    <a
      href="/documento/index.html?nome=${nomeDocumento}"
      class="list-group-item list-group-item-action"
      id="documento-${nomeDocumento}"
    >
      ${nomeDocumento}
    </a>
  `;
}

function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);

  listaDocumentosDOM.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };
