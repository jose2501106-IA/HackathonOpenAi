import { crearApp } from "../lib/app.js";

const app = crearApp();
export const POST = (request) => app.webhook(request);
