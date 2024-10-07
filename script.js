function startGame() {
  document.getElementById('gameMode').classList.add('hidden');
  soloBtn.classList.add('hidden');
  duoBtn.classList.add('hidden');
  board.classList.remove('hidden');
  message.classList.remove('hidden');

  // Start playing the music
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.play();

  createBoard();
}
