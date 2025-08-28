let recitales = JSON.parse(localStorage.getItem("recitales")) || [];

class Recital {
    static ultimoId = 0;

    constructor(artista, precio, sector, fecha) {
        Recital.ultimoId += 1;
        this.id = Recital.ultimoId;
        this.artista = artista;
        this.precio = precio;
        this.sector = sector;
        this.fecha = fecha;
    }
}

recitales.forEach((recital) => {
    if (recital.id > Recital.ultimoId) {
        Recital.ultimoId = recital.id;
    }
});

const form = document.getElementById("formularioRecitales");
const lista = document.getElementById("listaRecitales");

const borrarReci = (id) => {
    recitales = recitales.filter((recital) => recital.id !== id);
    guardadoLocal();
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

        ilReci.appendChild(borrar);
        lista.appendChild(ilReci);
    });
};

const guardadoLocal = () => {
    localStorage.setItem("recitales", JSON.stringify(recitales));
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const artista = document.getElementById("artista").value;
    const precio = document.getElementById("precio").value;
    const sector = document.getElementById("sector").value;
    const fecha = document.getElementById("fecha").value;

    const recital = new Recital(artista, precio, sector, fecha);

    recitales.push(recital);

    guardadoLocal();
    renderizar();
    form.reset();
});
renderizar();

const botonBorrar = document.getElementById("botonBorrar");
botonBorrar.addEventListener("click", () => {
    localStorage.clear();
    recitales = [];
    renderizar();
});
