<?php
session_start(); // Inicia a sessão 

// Verifica se o método de requisição é POST e se há dados do score
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["score"])) {
    // Obtém os dados do formulário
    $score = $_POST["score"];

    // Verifica se o usuário está autenticado
    if (isset($_SESSION["usuario_id"])) {
        // O usuário está autenticado, obtém o ID do usuário da sessão
        $usuario_id = $_SESSION["usuario_id"];

        // Configurações do banco de dados
        $host = "localhost";
        $user = "root";
        $password = "123456";
        $database = "quiz";
        $port = 3306; // Porta padrão do MySQL

        // Cria a conexão
        $conn = new mysqli($host, $user, $password, $database, $port);

        // Verifica a conexão
        if ($conn->connect_error) {
            die("Erro de conexão: " . $conn->connect_error);
        }

        // Insere a pontuação para o usuário existente
        $sql_insert_score = "INSERT INTO score (usuario_id, score) VALUES ('$usuario_id', '$score')";

        if ($conn->query($sql_insert_score) === TRUE) {
            header("Location: ranking.html");
        } else {
            echo "Erro ao registrar score: " . $conn->error;
        }

        // Fecha a conexão
        $conn->close();
    } else {
        // Se o usuário não estiver autenticado, exibe uma mensagem de erro
        echo "Usuário não autenticado!";
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"])) {
    // Se o método de requisição é POST e há dados de usuário, trata-se de um cadastro

    // Obtém os dados do formulário
    $username = $_POST['username'];
    $senha = $_POST['senha'];

    // Configurações do banco de dados
    $host = "localhost";
    $user = "root";
    $password = "123456";
    $database = "quiz";
    $port = 3306; // Porta padrão do MySQL

    // Cria a conexão
    $conn = new mysqli($host, $user, $password, $database, $port);

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    // Query SQL para inserir o usuário na tabela usuario
    $sql_insert_user = "INSERT INTO usuario (username, senha) VALUES ('$username', '$senha')";

    if ($conn->query($sql_insert_user) === TRUE) {
        // Obter o ID do usuário recém-cadastrado
        $usuario_id = $conn->insert_id;
    
        // Salva o ID do usuário na sessão
        $_SESSION["usuario_id"] = $usuario_id;
    
        // Fecha a conexão
        $conn->close();
    
        // Redireciona para a página inicial após o cadastro
        header("Location: inicial.html");
        exit(); // Certifique-se de encerrar o script após o redirecionamento
    } else {
        echo "Erro ao cadastrar usuário: " . $conn->error;
    }
}elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"])) {
    // Se o método de requisição é POST e há dados de usuário, trata-se de um cadastro

    // Obtém os dados do formulário
    $username = $_POST['username'];
    $senha = $_POST['senha'];

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
}

?>




