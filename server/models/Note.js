import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    author     : { author: String },
    dateTimeStart  : { type: Date, required: true},
    dateTimeEnd  : { type: Date, required: true},
    createdAt : { type: Date }
});

mongoose.model('Note', NoteSchema);
