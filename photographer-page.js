//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);

    })
    .catch(function() {

    })

//creer un modele photographe

function showProfil(photographer) {

    var myH2 = document.createElement('h2');
    myH2.innerHTML = photographer.name; //name
    myH2.classList.add("nameOne");

    var myH3 = document.createElement('h3');
    myH3.innerHTML = photographer.city + "," + photographer.country; //city+country
    myH3.classList.add("localisationOne");

    var mySlogan = document.createElement('p');
    mySlogan.innerHTML = photographer.tagline; //tagline
    mySlogan.classList.add("sloganOne");

    var myTagList = document.createElement('ul'); //tags
    myTagList.classList.add("tagsOne");

    var listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement('li');
        tags.innerHTML = "#" + listTag[i];
        tags.classList.add("tagPersonnel");
        myTagList.appendChild(tags);
    }

    var identity = document.getElementById('identity');

    identity.appendChild(myH2);
    identity.appendChild(myH3);
    identity.appendChild(mySlogan);
    identity.appendChild(myTagList)

    console.log(identity);

    /*var myImage = document.createElement('img');
    myImage.src = "./Sample-Photos/Photographers-ID-Photos/" + photographer.portrait; //portrait
    myImage.alt = photographer.alt; //alt
    myImage.classList.add("portraitOne")*/

}
//Ouverture du formulaire avec un eventListener au click du bouton contactez moi 
var btn = document.getElementById('btnContactMe');
btn.addEventListener('click', function(event) {
    var modale = document.getElementById('modale');
    modale.style.display = 'block';
});

//Fermeture du formulaire avec un eventListener sur la croix 

//test en local
function recupMimi() {
    let json = {
        name: "Mimi Keel",
        id: 243,
        city: "London",
        country: "UK",
        tags: ["portrait", "events", "travel", "animals"],
        tagline: "Voir le beau dans le quotidien",
        price: 400,
        portrait: "MimiKeel.jpg"
    }
    showProfil(json);
}
recupMimi();