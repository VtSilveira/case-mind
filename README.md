# Configuração e Instalação do projeto

Essa é a implementação do case da empresa Mind Consulting: Um sistema de Login junto com um CRUD de cursos!

A implementação foi feita usando as seguintes tecnologias, então tenha certeza que elas estão instaladas:

- MySQL
- NodeJS (v18.16.0)
- ReactJS
  
Para começar, clone o repositório:

```bash
git clone https://github.com/VtSilveira/case-mind
```

Após isso, você deve descompactar o arquivo DumpMind.zip. Com ele, você vai conseguir criar o banco de dados e populá-lo de maneira inicial.
Com o Schema e as Tabelas, rode o comando a seguir no banco de dados, substituindo a senha pela de sua preferência. Guarde essa senha.

``` sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY "senha";
```

Pronto! O banco de dados está configurado.

Agora, volte onde clonou o repositório e adapte as informações do arquivo /case-mind/api/db.js para que fique em consenso com as suas.
OBS.: Em meu caso, estou usando a porta "7777". Se você não alterou a porta do servidor MySQL, a porta padrão é "3306".
O arquivo deve ficar semelhante a esse:

```js
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "sua_porta",
  password: "senha",
  database: "case-mind"
});
```

A senha é a definida com o comando SQL.

Crie um arquivo .env (/case-mind/api/.env) e adicione a seguinte variável à ele:

```.env
JWT_SECRET = "7c0fbc43736934c61287acc3097ba665e26691218a5eb673990a1403b210e0c0"
```

Esta variável é responsável por gerar uma signature para os tokens.

Por fim, abra um terminal no repositório e digite os seguintes comandos:

```bash
cd api/
yarn
yarn start
```

Abra outro terminal, também no repositório:

```bash
cd front-end/
yarn
yarn start
```

Com isso, a api e o front-end estarão rodando e será possível usar a aplicação!

# Uso da aplicação

A primeira página que você vai ver é a de Login. Existem 3 usuários cadastrados:

1) Vitor Silveira:
    - email: vitorsilveira@email.com
    - senha: vitinho123
2) Rafael Campos:
    - email: rafaelcampos@email.com
    - senha: rafinha123
3) Usuário Administrador:
    - email: admin@adm.com
    - senha: admin123

Caso não queira usar nenhum desses usuários já cadastrados, você pode acessar o link "Clique aqui para cadastrar" e criar o seu próprio usuário. 😄

OBS.: Para criar um usuário administrador, é necessário mudar diretamente o acesso pelo banco de dados. Você pode criar o usuário pela aplicação e mudar o acesso no BD, ou inserir um novo usuário diretamente no BD, com acesso = "admin".

## Usuário - Professor

O usuário professor é o usuário default. Sempre que um novo cadastro for feito, este terá acesso de professor.

Ele pode ver os cursos dele *E* que estão visiveis, criar um novo curso, editar algum curso existente e apagar qualquer curso (por meio da aba de editar curso). Por fim, também é possível fazer LogOut, voltando para a página de LogIn e limpando os tokens do LocalStorage. 

### Formulário de Cursos

Este formulário é usado tanto para editar algum curso quanto para criar um curso novo e ele possui os seguintes campos de texto para serem preenchidos: 

- Nome: Nome do curso
  - Exemplo: Computação II
- Categoria: Categoria(s) do curso
  - Exemplo: Programação 
- Descrição: Descrição mais detalhada do curso
  - Exemplo: Um curso de computação focado em programação.  
- Professor: Nome do professor resnponsável
  - Exemplo: Vitor
- Imagem: URL da imagem a ser exibida
  - Exemplo: https://matriculas.estacio.br/blog/wp-content/uploads/2019/08/ciencia-da-computacao-o-que-se-aprende-faculdade-estacio.jpg

Além disso, quando estiver editando um curso, aparecerá um texto "Excluir Curso" sublinhado em vermelho. Ao clicar, o curso será excluído.

Sempre que criar/editar/apagar um curso, você se manterá na página atual. Para voltar, clique no texto em cinza "Voltar". Caso você não tenha clicado em algum botão de ação (Cadastrar/Salvar/Excluir), suas alterações serão descartadas.

## Usuário - Administrador

O usuário administrador tem alguns privilégios especiais:

- Ele pode ver todos os cursos, de todos os professores.
- Ele pode desativar/editar qualquer curso (Tornando-o invisível para o professor que o criou)
- Ele pode pesquisar por um curso por nome pela barra de pesquisa

Porém, ele não pode criar nenhum curso.

# Estrutura do Projeto
## API

A API está organizada da seguinte maneira:
- /controllers
  - cursosController.js: Aqui estão definidas as funções de CRUD dos cursos.
  - professoresController.js: Aqui estão definidas as funções de CRUD e Login dos professores
- /middlewares
  - admin.js: Neste middleware é feita a verificação de acesso aos privilégios de Admin.
  - auth.js: Neste middleware é feita a autenticação do token do usuário.
- /routes
  - cursos.js: Aqui estão definidas as rotas para o CRUD dos cursos.
  - professores.js: Aqui estão definidas as rotas para o CRUD e LogIn dos professores.
- db.js: Já falamos deste arquivo, ele faz a conexão com o BD MySQL.
- index.js: O index.js é responsável por organizar os endpoints "primários" de professores e cursos, encaminhando para os arquivos da pasta /routes.

## Front-End

O Front-End está organizado da seguinte maneira:
- /public
  - index.html: Este é o index.html. A única coisa que estou fazendo nele é importando a fonte "Poppins" do Google Fonts.
- /src
  - /pages
    - /Home
      - /Components
        - Grid.js: Neste arquivo é definido o grid que renderiza os cursos de cada professor, ou todos os cursos se o usuário for admin.
      - CursoForms.js: Neste arquivo é definido o forms usado para criar ou editar um curso.
      - Home.js: Neste arquivo é definida a página de Home, que renderiza os aspectos da página principal dependendo do acesso do usuário.
      - styles.js: Neste arquivo são definidos alguns estilos usando styled components.
    - /SignIn
      - index.js: Neste arquivo é definida a página de LogIn.
      - styles.js Neste arquivo são definidos alguns estilos usando styled components.
    - /SignUp
      - index.js: Neste arquivo é definida a página de Cadastro.
      - styles.js Neste arquivo são definidos alguns estilos usando styled components.
  - /services
    - api.js: Neste arquivo é definido um serviço de conexão com a api usando axios e inserindo o token no Header da requisição.
    - auth.js: Este arquivo é utilizado para guardar o token e o acesso dos usuários.
  - /styles
    - global.js: Define um estilo global para a aplicação.
  - index.js: É a página que faz o roteamento para as outras páginas.
 
Este é o projeto. Espero que gostem! 😁
