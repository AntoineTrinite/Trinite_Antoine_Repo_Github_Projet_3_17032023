const gallery = document.querySelector('.gallery')
const btnGroup = document.querySelector('#category-group');
let data = null

// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then(response => {
    data = response
    updateDom();
    updateModifGallery();
})
.catch(error => {
    console.error(error);
});

let fig;

function updateDom() {

   //affichage de l'image et des titres
   data.forEach(function(works) {
    fig = document.createElement('figure')
    const titre = document.createElement('figcaption')
    const img = document.createElement('img')

    // récupération de l'image, du titre et des catégories.
    const imageURL = works.imageUrl;
    img.src = imageURL;
    titre.innerText = works.title;
    let category = works.category.name;


    // ajout du code à l'HTML
    fig.appendChild(img);
    fig.appendChild(titre);
    gallery.appendChild(fig);
    works.fig = fig;
});
// Tableau set
const setOfCategories = new Set();

// création du bouton "tous"
const tousBtn = document.createElement('button');
    tousBtn.innerText = "Tous";
    tousBtn.classList.add('category-btn');
    tousBtn.classList.add('tous-btn');
    btnGroup.appendChild(tousBtn);

// première itération pour ajouter les catégories uniques
data.forEach(function(works) {
    setOfCategories.add(works.category.name);
});
// deuxième itération pour créer les boutons des catégories
setOfCategories.forEach(function(category) {
    let btn = document.createElement('button');
    btn.innerText = category;
    btn.classList.add('category-btn');
    btnGroup.appendChild(btn);
});

    const buttons = document.querySelectorAll('.category-btn');
    let tousButton = buttons[0];
    tousButton.classList.add('btn-active');

    //création de la boucle pour actualiser les boutons et le contenu
    buttons.forEach(function(buttonCat) {
        buttonCat.addEventListener('click', () => {
            let category = buttonCat.textContent;
    
            data.forEach(function(works) {
                let work = works.category.name;
                if (work === category || category === 'Tous') {
                    works.fig.style.display = 'block';
                } else {
                    works.fig.style.display = 'none';
                }
            });
    
            // ajout de classe pour les boutons
            buttons.forEach(function(btn) {
                btn.classList.remove('btn-active');
            });
            buttonCat.classList.add('btn-active');
        });
    });
};

function updateModifGallery() {
    
    // Affichage de l'image et des titres
    data.forEach(function(works) {
        const modalePhotosModif = document.querySelector('.modale-photos-modif');
        const figModale = document.createElement('figure');
        const imgModale = document.createElement('img');
        const titreModale = document.createTextNode('éditer');
        const moveBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const modaleBtnGroup = document.createElement('div');

        moveBtn.classList.add("move-btn");
        moveBtn.classList.add("fa-solid");
        moveBtn.classList.add("fa-up-down-left-right");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add("fa-solid");
        deleteBtn.classList.add("fa-trash-can");

        modaleBtnGroup.classList.add('modale-btn-group');

        // Ajout de la taille des images et display
        imgModale.classList.add("img-modale");
        figModale.classList.add("fig-modale");

        // Récupération de l'image et du titre
        const imageURL = works.imageUrl;
        imgModale.src = imageURL;

        // Ajout du code à l'HTML
        modaleBtnGroup.appendChild(moveBtn);
        modaleBtnGroup.appendChild(deleteBtn);
        figModale.appendChild(modaleBtnGroup);
        figModale.appendChild(imgModale);
        figModale.appendChild(titreModale);
        modalePhotosModif.appendChild(figModale);

        // Suppression des travaux existants - PARTIE 2
        let workId = works.id;

        deleteBtn.addEventListener('click', delRequest);

        function delRequest(event) {
            event.preventDefault();
            let remove;
            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }).then(response => {
                modalePhotosModif.removeChild(figModale);

                works.fig.parentNode.removeChild(works.fig);
            }).catch(error => {
                console.error('Erreur lors de la suppression : ' + error.message);
            });
        }
    });
}

//création du bouton logout
const logoutBtn = document.getElementById('log');

