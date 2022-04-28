const root = document.getElementById('list')

const priceServices = [
  {name: 'Basic Service', price: 20},
  {name: 'Full Service', price: 40},
  {name: 'Special Service', price: 60}
]

const tableBody = priceServices.map((priceService) => {
  return `<tr>
    <td>${priceService.name}</td>
    <td>${priceService.price}</td>
  </tr>`
}).join('')

const pricePads = [
  {name: 'Front', price: 20},
  {name: 'Back', price: 20},
  {name: 'Both', price: 40}
]
const tableBody2 = pricePads.map((pricePads) => {
  return `<tr>
    <td>${pricePads.name}</td>
    <td>${pricePads.price}</td>
  </tr>`
}).join('')



const priceDiscs = [
  {name: '120x6 Bolt', price: 20},
  {name: '120 C.lock', price: 40},
  {name: '140x6 Bolt', price: 60},
  {name: '160x6 Bolt', price: 20},
  {name: '160 C.lock', price: 30},
  {name: '180x6 Bolt', price: 60},
  {name: '180 C.lock', price: 20},
  {name: '208x6 Bolt', price: 30},
  {name: '208 C.lock', price: 60}
]

const tableBody3 = priceDiscs.map((priceDiscs) => {
  return `<tr>
    <td>${priceDiscs.name}</td>
    <td>${priceDiscs.price}</td>
  </tr>`
}).join('')


const priceChain = [
  {name: 'Single speed', price: 20},
  {name: '5/6/7/8 speed', price: 40},
  {name: '9 speed', price: 60},
  {name: '160x6 Bolt', price: 20},
  {name: '10 speed', price: 30},
  {name: '11 speed', price: 60},
  {name: '12speed', price: 20}

]

const tableBody4 = priceChain.map((priceChain) => {
  return `<tr>
    <td>${priceChain.name}</td>
    <td>${priceChain.price}</td>
  </tr>`
}).join('')

const priceCassete = [
  {name: '11-28', price: 20},
  {name: '11-30', price: 40},
  {name: '11-32', price: 60},
  {name: '11-34', price: 20},
  {name: '11-38', price: 30},
  {name: '11-50', price: 60},
  {name: '16', price: 20},
  {name: '18', price: 30}
 
]
const tableBody5 = priceCassete.map((priceCassete) => {
  return `<tr>
    <td>${priceCassete.name}</td>
    <td>${priceCassete.price}</td>
  </tr>`
}).join('')



const priceCrankset = [
  {name: '28/38/48', price: 20},
  {name: '28/36', price: 40},
  {name: '34', price: 60},
  {name: '34/50', price: 20},
  {name: '36/50', price: 30},
  {name: '36/52', price: 60},
  {name: '38', price: 20},
  {name: '45', price: 30},
  {name: '50', price: 60}
 
]

const tableBody6 = priceCrankset.map((priceCrankset) => {
  return `<tr>
    <td>${priceCrankset.name}</td>
    <td>${priceCrankset.price}</td>
  </tr>`
}).join('')


const table = `<table class="content-table">
<thead>
<tr>
  <th>Service</th>
  <th>Price (€)</th>
</tr>
</thead>
  ${tableBody}
  <thead>
<tr>
  <th>Pads</th>
  <th>Price (€)</th>
</tr>
</thead>
${tableBody2}
<thead>
<tr>
  <th>Disc</th>
  <th>Price (€)</th>
</tr>
</thead>
${tableBody3}
<thead>
<tr>
  <th>Chain</th>
  <th>Price (€)</th>
</tr>
</thead>
${tableBody4}
<thead>
<tr>
  <th>Cassete</th>
  <th>Price (€)</th>
</tr>
</thead>
${tableBody5}
<thead>
<tr>
  <th>Caransket</th>
  <th>Price (€)</th>
</tr>
</thead>
${tableBody6}

</table>`;

root.insertAdjacentHTML('beforeend', table)



