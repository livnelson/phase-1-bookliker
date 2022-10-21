// document.addEventListener("DOMContentLoaded", function() { 

const fetchAllBooks = () => {
    fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then(books => {
        // do something with the data (books) received
        // console.log(books)
        //for each book, create an li tag and attach it to ul element
        const ulElement = document.getElementById("list")
        books.forEach(book => {
            const li = document.createElement("li")
            const textSpan = document.createElement("span")
            li.textContent = book.title
            textSpan.texrtContent = book.title

            // console.log(book)
            // li.id = book.id

         textSpan.addEventListener("click", (event) =>{
            console.log(event.target.textContent)
            const showPanel = document.getElementById("show-panel")
            const title = document.createElement("h1")
            const subtitle = document.createElement("h2")
            const author = document.createElement("h3")
            const description = document.createElement("p")
            const img = document.createElement("img")
            const likeButton = document.createElement("button")

            title.textContent = book.title
            subtitle.textContent = book.subtitle
            author.textContent = book.author
            description.textContent = book.description
            img.src = book.img.url
            img.alt = book.title
            likeButton.textContent = "LIKE"

            books.users.forEach(user => {
                userList.innerHTML += " " + `<li>${user.name}</li>`
            })

            showPanel.innerHTML = ""

            likeButton.addEventListener("click", (event) => {
                console.log("LIKED!")
                console.log(book.users)
                
                const currentUser = {
                    "id": 1,
                    "username": "pouros"
                }

                books.users.push(currentUser)

                const patchReqObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSPN.stringify({
                        users: book.users,

                    }),
                }

                fetch("http://localhost:3000/books/" + book.id, patchReqObj)
                    .then(response => response.json())
                    .then(updateBook => {
                    console.log(updatedBook)
                    userList.innerHTML +=  `<li>${currentUser.username}</li>`
                    
                })
                
            })
        })

            showPanel.append(title, subtitle,author, description, img, userList,likeButton)
            

            li.append(textSpan)
            ulElement.appendChild(li)
        })
    })





const init = () => {
    fetchAllBooks()
    console.log (fetchAllBooks())
}

init()

}