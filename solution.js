const fs = require("fs");

function isPalindrome(word) {
  return word.toLowerCase() === word.toLowerCase().split("").reverse().join("");
}

const filePath = process.argv[2];

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error in reading file");
    return;
  } else {
    const word = data.trim();
    console.log(isPalindrome(word));
  }
});
