const electron = require("electron")
const { ipcRenderer } = electron
ipcRenderer.send("servicesBikes:request:today");
ipcRenderer.on("servicesBikes:response:today", (event, servicesBikesX) => {
    const listDiv = document.getElementById("list");
    listDiv.innerHTML = "";
    servicesBikesX.forEach(servicesBikes => {
        const servicesBikesDiv = document.createElement("div");
        servicesBikesDiv.className = "divAppoit";
        const sONParagraph = document.createElement("p");
        sONParagraph.innerHTML = `Service Order number: ${servicesBikes.serviceOrder}`;
        const nameParagraph = document.createElement("p");
        nameParagraph.innerHTML = `Name: ${servicesBikes.nameCustomer}`;
        const phoneNumber = document.createElement("p");
        phoneNumber.innerHTML = `Phone Number: ${servicesBikes.phoneNumber}`;
        const dateArrParagraph = document.createElement("p");
        dateArrParagraph.innerHTML = `Arrival Date: ${servicesBikes.dateArr}`;
        const dateSerParagraph = document.createElement("p");
        dateSerParagraph.innerHTML = `Service Date: ${servicesBikes.dateSer}`;
        const priceParagraph = document.createElement("p");
        priceParagraph.innerHTML = `Price: &euro;${servicesBikes.price}`;
        const bikeParagraph = document.createElement("p");
        bikeParagraph.innerHTML = `Bike: ${servicesBikes.colouritem} ,${servicesBikes.bikebrand} ,${servicesBikes.model}`;

        const extrainfoParagraph = document.createElement("p");
        extrainfoParagraph.innerHTML = `Extra Info: ${servicesBikes.extrainfo}`;

        // testing
        const servicesDiv = document.createElement("div");
        servicesDiv.id = "serviceDiv";
        const servicesh3 = document.createElement("h3");
        servicesh3.innerHTML = `Services To Do: `;
        servicesDiv.appendChild(servicesh3);

        var test = servicesBikes.toDo;

        var x = 0;
        while (x < test.length) {
            const servicesDivinner = document.createElement("div");
            servicesDivinner.id = "serviceDivinner";
            const inputCheckBox = document.createElement("input");
            inputCheckBox.type = "checkbox";
            inputCheckBox.value = "test"
            inputCheckBox.id = "inputCheckBox"
            const labelCheckBox = document.createElement("label");
            labelCheckBox.for = "test";
            labelCheckBox.innerText = `${servicesBikes.toDo[x]}`;


            servicesDivinner.appendChild(inputCheckBox);
            servicesDivinner.appendChild(labelCheckBox);
            servicesDiv.appendChild(servicesDivinner);
            x++;
        }

        const doneParagraph = document.createElement("p");
        doneParagraph.innerHTML = `Done: ${servicesBikes.done ? "Yes" : "No"}`;
        const doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.className = "btnGeral";
        doneButton.disabled = servicesBikes.done ? true : false;
        doneButton.onclick = () => done(servicesBikes.id);
        servicesBikesDiv.appendChild(sONParagraph);
        servicesBikesDiv.appendChild(nameParagraph);
        servicesBikesDiv.appendChild(phoneNumber);
        servicesBikesDiv.appendChild(dateArrParagraph);
        servicesBikesDiv.appendChild(dateSerParagraph);
        servicesBikesDiv.appendChild(doneParagraph);
        servicesBikesDiv.appendChild(priceParagraph);
        servicesBikesDiv.appendChild(extrainfoParagraph);
        servicesBikesDiv.appendChild(bikeParagraph);
        servicesBikesDiv.appendChild(servicesDiv);
        servicesBikesDiv.appendChild(doneParagraph);
        servicesBikesDiv.appendChild(doneButton);
        listDiv.append(servicesBikesDiv);
    });
});
const done = id => {
    ipcRenderer.send("servicesBikes:done", id);
};
