# Seja bem-vindo(a) ao meu projeto MatchMaster!
Na aplicação temos as informações sobre partidas e classificações de times de futebol!
Criação de uma API Rest utilizando POO e princípios SOLID com construção de CRUD utilizando Sequelize para queries e docker para rodar os ambientes de forma separada.
O projeto é fullstack e representa uma simulação de uma tabela de um campeonato de futebol, com uma validação via login para saber se o usuário é admin ou não, se for libera novas features como: alterar dados da partida, inserir novas partidas ou finalizar partidas em andamento. Na parte de frontend podemos filtrar os resultados, modificar e finalizar partidas, desde que seja admin, além de poder verificar a classificação geral, classificação de time mandante e de time visitante de forma separada.

## Habilidades para o projeto
Vão ser necessárias para realização do projeto
 - Utilizando containers Docker
 - Node.js: ORM e Autenticação
 - Node.js: API REST com Express

## Conteúdos de Soft Skills
 - Introdução à resolução de problemas

## Requisitos obrigatórios do Projeto
 - 1 - Desenvolva a migration e o model que representa a tabela de times nos respectivos diretórios no caminho /app/backend/src/database
 - 2 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos do diretório /app/backend/src, com um mínimo de 7 linhas cobertas
 - 3 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar corretamente todos os times
 - 4 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 19 linhas cobertas
 - 5 - Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico
 - 6 - Desenvolva a migration e o model que representa a tabela de pessoas usuárias nos respectivos diretórios no caminho /app/backend/src/database
 - 7 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 25 linhas cobertas
 - 8 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
 - 9 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 35 linhas cobertas
 - 10 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end
 - 11 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 45 linhas cobertas
 - 12 - Desenvolva um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint /login/role no back-end de maneira que ele retorne os dados corretamente no front-end
 - 13 - Desenvolva a migration e o model que representa a tabela de partidas nos respectivos diretórios no caminho /app/backend/src/database
 - 14 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 70 linhas cobertas
 - 15 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end
 - 16 - Desenvolva o endpoint /matches de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end
 - 17 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível finalizar uma partida no banco de dados
 - 18 - Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
 - 19 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 80 linhas cobertas
 - 20 - Desenvolva o endpoint /matches de modo que seja possível cadastrar uma nova partida em andamento no banco de dados
 - 21 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times
 - 23 - Desenvolva o endpoint /leaderboard/home de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
 - 24 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
 - 25 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
 - 26 - Desenvolva o endpoint /leaderboard/away de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
 - 27 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
 - 28 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
 - 29 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados
## Requisitos Bônus
 - 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 100 linhas cobertas
 - 30 - (Bônus) Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC
