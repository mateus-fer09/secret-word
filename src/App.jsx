import { useCallback, useEffect, useState } from "react";

// Importa os componentes da aplicação, cada um responsável por uma tela específica do jogo.
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Importa os estilos CSS globais da aplicação.
import "./App.css";

// Importa a lista de palavras e suas categorias, que será usada no jogo.
import { wordsList } from "./data/words";

// Define as etapas do jogo. Cada objeto representa um estado possível da aplicação.
const stages = [
  { id: 1, name: "start" }, // Tela inicial
  { id: 2, name: "game" },  // Tela do jogo
  { id: 3, name: "end" },   // Tela de fim de jogo
];

// Componente principal da aplicação.
function App() {
  // Define o estágio atual do jogo, começando pela tela inicial.
  const [gameStage, setGameStage] = useState(stages[0].name);
  // Armazena a lista de palavras importada. Usamos useState para garantir que a lista não seja recarregada em cada renderização.
  const [words] = useState(wordsList);

  // Estados relacionados à palavra sorteada e suas letras.
  const [pickedWord, setPickedWord] = useState(""); // A palavra sorteada.
  const [pickedCategory, setPickedCategory] = useState(""); // A categoria da palavra sorteada.
  const [letters, setLetters] = useState([]); // As letras individuais da palavra sorteada.

  // Estados relacionados ao progresso do jogo e pontuação.
  const [guessedLetters, setGuessedLetters] = useState([]); // Letras que o jogador já acertou.
  const [wrongLetters, setWrongLetters] = useState([]); // Letras que o jogador errou.
  const [guesses, setGuesses] = useState(3); // Número de tentativas restantes.
  const [score, setScore] = useState(0); // Pontuação do jogador.

  // O console.log abaixo é útil para depuração, mostrando a estrutura das palavras carregadas.
  console.log(words);

  /**
   * Função para sortear uma palavra e sua categoria.
   * Usa useCallback para memorizar a função e evitar recriações desnecessárias,
   * melhorando a performance ao ser passada como prop para componentes filhos.
   */
  const pickWordAndCategory = useCallback(() => {
    // Obtém todas as categorias disponíveis no objeto 'words'.
    const categories = Object.keys(words);
    // Sorteia uma categoria aleatoriamente.
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Sorteia uma palavra aleatoriamente dentro da categoria escolhida.
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    // Log para depuração, mostrando a categoria e a palavra escolhidas.
    console.log(category, word);

    return { category, word };
  }, [words]); // A função só será recriada se 'words' mudar.

  /**
   * Função para iniciar o jogo.
   * Também usa useCallback para otimização.
   */
  const startGame = useCallback(() => {
    // Limpa o estado das letras (acertadas e erradas) ao iniciar um novo jogo.
    clearLettersStates();

    // Sorteia uma nova palavra e categoria.
    const { category, word } = pickWordAndCategory();

    // Log para depuração.
    console.log(category, word);

    // Divide a palavra em um array de letras.
    let wordLetters = word.split("");

    // Converte todas as letras para minúsculas para facilitar a comparação.
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Atualiza os estados com a palavra, categoria e letras sorteadas.
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    // Muda o estágio do jogo para a tela de "game".
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]); // A função só será recriada se 'pickWordAndCategory' mudar.

  /**
   * Função para processar a letra digitada pelo jogador.
   * @param {string} letter - A letra digitada pelo jogador.
   */
  const verifyLetter = (letter) => {
    // Normaliza a letra para minúscula para garantir consistência.
    const normalizedLetter = letter.toLowerCase();

    // Verifica se a letra já foi utilizada (acertada ou errada) para evitar duplicações.
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return; // Se já utilizada, ignora a entrada.
    }

    // Verifica se a letra está na palavra.
    if (letters.includes(normalizedLetter)) {
      // Se a letra estiver correta, adiciona-a às letras acertadas.
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      // Se a letra estiver errada, adiciona-a às letras erradas e diminui uma tentativa.
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Log para depuração, mostrando as letras erradas.
  console.log(wrongLetters);

  /**
   * Função para reiniciar o jogo.
   * Redefine a pontuação, as tentativas e volta para a tela inicial.
   */
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  /**
   * Função auxiliar para limpar os estados das letras.
   * Usada ao iniciar um novo jogo ou quando as tentativas acabam.
   */
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  /**
   * Hook useEffect para verificar se as tentativas acabaram.
   * É executado sempre que o estado 'guesses' é alterado.
   */
  useEffect(() => {
    if (guesses === 0) {
      // Se as tentativas chegam a zero, o jogo acaba e os estados das letras são resetados.
      clearLettersStates();
      setGameStage(stages[2].name); // Muda para a tela de "game over".
    }
  }, [guesses]); // O efeito é re-executado apenas quando 'guesses' muda.

  /**
   * Hook useEffect para verificar a condição de vitória.
   * É executado sempre que 'guessedLetters' ou 'letters' são alterados.
   */
  useEffect(() => {
    // Cria um array com as letras únicas da palavra, removendo duplicatas.
    const uniqueLetters = [...new Set(letters)];

    // Logs para depuração, mostrando as letras únicas e as letras já acertadas.
    console.log(uniqueLetters);
    console.log(guessedLetters);

    // Condição de vitória: se o número de letras acertadas for igual ao número de letras únicas na palavra.
    if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length > 0) { // Adicionando uniqueLetters.length > 0 para evitar vitória no início
      // Adiciona 100 pontos à pontuação do jogador.
      setScore((actualScore) => (actualScore += 100));

      // Inicia um novo jogo com uma nova palavra.
      startGame();
    }
  }, [guessedLetters, letters, startGame]); // O efeito é re-executado quando 'guessedLetters', 'letters' ou 'startGame' mudam.

  return (
    <div className="App">
      {/* Renderiza a tela inicial se o estágio for "start" */}
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {/* Renderiza a tela do jogo se o estágio for "game", passando todas as props necessárias */}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {/* Renderiza a tela de fim de jogo se o estágio for "end", passando a função de retry e a pontuação */}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App; // Exporta o componente App para ser utilizado em outros arquivos.