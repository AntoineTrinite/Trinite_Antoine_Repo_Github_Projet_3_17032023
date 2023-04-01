// création des constantes pour le html
const gallery = document.querySelector('.gallery')

// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then(data => {
    data.forEach(works => {
        const fig = document.createElement('figure')
        const titre = document.createElement('figcaption')
        const img = document.createElement('img')

        // récupération de l'image et du titre
        const imageURL = works.imageUrl;
        img.src = imageURL;
        titre.innerText = works.title;
        let category = works.category.name;
        console.log(category)
        // ajout du code à l'HTML
        fig.appendChild(img);
        fig.appendChild(titre);
        gallery.appendChild(fig);
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