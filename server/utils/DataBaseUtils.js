import mongoose from "mongoose";
import moment from 'moment';
import config from '../../etc/config';

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

/*export function listNotes() {
    return Note.find();
}*/

export function listByDate(date) {
    console.log('дата в listByDate ' + date);
    var startDay = moment(date, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0);
    var endDay = moment(date, 'YYYY-MM-DD').hours(24).minutes(0).seconds(0);
    console.log(startDay);
    console.log(endDay);

    return Note.find({dateTimeStart : moment(date, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0)}, function (err, notes) {
        console.log('выбрали по дате ' + notes)
    });
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

