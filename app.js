var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var Web3 = require("web3");
let fs = require("fs");
let ipfs = require("ipfs-http-client");
var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "web/views"));
app.use("/public", express.static(__dirname + "/web/public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

let ipfsAdd = ipfs.create({host:"ipfs.infura.io", port:"5001"});
// Deploy Smart Contract and place smart contract address here
var ContractAddress = "0x2736A4e2E9626EbE7CEf72f7D209cA7eC72AC774";

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/institution", function (req, res) {
  res.render("institution");
});

app.get("/AddUser", function (req, res) {
  var data = { ContractAddress: ContractAddress };
  res.render("AddUser", data);
});

app.get("/AddUserDL", function (req, res) {
  var data = { ContractAddress: ContractAddress };
  res.render("AddUserDL", data);
});

app.get("/ViewRequest", function (req, res) {
  var data = { ContractAddress: ContractAddress };
  res.render("ViewRequest", data);
});

app.post("/ViewRequestDetail", function (req, res) {
  RequestIndex = req.body.hdnRequestIndex;
  InstitutionName = req.body.hdnInstitutionName;
  var data = {
    ContractAddress: ContractAddress,
    RequestIndex: RequestIndex,
    InstitutionName: InstitutionName,
  };
  res.render("ViewRequestDetail", data);
});

app.get("/RequestAccess", function (req, res) {
  var data = { ContractAddress: ContractAddress };
  res.render("RequestAccess", data);
});

app.get("/ViewRequest_Org", function (req, res) {
  var data = { ContractAddress: ContractAddress };
  res.render("ViewRequest_Org", data);
});

app.post("/ViewRequestDetail_Org", function (req, res) {
  RequestIndex = req.body.hdnRequestIndex;
  InstitutionName = req.body.hdnInstitutionName;
  var data = {
    ContractAddress: ContractAddress,
    RequestIndex: RequestIndex,
    InstitutionName: InstitutionName,
  };
  res.render("ViewRequestDetail_Org", data);
});

app.get("/Message", function (req, res) {
  var TransHash = req.query.TransHash;
  res.render("Message", { TransHash: TransHash });
});

app.get("/storefile", async function (req, res) {
  try {
	// console.log("true")
    let data = fs.readFileSync("./web/public/img/coach.png");
    let ipfsRes = await ipfsAdd.add({ fileName: "my.png", content: data });
    console.log(ipfsRes);
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
