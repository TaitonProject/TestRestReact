import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    author : {
        type: String,
        required: true,
        unique: true
    },
    dateTimeStart  : {
        type: Date,
        required: true
    },
    dateTimeEnd  : {
        type: Date,
        required: true
    },
    createdAt : {
        type: Date,
        required: true,
        unique: true
    }
});

mongoose.model('Note', NoteSchema);
