const baseURL = "https://rickandmortyapi.com/api/";

const listaPersonajes = document.getElementById("personajes-lista");
const formulario = document.getElementById("formulario-filtro");
const nombreInput = document.getElementById("nombre");
const especieSelect = document.getElementById("especie");
const generoSelect = document.getElementById("genero");
const estadoSelect = document.getElementById("estado");
const tipoSelect = document.getElementById("tipo");

let paginaActual = 1;

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  paginaActual = 1;
  obtenerPersonajes();
});

function obtenerPersonajes() {
  const url = construirURL();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mostrarPersonajes(data.results);
      mostrarBotonesPaginacion(data.info);
    })
    .catch((error) => console.error(error));
}

function construirURL() {
  let url = `${baseURL}character/?page=${paginaActual}`;
  if (nombreInput.value) {
    url += `&name=${nombreInput.value}`;
  }
  if (especieSelect.value) {
    url += `&species=${especieSelect.value}`;
  }
  if (generoSelect.value) {
    url += `&gender=${generoSelect.value}`;
  }
  if (estadoSelect.value) {
    url += `&status=${estadoSelect.value}`;
  }
  if (tipoSelect.value) {
    url += `&type=${tipoSelect.value}`;
  }
  return url;
}
function mostrarPersonajes(personajes) {
  listaPersonajes.innerHTML = "";
  const estados = {
    "Alive": "Vivo",
    "Dead": "Muerto",
    "unknown": "Desconocido"
  };
  for (const personaje of personajes) {
    const li = document.createElement("li");
    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    const span = document.createElement("span");
    const estado = estados[personaje.status] || personaje.status;
    span.textContent = `${personaje.name} - ${estado}`;
    li.appendChild(imagen);
    li.appendChild(span);
    listaPersonajes.appendChild(li);
  }
}

function mostrarBotonesPaginacion(info) {
  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";

  if (paginaActual > 1) {
    const btnPrimeraPagina = crearBotonPagina(1, "Primera");
    paginacion.appendChild(btnPrimeraPagina);

    const btnPaginaAnterior = crearBotonPagina(paginaActual - 1, "Anterior");
    paginacion.appendChild(btnPaginaAnterior);
  }

  const spanPaginaActual = document.createElement("span");
  spanPaginaActual.textContent = paginaActual;
  paginacion.appendChild(spanPaginaActual);

  if (paginaActual < info.pages) {
    const btnPaginaSiguiente = crearBotonPagina(paginaActual + 1, "Siguiente");
    paginacion.appendChild(btnPaginaSiguiente);

    const btnUltimaPagina = crearBotonPagina(info.pages, "Última");
    paginacion.appendChild(btnUltimaPagina);
  }
}

function crearBotonPagina(numero, texto) {
  const btn = document.createElement("button");
  btn.textContent = texto;
  btn.classList.add("boton-paginacion"); // Agrega la clase "boton-paginacion" al botón
  btn.addEventListener("click", () => {
    paginaActual = numero;
    obtenerPersonajes();
  });
  return btn;
}

// obtenerPersonajes();
