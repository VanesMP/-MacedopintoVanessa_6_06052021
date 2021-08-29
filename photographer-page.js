//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)
fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);
        console.log("photographer : " + json.photographer);
        onloadPhotographer(json.photographers);

    })
    .catch(function() {

    })
    //Affichage du photographe grace a son Id dans l' url

function findPhotographer(photographers, pageId) {

    for (let i = 0; i < photographers.length; i++) {
        if (pageId === photographers[i].id) {
            return photographers[i];
        }
    }
}

//Methode qui a l ouverture dee la page 1: trouve l' id aui est dans l url,2: cherche dans le tableau des photographes l' id qui correspondant a celui dans l' url, 3: crée les elements htlm en y inserant les donnees
function onloadPhotographer(photographers) {
    var params = (new URL(window.location)).searchParams;
    var pageId = parseInt(params.get('id'));

    var found = findPhotographer(photographers, pageId);
    showProfil(found)

    console.log(pageId)
}

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
    identity.appendChild(myTagList);

    var myphotoProfil = document.getElementById('photoProfil');
    var photo = document.createElement('img');
    photo.src = "./Sample-Photos/Photographers-ID-Photos/" + photographer.portrait; //portrait

    photo.classList.add("portraitOne");

    myphotoProfil.appendChild(photo);
}
//Ouverture du formulaire avec un eventListener au click du bouton contactez moi 
var btnOpen = document.getElementById('btnContactMe');
btnOpen.addEventListener('click', function(event) {
    var modale = document.getElementById('modale');
    modale.style.display = 'block';
});

//Fermeture du formulaire avec un eventListener sur la croix 
var btnClose = document.getElementById('close');
btnClose.addEventListener('click', function(event) {
    var modale = document.getElementById('modale');
    modale.style.display = 'none';
})

//Gestion de l' envoi du formulaire, avec la function validate()
function validate() {
    var prenom = document.getElementById("first").value;
    var nom = document.getElementById("last").value;
    var mail = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    if (prenom != "" && nom != "" && mail != "" && message != "") {
        alert('Message envoyé!')
        return true;
    } else {
        event.preventDefault();
        alert("Tous les champs de saisie sont obligatoires!");
        return false;
    }
}

/*Création de la partie media
function showMedia(medias) {

    var containerMedia = document.createElement('div');

    var boxMedia = document.createElement('div');
    var media = document.createElement('img');
    media.innerHTML = 

    var titreMedia = document.createElement('h3');

    var nbrLike = document.createElement('div');
    var nbr = document.createElement('p');
    var iconHeart = document.createElement('div');

}*/

//Création de la box de bas de page statique qui contient le nombre de like et le tarif des photographes

function showLikeAndPrice(photographer) {

    var boxTextLikeAndPrice = document.createElement('div');
    boxTextLikeAndPrice.classList.add('boxText');

    var boxLike = document.createElement('div');
    boxLike.classList.add('boxLike');

    var like = document.createElement('p');
    like.innerHTML = "297 081";

    var heart = document.createElement('img');
    heart.src = "./Sample-Photos/heart.svg";
    heart.classList.add('heart');

    var price = document.createElement('p');
    price.innerHTML = photographer.price + "€ / jour";
    price.classList.add('textPrice');

    var boxLikeAndPrice = document.getElementById('boxLikeAndPrice');

    boxLike.appendChild(like);
    boxLike.appendChild(heart);
    boxTextLikeAndPrice.appendChild(boxLike);
    boxTextLikeAndPrice.appendChild(price);
    boxLikeAndPrice.appendChild(boxTextLikeAndPrice);

}