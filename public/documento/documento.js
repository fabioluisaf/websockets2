import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditorDOM = document.getElementById("editor-texto");
const tituloDocumentoDOM = document.getElementById("titulo-documento");
const botaoExcluirDOM = document.getElementById("excluir-documento");
const listaUsuariosConectadosDOM = document.getElementById("usuarios-conectados");

tituloDocumentoDOM.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacoaSucesso(payloadToken) {
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
  listaUsuariosConectadosDOM.innerHTML = "";

  usuariosNoDocumento.forEach(usuario => {
    listaUsuariosConectadosDOM.innerHTML += `
      <li class="list-group-item">${usuario}</li>
    `
  });
}

textoEditorDOM.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditorDOM.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditorDOM.value = texto;
}

botaoExcluirDOM.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacoaSucesso, atualizarInterfaceUsuarios };
