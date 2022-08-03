/* Data */
// If x = 1, then the distance is 10 pixels, if x = 2, then the distance is 20 pixels, etc. Same goes for y.
let coords = { x: [], y: [] };

// x.json @ https://jsonkeeper.com/b/NJ7J
// y.json @ https://jsonkeeper.com/b/KH24

// read the content of the array "x" in the ./x.json
fetch("./x.json")
    .then((response) => response.text())
    .then((data) => {
        data = JSON.parse(data);
        coords.x = data.x;
    });

// read the content of the array "y" in the ./y.json
fetch("./y.json")
    .then((response) => response.text())
    .then((data) => {
        data = JSON.parse(data);
        coords.y = data.y;
    });

// Compteur
let counter = 0;

const soleil = document.querySelector(".soleil");

const offsetSoleil = parseFloat(getComputedStyle(document.querySelector(".etoile")).width) / 4;
console.log(offsetSoleil);

/*  Soleil */
const soleilX = window.innerWidth / 2;
const soleilY = window.innerHeight / 2;

soleil.style.left = `${soleilX}px`;
soleil.style.top = `${soleilY}px`;

function update(planete) {
    planete.theta += planete.speed;
    planete.el.style.left = `${
        Math.cos(planete.theta) * planete.distance + soleilX + offsetSoleil
    }px`;
    planete.el.style.top = `${
        Math.sin(planete.theta) * planete.distance + soleilY + offsetSoleil
    }px`;
}

function update2(planete) {
    // On remet le compteur à 0 quand il atteint la taille de l'array
    if (counter > coords.x.length) {
        counter = 0;
    } else {
        counter++;
    }

    const x = coords.x[counter];
    const y = coords.y[counter];

    // Apply the data to the planet, centered aroud the sun
    planete.el.style.left = `${100 * parseFloat(x) + soleilX + offsetSoleil}px`;
    planete.el.style.top = `${100 * parseFloat(y) + soleilY + offsetSoleil}px`;
}

/* Planetes */
let planetes = [
    {
        name: "Mercure",
        el: document.querySelector(".mercure"),
        speed: 0.01,
        theta: 0,
        distance: 60,
    },
    {
        name: "Terre",
        el: document.querySelector(".terre"),
        speed: 0.005,
        theta: 0,
        distance: 200,
    },
    {
        name: "Saturne",
        el: document.querySelector(".saturne"),
        speed: 0.001,
        theta: 0,
        distance: 250,
    },
];

// Révolution des planetes
setInterval(() => {
    for (let planete of planetes) {
        update(planete);
    }
}, 1);

const plaTest = {
    el: document.querySelector(".plaTest"),
    pos: {
        x: null,
        y: null,
    },
};

// Déplacement de la planète, en utilisant les données de data
setInterval(() => {
    update2(plaTest);
}, 1);


/* TESTS */

const test = document.querySelector(".test");

test.style.top = `${soleilY + offsetSoleil - 10}px`;
test.style.left = `${soleilX + offsetSoleil - 10}px`;