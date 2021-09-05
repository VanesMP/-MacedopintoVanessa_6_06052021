//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)
fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);
        console.log(json.media);
        onloadPhotographer(json.photographers, json.media);

    })
    .catch(function() {

    })

//Affichage du photographe grace a son Id dans l' url
//partie profil
function findPhotographer(photographers, pageId) {

    for (let i = 0; i < photographers.length; i++) {
        if (pageId === photographers[i].id) {
            console.log(photographers[i].name);
            return photographers[i];
        }
    }
}
//partie medias
function findMedia(media, pageId) {
    var mediaByPhotographer = media
        .filter((media) => media.photographerId === pageId)
    console.log(mediaByPhotographer)
    return mediaByPhotographer;
};

//Methode qui a l ouverture, appelle toutes les fonctions. de la page 
//1: trouve l' id qui est dans l url,
//2: cherche dans le tableau des photographes,l' id qui correspondant a celui dans l' url et renvoyer le photographe
//3 : faire apparaitre en html les informations du photographe
//3 bis: decouper le nom du photographe avec le photographe trouvé 
// 4: cherche dans les medias tous les medias du photographe
//4bis: on cherche dans les medias image ceux qui sont undifined pour cibler les medias videos et les faire apparaitre aussi.
// 5: pour chaque media du photographes on les fait apparaitre dans le html qui a ete créé en utilisant la variable prenom pour retrouver le chemin du dossier

function onloadPhotographer(photographers, media) {
    //1
    var params = (new URL(window.location)).searchParams;
    var pageId = parseInt(params.get('id'));
    console.log(pageId)
        //2
    var theGoodOnePhotograph = findPhotographer(photographers, pageId);
    //3
    showProfil(theGoodOnePhotograph);
    console.log(theGoodOnePhotograph);
    //3bis
    var myPrenom = recupNom(theGoodOnePhotograph)
    console.log(myPrenom);
    /*//4bis
    var mediaVideo = mediaPhotoorVideo(theGoodOnePhotograph)
    console.log(mediaVideo)*/
    //4
    findMedia(media, pageId)
        .forEach((media) => {
            showMedia(media, myPrenom);
        });

    //showLikeAndPrice(foundP);
    //totalLike(foundM)

}
//PROFIL
//creer d'un modele photographe
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

//MEDIA
//Methode pour avoir le lien du fichier medias du photographe
function recupNom(photograph) {
    var leNomComplet = photograph.name

    var prenom = leNomComplet
        .split(' ')
    return prenom[0]
}
/*
//Methode pour le media photo et video
function mediaPhotoorVideo(media) {
    var leMedia = media
        .filter((media) => media.image === undefined)
        .map((media) => media.video)
    return leMedia
}
*/
// Création du modèle des media des photographes
function showMedia(media, prenom) { //manque les photograph pour le nom pour le repertoire ligne 105

    var mediaGallery = document.createElement('div');
    mediaGallery.classList.add("mediaGallery");

    var myContainerMedia = document.createElement('div');
    myContainerMedia.classList.add("containerMedia");

    var myBoxMedia = document.createElement('div');
    myBoxMedia.classList.add("boxMedia");
    var myMedia = document.createElement('img');
    myMedia.classList.add("media");
    myMedia.src = `./Sample-Photos/${prenom}/${media.image}`; // les medias n apparaissent pas ??
    myBoxMedia.appendChild(myMedia);


    var myBoxTextMedia = document.createElement('div');
    myBoxTextMedia.classList.add('boxTextMedia')

    var myTitreMedia = document.createElement('h4');
    myTitreMedia.innerHTML = media.title;
    myTitreMedia.classList.add("titreMedia");

    var myNbrLike = document.createElement('div');
    myNbrLike.classList.add("nbrLike");
    var myNbr = document.createElement('p');
    myNbr.innerHTML = media.likes;
    myNbr.classList.add("nbr");
    var myIconHeart = document.createElement('div');
    myIconHeart.src = "./Sample-Photos/heart.svg";
    myIconHeart.classList.add("iconHeart");

    myNbrLike.appendChild(myNbr);
    myNbrLike.appendChild(myIconHeart);
    myBoxTextMedia.appendChild(myTitreMedia);
    myBoxTextMedia.appendChild(myNbrLike);

    var mySectionTwo = document.getElementById('partTwo');

    myContainerMedia.appendChild(myBoxMedia);
    myContainerMedia.appendChild(myBoxTextMedia);
    mediaGallery.appendChild(myContainerMedia);
    mySectionTwo.appendChild(mediaGallery);
}

//FORMULAIRE
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

//LIKE
//Création de la box de bas de page statique qui contient le nombre de like et le tarif des photographes
function showLikeAndPrice(photographer) {

    var boxTextLikeAndPrice = document.createElement('div');
    boxTextLikeAndPrice.classList.add('boxText');

    var boxLike = document.createElement('div');
    boxLike.classList.add('boxLike');

    var like = document.createElement('p');
    like.innerHTML = totalLike(media);

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
//création de la méthode pour calculer le nombre de like total depuis le json.
function totalLike(media) {
    var total = 0;
    media.forEach(media => {
        total = total + media.likes
    })
    console.log(total)
    return total
}
//var totalAll = totalLike(media);
//console.log(totalAll);