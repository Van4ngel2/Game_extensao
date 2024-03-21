<?php
// Configurações do banco de dados
$host = "localhost";
$user = "root";
$password = "123456";
$database = "quiz";
$port = 3306;

// Cria a conexão
$conn = new mysqli($host, $user, $password, $database, $port);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Query SQL para obter o ranking de usuários e seus scores
$sql = "SELECT usuario.username, score.score FROM usuario INNER JOIN score ON usuario.id = score.usuario_id ORDER BY score.score DESC";
$result = $conn->query($sql);

// Verifica se há resultados
// Verifica se há resultados
if ($result->num_rows > 0) {
    // Inicializa uma variável para armazenar os dados do ranking
    $rankingData = "";

    // Adiciona o cabeçalho da tabela
    $rankingData .= "<div class='table-container'>"; // Adiciona um contêiner para a tabela
    $rankingData .= "<table>";
    $rankingData .= "<tr><th>Usuário</th><td><td><th>Pontuação</th></tr>";

    // Loop através dos resultados e constrói a tabela do ranking
    while ($row = $result->fetch_assoc()) {
        $rankingData .= "<tr>";
        $rankingData .= "<td>" . $row["username"] . "</td><td><td><td>" . $row["score"] . "</td>";
        $rankingData .= "</tr>";
    }

    // Fecha a tabela e o contêiner
    $rankingData .= "</table>";
    $rankingData .= "</div>"; // Fecha o contêiner


    echo $rankingData;
} else {
    // Se não houver resultados, retorna uma mensagem indicando que nenhum resultado foi encontrado
    echo "Nenhum resultado encontrado";
}

// Fecha a conexão
$conn->close();
?>
