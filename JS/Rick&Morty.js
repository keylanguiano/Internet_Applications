const cards = document.querySelector ('#card_dinamics')
const templateCard = document.querySelector ('#template_card').content

document.addEventListener ('DOMContentLoaded', () =>
{
    fetchData ()
})

const fetchData = async () =>
{
    try 
    {
        loadingData (true)   
        const res = await fetch ("https://rickandmortyapi.com/api/character") 
        const data = await res.json ()
        drawCards (data)
    } 
    catch (error) 
    {
        console.log ('@ Keyla => Error', error)
    }
    finally
    {
        loadingData (false)    
    }
}

const loadingData = state =>
{
    const loading = document.querySelector ('#loading')

    if (state)
    {
        loading.classList.remove ('d-none')
    }
    else
    {
        loading.classList.add ('d-none')
    }
}

const drawCards = (data) =>
{
    const fragment = document.createDocumentFragment ()

    cards.textContent = ''

    data.results.forEach ((item) =>
    {
        const clone = templateCard.cloneNode (true)

        clone.querySelector ('h5').textContent = item.name
        clone.querySelector ('p').textContent = item.species
        clone.querySelector ('img').setAttribute ('src', item.image)

        fragment.appendChild (clone)
    })

    cards.appendChild (fragment)
}