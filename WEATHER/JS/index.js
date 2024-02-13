const btnSearch = document.getElementById ('btn_search')
const inputCity = document.getElementById ('search_city')
const temperatura = document.getElementById ('temperatura')
const localidad = document.getElementById ('localidad')
const fecha = document.getElementById ('fecha')

const Date = new Date();
const month = Date.getMonth() + 1;
const day = Date.getDate(); 
const dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

btnSearch.addEventListener ('click', () => 
{

    if (inputCity.value.trim().length > 0)
    {
        console.log ('@ Keyla => value', inputCity.value)
        buscarCiudad (inputCity.value)
    }
})

const buscarCiudad = async (ciudad) =>
{
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${ciudad}&language=es`;
    const options = 
    {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '45cf0211bcmsh0589a4825f10fa0p1621a8jsn6a0a576cca26',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('@ Keyla => result ', result);

        ciudad_datos = result.find(city => city.place_id === ciudad);
        ciudad_id = result.find(city => city.place_id === ciudad).place_id;

        console.log ('@ Keyla => ciudad ', ciudad_datos)

        console.log ('@ Keyla => id ', ciudad_id)

        buscarDatos (ciudad_datos, ciudad_id)
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const buscarDatos = async (ciudad_datos, ciudad_id) =>
{
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${ciudad_id}&timezone=auto&language=en&units=auto`;
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '45cf0211bcmsh0589a4825f10fa0p1621a8jsn6a0a576cca26',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('@ Keyla => datos ',result);

        llenarTarjeta (ciudad_datos, result)
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const llenarTarjeta = (ciudad_datos, datos) =>
{
    console.log ('@ Keyla => ciudad', ciudad_datos.name);
    console.log ('@ Keyla => temperatura', datos.current.temperature);

    localidad.textContent = ciudad_datos.name;
    temperatura.textContent = datos.current.temperature + '°';

    fecha.textContent = `${dias [currentDate.getDay ()]}, ${day} ${meses [month - 1]}`;
}