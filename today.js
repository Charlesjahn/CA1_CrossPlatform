const electron = require("electron");
const { ipcRenderer } = electron;
ipcRenderer.send("servicesBikes:request:today");
ipcRenderer.on("servicesBikes:response:today", (event, servicesBikesX) => {
    const listDiv = document.getElementById("list");
    listDiv.innerHTML = "";
    servicesBikesX.forEach(servicesBikes => {
        const servicesBikesDiv = document.createElement("div");
        servicesBikesDiv.className = "divAppoit";
        const nameParagraph = document.createElement("p");
        nameParagraph.innerHTML = `Name: ${servicesBikes.name}`;
        const phoneNumber = document.createElement("p");
        phoneNumber.innerHTML = `Phone Number: ${servicesBikes.phoneNumber}`;
        const dateArrParagraph = document.createElement("p");
        dateArrParagraph.innerHTML = `Arrival Date: ${servicesBikes.dateArr}`;
        const dateSerParagraph = document.createElement("p");
        dateSerParagraph.innerHTML = `Service Date: ${servicesBikes.dateSer}`;
        const priceParagraph = document.createElement("p");
        priceParagraph.innerHTML = `Price: &euro;${servicesBikes.price}`;
        const extrainfoParagraph = document.createElement("p");
        extrainfoParagraph.innerHTML = `Extra Info: ${servicesBikes.extrainfo}`;

        // testing

        // const servicesDiv = document.createElement("div");
        // servicesDiv.id = "serviceDiv";
        // servicesLU.innerHTML = `Services To Do: ${servicesBikes.toDo.forEach(item => {
        //     const itemList = document.createElement("li")
        //     itemList.innerHTML = `${servicesBikes.toDo.item}`
        //     servicesLU.appendChild(itemList);
        // })}`;

        // servicesDiv.appendChild(servicesLU);
        const doneParagraph = document.createElement("p");
        doneParagraph.innerHTML = `Done: ${servicesBikes.done ? "Yes" : "No"}`;
        const doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.className = "btnGeral";
        doneButton.disabled = servicesBikes.done ? true : false;
        doneButton.onclick = () => done(servicesBikes.id);
        servicesBikesDiv.appendChild(nameParagraph);
        servicesBikesDiv.appendChild(phoneNumber);
        servicesBikesDiv.appendChild(dateArrParagraph);
        servicesBikesDiv.appendChild(dateSerParagraph);
        servicesBikesDiv.appendChild(doneParagraph);
        servicesBikesDiv.appendChild(priceParagraph);
        servicesBikesDiv.appendChild(extrainfoParagraph);
        // servicesBikesDiv.appendChild(servicesDiv);
        servicesBikesDiv.appendChild(doneButton);
        listDiv.append(servicesBikesDiv);
    });
});
const done = id => {
    ipcRenderer.send("servicesBikes:done", id);
};
