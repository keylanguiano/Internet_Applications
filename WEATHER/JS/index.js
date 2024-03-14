const btnSearch = document.getElementById('btn_search');
const inputCity = document.getElementById('search_city');

const card = document.getElementById ('card_weather');
const estado = document.getElementById('estado');
const humedad = document.getElementById('humedad');
const viento = document.getElementById('viento');
const localidad = document.getElementById('localidad');
const fecha = document.getElementById('fecha');

const currentDate = new Date();
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateFormat = `${days[currentDate.getDay()]}, ${day} ${months[month - 1]}`;
const dateFormatToday = `${year}-${month}-${day}`;

const bodyTable = document.getElementById ('body_table')
const rowWeather = document.getElementById ('row_weather').content

const fragment = document.createDocumentFragment ()

document.addEventListener ('DOMContentLoaded', () => 
{
    card.style.visibility = 'hidden';
})

btnSearch.addEventListener('click', () => 
{
    if (inputCity.value.trim().length > 0) 
    {
        console.log('@ Keyla => value', inputCity.value);
        buscarCiudad(inputCity.value)

    }
});

const buscarCiudad = async (ciudad) => 
{
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${ciudad}&language=es`;
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
        let result = await response.json();
        console.log('@ Keyla => result ', result);

        const datos = ciudad.split(',')
        result = result.filter ((city) => city.adm_area2.toLowerCase() === datos[0].toLowerCase() && city.name.toLowerCase() === datos[0].toLowerCase() )
        
        console.log('@ Keyla => result filter', result);

        buscarDatos(result[0], result[0].place_id);
    } 
    catch (error) 
    {
        console.error(error);
    }
};

const buscarDatos = async (ciudad_datos, ciudad_id) => 
{
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${ciudad_id}&timezone=auto&language=en&units=metric`;
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
        console.log('@ Keyla => datos ', result);

        await llenarTarjeta (ciudad_datos, result);
        await gethistoricalData (ciudad_id)
        
        const stadistic = document.getElementById ('stadistic')
        stadistic.style.visibility = 'visible'
    } 
    catch (error) 
    {
        console.error(error);
    }
};

const llenarTarjeta = (ciudad_datos, datos) => 
{
    card.style.visibility = 'visible';
    
    console.log('@ Keyla => ciudad', ciudad_datos.name);
    console.log('@ Keyla => temperatura', datos.current.temperature);

    estado.textContent = datos.current.summary;
    humedad.textContent = datos.current.humidity + ' %';
    viento.textContent = datos.current.wind.speed;
    localidad.textContent = ciudad_datos.name;
    temperatura.textContent = datos.current.temperature + ' °';

    fecha.textContent = dateFormat;
};

const gethistoricalData = async (place_id) => 
{
    console.log ('fecha', dateFormatToday)
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?date=${dateFormatToday}&place_id=${place_id}&units=metric`;
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
        console.log('@ Keyla historical data', result.data);

        await drawTable (result.data)
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const drawTable = (datos) => 
{
    console.log('@ Keyla => historical data datos', datos)

    bodyTable.innerHTML = ''
    datos.forEach ((renglon) => 
    {
        rowWeather.querySelectorAll ('td') [0].textContent = renglon.weather
        rowWeather.querySelectorAll ('td') [1].textContent = renglon.temperature
        rowWeather.querySelectorAll ('td') [2].textContent = renglon.feels_like
        rowWeather.querySelectorAll ('td') [3].textContent = renglon.wind.speed
        rowWeather.querySelectorAll ('td') [4].textContent = renglon.wind.dir
        rowWeather.querySelectorAll ('td') [5].textContent = renglon.precipitation.total
        rowWeather.querySelectorAll ('td') [6].textContent = renglon.precipitation.type
        rowWeather.querySelectorAll ('td') [7].textContent = renglon.ozone
        rowWeather.querySelectorAll ('td') [8].textContent = renglon.humidity

        const clone = rowWeather.cloneNode (true)
        fragment.appendChild (clone)
    })

    bodyTable.appendChild (fragment)
}