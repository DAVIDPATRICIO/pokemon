const BASE_URL = "https://pokeapi.co/api/v2/";
const BaseURL = "https://pokeapi.co/api/v2/";
const $image = document.querySelector("#image");
const $name = document.querySelector("#name");
var num = 0;

function getValueInput() {
  num = document.getElementById("pokemon").value.toLowerCase();
  document.getElementById("pokemon").value = "";
  ajax({
    url: `${BASE_URL}pokemon/${num}`,
    // method: 'GET',
    // async: true,
    // responseType: 'json',
    done: renderPokemon,
    error: renderError,
  });
  ajaxColor({
    url: `${BaseURL}pokemon-color/${num}`,
    // method: 'GET',
    // async: true,
    // responseType: 'json',
    done: renderColorPokemon,
    error: renderColorError,
  });
}

const node = document.getElementById("pokemon");
node.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Do work
    getValueInput();
  }
});

function renderError(status) {
  if (num == null || num == 0 || num == "") {
    $name.textContent = `searching`;
  } else {
    $name.textContent = `Pokemon not found`;
  }
  $image.setAttribute("src", "");
}

function renderPokemon(pokemon) {
  if (pokemon.sprites == undefined) {
    $name.textContent = `searching`;
    $image.setAttribute("src", "");
  } else {
    $name.textContent = "#" + pokemon.id + " " + pokemon.name;
    $image.setAttribute("src", pokemon.sprites.front_default);
  }
}

function renderColorPokemon(pokemon) {
  document.body.style.background = pokemon.name;
}

function ajax({
  url,
  method = "GET",
  async = true,
  done = () => {},
  error = () => {},
  responseType = "json",
}) {
  function status(readyState) {
    switch (readyState) {
      case 0:
        return "uninitilized";
      case 1:
        return "loading";
      case 2:
        return "loaded";
      case 3:
        return "interactive";
      case 4:
        return "completed";
    }
  }

  const request = new XMLHttpRequest();
  request.responseType = responseType;
  console.log(status(request.readyState), request.readyState);

  request.onreadystatechange = () => {
    console.log(status(request.readyState), request.readyState);
    if (request.readyState === 4) {
      if (request.status === 200) {
        done(request.response);
      } else {
        error(request.status);
      }
    }
  };
  request.open(method, url, async);
  request.send(null);
}

function ajaxColor({
  url,
  method = "GET",
  async = true,
  done = () => {},
  error = () => {},
  responseType = "json",
}) {
  function status(readyState) {
    switch (readyState) {
      case 0:
        return "uninitilized";
      case 1:
        return "loading";
      case 2:
        return "loaded";
      case 3:
        return "interactive";
      case 4:
        return "completed";
    }
  }

  const request = new XMLHttpRequest();
  request.responseType = responseType;
  console.log(status(request.readyState), request.readyState);

  request.onreadystatechange = () => {
    console.log(status(request.readyState), request.readyState);
    if (request.readyState === 4) {
      if (request.status === 200) {
        done(request.response);
      } else {
        error(request.status);
      }
    }
  };
  request.open(method, url, async);
  request.send(null);
}

ajax({
  url: `${BASE_URL}pokemon-color/${num}`,
  // method: 'GET',
  // async: true,
  // responseType: 'json',
  done: renderPokemon,
  error: renderError,
});

ajaxColor({
  url: `${BaseURL}pokemon-color/${num}`,
  // method: 'GET',
  // async: true,
  // responseType: 'json',
  done: renderColorPokemon,
  error: renderColorError,
});

function renderColorPokemon(pokemon) {
  if (pokemon.sprites == undefined) {
    document.body.style.background =
      "linear-gradient(#cc7339 0%, #fcfbfd 100%)";
  } else {
    document.body.style.background = pokemon.name;
  }

  console.log(pokemon);
  document.body.style.background = pokemon.name;
}

function renderColorError(pokemon) {
  document.body.style.background = "linear-gradient(#cc7339 0%, #fcfbfd 100%)";
}
