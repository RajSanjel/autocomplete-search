'use strict';

const result = document.querySelector(".results")
const singleResult = document.querySelector(".result")
const searchInput = document.querySelector("#searchUser")
let data;

searchInput.addEventListener("input", (e) => {

    let searchValue = e.target.value
    if (e.target.value.trim() == "") {
        result.classList.remove("active")
    } else if (e.target.value !== "") {
        result.classList.add("active")
    } else {
        result.classList.remove("active")
    }
    populateSearch(searchValue)

});

result.addEventListener("click", () => {
    result.classList.remove("active")
})

const getUsers = async (userAPI) => {
    let data = await fetch(userAPI);
    return data = await data.json();
}
const populateData = async () => {
    data = await getUsers('../api/users.json')
    let usersCollection = document.querySelector(".users")
    for (let i = 0; i < data.length; i++) {
        const user = data[i];
        let singleUser = document.createElement("div")
        let username = document.createElement("h3")
        let age = document.createElement("p")
        let joined = document.createElement("p")
        let hobbiesElement = document.createElement("p")
        singleUser.classList.add('user-card')
        age.innerText = "Age: " + user.age
        username.innerText = user.name
        singleUser.id = user.name
        joined.innerText = "Joined: " + user.joined
        hobbiesElement.innerText = "Hobbies: "
        let j = -1;
        do {
            j++
            hobbiesElement.innerText += ` ${ user.hobbies[ j ] },`;
        } while (j < user.hobbies.length - 1);
        singleUser.append(username)
        singleUser.append(age)
        singleUser.append(joined)
        singleUser.append(hobbiesElement)
        usersCollection.append(singleUser)
    }
}

const populateSearch = async (searchValue) => {
    data = await getUsers('../api/users.json')
    let userArr = []
    data.map((username) => {
        data = username.name
        userArr.push(data)
    });
    if (searchValue != undefined && searchValue.length != 0 && searchValue.trim() != "") {
        let matches = userArr.filter(userFound => {
            let matchThis = searchValue;
            const regex = new RegExp(`${matchThis}`, 'gi')
            return userFound.match(regex)
        })
        showResult(matches)
    }
}

const showResult = (searchResult) => {
    if (searchResult.length != 0) {
        result.innerHTML = " ";
        for (let i = 0; i < searchResult.length; i++) {
            let searchResults = searchResult[i];
            let displayResults = document.createElement("a")
            displayResults.classList.add("result")
            displayResults.setAttribute("href", `#${searchResults}`)
            displayResults.innerText = searchResults;
            result.append(displayResults)
        }
    } else {
        result.innerHTML = " ";
        let displayNoResult = document.createElement("p")
        displayNoResult.classList.add("result")
        displayNoResult.innerText = "No user with that name found";
        result.append(displayNoResult)
    }
}

let addData = () => {
    fetch('../api/users.json', {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: {
            "name": "Nato Boram2",
            "age": 32,
            "hobbies": ["research1", "writing1", "reading1", "coding1"],
            "joined": "2020/01/17",
            "userid": 109
        }
    })
}
populateData();