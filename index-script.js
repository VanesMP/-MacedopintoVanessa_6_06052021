//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);
        gestionPhotographer(photographers)
    })
    .catch(function() {

    })

//List de tags a selctionner
function navigationTags(tags) {
    var nav = document.getElementById('#navagationMain');

    var tags = document.createElement('ul');
    tags.classList.add("tag");

    for (var i = 0; i < tags.length; i++) {
        var tag = document.createElement('li');
        tag.innerHTML = "#" + tags[i];
        tags.appendChild(tag);
    }

    nav.appendChild(tags);
}

//afficher tous les photographes selon le modele
function gestionPhotographer(photographers) {
    photographers.forEach(photograph => {
        addPhotographer(photograph);
    });

}

/*création des elements Html
var myElement = document.createElement('div'); //container pour tous les elements
var myImage = document.createElement('img'); //portrait
var myH2 = document.createElement('h2'); //name
var myH3 = document.createElement('h3'); //city+country
var mySlogan = document.createElement('p'); //tagline
var myPrice = document.createElement('p'); //price
var myTagList = document.createElement('ul'); //tags

// utilisation de la methode constructor pour créer et initialiser l' objet photographers
class photographerItems {
    constructor(portrait, name, city, country, tagline, price, tags){
        this.portarit = portrait;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.tags = tags;
    }
}*/

//creer un modele photographe

function addPhotographer(photographer) {

    var myElement = document.createElement('div'); //container pour tous les elements
    myElement.classList.add("containerOne")

    var myImage = document.createElement('img');
    myImage.innerHTML = photographer.portrait; //portrait
    myImage.classList.add("portraitOne")

    var myH2 = document.createElement('h2');
    myH2.innerHTML = photographer.name; //name
    myH2.classList.add("nameOne");

    var myH3 = document.createElement('h3');
    myH3.innerHTML = photographer.city + "," + photographer.country; //city+country
    myH3.classList.add("localisationOne")

    var mySlogan = document.createElement('p');
    mySlogan.innerHTML = photographer.tagline; //tagline
    mySlogan.classList.add("sloganOne")

    var myPrice = document.createElement('p');
    myPrice.innerHTML = photographer.price + "€/jour"; //price
    myPrice.classList.add("priceOne")

    var myTagList = document.createElement('ul'); //tags
    myTagList.classList.add("tagsOne");

    var listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement('li');
        tags.innerHTML = "#" + listTag[i];
        tags.classList.add("tag");
        myTagList.appendChild(tags);
    }

    myElement.appendChild(myImage);
    myElement.appendChild(myH2);
    myElement.appendChild(myH3);
    myElement.appendChild(mySlogan);
    myElement.appendChild(myPrice);
    myElement.appendChild(myTagList)

    var mySection = document.getElementById('containerPhotographers');
    mySection.appendChild(myElement);
    console.log(mySection);

}

//test en local
function recupMimi() {
    let mimi = {
        "name": "Mimi Keel",
        "id": 243,
        "city": "London",
        "country": "UK",
        "tags": ["portrait", "events", "travel", "animals"],
        "tagline": "Voir le beau dans le quotidien",
        "price": 400,
        "portrait": "Portrait_Nora.jpg"
    }
    addPhotographer(mimi);
}

addPhotographer();