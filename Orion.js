const bomber = require("bomber-api");
const inquirer = require("inquirer");
const { clear } = require("console");
const { exit } = require("process");
const config = require("./config.json");

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
			name: "useConfig",
			message: "[ORION]: Use Config? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() === "y" || value.toLowerCase() === "n";
				return valid || "[ORION]: Please Enter Y/N...";
			},
			filter: function (input) {
				if (input.toLowerCase() === "y" || input.toLowerCase() === "n") {
					return input;
				}
				return "";
			},
		},
		{
			type: "input",
			name: "targetNumber",
			message: "[ORION]: Target Number: ",
			when: function (value) {
				return value.useConfig.toLowerCase() === "n";
			},
			validate: function (input) {
				if (!/[8-8]{1,1}[0-9]{1,3}[0-9]{1,3}[0-9]{1,2}[0-9]{1,2}/.test(input)) {
					return "[ORION]: Please Enter Valid Phone Number... [8XXXXXXXXXX]";
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
			message: "[ORION]: Number Of Repeats: ",
			when: function (value) {
				return value.useConfig.toLowerCase() === "n";
			},
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "[ORION]: Please Enter The Number...";
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
			message: "[ORION]: Start? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() === "y" || value.toLowerCase() === "n";
				return valid || "[ORION]: Please Enter Y/N...";
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
		if (info.useConfig.toLowerCase() === "y") {
			bomber.attack(config.target_number, config.number_of_repeats);
		} else {
			bomber.attack(info.targetNumber, info.nor);
		}
	} else {
		setTimeout(() => {
			exit();
		}, 1000);
	}
});

function call(func) {
	return func();
}
