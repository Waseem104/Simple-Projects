async function fetchJoke() {
  const jokeDisplay = document.getElementById("jokeDisplay");
  const category = document.getElementById("categorySelect").value;
  const url = `https://official-joke-api.appspot.com/jokes/${category}/random`;

  jokeDisplay.innerText = "Loading...";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch a joke. Please try again!");
    }
    const data = await response.json();

    jokeDisplay.innerText = `${data[0].setup} - ${data[0].punchline}`;
  } catch (error) {
    jokeDisplay.innerText = error.message;
  }
}

document.getElementById("newJokeButton").addEventListener("click", fetchJoke);
