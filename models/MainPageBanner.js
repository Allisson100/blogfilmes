const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainPageBanner = new Schema ({

    bannerImageSrc: {
        type: Array,
    }
})

mongoose.model('mainpagebanner', MainPageBanner);