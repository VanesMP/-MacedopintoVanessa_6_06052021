//Creation variables glabales
var theGoodMedia = [];
var myPrenom = ' ';
var resultTotalLike = 0;
var myBoxMedia;
var myLike = document.getElementsByClassName('like');
var body = document.getElementById('body');

function getPhotographName() {
    return this.myPrenom;
}

//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)
fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        onloadPhotographer(json.photographers, json.media);
    })
    .catch(function() {

    });

//Affichage du photographe grace a son Id dans l' url
//partie profil
function findPhotographer(photographers, pageId) {

    for (let i = 0; i < photographers.length; i++) {
        if (pageId === photographers[i].id) {
            return photographers[i];
        }
    }
}
//partie medias
function findMedia(media, pageId) {
    var mediaByPhotographer = media
        .filter((media) => media.photographerId === pageId);
    return mediaByPhotographer;
}

//Methode qui a l ouverture, appelle toutes les fonctions. de la page 
//1: trouve l' id qui est dans l url,
//2: cherche dans le tableau des photographes,l' id qui correspondant a celui dans l' url et renvoyer le photographe
//3 : faire apparaitre en html les informations du photographe
//3 bis: decouper le nom du photographe avec le photographe trouvé 
// 4: cherche dans les medias tous les medias du photographe et faire apparaitre les infos contenus en utilisant la variable prenom pour retrouver le chemin du dossier
//5: afficher la box fixe avec le total de like et le tarif 
//6: recuperer le retour des fonctions pour trier par Popularité, Date, Titre
function onloadPhotographer(photographers, media) {
    //1
    var params = (new URL(window.location)).searchParams;
    var pageId = parseInt(params.get('id'));
    //2
    var theGoodOnePhotograph = findPhotographer(photographers, pageId);
    //3
    showProfil(theGoodOnePhotograph);
    //3bis
    myPrenom = recupNom(theGoodOnePhotograph);
    //4
    theGoodMedia = findMedia(media, pageId);
    theGoodMedia.forEach((media) => {
        showMedia(media, myPrenom);
    });
    //5
    resultTotalLike = totalLike(theGoodMedia);
    showLikeAndPrice(resultTotalLike, theGoodOnePhotograph);
}

//PROFIL
//creer d'un modele photographe
function showProfil(photographer) {

    var myH2 = document.createElement('h2');
    myH2.innerHTML = photographer.name; //name
    myH2.classList.add('nameOne');

    var myH3 = document.createElement('h3');
    myH3.innerHTML = photographer.city + ', ' + photographer.country; //city+country
    myH3.classList.add('localisationOne');

    var mySlogan = document.createElement('p');
    mySlogan.innerHTML = photographer.tagline; //tagline
    mySlogan.classList.add('sloganOne');

    var myTagList = document.createElement('ul'); //tags
    myTagList.classList.add('tagsOne');

    var listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement('li');
        tags.innerHTML = '#' + listTag[i];
        tags.classList.add('tagPersonnel');
        myTagList.appendChild(tags);
    }

    var identity = document.getElementById('identity');

    identity.appendChild(myH2);
    identity.appendChild(myH3);
    identity.appendChild(mySlogan);
    identity.appendChild(myTagList);

    var myphotoProfil = document.getElementById('photoProfil');
    var photo = document.createElement('img');
    photo.src = './Sample-Photos/Photographers-ID-Photos/' + photographer.portrait; //portrait

    photo.classList.add('portraitOne');
    myphotoProfil.appendChild(photo);
}

//MEDIA
//Methode pour avoir le lien du fichier medias du photographe
function recupNom(photograph) {
    var leNomComplet = photograph.name;
    var prenom = leNomComplet
        .split(' ');
    return prenom[0];
}

