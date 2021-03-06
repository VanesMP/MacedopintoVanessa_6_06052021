//variabes globales
var mySection = document.getElementById("containerPhotographers");
var myElement = document.querySelectorAll(".containerOne");
var listTag = [];

//Invisible sauf si interaction. 
//Apparait quand l’utilisateur descend sur la page & Redirige vers le contenu de main. 
//Etape 1: fixer l'élement au scroll
const returnNav = document.querySelector(".btnContenu");

window.addEventListener("scroll", () => {
    if (window.scrollY >= 75) {
        returnNav.style.display = "block";
        returnNav.classList.add("animationVisibility");
    } else {
        returnNav.style.display = "none";
    }
});

//Recuperer les donnees JSON avec la methode fetch() (creer une requête fetch)

fetch("fisheyeData.json")
    .then(response => {
        return response.json();
    })
    .then(json => {
        sortByTag(json.photographers);
        gestionPhotographer(json.photographers);
    })
    .catch(function() {

    });
//Methode pour trier les photographes selon les tags
//Recuperer la valeur des tags avec this.id dans les evntListener
//filtrer le tableau des tags des photographes et afficher les photographes souhaitaient.
//Ajouter un style au click
var navTags = document.getElementsByClassName("tag");
//Methode pour trier les photographes au 'click'
function sortByTag(photographers) {
    for (let i = 0; i < navTags.length; i++) {
        navTags[i].addEventListener("click", function() {
            laDeselection();
            navTags[i].classList.add("tagSelect");
            mySection.innerHTML = " ";
            var thisId = this.id;
            photographers.filter((photographers) => {
                for (let i = 0; i < photographers.tags.length; i++) {
                    if (thisId === photographers.tags[i]) {
                        addPhotographer(photographers);
                    }
                }
            });
        });
        //Methode pour trier les photographes avec 'keyup'= enter 
        navTags[i].addEventListener("keyup", function(e) {
            if (e.key === "Enter") {
                laDeselection();
                navTags[i].classList.add("tagSelect");
                mySection.innerHTML = " ";
                var thisId = this.id;
                photographers.filter((photographers) => {
                    for (let i = 0; i < photographers.tags.length; i++) {
                        if (thisId === photographers.tags[i]) {
                            addPhotographer(photographers);
                        }
                    }
                });
            }
        });
    }
}

//Methode pour retirer le style sur tous les tags pour pouvoir replacer le style au changement de choix de tag de l' utilisateur
function laDeselection() {
    for (let i = 0; i < navTags.length; i++) {
        navTags[i].classList.remove("tagSelect");
    }
}

//afficher tous les photographes selon le modele
function gestionPhotographer(photographers) {
    photographers.forEach(photograph => {
        addPhotographer(photograph);
    });
}

//creer un modele photographe
function addPhotographer(photographer) {

    myElement = document.createElement("div"); //container pour tous les elements
    myElement.classList.add("containerOne");

    var mylinkPhotographer = document.createElement("a");
    mylinkPhotographer.classList.add("containerPortraitOne"); // lien
    mylinkPhotographer.setAttribute("href", "photographer-page.html?id=" + photographer.id + photographer.name);
    mylinkPhotographer.setAttribute("id", photographer.id);

    var myImage = document.createElement("img");
    myImage.src = "./Sample-Photos/Photographers-ID-Photos/" + photographer.portrait; //portrait
    myImage.alt = photographer.alt; //alt
    myImage.classList.add("portraitOne");

    var myH2 = document.createElement("h2");
    myH2.innerHTML = photographer.name; //name
    myH2.classList.add("nameOne");

    var myH3 = document.createElement("h3");
    myH3.innerHTML = photographer.city + ", " + photographer.country; //city+country
    myH3.classList.add("localisationOne");

    var mySlogan = document.createElement("p");
    mySlogan.innerHTML = photographer.tagline; //tagline
    mySlogan.classList.add("sloganOne");

    var myPrice = document.createElement("p");
    myPrice.innerHTML = photographer.price + "€/jour"; //price
    myPrice.classList.add("priceOne");

    var myTagList = document.createElement("ul"); //tags
    myTagList.classList.add("tagsOne");

    listTag = photographer.tags;
    for (var i = 0; i < listTag.length; i++) {
        var tags = document.createElement("li");
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
    myElement.appendChild(myTagList);

    mySection.appendChild(myElement);
}