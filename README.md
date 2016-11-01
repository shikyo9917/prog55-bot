# Super BOT do Prog 55

## Dev

### Primeiros passos
0. instale o Node.js v6.9.1
1. clone o repositório
2. `npm install`
3. ????
4. profit

### Criando novos comandos
Para criar novos comandos crie um arquivo chamado `\<comando\>.js` na pasta `lib/commands/` contendo:  

``` JavaScript
module.exports = function (args, e, manager) {
  /* seu código aqui */
}
```

Seu comando é carregado automaticamente e é execudado com !\<comando\>

Quer que o seu commando tenha um nome diferente do arquivo?
Basta criar um alias no construtor do `CommandsManager` em `lib/CommandsManager.js`
