const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// console.log(web3.providers);

const web3 = new Web3("HTTP://127.0.0.1:7545");

// const web3 = new Web3("https://ropsten.infura.io/v3/37ce477e00c14a8390548738542dd9aa");
web3.eth.getAccounts(function(err,accounts){
    console.log(accounts)
})

var account = "0x77000eCD8c19eB8A89A25046C34Cb8F1B476D870"

// hidestream
var pkey = "ecd62d85a1d518869e1af2244ef6c60abf640500ae53f9c00066fc965f93d59b"

var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "T_Length",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pro_company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pro_namee",
				"type": "string"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "comp",
		"outputs": [
			{
				"internalType": "string",
				"name": "companyname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "companyaccount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "productid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "productcost",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "productrating",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "companyid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "cust",
		"outputs": [
			{
				"internalType": "address",
				"name": "customername",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "customerid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "customeraccount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "customerphonenumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "loyaltypoints",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProductDetails",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_companyname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_companyaccount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_productid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_productcost",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_productname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_productrating",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_companyid",
				"type": "uint256"
			}
		],
		"name": "setcompanydetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_customername",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_customerid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_customeraccount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_customerphonenumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_loyaltypoints",
				"type": "uint256"
			}
		],
		"name": "setcustomerdetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var contractAddress = "0x81735a4146EcB06C180cC50B8660D54EE7eEb30C";

var myContract = new web3.eth.Contract(abi,contractAddress);

console.log(myContract.methods);

 
app.get('/', function (req, res) {
    console.log(__dirname);
//   res.send('Hello World')
res.sendFile(__dirname +'/public/index.html');
});

app.get('/getString',function (req,res){
    myContract.methods.getWord().call({from:account})
.then(function(result){
    console.log(result);
    res.send(result);
})




   
})

app.post('/newWord',function(req,res){

    console.log(req.body);
    console.log('inside post') ;
	var encodedData = myContract.methods.setcompanydetails(
															req.body.companyname,
															req.body.companyaccount,
															req.body.productid,
															req.body.productcost,
															req.body.productname,
															req.body.productrating,
															req.body.companyid).encodeABI();
	console.log(encodedData);

	var transactionObject = {
		gas : "470000",
		data : encodedData,
		from : account,
		to : contractAddress
	};


	web3.eth.accounts.signTransaction(transactionObject,pkey,function(error,trans){
		console.log(trans);
		web3.eth.sendSignedTransaction(trans.rawTransaction)
		.on("receipt",function(result){
			console.log(result);
			res.send(result);
		})
	})
})



app.listen(3000,() => {
	console.log("I am listinig at post 3000 !");
})




// myCon
