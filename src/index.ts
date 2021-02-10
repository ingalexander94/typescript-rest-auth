import app from "./app";

app.listen(app.get("PORT"), ()=> console.log("Servidor corriendo en el puerto ", app.get("PORT")));