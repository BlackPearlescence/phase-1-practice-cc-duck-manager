// write your code here!
const duckSave = {};
fetch("http://localhost:3000/ducks")
    .then((resp) => (resp.json()))
    .then((duckItems = []) => {
        for(let duck of duckItems){
            renderDuck(duck);
        }
        handler()
    })

function renderDuck(duck){
    const duckNav = document.querySelector("#duck-nav");
    const duckImg = document.createElement("img");
    duckImg.src = duck.img_url;
    duckNav.append(duckImg);
    duckSave[duck.img_url] = `${duck.likes} likes`;
    
    duckImg.addEventListener("click", (e) => {
        console.log("image");
        const duckDisplayImage = document.querySelector("#duck-display-image");
        const duckDisplayName = document.querySelector("#duck-display-name");
        const duckLikes = document.querySelector("#duck-display-likes");
        duckDisplayName.textContent = duck.name;
        // duckDisplayName.textContent = duckSave[duckImg.src];
        duckLikes.textContent = duckSave[duckImg.src];
        duckDisplayImage.src = duck.img_url;
    })
}

function handler(){
    let likeButton = document.body.querySelector("#duck-display-likes");
    // const duckImg = document.createElement("img");
    const duckImg = document.querySelector("#duck-display-image")
    likeButton.addEventListener("click", (e) => {
        console.log("test");
        duckSave[duckImg.src] = buttonTextHandler(likeButton.textContent)
        likeButton.textContent = duckSave[duckImg.src]
        likeButton.textContent = buttonTextHandler(likeButton.textContent)
    })

    const newDuckForm = document.querySelector("#new-duck-form");
    const duckNav = document.querySelector("#duck-nav");
    newDuckForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newDuckName = document.createElement("p");
        const newDuckImg = document.createElement("img");
        const duckNameInput = document.querySelector("input[name='duck-name-input']");
        const duckImageInput = document.querySelector("input[name='duck-image-input']");
        newDuckName.textContent = duckNameInput.textContent;
        newDuckImg.src = duckImageInput.value;
        const duckObject = {
            name: duckNameInput.value,
            img_url: duckImageInput.value,
            likes: 0,
        }
        renderDuck(duckObject);
        // duckNav.append(newDuckImg);
        // duckSave[newDuckImg.src] = newDuckName.value;
    })
}

function getLikes(buttonText){
    const likeSplit = buttonText.split(" ");
    const likeCount = parseInt(likeSplit[0]) + 1;
    return likeCount;
}
function buttonTextHandler(buttonText){
    // "0 likes"
    // ["0", "likes"]
    const likeSplit = buttonText.split(" ");
    const likeCount = parseInt(likeSplit[0]) + 1;
    const likeText = likeSplit[1];
    return `${likeCount} ${likeText}`;
}