// Création du modèle des media des photographes
function showMedia(media, myPrenom) {
    var myContainerMedia = document.createElement('div');
    myContainerMedia.classList.add('containerMedia');

    myBoxMedia = document.createElement('div');
    myBoxMedia.setAttribute('tabindex', '0');
    myBoxMedia.classList.add('boxMedia');
    myBoxMedia.addEventListener('click', () => {
        factoryMedia(media.id);

    });
    myBoxMedia.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            factoryMedia(media.id);
        }
    });
    // photo'img' ou video'video'
    if (media.image === undefined) {
        var myMediaVideo = document.createElement('video');
        myMediaVideo.classList.add('mediaVideo');
        myMediaVideo.src = `./Sample-Photos/${myPrenom}/${media.video}`;
        myMediaVideo.setAttribute('alt', media.alt);
        myMediaVideo.setAttribute('id', media.id);
        myMediaVideo.setAttribute('name', media.title);
        myBoxMedia.appendChild(myMediaVideo);
    } else {
        var myMediaPhoto = document.createElement('img');
        myMediaPhoto.classList.add('mediaPhoto');
        myMediaPhoto.src = `./Sample-Photos/${myPrenom}/${media.image}`;
        myMediaPhoto.setAttribute('alt', media.alt);
        myMediaPhoto.setAttribute('id', media.id);
        myMediaPhoto.setAttribute('name', media.title);
        myBoxMedia.appendChild(myMediaPhoto);
    }

    var myBoxTextMedia = document.createElement('div');
    myBoxTextMedia.classList.add('boxTextMedia');

    var myTitreMedia = document.createElement('h4');
    myTitreMedia.innerHTML = media.title;
    myTitreMedia.classList.add('titreMedia');

    var myNbrLike = document.createElement('div');
    myNbrLike.classList.add('nbrLike');
    myNbrLike.setAttribute('arial-label', 'likes');
    var myNbr = document.createElement('p');
    myNbr.innerHTML = media.likes;
    myNbr.classList.add('nbr');
    myNbrLike.addEventListener('click', () => { //+1 au click
        //var mediaLike = media.likes;
        var moreLike = media.likes + 1;
        myNbr.innerHTML = moreLike;
        var moreLikeTotal = resultTotalLike += 1;
        myLike.innerHTML = moreLikeTotal;
    });

    var myIconHeart = document.createElement('div');
    myIconHeart.src = './Sample-Photos/heart.svg';
    myIconHeart.classList.add('iconHeart');

    myNbrLike.appendChild(myNbr);
    myNbrLike.appendChild(myIconHeart);
    myBoxTextMedia.appendChild(myTitreMedia);
    myBoxTextMedia.appendChild(myNbrLike);

    var mediaGallery = document.getElementById('mediaGallery');

    myContainerMedia.appendChild(myBoxMedia);
    myContainerMedia.appendChild(myBoxTextMedia);
    mediaGallery.appendChild(myContainerMedia);
}

//FORMULAIRE
//Ouverture du formulaire avec un eventListener au click du bouton contactez moi 
var modale = document.getElementById('modale');
var btnOpen = document.getElementById('btnContactMe');
var btnClose = document.getElementById('close');
var focusFirst = document.getElementById('first');
//Ouverture de la modale
btnOpen.addEventListener('click', openingModal);

function openingModal() {
    body.setAttribute('aria-hidden', 'true');
    modale.setAttribute('aria-hidden', 'false');
    body.classList.add('noScroll');
    modale.style.display = 'block';
    focusFirst.focus();
}
//Fermeture du formulaire avec un eventListener sur la croix 
btnClose.addEventListener('click', closingModal);

function closingModal() {
    body.setAttribute('aria-hidden', 'false');
    modale.setAttribute('aria-hidden', 'true');
    body.classList.remove('noScroll');
    modale.style.display = 'none';
    focusFirst.blur();
}
//Fermeture du formulaire avec la touche Escape au focus sur la croix
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closingModal();
    }
});

//Gestion de l' envoi du formulaire, avec la function validate()
// eslint-disable-next-line no-unused-vars -- methode appelé dans le html
function validate() {
    event.preventDefault();
    var prenom = document.getElementById('first').value;
    var nom = document.getElementById('last').value;
    var mail = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    if (prenom != '' && nom != '' && mail != '' && message != '') {
        console.log('Prénom: ', prenom);
        console.log('Nom: ', nom);
        console.log('Adresse mail: ', mail);
        console.log('Le message: ', message);
        closingModal();
        alert('Message envoyé!');
        return true;
    } else {
        alert('Tous les champs de saisie sont obligatoires!');
        return false;
    }
}

//BARRE DE NAVIGATION DE TRI
//1:Recuperer le choix de l' utilisateur pour le faire apparaitre en haut du dropdown
//2 variable pour gerer la gallery media lors du tri
var newGallery = document.getElementById('mediaGallery');

