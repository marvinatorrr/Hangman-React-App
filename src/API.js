const GetWord = async () => {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const word = await response.json();
  console.log(word[0]);
  return word[0];
};

export default GetWord;
