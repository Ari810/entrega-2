let recital = JSON.parse(localStorage.getItem("recitales")) || [];
let idRecital = 1;

const form = document.getElementById("formularioRecitales");
const lista = document.getElementById("listaRecitales");

form.addEventListener("submit", () => {
    const artista = document.getElementById("artista").value;
    const precio = document.getElementById("precio").value;
    const sector = document.getElementById("sector").value;
    const fecha = document.getElementById("fecha").value;
});
