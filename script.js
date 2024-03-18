const questions = [
  {
    question: "O que significa 'HTML'?",
    options: ["Linguagem de Marcação de Hipertexto", "Links e Linguagem de Marcação de Texto", "Linguagem de Ferramenta Doméstica", "Hiper Ferramenta de Multi Linguagem"],
    answer: "Linguagem de Marcação de Hipertexto"
  },
  {
    question: "Qual é a função principal do CSS?",
    options: ["Definir a estrutura de uma página da web", "Criar elementos dinâmicos e interativos", "Estilizar a aparência de uma página da web", "Gerenciar operações do lado do servidor"],
    answer: "Estilizar a aparência de uma página da web"
  },
  {
    question: "O que significa 'HTTP'?",
    options: ["Protocolo de Transferência de Hipertexto", "Hipertexto Protocolo de Texto de Link", "Protocolo de Transferência de Ferramenta Doméstica", "Hiper Ferramenta de Multi Protocolo"],
    answer: "Protocolo de Transferência de Hipertexto"
  },
  {
    question: "Qual é o propósito do JavaScript?",
    options: ["Definir a estrutura de uma página da web", "Criar elementos dinâmicos e interativos", "Estilizar a aparência de uma página da web", "Gerenciar operações do lado do servidor"],
    answer: "Criar elementos dinâmicos e interativos"
  },
  {
    question: "Qual é a diferença entre os operadores '==' e '===' em JavaScript?",
    options: ["'==' compara tanto valor quanto tipo, '===' compara apenas valor", "'==' compara apenas valor, '===' compara tanto valor quanto tipo", "'==' é usado para atribuição, '===' é usado para comparação", "Não há diferença entre eles"],
    answer: "'==' compara tanto valor quanto tipo, '===' compara apenas valor"
  },
  {
    question: "Qual é o propósito do SQL?",
    options: ["Definir a estrutura de uma página da web", "Criar elementos dinâmicos e interativos", "Gerenciar operações de banco de dados", "Estilizar a aparência de uma página da web"],
    answer: "Gerenciar operações de banco de dados"
  },
  {
    question: "O que significa 'API'?",
    options: ["Interface de Programação Automatizada", "Interface de Programação Avançada", "Interface de Programação de Aplicativos", "Integração de Protocolo Automatizado"],
    answer: "Interface de Programação de Aplicativos"
  },
  {
    question: "O que significa 'CSS'?",
    options: ["Cascading Style Sheets", "Código de Segurança de Software", "Computação Simbólica e Simulação", "Central de Serviços de Segurança"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Qual é o objetivo do CSS?",
    options: ["Criar elementos dinâmicos e interativos", "Estilizar a aparência de uma página da web", "Definir a estrutura de uma página da web", "Gerenciar operações do lado do servidor"],
    answer: "Estilizar a aparência de uma página da web"
  },
  {
    question: "O que é uma 'tag' em HTML?",
    options: ["Um elemento de estilo", "Um tipo de arquivo", "Uma unidade de medida", "Um elemento de marcação"],
    answer: "Um elemento de marcação"
  },
  {
    question: "Qual é o objetivo do JavaScript?",
    options: ["Estilizar a aparência de uma página da web", "Criar elementos dinâmicos e interativos", "Definir a estrutura de uma página da web", "Gerenciar operações do lado do servidor"],
    answer: "Criar elementos dinâmicos e interativos"
  },
  {
    question: "O que significa 'HTTP'?",
    options: ["Protocolo de Transferência de Hipertexto", "Hiper Termo Textual Padrão", "Host para Transferência de Protocolo", "Hipertexto de Transmissão de Dados"],
    answer: "Protocolo de Transferência de Hipertexto"
  },
  {
    question: "Qual é o propósito do SQL?",
    options: ["Definir a estrutura de uma página da web", "Criar elementos dinâmicos e interativos", "Gerenciar operações de banco de dados", "Estilizar a aparência de uma página da web"],
    answer: "Gerenciar operações de banco de dados"
  },
  {
    question: "O que significa 'API'?",
    options: ["Interface de Programação Automática", "Interface de Programação de Aplicativos", "Interpretação de Parâmetros e Instruções", "Integração de Procedimentos e Instruções"],
    answer: "Interface de Programação de Aplicativos"
  },
  {
    question: "Qual é a função do DNS?",
    options: ["Gerenciar servidores de banco de dados", "Gerenciar endereços IP", "Gerenciar criptografia de dados", "Gerenciar transações de rede"],
    answer: "Gerenciar endereços IP"
  },
  {
    question: "O que é um 'loop' em programação?",
    options: ["Um erro de sintaxe", "Uma sequência de instruções que se repete até que uma condição seja atendida", "Um tipo de variável", "Uma estrutura de dados"],
    answer: "Uma sequência de instruções que se repete até que uma condição seja atendida"
  },
  {
    question: "O que é um 'firewall'?",
    options: ["Um dispositivo de rede que protege a rede de ataques externos", "Um software de edição de texto", "Um tipo de servidor web", "Um dispositivo de armazenamento de dados"],
    answer: "Um dispositivo de rede que protege a rede de ataques externos"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const timeElement = document.getElementById("time");

  // Verifica se ainda há perguntas restantes
  if (currentQuestion >= questions.length) {
    // Se não houver mais perguntas, exibe a pontuação final e encerra o jogo
    alert(`Quiz finished! Your final score is ${score}`);
    return;
  }

  questionElement.textContent = questions[currentQuestion].question;
  optionsElement.innerHTML = "";

  // Exibe as opções de resposta
  questions[currentQuestion].options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, button);
    optionsElement.appendChild(button);
  });

  // Inicia o cronômetro de 15 segundos
  let timeLeft = 15;
  timeElement.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer); // Limpa o temporizador quando o tempo acabar
      nextQuestion();
    }
  }, 1000); // 1 segundo
}

function checkAnswer(selectedOption, button) {
  clearInterval(timer); // Limpa o temporizador quando uma resposta é selecionada

  const timeLeft = 15 - parseInt(document.getElementById("time").textContent);
  let points = 0;

  if (selectedOption === questions[currentQuestion].answer) {
    // Calcula a pontuação com base no tempo restante
    if (timeLeft <= 10 && timeLeft > 0) {
      points = 1500; // Se o tempo restante for <= 10 segundos, ganha 1500 pontos
    } else {
      points = 750; // Caso contrário, ganha 750 pontos
    }

    score += points;
    document.getElementById("score").textContent = `Score: ${score}`;
    button.classList.add("correct"); // Adiciona classe ao botão se a resposta estiver correta
  } else {
    button.classList.add("incorrect"); // Adiciona classe ao botão se a resposta estiver incorreta
  }

  // Desabilita o botão de opção após clicar
  button.disabled = true;

  setTimeout(() => {
    button.classList.remove("correct", "incorrect"); // Remove classe após 1 segundo
    button.disabled = false; // Habilita o botão de opção novamente
    nextQuestion();
  }, 1000); // 1 segundo
}

function nextQuestion() {
  currentQuestion++;
  displayQuestion(); // Exibe a próxima pergunta
}

// Inicia o jogo exibindo a primeira pergunta
displayQuestion();
