const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is funny'
    },
    {
        id: uuidv4(),
        username: 'Billy',
        comment: 'Please delete your account'
    },
    {
        id: uuidv4(),
        username: 'Mil',
        comment: 'lets go somewhere'
    },
    {
        id: uuidv4(),
        username: 'Jenni',
        comment: 'I like your style'
    }
]
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    // console.log(req.body);
    comments.push({ id: uuidv4(), username, comment });
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id == id);
    res.render('comments/show', { foundComment });
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComments = req.body.comment;
    let foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComments;
    res.redirect('/comments');
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const fcomment = comments.find(c => c.id === id);
    res.render('comments/edit', { fcomment });
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter((c => c.id !== id));
    console.log(comments);
    res.redirect('/comments');
})
app.listen('3000', function () {
    console.log('hii welcome to server');
})
