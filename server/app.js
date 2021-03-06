import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import moment from 'moment';

import { serverPort } from '../etc/config';

import * as db from './utils/DataBaseUtils';

import mongoose from "mongoose";
const Note = mongoose.model('Note');
// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

// RESTful api handlers
/*app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});*/

app.post('/notes', function(req, res) {
    const note = new Note({
        author: req.body.author,
        dateTimeStart: req.body.dateTimeStart,
        dateTimeEnd: req.body.dateTimeEnd,
        createdAt: new Date()
    });

    console.log(req.body.dateTimeStart);
    console.log(Date(req.body.dateTimeStart));
    console.log(moment.utc(req.body.dateTimeStart));
    Note.findOne({
        $or : [
            { $and : [ { dateTimeStart : {$lt : moment.utc(req.body.dateTimeStart)} }, { dateTimeEnd : { $gt : moment.utc(req.body.dateTimeStart) }} ] },
            { $and : [ { dateTimeEnd : {$gt : moment.utc(req.body.dateTimeEnd)} }, { dateTimeStart : {$lt :  moment.utc(req.body.dateTimeEnd)} } ] },
            { $and : [ { dateTimeStart : { $gt :  moment.utc(req.body.dateTimeStart)} }, { dateTimeEnd : { $lt : moment.utc(req.body.dateTimeEnd)} } ] },
        ]
    }, function (err, notes) {
        if (notes == null){
            console.log(notes);
            console.log('не существует!');
            note.save();
            return res.send(note);
        }
        console.log('существует');
        return res.statusCode = 400;
    });

});

/*app.post('/notes', function (req, res) {
    db.createNote(req.body).then(data => res.send(data)).reject(res.statusCode = 400);
});*/

app.get('/notes', (req, res) => {
    console.log(req.params.dateTimeStart);
    console.log('gg ' + req);
    db.listByDate(req.params.dateTimeStart).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
