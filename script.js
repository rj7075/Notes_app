const addbtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// button functionality
addbtn.addEventListener("click", function() {
    addNote();
});

// pushing the notes text into data array.
const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    );
    // storing the data in the local storage browsers
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
        
        // stringify are used to convert array of object data into string 
        // because local storage only store string data
    }
}

// Adding new div class notes
const addNote = () => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea></textarea>
    `;
    // Delete the notes
    note.querySelector(".trash").addEventListener("click",
        function() {
            note.remove();
            savenotes();
        }
    );
    // Save the notes
    note.querySelector(".save").addEventListener("click",
        function() {
            savenotes();
            alert("saved");
        }
    );
    // saving textarea notes
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            savenotes();
        }
    );
    // adding new notes
    main.appendChild(note);
    savenotes();
};
// Retrieving of data from local storage
(
    function() {
        const lsnotes = JSON.parse(localStorage.getItem("notes")); // parse is used to convert string data into again 
        // array of object or object data
        if (lsnotes == null) {
            addNote();
        } else {
            lsnotes.forEach(
                (lsnotes) => {
                    addNote();
                }
            );
        }
    }
)();