//creation des boutons de modif
let modifyBtn;
function createButton(targetElement, paddingLeft, paddingTop) {
    const modifyBtn = document.createElement("button");
    modifyBtn.textContent = 'modifier';
    modifyBtn.style.backgroundColor = 'transparent';
    modifyBtn.style.border = 'none';
    modifyBtn.style.color = 'black';
    modifyBtn.style.fontSize = '14px';
    modifyBtn.style.cursor = 'pointer';
  
    const modifyIcon = document.createElement("i");
    modifyIcon.className = "fa-regular fa-pen-to-square";
    modifyIcon.style.fontSize = '14px';
    modifyIcon.style.color = 'black';
    modifyIcon.style.paddingLeft = paddingLeft + 'px';
    modifyIcon.style.paddingTop = paddingTop + 'px';
    modifyIcon.appendChild(modifyBtn);
    targetElement.appendChild(modifyIcon);
  
    return modifyBtn;
  }
  
  const projects = document.getElementById('projects');
  const profile = document.getElementById('profile');

// Récupération du token de connexion
const token = sessionStorage.getItem('token');

// déclaration des boutons avant pour qu'ils soient accessible en dehors de la boucle
  let profilModifBtn;
  let projectsModifBtn;

//création de la flèche de retour en arrière dans la modale
const returnArrow = document.querySelector('.modale-return-btn');


//Structure de la modale
const modale = 
`<div class="modale-bg"></div>
    <div class="modale-box">
        <button class = "modale-return-btn fa-solid fa-arrow-left"></button>
        <button class = "modale-close-btn fa-solid fa-xmark"></button>
        <div class="main-modal-box">
            <div id="gallery-modale">
                <h3 class="modale-title">Galerie photo</h3>

                <div class="modale-photos-modif"></div>

                <div class="modale-footer">
                    <button class="modale-btn" id="modale-add-button">Ajouter une photo</button>
                    <button class="modale-btn modale-delete-button">Supprimer la galerie</button>
                </div>
            </div>
            <div id="add-image-modale">
                <h3 class="modale-title title-image">Ajout photo</h3>
                    <form id="formulaire-ajout">
                        <div class="photo-zone">
                            <div class="image-affiche"></div>
                            <div class="image-ajout">
                                <i class="fa-regular fa-image"></i>
                                <label for="image_input" id="add-image">
                                   <p class = "inner-text-add-photo"> + Ajouter photo</p>
                                    <input type="file" name="image" id="image_input" class="ajouter-photo" accept="image/png, image/jpg" required>
                                </label>
                                    <p>jpg, png : 4mo max</p>
                            </div>
                        </div>

                        <div class="add-description">
                            <div class="form-group">
                                <label for="titre">Titre</label>
                                <input type="text" id="titre" name="titre" required>
                            </div>
                            <div class="form-group form-border">
                                <label for="categorie">Catégorie</label>
                                <select id="categorie" name="categorie" required>
                                    <option value="" disabled selected></option>
                                    <option value="1">Objets</option>
                                    <option value="2">Appartements</option>
                                    <option value="3">Hotels & restaurants</option>
                                </select>
                            </div>
                        <input id="validation-btn" type="submit" value="Valider">
                        </div>
                    </form>
            </div>
        </div>
</div>`;

