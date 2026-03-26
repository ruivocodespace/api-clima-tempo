//1- quando o usuario insere a cidade e clica em search, a função searchCity é chamada
async function search() {
    
//2- pega o valor do input de cidade
    let cidadeDigitada = document.getElementById("cidade").value;

    try {
//3- faz uma requisição para a API do OpenWeatherMap usando o valor da cidade
        const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidadeDigitada)}&appid=${apiKey}&units=metric&lang=pt_br`;

        if (!resposta.ok){
            throw new Error('Cidade não encontrada');
        }

//4- recebe a resposta da API e extrai as informações relevantes (temperatura, descrição do clima, humidity, minima, maxima etc.)
        let dadosClima = await resposta.json();
            let temp = dadosClima.main.temp;
            let desc = dadosClima.weather[0].description;
            let umi = dadosClima.main.humidity;
            let min = dadosClima.main.temp_min;
            let max = dadosClima.main.temp_max;
            let vento = dadosClima.wind.speed;

//5- atualiza o conteúdo da página com as informações do clima para a cidade pesquisada

            document.getElementById("temp").textContent = `${temp}°C`;
            document.getElementById("desc").textContent = desc;
            document.getElementById("umi").textContent = `${umi}%`;
            document.getElementById("min").textContent = `${min}°C`;
            document.getElementById("max").textContent = `${max}°C`;
            document.getElementById("vento").textContent = `${vento} m/s`;
//6- se a cidade não for encontrada ou ocorrer um erro na requisição, exibe uma mensagem de erro para o usuário
    } catch (error) {
        document.getElementById('telaErro').innerHTML = "Ops! " + error.message;
    }
}