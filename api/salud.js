import { crearApp } from "../lib/app.js";

const app = crearApp();
export const GET = (request) => app.salud(request);
