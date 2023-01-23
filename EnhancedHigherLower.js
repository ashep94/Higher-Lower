let validNum = false;
let maxNum;
let maxNumRounded;
let randNum;

// prompt user for a guessing range and validate that user's maxNum is a valid number
while (!validNum) {
    maxNum = prompt("Enter the largest range to guess from: ");

    // if user presses cancel button, maxNum is set to null, and will break out of app. If not, continue to prompt user for a valid input
    if (maxNum === null) {
        document.getElementById("guessedNumber").style.display = "none";
        document.getElementById("submitButton").style.display = "none";
        caption.innerHTML = "<h1>You closed out of the program. Refresh your browser to play.<h1>";
        break; //break out of while loop early
    } else if (isNaN(maxNum)) { // checks if user input is a number
        window.alert("That is not a number!");
    } else if (Math.round(maxNum) < 1) { //validating maxNum is at least 1 after being rounded
        window.alert("Enter a number greater than or equal to 1");
    } else {
        // if user's maxNum input is valid, round it to a whole number, and set it equal to 'maxNumRounded'
        // change display to 'select number between 1 and maxNumRounded'
        // have computer generate a random number between 1 and maxNumRounded
        validNum = true;
        maxNumRounded = Math.round(maxNum);
        let instructions = document.getElementById("instructions");
        instructions.innerHTML = `<h2>Guess a Number Between 1 and ${maxNumRounded} : </h2>`; 
        randNum = Math.floor(Math.random() * maxNumRounded) + 1;
        
    }
}


//create an empty array to contain user's guesses
const listOfGuesses = [];

// creating a function to validate user's guess vs the random number 
function validateUsersNum() {
    
    // get user's input
    let userInput = document.getElementById("guessedNumber").value;

    // creating a boolean to check if user repeats an input      
    let guessAlreadyAttempted = listOfGuesses.find(function (element) {
        return element == userInput;
    });

    //get caption from paragraph
    let caption = document.getElementById("caption");

    // check result of the random number vs user's guess 
    if (userInput < 1 || userInput > maxNumRounded) { // is it within range?
        caption.innerHTML = "That number is not in range, try again.";
    } else if (!isInt(userInput)) { // is it an integer?
        caption.innerHTML = "Submit a valid integer.";
    } else if (guessAlreadyAttempted != undefined) { // is it a repeated value?
        caption.innerHTML = "You already guessed " + userInput;
    } else { // process a valid guess
        listOfGuesses.push(userInput);
        if (userInput > randNum) { // too high?
            caption.innerHTML = "No, try a lower number.";
        } else if (userInput < randNum) { // too low?
            caption.innerHTML = "No, try a higher number.";
        } else { // correct guess
            caption.innerHTML = "<p>You got it!</p> <p>It took you " + listOfGuesses.length + " tries and your guesses were " + listOfGuesses.join(", ")+"</p>" +"<p>Refresh your browser to play again!</p>";
            document.getElementById("guessedNumber").disabled = true;
            document.getElementById("submitButton").disabled = true;
        }
    } 
}

//creating a function to validate if argument is an integer
function isInt(value) {
    let isANumber = !isNaN(value);

    if (isANumber) {
        let isAnInt = parseInt(Number(value)) == value;

        return isAnInt;
    }

    return false;
}
