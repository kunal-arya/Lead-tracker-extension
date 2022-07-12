const tabBtn = document.getElementById("tab-btn");
const userInput = document.getElementById("userInput");
const inputBtn = document.getElementById("inputBtn");
const delBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));
let leadList = [];

if(localStorageLeads){
    leadList = localStorageLeads;
    render(leadList);
}



function render(lead){
    let leadList = "";
    for(let i = 0 ; i < lead.length ; i++){
        leadList += `<li><a target="_blank" href="${lead[i]}">${lead[i]}</a></li>`
    }
    ulEl.innerHTML = leadList;
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true} , (tabs) => {
        leadList.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(leadList));
        render(leadList);
    })
});

delBtn.addEventListener("click", () => {
    localStorage.clear();
    leadList = [];
    render(leadList)
});

inputBtn.addEventListener('click', () => {
    leadList.push(userInput.value);
    userInput.value = "";
    localStorage.setItem("myLeads", JSON.stringify(leadList));
    render(leadList);
});