const LanguageBrain = require('./lib/LanguageBrain');

var brain = new LanguageBrain('16e72fe8211449c2bdfac01bbb757bdb');
brain.handle('hi', (error, response) => {
    console.log(error);
    console.log(response);
});
