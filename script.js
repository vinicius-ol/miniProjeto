// Mostrar mensagem de boas-vindas por 3 segundos e redirecionar para home
setTimeout(function() {
    document.getElementById('welcome-message').style.display = 'none';
    window.location.href = "#home";
}, 3000);

// Função para atualizar a data e hora atual
function updateDateTime() {
    const now = new Date();
    document.getElementById('date-time').textContent = now.toLocaleString();
}

// Função para calcular o tempo restante até o próximo lançamento
function countdownToRelease() {
    const releaseDate = new Date('2024-12-01T00:00:00'); // Data fictícia de lançamento
    const now = new Date();
    const timeDiff = releaseDate - now;

    if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('release-info').textContent = 
            `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos para o lançamento.`;
    } else {
        document.getElementById('release-info').textContent = "O lançamento já ocorreu!";
    }
}

// Atualizar data e hora a cada segundo
setInterval(updateDateTime, 1000);

// Atualizar o contador a cada segundo
setInterval(countdownToRelease, 1000);


// Array de objetos literais representando os livros
const livros = [
    { titulo: "Clean Code", autor: "Robert C. Martin", preco: "R$ 59,90", genero: "programação" },
    { titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", preco: "R$ 49,90", genero: "programação" },
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", preco: "R$ 79,90", genero: "ficção" },
    { titulo: "1984", autor: "George Orwell", preco: "R$ 29,90", genero: "ficção" },
    { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", preco: "R$ 34,90", genero: "ficção" },
    { titulo: "Moby Dick", autor: "Herman Melville", preco: "R$ 39,90", genero: "clássico" },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", preco: "R$ 35,90", genero: "clássico" },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", preco: "R$ 22,90", genero: "ficção" },
    { titulo: "Java: Como Programar", autor: "Paul Deitel", preco: "R$ 89,90", genero: "programação" },
    { titulo: "A Culpa é das Estrelas", autor: "John Green", preco: "R$ 27,90", genero: "romance" },
    { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", preco: "R$ 49,90", genero: "fantasia" },
    { titulo: "O Alquimista", autor: "Paulo Coelho", preco: "R$ 29,90", genero: "ficção" }
];

// Função para exibir os livros no catálogo
function exibirLivros() {
    const container = document.getElementById('livros-container');
    livros.forEach(livro => {
        const livroDiv = document.createElement('div');
        livroDiv.classList.add('livro');

        livroDiv.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Preço: ${livro.preco}</p>
        `;

        container.appendChild(livroDiv);
    });
}

// Chamar a função para exibir os livros quando a página carregar
window.onload = exibirLivros;
// Função para exibir recomendações com base nas preferências
function exibirRecomendacoes(preferencias) {
    const container = document.getElementById('recomendacoes-container');
    container.innerHTML = ""; // Limpar as recomendações anteriores

    // Filtrar os livros que correspondem às preferências do usuário
    const livrosRecomendados = livros.filter(livro => preferencias.includes(livro.genero));

    if (livrosRecomendados.length === 0) {
        container.innerHTML = "<p>Nenhuma recomendação disponível para os gêneros selecionados.</p>";
    } else {
        livrosRecomendados.forEach(livro => {
            const livroDiv = document.createElement('div');
            livroDiv.classList.add('livro');

            livroDiv.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p>Autor: ${livro.autor}</p>
                <p>Preço: ${livro.preco}</p>
                <p>Gênero: ${livro.genero}</p>
            `;

            container.appendChild(livroDiv);
        });
    }
}

// Função para lidar com a pesquisa de preferências
document.getElementById('btn-pesquisar').addEventListener('click', function() {
    const preferencia = document.getElementById('input-preferencia').value.trim().toLowerCase();
    
    // Se a preferência não for vazia, armazená-la e exibir recomendações
    if (preferencia) {
        let preferencias = localStorage.getItem('preferencias');
        if (!preferencias) {
            preferencias = preferencia;
            localStorage.setItem('preferencias', preferencias);
        } else {
            preferencias += `, ${preferencia}`;
            localStorage.setItem('preferencias', preferencias);
        }
        
        // Separar as preferências em um array e exibir as recomendações
        const preferenciasArray = preferencias.split(',').map(item => item.trim());
        exibirRecomendacoes(preferenciasArray);
    }
});

// Quando a página carregar, exibir o catálogo e as recomendações se houver preferências armazenadas
window.onload = function() {
    exibirCatalogo(); // Exibir o catálogo de livros

    const preferencias = localStorage.getItem('preferencias');
    if (preferencias) {
        const preferenciasArray = preferencias.split(',').map(item => item.trim());
        exibirRecomendacoes(preferenciasArray);
    }
};

// Função para lidar com a submissão do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Exibe a mensagem de agradecimento e esconde o formulário
    document.getElementById('thank-you-message').style.display = 'block';
    this.style.display = 'none';
});
