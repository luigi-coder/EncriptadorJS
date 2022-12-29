const d = document;

const encriptador = d.getElementById("encriptar");
encriptador.addEventListener("click", () => {

    const texto = d.getElementById("introducir-texto").value;

    
    validacion(texto);

    d.getElementById("introducir-texto").value = "";
});

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
            console.log("No podes encriptar algo vacio");
            break;
        case !isNaN(texto):
            console.log("No se puede ingresar numeros");
            break;
        case texto === texto.toUpperCase():
            console.log("No se puede ingresar texto en mayusculas");
            break;
        case texto === "á" || texto === "é" || texto === "í" || texto === "ó" || texto === "ú":
            console.log("No se puede ingresar tildes");
            break;

        case tiene_mayusculas(texto) === 1:
            console.log("No se puede ingresar texto en mayusculas");
            break;
        default:
            encriptar(texto);
            break;
    }
}

function encriptar(texto){

    const textoEncriptado = texto.split("").map((letra) => {
        return String.fromCharCode(letra.charCodeAt(0) + 1);
    }).join("");

    console.log(textoEncriptado);
    mostrarEncriptado(textoEncriptado);
}

function mostrarEncriptado(textoEncriptado){
    
    
    const card = document.getElementById("card");
    const p1 = document.getElementById("p1");
    
    card.innerHTML = "";

    const div = document.createElement("div");


    div.innerHTML = `
        <h1>${textoEncriptado}</h1>
    `;

    const h1 = div.querySelector("h1");

    div.style.marginLeft = "10px";
    div.style.marginRight = "10px";
    div.style.marginTop = "-500px";

    h1.style.color = "#0A3871";
    h1.style.fontSize = "1.5em";

    card.appendChild(div);
    
}

function desencriptar(texto){

    const textoDesencriptado = texto.split("").map((letra) => {
        return String.fromCharCode(letra.charCodeAt(0) - 1);
    }).join("");

    console.log(textoDesencriptado);
}

const desencriptador = d.getElementById("desencriptar");
desencriptador.addEventListener("click", () => {
    
    const texto = d.getElementById("introducir-texto").value;
    
    validacion(texto);
    
    d.getElementById("introducir-texto").value = "";
});


