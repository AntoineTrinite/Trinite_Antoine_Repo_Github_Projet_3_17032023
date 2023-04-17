const gallery = document.querySelector('.gallery')
const btnGroup = document.querySelector('#category-group');
let data = null

// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then(response => {
    data = response
    updateDom();
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
console.log(token)

// déclaration des boutons avant pour qu'ils soient accessible en dehors de la boucle
  let profilModifBtn;
  let projectsModifBtn;
// Option de déconnexion
if (token) {
    //logout option
    logoutBtn.innerText = 'Logout';

    //boutons de modification
    profilModifBtn = createButton(profile, 60, 13);
    projectsModifBtn = createButton(projects, 30, 0);
} else {
    logoutBtn.innerText = 'Login'
}

logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
})
    

// création de la modale - PARTIE 1
//bg
 const modalBg = document.createElement('div');
 modalBg.style.position = 'fixed';
 modalBg.style.top = '0';
 modalBg.style.left = '0';
 modalBg.style.width = '100%';
 modalBg.style.height = '100%';
 modalBg.style.background = 'rgba(0, 0, 0, 0.3)';
 modalBg.style.display = "none";
 document.body.appendChild(modalBg);

//boite
const modalBox = document.createElement('div');
modalBox.style.position = 'fixed';
modalBox.style.top = '50%';
modalBox.style.left = '50%';
modalBox.style.transform = 'translate(-50%, -50%)';
modalBox.style.width = '630px';
modalBox.style.height = '731px';
modalBox.style.background = '#ffff';
modalBox.style.borderRadius = '10px'
modalBg.appendChild(modalBox)
//bouton close
const closeBtn = document.createElement('button');
closeBtn.style.position = 'fixed';
closeBtn.style.top = '26px';
closeBtn.style.right = '30px';
closeBtn.style.height = '24px';
closeBtn.style.width = '24px';
closeBtn.style.backgroundColor = '#ffff';
closeBtn.style.border = 'none';
closeBtn.className = "fa-solid fa-xmark";
closeBtn.style.fontSize = '24px';
closeBtn.style.textAlign = 'center';
closeBtn.style.cursor = 'pointer';
modalBox.appendChild(closeBtn);
//gallerie avec photos éditables

//trait

//bouton ajouter une photo

//bouton supprimer gallerie


// ouverture et fermeture de la modale
    projectsModifBtn.onclick = function () {
        modalBg.style.display = "block";
    }

    // Close the modal
    closeBtn.onclick = function () {
        modalBg.style.display = "none";
    }

// Suppression des travaux existants - PARTIE 2
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
