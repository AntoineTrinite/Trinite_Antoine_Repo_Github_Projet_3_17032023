const gallery = document.querySelector('.gallery')
const btnGroup = document.querySelector('#category-group');

// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then(data => {

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
    });
    // Tableau set
    const setOfCategories = new Set();

    // création du bouton "tous"
    const tousBtn = document.createElement('button');
        tousBtn.innerText = "Tous";
        tousBtn.classList.add('category-btn');
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

})
.catch(error => {
    console.error(error);
});



// curl -X 'GET' \
//   'http://localhost:5678/api/works' \
//   -H 'accept: application/json'

/* <figure>
<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
<figcaption>Abajour Tahina</figcaption>
</figure> */