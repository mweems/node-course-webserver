const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

var data = {
    websiteTitle: 'Node Web Server',
}


app.get('/', (req, res) => {
    data.pageTitle = 'Home Page';
    data.welcomeMessage = 'You found my page, good for you!';

    res.render('home.hbs', data);
});

app.get('/about', (req, res) => {
    data.pageTitle = 'About Page';

    res.render('about.hbs', data);
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});