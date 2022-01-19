export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(correct, wrong, word) {
  let status = "";
  let uniq = "";
  for (let i = 0; i < word.length; i++) {
    if (uniq.includes(word[i]) === false) {
      uniq += word[i];
    }
  }

  // check for win
  if (uniq.length === correct.length && correct.length > 0) {
    status = "win";
  }

  // check for loss
  if (wrong.length === 6) status = "lose";

  return status;
}
