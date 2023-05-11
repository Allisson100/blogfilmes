const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TitleSubtitle = new Schema ({

    mpTitle: {
        type: String
    },
    mpSubtitle: {
        type: String
    }
})

mongoose.model('titlesubtitle', TitleSubtitle);