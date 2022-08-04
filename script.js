/* Variables */
let cpt = 0;

let multi = 60;

/* Déclaration des éléments qui composeront le système solaire */
let astres = [];
let soleil;
let terre;

function setup() {
    // Change the draw() function delay
    frameRate(60);

    // Create a canvas that fills the browser window and starts at the top left
    createCanvas(windowWidth, windowHeight);

    astres = [
        {
            type: "etoile",
            nom: "Soleil",
            masse: 25,
            coords: createVector(0, 0),
            vitesse: createVector(0, 0),
            couleur: "yellow",
            element: null,
        },
        {
            type: "planete",
            nom: "Mercure",
            masse: 10,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "beige",
            astre: null,
        },
        {
            type: "planete",
            nom: "Venus",
            masse: 20,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "orange",
            astre: null,
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
        {
            type: "planete",
            nom: "Jupiter",
            masse: 40,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "orange",
            astre: null,
        },
        {
            type: "planete",
            nom: "Saturne",
            masse: 35,
            coords: { x: [], y: [] },
            vitesse: createVector(0, 0),
            couleur: "beige",
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
        if (astre.type === "planete") {
            astre.element.updatePath();
        }
        astre.element.show();
    }

    if (cpt >= astres[1].coords.x.length) {
        cpt = 0;
        for (let astre of astres) {
            if (astre.type === "planete") {
                astre.element.trainee = []
            }
        }
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
        this.trainee = [];

        this.show = function () {
            noStroke();
            fill(this.couleur);
            /* Etoiles */
            if (this.type === "etoile") {
                ellipse(this.coords.x, this.coords.y, this.rayon, this.rayon);
                fill("white");
                text(
                    this.nom,
                    this.coords.x + this.rayon / 2,
                    this.coords.y + this.rayon / 2
                );
            } else if (this.type === "planete") {
                /* Planètes */
                ellipse(
                    parseFloat(this.coords.x[cpt]) * multi,
                    parseFloat(this.coords.y[cpt]) * multi,
                    this.rayon,
                    this.rayon
                );
                fill("white");
                text(
                    this.nom,
                    this.coords.x[cpt] * multi + this.rayon / 2,
                    this.coords.y[cpt] * multi + this.rayon / 2
                );

                // Création des lignes de trainée pour suivre la trajectoire de la planète
                stroke(this.couleur)
                for (let i = 0; i < this.trainee.length; i++) {
                    line(
                        this.coords.x[i] * multi,
                        this.coords.y[i] * multi,
                        this.coords.x[i + 1] * multi,
                        this.coords.y[i + 1] * multi
                    );
                }
            }
        };

        this.updatePath = function () {
            this.trainee.push({ x: this.coords.x[cpt], y: this.coords.y[cpt] });
        };
    }
}
