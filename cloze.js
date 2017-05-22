//require module
var fs = require("fs");

module.exports = clozeFlashcard;


// constructor for ClozeFlashcard
function clozeFlashcard (text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.create = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            type: "cloze",
        };
        // add card to log.txt
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            // if there is an error, log the error
            if (error) {
                console.log(error);
            }
        });
    };
}
