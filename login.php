<?php
// Configurações do banco de dados
$host = "localhost";
$user = "root";
$password = "123456";
$database = "quiz";
$port = 3306; // Porta padrão do MySQL

// Conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $database, $port);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Dados do formulário
$username = $_POST['username'];
$senha = $_POST['senha'];

// Query SQL para buscar usuário no banco de dados
$sql = "SELECT * FROM usuario WHERE username = '$username' AND senha = '$senha'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuário encontrado, redireciona para a página de sucesso
    header("Location: inicial.html");
    exit(); // Certifique-se de encerrar o script após o redirecionamento
} else {
    // Usuário não encontrado, redireciona para a página de login com mensagem de erro
    header("Location: login.html?error=invalid_credentials");
    exit();
}


?>
