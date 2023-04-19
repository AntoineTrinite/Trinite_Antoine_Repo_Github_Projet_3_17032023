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


function updateDom() {
   //affichage de l'image et des titres
   data.forEach(function(works) {
    const fig = document.createElement('figure')
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
    //affichage de l'image et des titres
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

        //ajout de la taille des images et display
        imgModale.style.height = "102px";
        imgModale.style.width = "76px";
        figModale.style.rowGap ="2px";
        figModale.style.display = "flex";
        figModale.style.flexDirection = "column";
        // récupération de l'image et du titre
        const imageURL = works.imageUrl;
        imgModale.src = imageURL;

        // ajout du code à l'HTML
        modaleBtnGroup.appendChild(moveBtn);
        modaleBtnGroup.appendChild(deleteBtn);
        figModale.appendChild(modaleBtnGroup);
        figModale.appendChild(imgModale);
        figModale.appendChild(titreModale);
        modalePhotosModif.appendChild(figModale);

        works.figModale = figModale;
        works.deleteBtn = deleteBtn;
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
`<div class="modale-bg">
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

                <div class="photo-zone">
                <i class="fa-regular fa-image"></i>
                    <button class="ajouter-photo">+ Ajouter photo</button>
                    <p>jpg, png : 4mo max</p>
                </div>
                <div class="add-description">
                    <form id="formulaire-ajout">
                        <div class="form-group">
                            <label for="titre">Titre</label>
                            <input type="text" id="titre" name="titre" required>
                        </div>
                        <div class="form-group form-border">
                            <label for="categorie">Catégorie</label>
                            <select id="categorie" name="categorie" required>
                                <option value="" disabled selected></option>
                                <option value="option1">Objets</option>
                                <option value="option2">Appartements</option>
                                <option value="option3">Hotels & restaurants</option>
                            </select>
                        </div>
                    <input id="validation-btn" type="submit" value="Valider">
                </form>
                </div>
            </div>
        </div>
    </div>
</div>`;
// condition de connexion
if(token){
    //création des boutons de modification
    profilModifBtn = createButton(profile, 60, 13);
    projectsModifBtn = createButton(projects, 30, 0);

    //ajout de la modale au DOM
    const modaleAll = document.createElement('div');
    modaleAll.style.display = "none";
    modaleAll.innerHTML = modale;
    document.body.appendChild(modaleAll);

    //ouverture et fermeture de la modale
    const closeBtn = document.querySelector(".modale-close-btn")
    projectsModifBtn.onclick = function () {
        modaleAll.style.display = "block";
    }
    closeBtn.onclick = function () {
        modaleAll.style.display = "none";
        returnArrow.style.display = "none";
        galleryModale.style.display = "flex";
        addImageModale.style.display = "none";
    }

    //création de la flèche de retour en arrière dans la modale
    const returnArrow = document.querySelector('.modale-return-btn');
    const addImageBtn = document.querySelector('#modale-add-button');
    const galleryModale = document.querySelector('#gallery-modale');
    const addImageModale = document.querySelector('#add-image-modale');
    addImageBtn.onclick = function () {
        returnArrow.style.display = "none";
        galleryModale.style.display = "none";
        addImageModale.style.display = "flex";
        returnArrow.style.display = "block";
    }
    returnArrow.onclick = function () {
        returnArrow.style.display = "none";
        galleryModale.style.display = "flex";
        addImageModale.style.display = "none";
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




// Suppression des travaux existants - PARTIE 2

// fig
// figModale;
// deleteBtn; de la modale


//     function delRequest() {
//      fetch('https://api.example.com/data', {
//     method: 'DELETE', 
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'token'
//     },
// })
//     .then((response) => response.json())
//     .then(response2 => {
//         data = response2
//     })
//     .catch(error => {
//         console.error(error);
//     });   
//     }

// Envoi d’un nouveau projet au back-end via le formulaire de la modale - PARTIE 3

// Traitement de la réponse de l’API pour afficher dynamiquement la nouvelle image de la modale.