// condition de connexion
if(token){
    //création du bandeau au top de la page :
    const bandeau = document.createElement('div');
    const editionMode = document.createElement('p');
    const editionModeLogo = document.createElement('i');
    const editionDiv = document.createElement('div');
    const publicationBtn = document.createElement('button');
    const main = document.querySelector('main');

    editionMode.innerText = "Mode Édition";
    editionMode.style.color = "white";
    editionMode.style.fontSize = "16px";
    editionMode.style.fontWeight = "normal";

    editionModeLogo.classList.add("fa-regular");
    editionModeLogo.classList.add("fa-pen-to-square");
    editionModeLogo.style.color = "white";

    editionDiv.style.display = "flex";
    editionDiv.style.flexDirection = "row-reverse";
    editionDiv.style.gap = "12px";
    editionDiv.appendChild(editionMode);
    editionDiv.appendChild(editionModeLogo);

    publicationBtn.innerText = "publier les changements";
    publicationBtn.style.border = "none";
    publicationBtn.style.borderRadius = "60px";
    publicationBtn.style.color = "black";
    publicationBtn.style.backgroundColor = "white";
    publicationBtn.style.fontWeight = "bold";
    publicationBtn.style.padding = "11px 23px";

    bandeau.style.position = "fixed";
    bandeau.style.background = "black";
    bandeau.style.width = "100vw";
    bandeau.style.top = "0";
    bandeau.style.left = "0";
    bandeau.style.right = "0";
    bandeau.style.height = "59px";
    bandeau.style.display = "flex";
    bandeau.style.justifyContent = "center";
    bandeau.style.alignItems = "center";
    bandeau.style.gap = "21px";
    
    const header = document.querySelector('header');
    header.style.marginTop = "99px";

    main.appendChild(bandeau);
    bandeau.appendChild(editionDiv);
    bandeau.appendChild(publicationBtn);
    

    //création des boutons de modification
    profilModifBtn = createButton(profile, 60, 13);
    projectsModifBtn = createButton(projects, 30, 0);

    //ajout de la modale au DOM
    const modaleAll = document.createElement('div');
    modaleAll.style.display = "none";
    modaleAll.innerHTML = modale;
    document.body.appendChild(modaleAll);
    //création de la fonction de reset de formulaire à la sortie de la modale
    function resetForm() {
        document.getElementById("formulaire-ajout").reset();
      }
    //ouverture et fermeture de la modale
    const closeBtn = document.querySelector(".modale-close-btn");
    
    projectsModifBtn.onclick = function () {
        modaleAll.style.display = "block";
        boiteModale.style.height = "731px";
    }
    closeBtn.onclick = function () {
        modaleAll.style.display = "none";
        returnArrow.style.display = "none";
        galleryModale.style.display = "flex";
        addImageModale.style.display = "none";
        resetForm()
    }

    //création de la flèche de retour en arrière dans la modale
    const returnArrow = document.querySelector('.modale-return-btn');
    const addImageBtn = document.querySelector('#modale-add-button');
    const galleryModale = document.querySelector('#gallery-modale');
    const addImageModale = document.querySelector('#add-image-modale');
    const boiteModale = document.querySelector(".modale-box");

    addImageBtn.onclick = function () {
        returnArrow.style.display = "none";
        galleryModale.style.display = "none";
        addImageModale.style.display = "flex";
        returnArrow.style.display = "block";
        boiteModale.style.height = "670px";
    }
    returnArrow.onclick = function () {
        returnArrow.style.display = "none";
        galleryModale.style.display = "flex";
        addImageModale.style.display = "none";
        boiteModale.style.height = "731px";
        resetForm()
    }
    // fermeture de la modale si clic dehors
    const modaleBg = document.querySelector('.modale-bg');

    modaleBg.addEventListener('click', function(event) {
        // Close the modal
        modaleAll.style.display = "none";
        returnArrow.style.display = "none";
        galleryModale.style.display = "flex";
        addImageModale.style.display = "none";
        boiteModale.style.height = "731px";
        resetForm()
    });

    // sur le chargement, l'image s'affiche, remplace le reste de la zone et retour 
    // à zéro lorsque l'on clique autre part
    const imageInput = document.querySelector('#image_input');
    var uploadedImage = '';
    imageInput.addEventListener('change', function(){
    
        const imageAjout = document.querySelector(".image-ajout");
        const imageAffiche = document.querySelector(".image-affiche");
        imageAjout.style.display = "none";
        imageAffiche.style.display = "block";
    
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploadedImage = reader.result;
            document.querySelector(".image-affiche").style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(this.files[0]);
    
        returnArrow.addEventListener("click", () => {
            imageAjout.style.display = "flex";
            imageAffiche.style.display = "none";
        })
        closeBtn.addEventListener("click", () => {
            imageAjout.style.display = "flex";
            imageAffiche.style.display = "none";
        })
        modaleBg.addEventListener('click', () => {
            // Close the modal
            imageAjout.style.display = "flex";
            imageAffiche.style.display = "none";
        });
    })
    
    
//Ajout d'une image avec le formulaire
const form = document.querySelector("form")
const validationBtn = document.querySelector('#validation-btn');
const image_input = document.querySelector('#image_input');
const titreInput = document.querySelector('#titre');
const categorieInput = document.querySelector('#categorie');

image_input.addEventListener('input', validateForm);
titreInput.addEventListener('input', validateForm);
categorieInput.addEventListener('input', validateForm);

let image;
let titre;
let categorie;

function validateForm(event) {
    event.preventDefault();
    image = image_input.value;
    titre = titreInput.value;
    categorie = categorieInput.value;

    if (image !== '' && titre !== '' && categorie !== '') {
        validationBtn.style.background = '#1D6154';
        validationBtn.addEventListener('click', addRequest);
    } else {
        console.log('Merci de remplir le formulaire correctement !')
        validationBtn.removeEventListener('click', addRequest); // Added here: remove the event listener when form is not valid
        validationBtn.style.background = 'rgba(0, 0, 0, 0.3)';
    }
};

function addRequest(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image_input.files[0]);
    formData.append('title', titreInput.value);
    formData.append('category', categorieInput.value);

    fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    }).then(response => {
        console.log('Envoyé avec succès');
        // affichage du succès de l'envoi pendant 3 secondes
        const formAjout = document.querySelector('.main-modal-box');
        formAjout.style.flexDirection = "column-reverse";
        const successResponse = document.createElement('span');
        successResponse.innerText = "Projet envoyé avec succès !";
        successResponse.style.color = "green";
        successResponse.style.display = "flex";
        successResponse.style.justifyContent = "space-around";
        successResponse.style.marginBottom = "10px";
        setTimeout(() => {
            successResponse.remove();
          }, 3000);
        formAjout.appendChild(successResponse);

        //création de la partie figure
        const newFig = document.createElement('figure');

        let newImage = document.createElement('img');
        newImage.onload = () => {
            URL.revokeObjectURL(newImage.src);
        };
        let newImageURL = URL.createObjectURL(image_input.files[0]);
        newImage.src = newImageURL;
        newFig.appendChild(newImage);

        const newTitle = document.createElement('figcaption');
        newTitle.textContent = titre;
        newFig.appendChild(newTitle);
        gallery.appendChild(newFig);


        // création de la fig modale 
        const modalePhotosModif = document.querySelector('.modale-photos-modif');

        const newFigModale = document.createElement('figure');
        const newImageModale = document.createElement('img');
        newImageModale.onload = () => {
            URL.revokeObjectURL(newImageModale.src);
        };
        newImageModale.src = newImageURL;
        newImageModale.classList.add('img-modale');

        const newTitleModale = document.createElement('figcaption');
        newTitleModale.textContent = 'éditer';
        //recréation des boutons
        const moveBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        moveBtn.classList.add("move-btn");
        moveBtn.classList.add("fa-solid");
        moveBtn.classList.add("fa-up-down-left-right");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add("fa-solid");
        deleteBtn.classList.add("fa-trash-can");
        const modaleBtnGroup = document.createElement('div');
        modaleBtnGroup.classList.add('modale-btn-group');


        //append child pour créer les figures de la modale
        modaleBtnGroup.appendChild(moveBtn);
        modaleBtnGroup.appendChild(deleteBtn);
        newFigModale.appendChild(modaleBtnGroup);
        newFigModale.appendChild(newImageModale);
        newFigModale.appendChild(newTitleModale);
        modalePhotosModif.appendChild(newFigModale);

        //reset de formulaire
        resetForm()
        const imageAjout = document.querySelector(".image-ajout");
        const imageAffiche = document.querySelector(".image-affiche");
        imageAjout.style.display = "flex";
        imageAffiche.style.display = "none";
        validationBtn.removeEventListener('click', addRequest); // Added here: remove the event listener when form is not valid
        validationBtn.style.background = 'rgba(0, 0, 0, 0.3)';
    }).catch(error => {
        console.error(error.message);
    });
}
    //Option de déconnexion
    logoutBtn.innerText = 'Logout';
    logoutBtn.addEventListener('click', (event) => {
        sessionStorage.clear();
        event.preventDefault()
        location.reload()
    })
} else {
    //remplacer le bouton logout par un login si l'utilisateur n'est pas connecté
    logoutBtn.innerText = 'Login'
}
