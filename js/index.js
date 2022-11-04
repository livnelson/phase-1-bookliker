// document.addEventListener("DOMContentLoaded", function() {});

const fetchAllBooks = () => {					// this is the function fetch									
	fetch("http://localhost:3000/books")     	// this is the fetch GET
		.then((response) => response.json())	// response/promise fron server
		.then((books) => {						// this is the function for the translated data / telling it what to do
			// do something with the req
			console.log(books)
			// for each book,  create a li tag and attach it to an ul element
			const ulElement = document.getElementById("list")		// in this second.then we are grabbing the element where the data will live
			books.forEach((book) => {								// thisis the .forEach loop to tell the data what to do with each book
				const li = document.createElement("li")				// creating HTML tag
				const textSpan = document.createElement("span")		// creating HTML tag
				textSpan.textContent = book.title					// matching our variable with the json data received
				// console.log(book)
				// li.id = book.id

				textSpan.addEventListener("click", (event) => {		// event listener for when an event happens (book title is clicked on)
					console.log(event.target.textContent)
					console.log("inside event", book)
					const showPanel = document.getElementById("show-panel") //grabing element where data is displayed
					const title = document.createElement("h1")				// creating HTML tags
					const subtitle = document.createElement("h2")
					const author = document.createElement("h3")
					const description = document.createElement("p")
					const img = document.createElement("img")
					const likeButton = document.createElement("button")
					const userList = document.createElement("ul")

					title.textContent = book.title						// matching our variable data with the json data received
					subtitle.textContent = book.subtitle
					author.textContent = book.author
					description.textContent = book.description
					img.src = book.img_url
					img.alt = book.title
					likeButton.textContent = "LIKE"

					book.users.forEach((user) => {								// another .forEach loop this time for users likes
						userList.innerHTML += `<li>${user.username}</li>`
					})

					showPanel.innerHTML = ""									// this function causes the panel to display the data when title is clicked
					// showPanel.removeChild(title)	

					likeButton.addEventListener("click", (event) => {			// this is the event listener for the like button
						console.log("LIKED!")
						// we are =>
						const currentUser = {									// this tells the server to capture the current user details when they click the like button
							id: 1,
							username: "pouros",
						}

						console.log(book.users)
						book.users.push(currentUser)							// this pushes the data to the server
						console.log("newusers", book.users)

						const patchReqObj = {									// this is declaring the function for the fetch PATCH
							method: "PATCH",
							headers: {											// it includes method, headers and specific data to stringify for json
								"content-type": "application/json",
							},
							body: JSON.stringify({
								users: book.users,
							}),
						}

						fetch("http://localhost:3000/books/" + book.id, patchReqObj)			// this is the fetch PATCH request
							.then((response) => response.json())								// fetch response/promise
							.then((updatedBook) => {											// received/translated data telling us what it captured
								console.log(updatedBook)
								userList.innerHTML += `<li>${currentUser.username}</li>`
							})
					})

					showPanel.append(						// this is where we apped the information for the panel that displays the book details
						title,								// is is invoked earlier on line 42
						subtitle,
						author,
						description,
						img,
						userList,
						likeButton
					)
				})

				// console.log(li)
				li.append(textSpan)						// this appends the text area (textSpan) to the LI HTML element
				ulElement.appendChild(li)				// this appends the LI HTML element to the UL HTML element
			})
		})
}

const init = () => {									// this is the intitializer function it calls on our function that fetches the books
	fetchAllBooks()
}

init()													// this is where the initializer function is invoked
