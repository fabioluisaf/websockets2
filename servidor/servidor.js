import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import chalk from "chalk";

import "./db/dbConnect.js";

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));
console.log(chalk.blue("As senhas para todos os usuarios sao: \"senha\""));

const io = new Server(servidorHttp);

export default io;