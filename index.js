// console.log("Hello");
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        txt: addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1}.  ${element.title}</h5>
                <p class="card-text"> ${element.txt}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("fired!", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLocaleLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLocaleLowerCase();
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})

// let searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("hello");
//     let inputVal = search.value.toLowerCase();
//     let noteCards = document.getElementsByClassName("noteCard");
//     Array.from(noteCards).forEach(function (element) {
//         let cardTitle = element.getElementsByTagName("h5")[0].innerText;
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;
//         if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
//             element.style.display = "block";
//             console.log("fired");
//         } else {
//             element.style.display = "none";
//         }
//     });
// })