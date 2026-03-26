//1- quando o usuario insere a cidade e clica em search, a função searchCity é chamada
async function searchCity(event){

   event.preventDefault();
   
   //2- pega o valor do input de cidade
   let cidadeDigitada = document.getElementById('city_name').value;

   try{
        //3- faz uma requisição para a API do OpenWeatherMap usando o valor da cidade
        const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidadeDigitada)}&appid=${apiKey}&units=metric&lang=pt_br`;

        let resposta = await fetch(apiUrl);

        if (!resposta.ok){
            throw new Error('Cidade não encontrada ou nome incorreto');
        }

        //4- recebe a resposta da API e extrai as informações relevantes
        let dadosClima = await resposta.json();

        //5- atualiza o conteúdo da página com as informações do clima para a cidade pesquisada
        document.getElementById("title").innerHTML = `${dadosClima.name}, ${dadosClima.sys.country}`;
        document.getElementById("temp_value").innerHTML = `${dadosClima.main.temp}°C`;
        document.getElementById("temp_description").textContent =`${dadosClima.weather[0].description}`;

        document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${dadosClima.weather[0].icon}@2x.png`);

        document.getElementById("humidity").textContent = `${dadosClima.main.humidity}%`;
        document.getElementById("temp_min").innerHTML = `${dadosClima.main.temp_min}°C`;
        document.getElementById("temp_max").innerHTML = `${dadosClima.main.temp_max}°C`;
        document.getElementById("wind").textContent = `${dadosClima.wind.speed}km/h`;

        //Limpa erros anteriores, se houver
        document.getElementById("alert").innerHTML = "";

   } 
   //6- se a cidade não for encontrada ou ocorrer um erro na requisição, exibe uma mensagem de erro para o usuário
   catch (error) {
       console.error('Erro ao buscar os dados do clima:', error);
       alert('Erro ao buscar os dados do clima. Tente novamente.');
   }
}

document.getElementById('search').addEventListener('submit', searchCity);
