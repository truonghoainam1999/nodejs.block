const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);

const Schema = mongoose.Schema;
const Course = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        video: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
