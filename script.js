/* Variables */
let cpt = 0;

/* Déclaration des éléments qui composeront le système solaire */
let astres = [];
let soleil;
let terre;

function setup() {
    // Change the draw() function delay
    frameRate(30);

    // Create a canvas that fills the browser window and starts at the top left
    createCanvas(windowWidth, windowHeight);

    astres = [
        {
            type: "etoile",
            nom: "Soleil",
            masse: 70,
            coords: createVector(0, 0),
            vitesse: createVector(0, 0),
            couleur: "yellow",
            element: null,
        },
        {
            type: "planete",
            nom: "Terre",
            masse: 25,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "blue",
            astre: null,
        },
        {
            type: "planete",
            nom: "Mars",
            masse: 20,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "red",
            astre: null,
        },
    ];

    /* Création des Astres */
    for (let astre of astres) {
        // Dans le cas d'une planète, récupération des coordonées de la planète
        if (astre.type === "planete") {
            fetch("./data/data.json")
                .then((response) => response.text())
                .then((data) => {
                    data = JSON.parse(data);
                    astre.coords.x = data[astre.nom].X;
                    astre.coords.y = data[astre.nom].Y;
                });
        }

        // Création de l'élément
        astre.element = new Astre(
            astre.type,
            astre.nom,
            astre.masse,
            astre.coords,
            astre.vitesse,
            astre.couleur
        );
    }
}

function draw() {
    // Il faut appliquer un offset pour centrer tous les éléments par rapport au centre de la page
    translate(width / 2, height / 2);
    background(100);
    for (let astre of astres) {
        astre.element.show();
    }

    if (cpt >= astres[1].coords.x.length) {
        cpt = 0;
    } else {
        cpt++;
    }
}

/**
 * Fonction-Clasee Astre()
 * @param {string} type Représente le type de l'astre créé
 * @param {string} nom Représente le nom de l'astre créé
 * @param {int} masse Représente le valeur de la masse de l'astre
 * @param {vector} coords Représente les coordonées de l'astre (0, 0) ==> Coin supérieur droit de l'écran
 * @param {vector} vitesse Représente la valeur et la direction du déplacement de l'astre
 * @param {string/rgb} couleur Couleur de l'astre
 */
class Astre {
    constructor(type, nom, masse, coords, vitesse, couleur) {
        this.type = type;
        this.nom = nom;
        this.masse = masse;
        this.coords = coords;
        this.vitesse = vitesse;
        this.couleur = couleur;
        this.rayon = this.masse;

        this.show = function () {
            noStroke();
            fill(this.couleur);
            if (this.type === "etoile") {
                ellipse(this.coords.x, this.coords.y, this.rayon, this.rayon);
            } else if (this.type === "planete") {
                ellipse(
                    parseFloat(this.coords.x[cpt]) * 100,
                    parseFloat(this.coords.y[cpt]) * 100,
                    this.rayon,
                    this.rayon
                );
            }
        };
    }
}
