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

// creer un modele photographe
function addPhotographer(photographer) {

    //container pour le container des elements (dans section)

    var myElement = document.createElement('div'); //container pour tous les elements

    var myImage = document.createElement('img');
    myImage.textContent = photographer.portrait; //portrait

    var myH2 = document.createElement('h2');
    myH2.innerHTML = photographer.name; //name
    myH2.classList.add("h2");

    var myH3 = document.createElement('h3');
    myH3.innerHTML = photographer.city + "," + photographer.country; //city+country

    var mySlogan = document.createElement('p');
    mySlogan.innerHTML = photographer.tagline; //tagline

    var myPrice = document.createElement('p');
    myPrice.innerHTML = photographer.price; //price

    var myTagList = document.createElement('ul'); //tags
    myTagList.classList.add("tag");

    var listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement('li');
        tags.innerHTML = "#" + listTag[i];
        myTagList.appendChild(tags);
    }


    console.log(myElement)
    myElement.appendChild(myImage);
    myElement.appendChild(myH2);
    myElement.appendChild(myH3);
    myElement.appendChild(mySlogan);
    myElement.appendChild(myPrice);
    myElement.appendChild(myTagList)

    var mySection = document.getElementById('containerPhotographers')
    console.log(mySection)

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
        "portrait": "MimiKeel.jpg"
    }
    addPhotographer(mimi);
}

recupMimi();