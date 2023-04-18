import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
const maxNumber = 100;
const maxGuesses = 10;
let secretNumber;
let guessesLeft;
function initGame() {
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    guessesLeft = maxGuesses;
}
function playGame() {
    inquirer.prompt({
        type: 'input',
        name: 'guess',
        message: `${chalk.blueBright('Guess the secret number (1-' + maxNumber + '), you have ' + guessesLeft + ' guesses left: ')}`,
        validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num)) {
                return 'Please enter a number';
            }
            if (num < 1 || num > maxNumber) {
                return `Please enter a number between 1 and ${maxNumber}`;
            }
            if (num === secretNumber) {
                return true;
            }
            guessesLeft--;
            if (guessesLeft === 0) {
                return `${chalk.red('Sorry, you ran out of guesses. The secret number was ' + secretNumber + '.')}`;
            }
            const higherOrLower = num < secretNumber ? 'higher' : 'lower';
            return `${chalk.yellow('Nope, try again. The secret number is ' + higherOrLower + ' than ' + num + '. You have ' + guessesLeft + ' guesses left.')}`;
        }
    }).then((answer) => {
        if (answer.guess === secretNumber.toString()) {
            console.log(`${chalk.green('Congratulations! You guessed the secret number ' + secretNumber + ' in ' + (maxGuesses - guessesLeft + 1) + ' guesses.')}`);
            inquirer.prompt({
                type: 'confirm',
                name: 'playAgain',
                message: `${chalk.blueBright('Do you want to play again?')}`,
            }).then((answer) => {
                if (answer.playAgain) {
                    initGame();
                    playGame();
                }
                else {
                    console.log(`${chalk.cyan('Thanks for playing!')}`);
                }
            });
        }
    });
}
figlet('Number Guessing Game!', (err, data) => {
    if (err) {
        console.log(`${chalk.red('Error: ' + err)}`);
        return;
    }
    console.log(`${chalk.blueBright(data)}`);
    console.log(`${chalk.yellow('Welcome to the number guessing game!')}`);
    console.log(`${chalk.green("I'm thinking of a number between 1 and " + maxNumber + ". Can you guess it in " + maxGuesses + " tries?")}`);
    initGame();
    playGame();
});
