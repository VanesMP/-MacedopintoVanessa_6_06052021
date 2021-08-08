//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch(function() {
        this.dataError = true;
    })

//Ajouter les données JSON à la page, 1: recuperer l' élément section. 2:parcourir chaque objet de notre objet JSON. 3: ajouter chaque objet à sa propre div dans le Html
/*function appendData(json) {
    var mainContainer = document.getElementById("pattern-photographers");
    for (var i = 0; i < photographers.length; i++) {
        var div = document.createElement('div').textContent = photographers[i].name;
        mainContainer.appendChild(div);
    }
}*/