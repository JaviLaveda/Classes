const myregex = /<img[^>]+src=["']([^"']+)["']/g;

const obtenerEnlaces = (texto: string): string[] => {
  const enlaces: string[] = [];
  let match;
  while ((match = myregex.exec(texto)) !== null) {
    enlaces.push(match[1]);
  }
  return enlaces;
};

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};

const crearElementoImagen = (texto: string): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = texto;
  imagen.classList.add("imagen-card");
  return imagen;
};

const mostrarEnlacesIMG = (enlaces: string[]) => {
  const listadoLink = document.getElementById("listadoEnlaces");
  if (listadoLink && listadoLink instanceof HTMLDivElement) {
    listadoLink.innerHTML = "";

    if (enlaces.length === 0) {
      listadoLink.innerText = "No se encontraron enlaces";
    } else {
      enlaces.forEach((enlace) => {
        const link = crearElementoParrafo(enlace);
        listadoLink.appendChild(link);
      });
    }
  } else {
    throw new Error("DivElement not found");
  }
};

const mostrarIMGEncontradas = (enlaces: string[]) => {
  const listadoLink = document.getElementById("listadoEnlaces");
  if (listadoLink && listadoLink instanceof HTMLDivElement) {
    listadoLink.innerHTML = "";

    if (enlaces.length === 0) {
      listadoLink.innerText = "No se encontraron enlaces";
    } else {
      enlaces.forEach((enlace) => {
        const img = crearElementoImagen(enlace);
        listadoLink.appendChild(img);
      });
    }
  } else {
    throw new Error("DivElement not found");
  }
};
const extraerEnlacesIMG = () => {
  const textArea = document.getElementById("textArea");
  if (textArea && textArea instanceof HTMLTextAreaElement) {
    const textoCopiado: string = textArea.value;
    const enlacesEncontrados = obtenerEnlaces(textoCopiado);
    // mostrarEnlacesIMG(enlacesEncontrados);
    mostrarIMGEncontradas(enlacesEncontrados);
  } else {
    throw new Error("TextArea not found");
  }
};

const events = () => {
  const btnExtraer = document.getElementById("btnExtraer");
  if (btnExtraer && btnExtraer instanceof HTMLButtonElement) {
    btnExtraer.addEventListener("click", extraerEnlacesIMG);
  } else {
    throw new Error("BtnElement not found");
  }
};

document.addEventListener("DOMContentLoaded", events);
