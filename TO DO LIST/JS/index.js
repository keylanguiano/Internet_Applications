console.log('@ Keyla => Vinculamos el archivo')

const formulario = document.getElementById ('formulario')
const listaTareas = document.getElementById ('lista-tareas')
const templateTarea = document.getElementById ('templateTarea').content
const fragment = document.createDocumentFragment ()

let tareas = {}

document.addEventListener ('DOMContentLoaded', () =>
{
    if (localStorage.getItem ('tareas'))
    {
        tareas = JSON.parse (localStorage.getItem ('tareas'))
    }

    pintarTareas ()
}) 

formulario.addEventListener ('submit', (e) =>
{
    e.preventDefault ()
    setTarea (e)
})

listaTareas.addEventListener ('click', (e) => 
{
    btnAcciones (e)
})

const pintarTareas = () =>
{
    localStorage.setItem ('tareas', JSON.stringify (tareas))

    if (Object.values (tareas).length == 0)
    {
        listaTareas.innerHTML = `
        <div class="alert alert-dark text-center">
            Sin tareas pendientes 
        </div>
        `
        return
    }

    listaTareas.innerHTML = ''

    Object.values (tareas).forEach ( (tarea) =>
    {
        const clone = templateTarea.cloneNode (true)

        clone.querySelector ('p').textContent = tarea.texto

        if (tarea.estado)
        {
            clone.querySelectorAll ('.fa')[0].classList.replace ('fa-check-circle', 'fa-undo-alt')
            clone.querySelector ('.alert').classList.replace ('item', 'item-check')
            clone.querySelector ('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll ('.fa')[0].dataset.id = tarea.id
        clone.querySelectorAll ('.fa')[1].dataset.id = tarea.id

        fragment.appendChild (clone)
    })
    listaTareas.appendChild (fragment)
}

const setTarea = (e) =>
{
    const texto = e.target.querySelector ('input').value

    if (texto.trim () == '')
    {
        return
    }

    const tarea = {
        id: Date.now (),
        texto,
        estado: false
    }

    tareas [tarea.id] = tarea

    pintarTareas ()

    formulario.reset ()
    e.target.querySelector ('input').focus ()
}

const btnAcciones = e => 
{
    if (e.target.classList.contains ('check'))
    {
        tareas [e.target.dataset.id].estado = true
        pintarTareas ()
    }
    
    if (e.target.classList.contains ('delete'))
    {
        delete tareas[e.target.dataset.id]
        pintarTareas ()
    }

    if (e.target.classList.contains ('fa-undo-alt'))
    {
        tareas [e.target.dataset.id].estado = false
        pintarTareas ()
    }

    e.stopPropagation()
}