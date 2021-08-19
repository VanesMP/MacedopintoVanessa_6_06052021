//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch('fisheyeData.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.photographers);
        gestionPhotographer(json.photographers)
    })
    .catch(function() {

    })

//List de tags a selctionner
// ajouter un eventListener pour chaque tag (et afficher uniquement les photographer qui ont ce tag dans leur données)
var btnPortrait = document.getElementById('portrait');
btnPortrait.addEventListener('click', alert('toto'));

var btnArt = document.getElementById('art');
btnArt.addEventListener('click', eventTag(btnArt));

var btnFashion = document.getElementById('fashion');
btnFashion.addEventListener('click', eventTag(btnFashion));

var btnArchitecture = document.getElementById('architecture');
btnArchitecture.addEventListener('click', eventTag(btnArchitecture));

var btnTravel = document.getElementById('travel');
btnTravel.addEventListener('click', eventTag(btnTravel));

var btnSport = document.getElementById('sport');
btnSport.addEventListener('click', eventTag(btnSport));

var btnAnimals = document.getElementById('animals');
btnAnimals.addEventListener('click', eventTag(btnAnimals));

var btnEvent = document.getElementById('event');
btnEvent.addEventListener('click', eventTag(btnEvent));

function eventTag(tag) {
    laDeselection();
    laSelection(tag);
}

function laSelection(tag) {
    console.log(tag)
    console.log(tag.classList)
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
    mylinkPhotographer.classList.add("containerPortraitOne");

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

/*test en local
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
recupMimi();
addPhotographer();*/