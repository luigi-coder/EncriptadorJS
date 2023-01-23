const d = document;



function capTextEncrip() {

    const encriptador = d.getElementById("encriptar");
    encriptador.addEventListener("click", () => {
    
        const texto = d.getElementById("introducir-texto").value;
        
        validacion(texto);
    
        d.getElementById("introducir-texto").value = "";
    });

    console.log(encriptador);
    return encriptador;
}

capTextEncrip();

function capTextDesencrip(){

    const desencriptador = d.getElementById("desencriptar");
    desencriptador.addEventListener("click", () => {
        
        const texto = d.getElementById("introducir-texto").value;
    
        desencriptar(texto);
        
        d.getElementById("introducir-texto").value = "";
    });
}

capTextDesencrip();

function validacion(texto){

    const letras_mayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ";

    function tiene_mayusculas(texto){
        for(i=0; i<texto.length; i++){
           if (letras_mayusculas.indexOf(texto.charAt(i),0)!=-1){
              return 1;
           }
        }
        return 0;
     }


    switch(true) {
        case texto === "":
            toastError("No podes encriptar algo vacio");
            break;
        case !isNaN(texto):
            toastError("No se puede ingresar numeros");
            break;
        case texto === texto.toUpperCase():
            toastError("No se puede ingresar texto en mayusculas");
            break;
        case texto === "á" || texto === "é" || texto === "í" || texto === "ó" || texto === "ú":
            toastError("No se puede ingresar tildes");
            break;

        case tiene_mayusculas(texto) === 1:
            toastError("No se puede ingresar texto en mayusculas");
            break;
        default:
            toastify("Texto encriptado correctamente");
            encriptar(texto);
            break;
    }
}

function encriptar(texto){

    const textoEncriptado = texto.split("").map((letra) => {
        
        return String.fromCharCode(letra.charCodeAt(0) + 1);
    }).join("");

    const encriptador = d.getElementById("encriptar");
    
    encriptador.classList.remove("encriptar");
    encriptador.classList.add("boton");

    mostrarTexto(textoEncriptado);
}


function mostrarTexto(textoEncriptado){
    
    
    const card = d.getElementById("card");
    const card2 = d.getElementById("card2");
    
    card.innerHTML = "";
    card2.innerHTML = "";

    const p = d.createElement("p");
    
    // crear un bton para copiar el texto
    const boton = d.createElement("button");
    boton.classList.add("btnCopyDesHabilitado");
    boton.innerHTML = "Copiar";

    p.innerHTML = `${textoEncriptado}`;
    p.classList.add("p3");

    // Creacion de la card2 responsive
    const div = d.createElement("div");
    
    div.classList.add("card2");
    div.style.height = "300px";

    const divDeP = d.createElement("div");
    divDeP.style.height = "80%";
    divDeP.style.display = "flex";


    const p2 = d.createElement("p");
    p2.style.wordBreak = "break-all";
    p2.classList.add("p4");
    p2.style.margin = "1em";
    p2.style.width = "100%";
    p2.innerHTML = `${textoEncriptado}`;
    divDeP.appendChild(p2);
    div.appendChild(divDeP);

    // creacion de un segundo div que contendra el boton
    const div2 = d.createElement("div");
    div2.style.display = "flex";
    div2.style.justifyContent = "center";
    div2.style.alignItems = "center";


    // creacion del boton para copiar el texto
    const boton2 = d.createElement("button");
    boton2.style.width = "50%";
    boton2.classList.add("btnCopyDesHabilitado");
    boton2.innerHTML = "Copiar";
    boton2.style.height = "50px";

    div2.appendChild(boton2);

    div.appendChild(div2);

    card.appendChild(p);
    card.appendChild(boton);
    card2.appendChild(div);

    boton.addEventListener("click", () => {
        copiarTexto(textoEncriptado, boton);
    });  

    boton2.addEventListener("click", () => {
        copiarTexto(textoEncriptado, boton2);
    });
}

function desencriptar(texto){

    const textoDesencriptado = texto.split("").map((letra) => {
        return String.fromCharCode(letra.charCodeAt(0) - 1);
    }).join("");

    const desencriptador = d.getElementById("desencriptar");
    const encriptador = d.getElementById("encriptar");
    
    desencriptador.classList.remove("desencriptar");
    desencriptador.classList.add("boton");

    encriptador.classList.remove("boton");
    encriptador.classList.add("encriptar");

    toastify("Texto desencriptado correctamente");
    mostrarTexto(textoDesencriptado);
}

function copiarTexto(textoDesencriptado, boton){

    const card = d.getElementById("card");
    console.log(card);
    
    boton.classList.remove("btnCopyDesHabilitado");
    boton.classList.add("btnCopyHabilitado");

    const input = document.createElement("input");
    input.setAttribute("value", textoDesencriptado);

    document.body.appendChild(input);

    input.select();

    document.execCommand("copy");

    document.body.removeChild(input);

    boton.innerHTML = "Copiado";

    toastify("Texto copiado");

    // Volver a mostrar la imagen

}

function toastify(mensaje){

    Toastify({
        text: mensaje,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #c0cddd, #0A3871)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function toastError(mensaje){

    Toastify({
        text: mensaje,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #ff0000, #0A3871)",
        },
        onClick: function(){} // Callback after click
        }).showToast();
}