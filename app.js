//require flashcard
var flashcard = require('./flashcard.js');

//require cloze
var cloze = require('./cloze.js');

//require inquire
var inquirer = require('inquirer');

//=====================NODEMON JS========================================
//nodemon.js For use during development of a node.js based application.
//no require for nodemon just install and run (nodemon [your node app])

//require file system module 
var fs = require('fs');


//=========================INQUIRER PROMPT AND DETAILS ===================================
//prompt to select flashcards vs cloze
//// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement exercise 11.2
//Take type, name, message, choices[, default, filter] properties. 
inquirer.prompt([{
name: 'command',
message: 'What do you want?',
//Here we give the user a list to choose from.
type: 'list',
choices: [{
    name: 'add-flashcard'
//Seperator--> choices: [ "Choice A", new inquirer.Separator(), "choice B" ]
}, new inquirer.Separator(),
{
    name: 'all-cards'
}]
}]).then(function(answer) {
//A key/value hash containing the client answers in each prompt.
if (answer.command === 'add-flashcard') {
//Run function to add card
    addCard();
}   else if (answer.command === 'all-cards') {
//ELSE IF run function to show cards
    showCards();
}
});


//==================ADD CARD FUNCTION =========================================
var addCard = function() {
// get user input
//Take type, name, message, choices[, default, filter] properties. 
    inquirer.prompt([{
        name: 'cardType',
        message: 'What kind of flashcard would you like to create?',
        type: 'list',
//choices list type
        choices: [{
            name: 'basic-flashcard'
        },new inquirer.Separator(),
         {
            name: 'cloze-flashcard'
        }]
    // once user input is received
    }]).then(function(answer) {
//=================BASIC FLASHCARD ===================================//
        if (answer.cardType === 'basic-flashcard') {
            inquirer.prompt([{
                name: 'front',
                message: 'What is the question?'
            }, {
                name: 'back',
                message: 'What is the answer?'
            }]).then(function(answer) {
                var newBasic = new flashcard(answer.front, answer.back);
                newBasic.create();
                whatsNext();
            });
//=====================CLOZE FLASHCARD ================================//
        } else if (answer.cardType === 'cloze-flashcard') {
//Take type, name, message, choices[, default, filter] properties. 
            inquirer.prompt([{
                name: 'text',
                message: 'What\'s the question?'
            }, {
                name: 'cloze',
                message: 'What is the cloze portion?'
            }]).then(function(answer) {
                    var newCloze = new clozeFlashcard (answer.text, answer.cloze);
                    newCloze.create();
                    whatsNext();
            });
        }
    });
};

//=============================NEXT STEP =============================//
var whatsNext = function() {
    // get user input
    inquirer.prompt([{
        name: 'nextAction',
        message: 'What now?',
        type: 'list',
        choices: [{
            name: 'create-card'
        }, new inquirer.Separator(),
        {
            name: 'all-cards'
        }, new inquirer.Separator(),
        {
            name: 'other-option'
        }]
    // Action from user
    }]).then(function(answer) {
        if (answer.nextAction === 'create-card') {
            addCard();
        } else if (answer.nextAction === 'all-cards') {
            showCards();
        } else if (answer.nextAction === 'other-option') {
            return;
        }
    });
};

//====================SHOW CARDS ==========================//
var showCards = function() {
//fs.readFile(file[, options], callback)
//file <string> | <Buffer> | <integer> filename or file descriptor
//The callback is passed two arguments (err, data), where data is the contents of the file.
//If options is a string, then it specifies the encoding. Example:fs.readFile('/etc/passwd', 'utf8', callback);
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log('Error occurred: ' + error);
        } else {
            console.log(data.split(';'))
        }
    });
};
