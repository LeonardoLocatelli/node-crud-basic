// Importando bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'games'
  });

// Configurações
const port = 8282;

// Iniciando App
const app = express();

// Instanciando Rotas
const routes = express.Router();

app.use(routes);
app.use(express.json());
app.use(bodyParser.json());


routes.get("/listar", (req, res) => {
    try {
        connection.connect();

        connection.query('SELECT * from jogos', function (error, results, fields) {
            
            if (error) res.status(500).send({"sucesso": false, "errors": error, "data": {}});

            res.send({"sucesso": true, "errors": [], "data": results});
        });
    } catch (error) {
        console.log(`Tivemos erros na execução: ${error}`)
    } finally {
        connection.end();
    }     
});

routes.post("/adicionar", (req, res) => {
    try {
        connection.connect();
    
        var jogo = { id: 10,  Nome: 'GTA IV', Valor: 300} ;   

          connection.query('INSERT INTO jogos set ?',  jogo, function (error, results, fields) { 
    
                if (error) res.status(500).send({"sucesso": false, "errors": error, "data": {}});
    
                res.send({"sucesso": true, "errors": [], "data": results});
    
            });

        } catch (error) {
            console.log(`Tivemos erros na execução: ${error}`)
        } finally {
            connection.end();
    }   
});

routes.put("/alterar", (req, res) => {
    try {
    connection.connect();

    connection.query ( ' UPDATE jogos SET id = ?, Nome = ?, Valor = ? WHERE id = ? ' , [ 8, ' GTA V' , 200 ,  10 ] , function (error, results, fields) {     

            if (error) res.status(500).send({"sucesso": false, "errors": error, "data": {}});

            res.send({"sucesso": true, "errors": [], "data": results});

        });
    } catch (error) {
        console.log(`Tivemos erros na execução: ${error}`)
    } finally {
        connection.end();
}   
});


routes.delete("/deletar", (req, res) => {
    try {
        connection.connect();

        connection.query('DELETE FROM jogos where id = "id" ' ,[10],  function (error, results, fields) {
            
            if (error) res.status(500).send({"sucesso": false, "errors": error, "data": {}});

            res.send({"sucesso": true, "errors": [], "data": results});
        });
    } catch (error) {
        console.log(`Tivemos erros na execução: ${error}`)
    } finally {
        connection.end();
    }    
});


app.listen(process.env.PORT || port, () =>
    console.log(`Aplicação rodando e ouvindo na porta ${port}`)
);