//2.1: Populaire
var orderPopularite = document.getElementById('popularite');
orderPopularite.addEventListener('click', sortByPopularite);
orderPopularite.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sortByPopularite();
    }
});

function sortByPopularite() {
    var parPopularite = theGoodMedia
        .sort((a, b) => b.likes - a.likes);
    newGallery.innerHTML = ' ';
    parPopularite.forEach((media) => {
        showMedia(media, myPrenom);
    });
    orderPopularite.classList.remove('visibilityHover');
    orderAlphabetique.classList.add('visibilityHover');
    orderChrono.classList.add('visibilityHover');
    styleElementDropdown();
}

//2.2: Date
var orderChrono = document.getElementById('date');
orderChrono.addEventListener('click', soryByDate);
orderChrono.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        soryByDate();
    }
});

function soryByDate() {
    var parDate = theGoodMedia
        .sort(function(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
            return 0;
        });
    newGallery.innerHTML = ' ';
    parDate.forEach((media) => {
        showMedia(media, myPrenom);
    });
    styleElementDropdown();
    orderPopularite.classList.add('visibilityHover');
    orderAlphabetique.classList.add('visibilityHover');
    orderChrono.classList.remove('visibilityHover');
}

//2.3: Titre
var orderAlphabetique = document.getElementById('titre');
orderAlphabetique.addEventListener('click', sortByTitre);
/*orderAlphabetique.addEventListener('keydown ', (e) => {
        if (e.key === 'Enter') {
            sortByTitre()
        }
    });*/

function sortByTitre() {
    var parTitre = theGoodMedia
        .sort(function(a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });
    newGallery.innerHTML = ' ';
    parTitre.forEach((media) => {
        showMedia(media, myPrenom);
    });
    orderAlphabetique.classList.remove('visibilityHover');
    orderPopularite.classList.add('visibilityHover');
    orderChrono.classList.add('visibilityHover');
    styleElementDropdown();
}
//Gestion de la barre de navigation au clavier
orderAlphabetique.addEventListener('keydown ', (e) => {
    if (e.key === 'Enter') {

        sortByTitre();
    }
});

//1:les variables globales
var myDropdown = document.querySelector('.dropdown');
var separator = document.getElementsByClassName('lineWhite');
//2:Ecouteur event por l ouverture
//3:Methode pour ouvrir/faire apparaitre la barre de tri au focus
myDropdown.addEventListener('keyup', dropdownClavier);

function dropdownClavier(e) {
    if (e.key === 'Enter') {
        event.preventDefault();
        orderPopularite.focus();
        orderPopularite.classList.remove('visibilityHover');
        orderChrono.classList.remove('visibilityHover');
        orderAlphabetique.classList.remove('visibilityHover');
        for (var i = 0; i < separator.length; i++) {
            separator[i].style.display = 'block';
        }
        orderPopularite.classList.add('populariteClavier');
        orderPopularite.classList.remove('borderDropdown');
        orderChrono.classList.add('dateClavier');
        orderChrono.classList.remove('borderDropdown');
        orderAlphabetique.classList.add('titreClavier');
        orderAlphabetique.classList.remove('borderDropdown');
    }
}
//Fermeture dropdown avec escape??barre espace sur mon clavier !! 
myDropdown.addEventListener('keyup', closingDropdown);
//Methode pour fermer la dropdown avec la touche escape
function closingDropdown(e) {
    if (e.key === 'escape') {
        orderPopularite.blur();
        orderPopularite.classList.remove('visibilityHover');
        orderChrono.classList.add('visibilityHover');
        orderAlphabetique.classList.add('visibilityHover');
        for (var i = 0; i < separator.length; i++) {
            separator[i].style.display = 'none';
        }
        styleElementDropdown();
    }
}
//Methode pour avoir le meme style sur les elements qu au hover avec la souris
function styleElementDropdown() {
    orderPopularite.classList.remove('populariteClavier');
    orderPopularite.classList.add('borderDropdown');
    orderChrono.classList.remove('dateClavier');
    orderChrono.classList.add('borderDropdown');
    orderAlphabetique.classList.remove('titreClavier');
    orderAlphabetique.classList.add('borderDropdown');
}

//Box LIKE & PRICE
//Création de la box de bas de page statique qui contient le nombre de like et le tarif des photographes
function showLikeAndPrice(resultTotalLike, photographer) {

    var boxTextLikeAndPrice = document.createElement('div');
    boxTextLikeAndPrice.classList.add('boxText');
    var boxLike = document.createElement('div');
    boxLike.classList.add('boxLike');

    myLike = document.createElement('p');
    myLike.innerHTML = resultTotalLike;
    myLike.classList.add('like');

    var heart = document.createElement('img');
    heart.src = './Sample-Photos/heartBlack.svg';
    heart.classList.add('heart');

    var price = document.createElement('p');
    price.innerHTML = photographer.price + '€ / jour';
    price.classList.add('textPrice');

    var boxLikeAndPrice = document.getElementById('boxLikeAndPrice');

    boxLike.appendChild(myLike);
    boxLike.appendChild(heart);
    boxTextLikeAndPrice.appendChild(boxLike);
    boxTextLikeAndPrice.appendChild(price);
    boxLikeAndPrice.appendChild(boxTextLikeAndPrice);

}
//création de la méthode pour calculer le nombre de like total 
function totalLike(media) {
    var resultLike = 0;
    media.forEach(media => {
        resultLike = resultLike + media.likes;
    });
    return resultLike;
}

//LIGHTBOX
var myLightbox = document.getElementById('lightBoxContainer');
var lightboxAndTitle = document.getElementById('lightbox');
var placeMedia = document.querySelector('.lightboxGallery');
var placeTitle = document.createElement('h4');
var placeholder = document.createElement('div'); //creation de l'element div pour contenir l'image mit en forme avaec la methode contenu dans la class Image/ class Video
placeholder.classList.add('placeholderStyle');
var mediaClick;

function getPlacemedia() {
    return this.placeMedia;
}

/*FactoryMethod
class Image {
    constructor(media, photographName) {
        this.media = media;
        this.photographName = photographName;
    }
    showImage(){  
        return `<img id=${media.id} src="./Sample-Photos/${photographName}/${media.image}" alt="${media.alt}" class="mediaStyle">
        <h4 class="lightboxTitle">${media.title}</h4>`;
    }
}

class Video {
    constructor(media, photographName) {
        this.media = media;
        this.photographName = photographName;
    }
    showVideo(){  
        return `<video id=${media.id} controls="" class="mediaStyle">
        <source src="./Sample-Photos/${photographName}/${media.video}" type="video/mp4">
        </video>
        <h4 class="lightboxTitle">${media.title}</h4>`;
    }
}
class MediaFactory {
    static createMedia(media, photographName) {

        if (media.image) {
            return new Image;
        } else {
           return new Video;
        }
    }
}
*/
class MediaFactory {
    static createMedia(media, photographName) {

        if (media.image) {
            return new Image(media, photographName);
        } else {

            return new Video(media, photographName);
        }
    }
}

class Image {
    constructor(media, photographName) {
        this.node = `<img id=${media.id} src="./Sample-Photos/${photographName}/${media.image}" alt="${media.alt}" class="mediaStyle">
        <h4 class="lightboxTitle">${media.title}</h4>`;
    }
}

class Video {
    constructor(media, photographName) {
        this.node = `<video id=${media.id} controls="" class="mediaStyle">
        <source src="./Sample-Photos/${photographName}/${media.video}" type="video/mp4">
        </video>
        <h4 class="lightboxTitle">${media.title}</h4>`;
    }
}

