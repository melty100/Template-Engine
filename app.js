const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const questions = [
    {
        type: "input",
        message: "Enter first and last name",
        name: "name"
    },
    {
        type: "input",
        message: "Enter your Id",
        name: "id"
    },
    {
        type: "input", 
        message: "Enter your email adress",
        name: "email"
    },
    {
        type: "list",
        message: "Enter job title.",
        name: "title",
        choices: ["Intern", "Engineer", "Manager"]
    },
    {
        type: "input",
        message: "Enter office number",
        name: "officeNumber",
        when: (ans) => {return ans.title === 'Manager';}
    },
    {
        type: "input",
        message: "Enter your github username",
        name: "github",
        when: (ans) => {return ans.title === 'Engineer';}
    },
    {
        type: "input", 
        message: "Enter last school/college attended.",
        name: "school",
        when: (ans) => {return ans.title === 'Intern';}
    },
    {
        type: "confirm",
        message: "Enter another team member's information?",
        name: "done"
    }
];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


//Generates a html file in output directory with user input via CL
async function asyncInquirer(questions){

    var done = false;
    var team = [];

    //Loops for each member
    while(!done){

        let ans = await inquirer.prompt(questions);
    
        switch(ans.title){
            case 'Manager':
                var employee = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
                break;
            case 'Engineer':
                var employee = new Engineer(ans.name, ans.id, ans.email, ans.github);
                break;
            case 'Intern':
                var employee = new Intern(ans.name, ans.id, ans.email, ans.school);
                break;
            default:
                break;
        }
        
        team.push(employee);
        done = !(ans.done);
    
    }

    fs.writeFile(outputPath, render(team), function(err) {});
}

asyncInquirer(questions);
