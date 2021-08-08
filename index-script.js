//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers[2]);
    })
    .catch(function() {

    })

//afficher tous les photographes selon le modele photographe
function gestionPhotographer(photographers) {
    photographers.forEach(photograph => {
        addPhotographer(photograph);
    });

}

// creer un modele photographe
function addPhotographer(photographer) {

    var mySection = document.getElementById('photographerContainer');
    var myImage = document.createElement('img').innerHTML = photographer.portrait; //portrait
    var myH2 = document.createElement('h2').innerHTML = photographer.name; //name
    var myH3 = document.createElement('h3').innerHTML = photographer.city + photographer.country; //city+country
    var mySlogan = document.createElement('p').innerHTML = photographer.tagline; //tagline
    var myPrice = document.createElement('p').innerHTML = photographer.price; //price
    var myTagList = document.createElement('ul') //tags

    var listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement('li').innerHTML = listTag[i];
        myTagList.appendChild(tags);
    }

    mySection.appendChild(myImage);
    mySection.appendChild(myH2);
    mySection.appendChild(myH3);
    mySection.appendChild(mySlogan);
    mySection.appendChild(myPrice);
    mySection.appendChild(myTagList)

    main.appendChild(mySection);
}