// Variables
var edad = 90

// Variables
let age = 90

// Constantes
const myAge = 90

console.log ('@ Keyla => Edad', myAge + age)

const main = document.getElementsByTagName ('main')
const article = document.getElementsByTagName ('article')

console.log ('@ Keyla => Main', main)
console.log ('@ Keyla => Article', article)

Object.values (article).forEach ( (temp) =>
{
    console.log ('@ Keyla => Temp', temp)
})

// Arreglos y objetos
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const obj = 
{
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5
}

console.log ('@ Keyla => Variables', arr, obj)

arr.forEach ( (item, index) =>
{
    console.log ('@ Keyla => Arreglo', item, index)
})

console.log ('@ Keyla => Objet -> Values', Object.values (obj))
console.log ('@ Keyla => Objeto -> Entries', Object.entries (obj))
console.log ('@ Keyla => Objeto -> Keys', Object.keys (obj))

// Funciones 
function suma ()
{
    console.log ('@ Keyla => Suma', 56 + 90)
} 

suma ()

function suma_params (x, y)
{
    console.log ('@ Keyla => Suma Params', x + y)
} 

suma_params (45, 900)

const suma_new = () =>
{
    console.log ('@ Keyla => Suma New', 900 + 897)
}

suma_new ()

const suma_new_params = (x, y) =>
{
    console.log ('@ Keyla => Suma New Params', x + y)
}

suma_new_params (789.78, 876.89)

// Literal strings
const hola = 'Hola amigo'
const numero = 90

console.log (`${hola} como estas? ${numero}`)

const articulo = document.createElement ('article')
articulo.textContent = 'Creado desde JS'
const nuevo = document.getElementsByTagName ('main') [0]
nuevo.appendChild (articulo)
console.log (`${hola} como estas? ${numero}`)

setTimeout ( () => 
{
    nuevo.style.display = 'none'
}, 15000)