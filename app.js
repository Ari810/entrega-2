let recitales = JSON.parse(localStorage.getItem("recitales")) || [];
let idRecital = 1;

const form = document.getElementById("formularioRecitales");
const lista = document.getElementById("listaRecitales");

const borrarReci = (id) => {
    recitales = recitales.filter((recital) => recital.id !== id);
    renderizar();
};

const renderizar = () => {
    lista.innerHTML = "";

    recitales.forEach((recital) => {
        const ilReci = document.createElement("li");

        ilReci.innerHTML = `<strong>${recital.artista}</strong><br>$${recital.precio} - ${recital.sector} <br> ${recital.fecha}`;

        const borrar = document.createElement("button");
        borrar.textContent = "Eliminar recital";

        borrar.addEventListener("click", () => borrarReci(recital.id));

        lista.appendChild(ilReci);
        lista.appendChild(borrar);
    });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const artista = document.getElementById("artista").value;
    const precio = document.getElementById("precio").value;
    const sector = document.getElementById("sector").value;
    const fecha = document.getElementById("fecha").value;

    const recital = {
        id: idRecital++,
        artista: artista,
        precio: precio,
        sector: sector,
        fecha: fecha,
    };

    recitales.push(recital);

    renderizar();
    form.reset();
});
