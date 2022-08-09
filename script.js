const title = document.querySelector("#displayTitle");

const getAllGames = async () => {
    try {
        const res = await fetch(
        "https://cs-steam-game-api.herokuapp.com/games?page=1&limit=200"
        );

        const data = await res.json();

        return data;
    } catch (error) {
        console.log("error:", error);
    }
};
// getAllGames();

const renderAllGames = async () => {
    try {
        const showingGame = document.querySelector(".showing_game");
        // showingGame.innerHTML = "Loading...";
        display.innerHTML = `<div class="loader"> Loading ...</div>`;
        const data = await getAllGames();

        showingGame.innerHTML = "";
        title.textContent = "All Games";
        data.data.forEach((game) => {
        const divElement = document.createElement("div");

        divElement.innerHTML = `<div class="game_wrapper">
            <div class="cover" onclick="appDetail(${game.appid})">
                <img
                src="${game.header_image}"
                data-id="${game.appid}"
                />
                <div class="game_info">
                <p>${game.name}</p>
                <p>${game.price}</p>
                </div>
            </div>`;
        showingGame.appendChild(divElement);
        });
    } catch (error) {
        console.log("error:", error);
    }
};
renderAllGames();

const getAllGenres = async () => {
    try {
        const res = await fetch(
        "https://cs-steam-game-api.herokuapp.com/genres?page=1&limit=100"
        );

        const data = await res.json();

        return data;
    } catch (error) {
        console.log("error:", error);
    }
};

const renderAllGenres = async () => {
    try {
        const data = await getAllGenres();

        const category = document.querySelector(".categoryGroup");

        category.innerHTML = "";

        data.data.forEach((game) => {
        const liElement = document.createElement("li");

        liElement.innerText = `${game.name.toUpperCase()}`;
        liElement.addEventListener("click", () => {
            addClick(game.name);
        });
        category.appendChild(liElement);
        });
    } catch (error) {
        console.log("error:", error);
    }
};
renderAllGenres();

const addClick = async (genr) => {
    // console.log(genr);
    title.textContent = "";
    const showingGame = document.querySelector(".showing_game");
    //   showingGame.innerHTML = "Loading...";
    display.innerHTML = `<div class="loader"> Loading ...</div>`;
    const dataGame = await getAllGames();
    showingGame.innerHTML = "";
    title.textContent = genr.toUpperCase();
    dataGame.data.map((game) => {
        for (let i = 0; i < game.genres.length; i++) {
        if (game.genres[i] === genr.toLowerCase()) {
            const divElement = document.createElement("div");
            divElement.innerHTML = `<div class="game_wrapper">
                <div class="cover" onclick="appDetail(${game.appid})">
                <img
                    src="${game.header_image}"
                    data-id="${game.appid}"
                />
                <div class="game_info">
                    <p>${game.name}</p>
                    <p>${game.price}</p>
                </div>
                </div>`;
            showingGame.appendChild(divElement);
        }
        }
    });
};

const renderDetail = (dataGame) => {
    const showingGame = document.querySelector(".showing_game");
    

    showingGame.innerHTML = "";
    title.textContent = "Game's informations";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="showing_game show_detail">
        <div class="title_contain ">
        <div class="title">${dataGame.data.name}</div>
        </div>
        <div class="img_detail">
        <img
        src="${dataGame.data.header_image}"
        alt="${dataGame.data.name}"
        />
        <div class="game_details">
        <div class="game_description">${dataGame.data.description}</div>
        <div class="game_informations">
        <p>POSITIVE RATING: ${dataGame.data.positive_ratings}</p>
        <p>NEGATIVE RATING:  ${dataGame.data.negative_ratings}</p>
        <p>DEVELOPER:  ${dataGame.data.developer} </p>
        <p>RELEASE DATE:  ${dataGame.data.release_date} </p>
        </div>
        </div>
        </div>
        <div class="tags_contain">
        Popular user-defined tags for this product:
        <div class="tags">
        <div class="tag">${dataGame.data.steamspy_tags[0]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[1]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[2]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[3]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[4]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[5]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[6]}</div>
        <div class="tag">${dataGame.data.steamspy_tags[7]}</div>
        </div>
        </div>
        </div>
        `;
    showingGame.appendChild(newDiv);
};

const appDetail = async (appId) => {
    display.innerHTML = `<div class="loader"> Loading ...</div>`;
    console.log(appId);
    const res = await fetch(
        `https://cs-steam-game-api.herokuapp.com/single-game/${appId}`
    );
    const dataGame = await res.json();
    const showingGame = document.querySelector(".showing_game");

    //   showingGame.innerHTML = "Loading...";
    
    renderDetail(dataGame);
};
// appDetail();

const searchInput = document.querySelector("#searchForm");
const searchButton = document.querySelector("#store_search_link");
// searchInput.addEventListener("input", () => {
//   return searchInput;
// });

// let result = searchInput.value;
// console.log(result);
const getSearchlGames = async (searchText) => {
    try {
        const res = await fetch(
        `https://cs-steam-game-api.herokuapp.com/games?page=1&limit=200&q=${searchText}`
        );

        const data = await res.json();

        return data;
    } catch (error) {
        console.log("error:", error);
    }
};

const renderSearchlGames = async (searchText) => {
    try {
        const showingGame = document.querySelector(".showing_game");
        // showingGame.innerHTML = "Loading...";
        display.innerHTML = `<div class="loader"> Loading ...</div>`;
        const data = await getSearchlGames(searchText);

        showingGame.innerHTML = "";
        title.textContent = "Search Results";
        data.data.forEach((game) => {
        const divElement = document.createElement("div");

        divElement.innerHTML = `<div class="game_wrapper">
            <div class="cover" onclick="appDetail(${game.appid})">
                <img
                src="${game.header_image}"
                data-id="${game.appid}"
                />
                <div class="game_info">
                <p>${game.name}</p>
                <p>${game.price}</p>
                </div>
            </div>`;
        showingGame.appendChild(divElement);
        });
    } catch (error) {
        console.log("error:", error);
    }
};
searchButton.addEventListener("click", () => {
    renderSearchlGames(searchInput.value);
});
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        renderSearchlGames(searchInput.value);
        e.preventDefault();
    }
});
document.querySelector(".nav_links").addEventListener("click", () => {
    renderAllGames();
});
