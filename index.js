
const formCalculador = document.querySelector("#formCalculador")
const inputPrecio = document.querySelector("#inputPrecio")
const inputIva = document.querySelector("#inputIva")
const calculoDeIva = document.querySelector("#calculoDeIva")
const cantidadDeIva = document.querySelector("#cantidadDeIva")
const historialDeCalculos = document.querySelector("#historialDeCalculos")
const botonHistorial = document.querySelector("#botonHistorial")

const calculos = JSON.parse(localStorage.getItem('calculos')) || []

class Calculo{
    constructor({ precio, iva, resultado, totalDeIva}) {
        this.precio = precio
        this.iva = iva
        this.resultado = resultado
        this.totalDeIva = totalDeIva
    }
}

formCalculador.onsubmit = e => {
    e.preventDefault()

    const precio = parseFloat(inputPrecio.value)
    const iva = parseFloat(inputIva.value)

    const totalDeIva = (precio / 100) * iva
    const resultado = precio + totalDeIva

    inputPrecio.value = ""
    inputIva.value = "21"

    const calculo = new Calculo({ precio, iva, resultado, totalDeIva })
    guardarCalculo(calculo)
    mostrarResultados(resultado, totalDeIva)
}

botonHistorial.addEventListener("click", function() {
    console.log(localStorage.clear())
    // historialDeCalculos.innerHTML = "" 
})

function mostrarResultados( resultado, totalDeIva) {
    calculoDeIva.innerHTML = `<h4>$ ${resultado} </h4>`
    cantidadDeIva.innerHTML = `<h4>$ ${totalDeIva} </h4>`
}

function guardarCalculo(calculo) {
    calculos.push(calculo)
    localStorage.setItem('calculos', JSON.stringify(calculos))
    mostrarHistorial()
}

function mostrarHistorial() {
    if (calculos.length > 0) {
        let listaHistorialHtml = "<ul>"
        for (const calculo of calculos) {
            listaHistorialHtml += `<li><b>El precio fue $${calculo.precio} y el porcentaje de iva aplicado fue %${calculo.iva} = ${calculo.resultado}, la cantidad de iva aplicado fue de $${calculo.totalDeIva}</b></li>`
        }
        historialDeCalculos.innerHTML = listaHistorialHtml + "</ul>"
    }
}