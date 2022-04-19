let items = ['Speed', 'Cross country', 'Gravel', 'Full Suspension', 'Hard Tail', 'City', 'Fixie', 'Hybrid', 'BMX', 'Kid', 'Other', 'E-Bike', 'E-Scooter'];

let services = ["None", "Basic service", "Full Service", "Special Service"];

let eproblem = ["Dead Battery", "Motor Failed", "Display off", "Not charging", "Pedal Assistant", "Throttle"];

let makeparts = ["Shimano", "Sram", "DTSwiss", "Mavic", "Campagnolo", "M-Wave", "Tifose", "Others"];
let maketyres = ["Maxxis", "Vittoria", "Schwalbe", "Kenda", "Kujo", "Others"];

let brakeType = ["None", "V-Brakes", "Road Brakes", "Disc Brakes", "Cantilevers"];
let pads = ["None", "Front", "Back", "Both"];
let disc = ["None", "120x6 Bolt", "120 C.lock", "140x6 Bolt", "140 C.lock", "160x6 Bolt", "160 C.lock", "180x6 Bolt", "180 C.lock", "208x6 Bolt", "208 C.lock"];

let chain = ["None", "Single speed", "5/6/7/8 speed", "9 speed", "10 speed", "11 speed", "12speed"];
let cassette = ["None", "11-28", "11-30", "11-32", "11-34", "11-38", "11-50", "16", "18"];

let crankset = ["None", "28/38/48", "28/36", "34", "34/50", "36/50", "36/52", "38", "45", "50"];

let tyres = ["None", "Front Tyre", "Back Tyre", "Front Tube", "Back Tube", "F. Tyre & Tube", "B. Tyre & Tube", "F. & B. Tube", "F. & B. Tyre", "F.B. Tyre & Tube"];
let size = ['8"', '10"', '12"', '14"', '16"', '18"', '20"', '24"', '26"x1-1/4', '26"x1-3/8', '27"x 1-1/4', '27.5"', '28"x1-1/4', '28"x1-3/8', '29"', '700'];

let bottomBracket = ["None", "Service", "New Square", "New HollowTech", "New PressFit"];
let headSet = ["None", "Service", "Bearings", "New Integrated ", "Sealed bearings"];

function htmlselect(idlocal, item) {
  let x = document.getElementById(idlocal);
  for (let i = 0; i < item.length; i++) {
    let option = document.createElement("option");
    option.value = item[i];
    option.text = item[i];
    x.appendChild(option);
  }
};

serOrderNum();
htmlselect("model", items);
htmlselect("typeservice", services);
htmlselect("eType", eproblem);
htmlselect("typeBrakes", brakeType);
htmlselect("pads", pads);
htmlselect("disc", disc);
htmlselect("chain", chain);
htmlselect("cassette", cassette);
htmlselect("crankset", crankset);
htmlselect("makeparts", makeparts);
htmlselect("maketyres", maketyres);
htmlselect("flattyre", tyres);
htmlselect("sizetyre", size);
htmlselect("makewheels", makeparts);
htmlselect("sizewheel", size);
htmlselect("typeBrakeWheel", brakeType);
htmlselect("bottomBracket", bottomBracket);
htmlselect("headSet", headSet);


function dateArr() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('dateArr').value = today;
};
dateArr();

function pickOption(idSelect, idOption) {
  let select = document.getElementById(idSelect);
  let value = select.options[select.selectedIndex].value;
  console.log(value)
};

const electron = require("electron");
const { ipcRenderer } = electron;
const form = document.getElementById("form");
const elements = {};
form.addEventListener("submit", event => {
  event.preventDefault();
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type !== "submit")
      elements[form.elements[i].name] = form.elements[i].value;
  }
  ipcRenderer.send("servicesBikes:create", elements);
});

function serOrderNum() {
  var localDate = new Date();
  var year = String(localDate.getYear());
  var mouth = String(localDate.getMonth() + 1).padStart(2, '0');
  var day = String(localDate.getDate()).padStart(2, '0');
  var hour = String(localDate.getHours()).padStart(2, '0');
  var min = String(localDate.getMinutes()).padStart(2, '0');
  var sec = String(localDate.getSeconds()).padStart(2, '0');
  var serOrdNumb = year+mouth+day+"."+hour+min+sec;
  document.getElementById("serNumber").value = serOrdNumb;
}