const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let tvshowSchema = new Schema(
    {
        name: {type: String},
        description: {type: String},
        seasons: {type: Number},
        actors: {type: String},
        image: {type: String}
    }
);

module.exports = mongoose.model("tvshow", tvshowSchema);