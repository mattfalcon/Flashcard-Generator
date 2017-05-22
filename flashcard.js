var fs = require ("fs");



module.exports = flashcard;

// constructor for BasicFlashcard
function flashcard(front, back) {
    this.front = front;
    this.back = back;
    this.create = function() {
        var data = {
            front: this.front,
            back: this.back,
            type: "basic",
        };
        // add card to log.txt
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
}