//Fonctionnement de la lightbox
function factoryMedia(mediaID) {
    //vider l'espace de la lightbox pour afficher l image choisit
    placeMedia.innerHTML = ' ';
    //Apparition de la lightbox
    myLightbox.style.display = 'block';
    //Affichage du media cliqué grace au chemin de l image
    //Chemin de l image
    mediaClick = document.getElementById(mediaID);
    console.log(this);
    console.log(mediaID);
    if (mediaClick.getAttribute('image') !== undefined) {
        // mediaClick = this.getElementsByClassName('mediaPhoto')[0];
        mediaClick.setAttribute('type', 'jpeg');
    } else {
        //mediaClick = this.getElementsByClassName('mediaVideo')[0];
        mediaClick.setAttribute('type', 'video/mp4');
        mediaClick.setAttribute('controls', 'true');
    }
    mediaClick.classList.add('mediaStyle');
    //utilisation d'un clone du media afin que l image apparaisse aussi dans la lightbox
    var cloneMediaClick = mediaClick.cloneNode(true);
    var titre = cloneMediaClick.getAttribute('name');
    placeTitle.innerHTML = titre;
    placeTitle.classList.add('lightboxTitleh4');
    lightboxAndTitle.appendChild(placeTitle);
    placeMedia.appendChild(cloneMediaClick);

    //Fonctionnement de la lightbox au clavier
    //navigation au clavier, fermer avec escape, suivant et precedent avec les fleches directionnelles
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') {
            toTheNext();
        } else if (e.key === 'ArrowLeft') {
            toThePrev();
        } else if (e.key === 'Escape') {
            myLightbox.style.display = 'none';
        }
    });
}

//Fermeture de la lightbox au clavier
var closeMyLightbox = document.querySelector('.buttonClose');
closeMyLightbox.addEventListener('click', function() {
    myLightbox.style.display = 'none';
});

//Next button pour une navigation 
var suivant = document.querySelector('.buttonNext');
suivant.addEventListener('click', toTheNext);

function toTheNext() {
    placeTitle.innerHTML = ' ';
    var lightboxGoodMedia = getTheGoodMedia(); //methode qui permet de retourner la valeur du tableau theGoodMedia
    var findIdMediaClick = getPlacemedia().getElementsByClassName('mediaStyle')[0].getAttribute('id'); //var qui contient l' id de l'image affiché
    var goodIndex = findexIndexWithId(lightboxGoodMedia, findIdMediaClick); //index de l'imgae affiché avant de passer à la suivante au click sur la fleche next

    var newIndex = goodIndex + 1 < lightboxGoodMedia.length ? //index de la nouvelle image affiché apres un click sur la fleche next en utilisant l' index de limage affiché avant le click suivant
        goodIndex + 1 : //avec l'operateur ternaire raccourci de if...else. : condition ? si vrai executer ce code : si faux executer ce code
        0;
    var newMedia = lightboxGoodMedia[newIndex]; // contient l'image affiché grace a l'index situé dans le tableau des medias 

    //factory methode
    var inPlaceMedia = getPlacemedia(); //contient la methode qui retourne la valeur suivante: element html qui contient la class="lightboxGalllery"
    inPlaceMedia.innerHTML = ' '; //commencer par vider cet element pour y placer la nouvelle image.
    var selectionMedia = MediaFactory.createMedia(newMedia, getPhotographName()); //contient la methode factory qui retourne un modele html defini pour l' affichage avec en parametre
    // la nouvelle image affiché et le nom de l'artiste
    placeholder.innerHTML = selectionMedia.node;
    inPlaceMedia.appendChild(
        placeholder);
}

//Prev button pour une navigation 
var precedent = document.querySelector('.buttonPrev');
precedent.addEventListener('click', toThePrev);

function toThePrev() {
    placeTitle.innerHTML = ' ';
    var lightboxGoodMedia = getTheGoodMedia();
    var findIdMediaClick = getPlacemedia().getElementsByClassName('mediaStyle')[0].getAttribute('id');
    var goodIndex = findexIndexWithId(lightboxGoodMedia, findIdMediaClick);

    var newIndex = goodIndex - 1 >= 0 ?
        goodIndex - 1 :
        lightboxGoodMedia.length - 1;
    var newMedia = lightboxGoodMedia[newIndex];
    //factory methode
    var inPlaceMedia = getPlacemedia();
    inPlaceMedia.innerHTML = ' ';
    var selectionMedia = MediaFactory.createMedia(newMedia, getPhotographName());

    placeholder.innerHTML = selectionMedia.node;
    inPlaceMedia.appendChild(placeholder);
}
//methode pour récuperer l id dans le tableau des medias affichés
function findexIndexWithId(medias, id) {
    for (var i = 0; i < medias.length; i++) {
        if (medias[i].id + '' === id + '') {
            return i;
        }
    }
}
//methode pour recupere la valeur de la var theGoodMedia
function getTheGoodMedia() {
    return this.theGoodMedia;
}