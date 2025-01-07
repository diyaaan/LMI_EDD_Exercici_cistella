// cistella.js (Mòdul principal)
import readlineSync from 'readline-sync';

// Classe Producte
class Producte {
    constructor(descripcio, preu) {
        this.descripcio = descripcio;
        this.preu = parseFloat(preu);
    }

    toString() {
        return `${this.descripcio} - ${this.preu.toFixed(2)} €`;
    }
}

// Classe Cistella
class Cistella {
    constructor() {
        this.productes = []; // Vector inicialment buit
    }

    afegirProducte(producte, quantitat) {
        this.productes.push({ producte, quantitat: parseInt(quantitat) });
    }

    mostrarCistella() {
        let total = 0;
        console.log('Contingut de la cistella:');
        for (const item of this.productes) {
            const subtotal = item.producte.preu * item.quantitat;
            total += subtotal;
            console.log(`${item.producte.toString()} - Quantitat: ${item.quantitat} - Subtotal: ${subtotal.toFixed(2)} €`);
        }
        console.log(`Total: ${total.toFixed(2)} €`);
    }
}

// Funció per mostrar ajuda
function mostraAjuda() {
    console.log('Ajuda. Ordres permeses:\n');
    console.log('\thelp: Mostra aquesta ajuda');
    console.log('\texit: Ix de l\'aplicació');
    console.log('\tadd: Afig un nou producte a la cistella');
    console.log('\tshow: Mostra el contingut de la cistella');
}

// Funció per afegir un producte
function afegirProducte(cistella) {
    const nom = readlineSync.question('Nom del producte: ');
    const preu = readlineSync.question('Preu del producte: ');
    if (isNaN(preu)) {
        console.log('Error: El preu ha de ser un número.');
        return;
    }

    const quantitat = readlineSync.question('Nombre d\'unitats: ');
    if (isNaN(quantitat) || parseInt(quantitat) <= 0) {
        console.log('Error: La quantitat ha de ser un número positiu.');
        return;
    }

    const nouProducte = new Producte(nom, preu);
    cistella.afegirProducte(nouProducte, quantitat);
    console.log('Producte afegit correctament!');
}

// Funció principal
function iniciarAplicacio() {
    const cistella = new Cistella(); // Crea un objecte de tipus cistella
    let ordre;

    console.log("🎄 Benvingut a l'aplicació de la Cistella de Nadal! 🎄");

    do {
        ordre = readlineSync.question('🎄> ').trim().toLowerCase();

        switch (ordre) {
            case 'add':
                afegirProducte(cistella);
                break;
            case 'show':
                cistella.mostrarCistella();
                break;
            case 'help':
                mostraAjuda();
                break;
            case 'exit':
                console.log('Bon Nadal!');
                break;
            default:
                console.log('Ordre desconeguda. Escriu "help" per vore les ordres disponibles.');
        }
    } while (ordre !== 'exit');
}

// Iniciar l'aplicació
iniciarAplicacio();