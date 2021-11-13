const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    currentWordIndex:{
        type:Number,
        default:0
    },
    socketId:{
        type:String
    },
    isPartyLeader:{
        type:Boolean,
        default:false
    },
    WPM:{
        type:Number,
        default:-1
    },
    nickName:{
        type:String
    }
})

const gameSchema = new mongoose.Schema({
    words: [
        { type: String }
    ],
    isOpen: {
        type: Boolean,
        default: true
    },
    isOver: {
        type: Boolean,
        default: false
    },
    players : [playerSchema],
    startTime : {
        type:Number
    }
})

module.exports = mongoose.model("Game", gameSchema);