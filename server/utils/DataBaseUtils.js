import mongoose from "mongoose";

import config from '../../etc/config';

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes() {
    return Note.find();
}

/*export function createNote(data) {
    const note = new Note({
        author: data.author,
        dateTimeStart: data.dateTimeStart,
        dateTimeEnd: data.dateTimeEnd,
        createdAt: new Date()
    });

    return note.save(function (err, note) {
        if (err){
            console.log('Ошибка ' + err);
        } else if ()
    })

    Note.findOne({author: data.author}, function result (err, notes) {
        if (!notes) {
            console.log('не существует!');
            return note.save();
        } else {
            console.log('существует');
            console.log(notes);
            return err;
        }
    });
    console.log('ща выполнюьс!');
    return result();
}*/

export function deleteNote(id) {
    return Note.findById(id).remove();
}

