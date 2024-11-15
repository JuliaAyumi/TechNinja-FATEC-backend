# Fatec - Centro Paula Souza
## TechNinja - Projeto Integrador 4º Semestre FATEC Luigi Papaiz
### Descrição
Sistema que visa oferecer uma plataforma educacional interativa para usuários interessados em aprender programação através de quizzes.

<div align="center">
  <img src="https://github.com/matheusduartedevs/3-semestre-projeto-integrador/assets/127058626/e70ded39-9a2b-415f-8725-e6ac5ef8df0d" alt='LogoWhite' />
</div>

### Time de Desenvolvimento
- [Julia Ayumi](https://github.com/JuliaAyumi)
- [Luan Beserra](https://github.com/luan-beserra)
- [Matheus Duarte](https://github.com/matheusduartedevs)
- [Pedro Henrique](https://github.com/PedroHHCarvalho)

## Stack utilizada
**Back-end:** Node.js, Javascript <br />
**Banco de Dados:** MongoDB

### Funcionalidades
1. Autenticação e Autorização
- Login: Sistema de login baseado em JWT (JSON Web Tokens) para autenticar os usuários.
- Cadastro de Usuários: Permite a criação de contas com validações.
- Proteção de Rotas: As rotas sensíveis (como acesso ao perfil, quizzes, etc.) estão protegidas, exigindo que o usuário esteja autenticado para acessá-las.
2. Gerenciamento de Usuários
- Cadastro e Perfil: Criação de contas de usuário, permitindo a atualização de informações de perfil.
- Acompanhamento de Progresso: Acompanhamento da pontuação e histórico de quizzes realizados pelo usuário.
3. Gerenciamento de Quizzes
- Criação de Quizzes: Funcionalidade para criação de quizzes, que inclui perguntas, respostas e tópicos temáticos.
- Banco de Perguntas: Armazenamento de perguntas no banco de dados MongoDB, com categorias e dificuldades.

### Arquitetura do Sistema
A arquitetura do back-end segue uma abordagem orientada a serviços, dividida em três categorias principais:

1. Serviços Utilitários
- Funções comuns que podem ser reutilizadas por outros serviços, como validação de entradas (ex: validação de e-mail e senha).
2. Serviços de Entidade
- Serviço de Usuário: Gerencia a criação de usuários, a autenticação (login/logout) e a manutenção do perfil.
- Serviço de Autenticação: Gerencia o login, logout e a geração de tokens JWT.
- Serviço de Quizzes: Gerencia a criação de quizzes e o armazenamento dos resultados.
3. Serviços de Tarefa
- Fluxo de Quizzes: Coordena o fluxo de quizzes, garantindo que o usuário passe pelas fases progressivas corretamente e possa acompanhar seu desempenho.
- Gestão de Sessões e Navegação: Gerencia as sessões de usuário e redirecionamentos baseados no estado de login e progresso.
- Feedback e Progressão: O sistema fornece feedback imediato para cada pergunta respondida e permite ao usuário acompanhar o progresso de sua performance no quiz.
