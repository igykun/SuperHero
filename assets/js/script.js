$(document).ready(function(){
    $('#search-btn').click(function(){
        let heroIndex = $('#searchNumber').val();
        filterIndex(heroIndex);
    });
});
const filterIndex = (heroIndex) => {
    if (validIndex(heroIndex)) {
        searchApi(heroIndex);
    } else {
        mostrarAlerta("Por favor, ingresa un número válido.");
    }
    
}

const validIndex = (number) => {
    return /^\d+$/.test(number);  
}

const searchApi = (heroIndex) => {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${heroIndex}`,
        method: 'GET',
        success: function(data) {
            // crearTarjeta(data);
            // mostrarGrafico(data);
            if (data.response === "error") {
                alert(" Numero fuera de rango, por favor intentelo con otro numero");
            } else {
                crearTarjeta(data);
                mostrarGrafico(data);
            } 
        },
        error: function() {
            mostrarAlerta("No se encontró el héroe. Intenta nuevamente.");
        }
    });
}

function crearTarjeta(data) {
    let cardHTML = `
    <div class="card bg-black text-white">
    <img src="${data.image.url}" class="card-img-top" alt="${data.name}">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}</p>
        <hr>
        <p class="card-text">Publicado por: ${data.biography.publisher}</p>
        <hr>
        <p class="card-text">Ocupación: ${data.work.occupation}</p>
        <hr>
        <p class="card-text">Primera aparición: ${data.biography["first-appearance"]}</p>
        <hr>
        <p class="card-text">Altura: ${data.appearance.height.join(' - ')}</p>
        <hr>
        <p class="card-text">Peso: ${data.appearance.weight.join(' - ')}</p>
        <hr>
        <p class="card-text">Alias: ${data.biography.aliases.map(alias => `<li>${alias}</li>`).join('')}</p>
    </div>
    </div>`;
    $("#heroCard").html(cardHTML);
}

function mostrarGrafico(data) {
    let powerstats = data.powerstats;
    let puntos = [];

    for (let stat in powerstats) {
        puntos.push({ y: parseInt(powerstats[stat]), label: stat });
    }

    
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        data: [{
            type: "pie",
            dataPoints: puntos
        }]
    });
    chart.render();
}

function mostrarAlerta(mensaje) {
    alert(mensaje); 
}