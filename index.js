const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid'); //For generating ID's


app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())

// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    req.body.id = uuid();
    console.log(req.body.id);
    comments.push(req.body);
    res.redirect('/comments')
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    let b = 0;
    for (let c of comments) {
        if (c.id == id) {
            b = 1;
            res.render('comments/show', { c });
            break;;
        }
    }
    if (b == 0) {
        res.send("Wrong ID");
    }
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    for (let c of comments) {
        if (c.id == id) {
            b = 1;
            res.render('comments/edit', { c });
            break;
        }
    }
    if (b == 0) {
        res.send("Wrong ID");
    }
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    let b = 0;
    for (let c of comments) {
        if (c.id == id) {
            b = 1;
            c.comment = req.body.comment;
            res.redirect('/comments');
            break;
        }
    }
    if (b == 0) {
        res.send("Wrong ID");
    }
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments=comments.filter(c => c.id!==id);
    res.redirect('/comments');
})
app.listen(3000, () => {
    console.log("Listening on 3000!")
})