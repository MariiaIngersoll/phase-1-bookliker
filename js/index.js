const list = document.getElementById("list");
const info = document.getElementById("show-panel");
const user = { "id": 10104, "username": "pouros" }
const listOfUsers = document.createElement("ul");
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks()

});
// STEP 1 List Books
function fetchBooks() {

    fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(book => book.forEach(book => {
            bookHTML(book);
        }
        ))

};
// STEP 2 SHow Details
const bookHTML = (book) => {

    const li = document.createElement("li")
    li.textContent = book.title
    list.append(li)
    li.addEventListener("click", () => {
        const img = document.createElement("img");
        img.src = book.img_url;
        const description = document.createElement("h3");
        description.textContent = book.description;
        
        const btnLike = document.createElement("button")
        btnLike.innerText = "LIKE IT"
        btnLike.addEventListener("click", () => {
            book.users.push(user)
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                contentType: "Application/json",
                body: book.users,
            }); 
            
           


        })
        listOfUsers.innerHTML = "";
        book.users.forEach((user) => {
            const li = document.createElement("li");
            
            li.innerText = user.username;
            listOfUsers.append(li)

        })
        // CREATE BUTTON AND SEND A PATCH REQUEST WITH A NEW USER ADDED 


        info.textContent = ""
        info.append(img, description, listOfUsers, btnLike)



    })
}

