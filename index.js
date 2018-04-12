
Web3 = require('web3');

if (typeof web3 != 'undefined')
{
	web3 = new Web3(web3.currentProvider);
	console.log("existing web3: provider " + typeof web3);
	console.log(web3.currentProvider);
}
else{
	//To Do..
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
	console.log("new provider " + web3);
}

console.log(web3.isConnected());
console.log(web3.eth.accounts[0]);


abi = JSON.parse('[{"constant":false,"inputs":[{"name":"fname","type":"string"},{"name":"lname","type":"string"},{"name":"id","type":"uint256"}],"name":"setProfessor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProfessor","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"firstname","type":"string"},{"indexed":false,"name":"lastname","type":"string"},{"indexed":false,"name":"collegeid","type":"uint256"}],"name":"ProfessorEv","type":"event"}]');
var ProfContract = web3.eth.contract(abi);
//Ropsten Deployed Address Contract - See Video on Deploying to Ropsten
contractInstance = ProfContract.at('0x7f6867b296e07c12f12e475900ecb4a68aa33763');
console.log (contractInstance);

var fname = "Mike";
var lname = "luy";
var id = 123;


function setProfessor() {

	contractInstance.setProfessor(fname, lname, id, { from: web3.eth.accounts[0]}, function() {
		contractInstance.getProfessor((error, result) => {
			if (!error)
				console.log("Data: " + result);
			else
				console.log("ERROR!");
		});


});
}
