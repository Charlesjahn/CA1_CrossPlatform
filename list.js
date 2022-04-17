const electron = require("electron");
const { ipcRenderer } = electron;
ipcRenderer.send("servicesBikes:request:list");
ipcRenderer.on("servicesBikes:response:list", (event, servicesBikesX) => {
    const listDiv = document.getElementById("list");
    servicesBikesX.forEach(servicesBikes => {
        const servicesBikesDiv = document.createElement("div");
        servicesBikesDiv.className = "divAppoit"
        const nameParagraph = document.createElement("p");
        nameParagraph.innerHTML = `Name: ${servicesBikes.name}`;
        const phoneNumber = document.createElement("p");
        phoneNumber.innerHTML = `Phone Number: ${servicesBikes.phoneNumber}`;
        const dateArrParagraph = document.createElement("p");
        dateArrParagraph.innerHTML = `Arrival Date: ${servicesBikes.dateArr}`;
        const dateSerParagraph = document.createElement("p");
        dateSerParagraph.innerHTML = `Service Date: ${servicesBikes.dateSer}`;
        const priceParagraph = document.createElement("p");
        priceParagraph.innerHTML = `Price: ${"€" + servicesBikes.price}`;
        const extrainfoParagraph = document.createElement("p");
        extrainfoParagraph.innerHTML = `Extra Info: ${servicesBikes.extrainfo}`;
        const doneParagraph = document.createElement("p");
        doneParagraph.innerHTML = `Done: ${servicesBikes.done ? "Yes" : "No"}`;
        servicesBikesDiv.appendChild(nameParagraph);
        servicesBikesDiv.appendChild(phoneNumber);
        servicesBikesDiv.appendChild(dateArrParagraph);
        servicesBikesDiv.appendChild(dateSerParagraph);
        servicesBikesDiv.appendChild(priceParagraph);
        servicesBikesDiv.appendChild(extrainfoParagraph);
        servicesBikesDiv.appendChild(doneParagraph);
        listDiv.append(servicesBikesDiv);
    });
});