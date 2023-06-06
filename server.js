const figlet = require('figlet');
const colors = require('colors/safe');
colors.enable();

const db = require('./config/connection');
const initialPrompt = require('./lib/initialPrompt');


// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected");
  console.log(
    colors.gray(
      `==========================================================================`
    )
  );
  console.log(``);
  console.log(colors.rainbow(figlet.textSync('            Employee')));
  console.log(colors.rainbow(figlet.textSync('                Tracker')));
  console.log(``);
  console.log(
    colors.gray(
      `==========================================================================`
    )
  );
  console.log(``);
  initialPrompt();
});