//Invisible sauf si interaction. 
//Apparait quand l’utilisateur descend sur la page & Redirige vers le contenu de main. 
//Etape 1: fixer l'élement au scroll
const returnNav = document.querySelector('.btnContenu');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 75) {
        returnNav.style.display = 'block';
        returnNav.classList.add('animationVisibility');
    } else {
        returnNav.style.display = 'none';
    }
})

//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);
        gestionPhotographer(json.photographers);
        showId(json.photographers)
    })
    .catch(function() {

    })

//List de tags a selctionner
// ajouter un eventListener pour chaque tag (et afficher uniquement les photographer qui ont ce tag dans leur données)
var btnPortrait = document.getElementById('portrait');
btnPortrait.addEventListener('click', function(event) {
    filterByTag(btnPortrait);
});
var btnArt = document.getElementById('art');
btnArt.addEventListener('click', function(event) {
    filterByTag(btnArt);
});
var btnFashion = document.getElementById('fashion');
btnFashion.addEventListener('click', function(event) {
    filterByTag(btnFashion);
});
var btnArchitecture = document.getElementById('architecture');
btnArchitecture.addEventListener('click', function(event) {
    filterByTag(btnArchitecture);
});
var btnTravel = document.getElementById('travel');
btnTravel.addEventListener('click', function(event) {
    filterByTag(btnTravel);
});
var btnSport = document.getElementById('sport');
btnSport.addEventListener('click', function(event) {
    filterByTag(btnSport);
});
var btnAnimals = document.getElementById('animals');
btnAnimals.addEventListener('click', function(event) {
    filterByTag(btnAnimals);
});
var btnEvent = document.getElementById('event');
btnEvent.addEventListener('click', function(event) {
    filterByTag(btnEvent);
});

// Ajout d'un style à la selection d' un tag dans la barre de navigation
function filterByTag(tag) {
    laDeselection();
    laSelection(tag);

}

function laSelection(tag) {
    tag.classList.add("tagSelect");
}

function laDeselection() {
    var tagsSelection = document.querySelectorAll('.tag');
    for (let i = 0; i < tagsSelection.length; i++) {
        tagsSelection[i].classList.remove("tagSelect")
    }
};

//afficher tous les photographes selon le modele
function gestionPhotographer(photographers) {
    photographers.forEach(photograph => {
        addPhotographer(photograph);
    });

}

//creer un modele photographe
function addPhotographer(photographer) {

    var myElement = document.createElement('div'); //container pour tous les elements
    myElement.classList.add("containerOne")

    var mylinkPhotographer = document.createElement('a');
    mylinkPhotographer.classList.add("containerPortraitOne"); // lien
    mylinkPhotographer.setAttribute('href', 'photographer-page.html?id=' + photographer.id + photographer.name);
    mylinkPhotographer.setAttribute('id', photographer.id)
    console.log(mylinkPhotographer)

    var myImage = document.createElement('img');
    myImage.src = "./Sample-Photos/Photographers-ID-Photos/" + photographer.portrait; //portrait
    myImage.alt = photographer.alt; //alt
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
        tags.classList.add("tagPersonnel");
        myTagList.appendChild(tags);
    }

    mylinkPhotographer.appendChild(myImage);
    mylinkPhotographer.appendChild(myH2);
    myElement.appendChild(mylinkPhotographer);
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
    let json = [{
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tags": ["portrait", "events", "travel", "animals"],
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "MimiKeel.jpg",
            "alt": " "
        },
        {
            "name": "Ellie-Rose Wilkens",
            "id": 930,
            "city": "Paris",
            "country": "France",
            "tags": ["sports", "architecture"],
            "tagline": "Capturer des compositions complexes",
            "price": 250,
            "portrait": "EllieRoseWilkens.jpg",
            "alt": " "
        },
        {
            "name": "Tracy Galindo",
            "id": 82,
            "city": "Montreal",
            "country": "Canada",
            "tags": ["art", "fashion", "events"],
            "tagline": "Photographe freelance",
            "price": 500,
            "portrait": "TracyGalindo.jpg",
            "alt": " "
        },
        {
            "name": "Nabeel Bradford",
            "id": 527,
            "city": "Mexico City",
            "country": "Mexico",
            "tags": ["travel", "portrait"],
            "tagline": "Toujours aller de l'avant",
            "price": 350,
            "portrait": "NabeelBradford.jpg",
            "alt": " "
        },
        {
            "name": "Rhode Dubois",
            "id": 925,
            "city": "Barcelona",
            "country": "Spain",
            "tags": ["sport", "fashion", "events", "animals"],
            "tagline": "Je crée des souvenirs",
            "price": 275,
            "portrait": "RhodeDubois.jpg",
            "alt": " "
        },
        {
            "name": "Marcel Nikolic",
            "id": 195,
            "city": "Berlin",
            "country": "Germany",
            "tags": ["travel", "architecture"],
            "tagline": "Toujours à la recherche de LA photo",
            "price": 300,
            "portrait": "MarcelNikolic.jpg",
            "alt": " "
        }
    ]
    gestionPhotographer(json);
    showId(json);
}
recupMimi();
addPhotographer();