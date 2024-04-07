🔒 **API de autenticação e gerenciamento de usuários**

**Descrição:** A API de autenticação oferece funcionalidades essenciais para a autenticação e gerenciamento de usuários em um sistema. Ela permite o registro de novos usuários, login seguro com geração de tokens de acesso, edição de informações do usuário e autenticação para acessar recursos protegidos. Essas características fornecem uma base sólida para a construção de sistemas seguros e eficientes, garantindo a integridade das informações e a segurança dos usuários.

👨‍💻 **Desenvolvedor:** Andrey Wilmsen de Paula, Desenvolvedor Fullstack

🛠️ **Tecnologias utilizadas**

1. **Node.js:** Ambiente de execução para o servidor da API.
2. **Express.js:** Framework utilizado para gerenciar rotas e solicitações HTTP.
3. **MongoDB:** Banco de dados NoSQL para armazenar informações de usuários.
4. **Mongoose:** Biblioteca para interagir com o MongoDB de forma simplificada.
5. **bcrypt:** Utilizado para criptografar senhas antes de armazená-las.
6. **jsonwebtoken (JWT):** Gera tokens de autenticação para os usuários.
7. **dotenv:** Carrega variáveis de ambiente para configuração segura.

**Funcionalidades**

Claro, aqui está a atualização da documentação, incluindo a instrução para limpar o local storage antes de fazer a chamada para o endpoint na função `logar()`:

**Funcionalidades**

1. 🚪 **Fazer Login:**
   - Use uma solicitação POST para o endpoint `/login`.
   - Inclua o email e a password do usuário no corpo da solicitação em formato JSON, com as variáveis `email` e `password`.
   - Resposta em caso de sucesso: `{ status: "success", data: token }`.
   - Se houver erro nos dados enviados: Retorna o status 401 com a mensagem de erro.
   - **Ponto de chamada do local storage:** Antes de fazer a chamada para o endpoint, o local storage deverá ser limpo para garantir que não haja resíduos de autenticação anteriores armazenados. Após o login bem-sucedido, o token de autenticação retornado pela API é armazenado no local storage com a chave `"token"`.

2. 🔑 **Autenticar Usuário:**
   - Envie uma solicitação GET para o endpoint `/auth`.
   - Inclua o token de autenticação no cabeçalho `Authorization-Token`.
   - Resposta em caso de sucesso: `{ status: "success" }`.
   - Se não houver token armazenado no cabeçalho: Retorna o status 401 com a mensagem "Access Denied".
   - Se o token não for válido: Retorna o status 401 com a mensagem de erro.
   - **Ponto de chamada do local storage:** O token de autenticação deverá ser recuperado do local storage antes de enviar a solicitação para a API.

3. ✏️ **Editar Informações do Usuário:**
   - Envie uma solicitação PUT para o endpoint `/edit`.
   - Inclua o token de autenticação e os dados atualizados do usuário no corpo da solicitação em formato JSON, com as variáveis `token`, `name`, `email`, `oldPassword`, `newPassword` e `confirmNewPassword`.
   - Resposta em caso de sucesso: `{ status: "success", data: "Dados do usuário editados com sucesso!" }`.
   - Se houver erro nos dados enviados: Retorna o status 401 com a mensagem de erro.
   - **Ponto de chamada do local storage:** O token de autenticação deverá ser recuperado do local storage antes de enviar a solicitação para a API.

4. ➕ **Cadastrar Novo Usuário:**
   - Envie uma solicitação POST para o endpoint `/register`.
   - Inclua os dados do novo usuário no corpo da solicitação em formato JSON, com as variáveis `name`, `email`, `password` e `confirmPassword`.
   - Resposta em caso de sucesso: `{ status: "success", data: "Usuário criado com sucesso" }`.
   - Se houver erro nos dados enviados: Retorna o status 401 com a mensagem de erro.
   - **Ponto de chamada do local storage:** Nenhuma interação com o local storage é realizada nesta funcionalidade.

🌟 **Considerações Finais:**
A API de autenticação e gerenciamento de usuários oferece uma solução robusta e confiável para implementação de sistemas seguros. Desenvolvida utilizando tecnologias modernas e boas práticas de segurança, ela proporciona uma experiência de autenticação e gerenciamento de usuários fluída e segura. Sua flexibilidade e facilidade de integração a diferentes sistemas a tornam uma escolha ideal para aplicações que exigem alto nível de segurança e controle de acesso.
