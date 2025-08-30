// Creo un array
let recitales = JSON.parse(localStorage.getItem("recitales")) || [];

// Esta clase permite almacenar los datos en la agenda
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

// Esta funcion evita que, al recargar la pagina y agregar nuevos recitales a la agenda, no se repitan los ID, ya que modifica ultimoId a el mayor id encontrado en el storage
recitales.forEach((recital) => {
    if (recital.id > Recital.ultimoId) {
        Recital.ultimoId = recital.id;
    }
});

// Creo variables para poder modificar el HTML (form: para trabajar con el formulario; lista: para generar una lista en la pagina)
const form = document.getElementById("formularioRecitales");
const lista = document.getElementById("listaRecitales");

// Esta funcion permite borrar los recitales de la agenda individualmente
const borrarReci = (id) => {
    recitales = recitales.filter((recital) => recital.id !== id);
    guardadoLocal();
    renderizar();
};

// Esta funcion genera en el HTML una lista de la agenda
const renderizar = () => {
    lista.innerHTML = "";

    recitales.forEach((recital) => {
        const ilRecital = document.createElement("li");

        ilRecital.innerHTML = `<strong>${recital.artista}</strong><br>$${recital.precio} - ${recital.sector} <br> ${recital.fecha}`;

        const borrar = document.createElement("button");
        borrar.textContent = "Eliminar recital";

        borrar.addEventListener("click", () => borrarReci(recital.id));

        ilRecital.appendChild(borrar);
        lista.appendChild(ilRecital);
    });
};

// Con esta funcion guardamos en el storage
const guardadoLocal = () => {
    localStorage.setItem("recitales", JSON.stringify(recitales));
};

// Aca procedemos, cuando el usuario haga click en el boton "agregar a la agenda", a agendar los datos escrito por este, guardarlos en variables y mediante esas variables generamos un nuevo objeto con la clase Recital, el cual con un push se guarda en la agenda, en el storage (con guardadoLocal), se renderiza y se resetea el formulario para que no queden los datos que escribió el usuario al presionar dicho boton
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

// Y por ultimo, con botonBorrar generamos una funcion que al clickear el botón "Limpiar agenda", se reseteen los datos y se limpie la pagina, incluyendo el storage
const botonBorrar = document.getElementById("botonBorrar");
botonBorrar.addEventListener("click", () => {
    localStorage.clear();
    recitales = [];
    renderizar();
});
