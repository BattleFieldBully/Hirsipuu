const input = document.querySelector('input');
const output = document.querySelector('output');
const numberOfGuesses = document.querySelector('span');

const words = [
    'vaelluskala',
    'oksennuspussi',
    'lentoemäntä',
    'markkinatalous',
    'verbaalinen',
    'surströmming',
];

let randomizedWord = '';
let maskedWord = '';
let tries = 0;

const newGame = () => {
    const random = Math.floor(Math.random() * words.length);
    randomizedWord = words[random];
    maskedWord = "*".repeat(randomizedWord.length);
    console.log(randomizedWord);    
    output.textContent = maskedWord;  
    tries = 0;
    numberOfGuesses.textContent = tries;
}

const win = () => {
    alert(`Aivan oikein! Haettu sana oli "${randomizedWord}". Käytit ${tries} yritystä.`);
    newGame();
}

const replaceFoundChars = (guess) => {
    let updatedMaskedWord = maskedWord.split(''); 
    let found = false;
    
    for (let i = 0; i < randomizedWord.length; i++) {
        if (randomizedWord[i].toLowerCase() === guess.toLowerCase()) {
            updatedMaskedWord[i] = randomizedWord[i]; 
            found = true; 
        }
    }
    
    maskedWord = updatedMaskedWord.join(''); 
    output.textContent = maskedWord;  
    
    return found; 
}

newGame();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        
        const guess = input.value.trim();
        
        if (guess) {
            tries++;
            numberOfGuesses.textContent = tries;  
            
            if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
                win();
            } else if (guess.length === 1) {
                const found = replaceFoundChars(guess);
                if (!maskedWord.includes('*')) {
                    win();
                } else if (!found) {
                    alert(`Kirjainta ei löytynyt. "${guess}"`);
                }
            } else {
                alert('Anna vain yksi kirjain tai arvaa koko sana.');
            }
        }
        
        input.value = '';  
    }
});
