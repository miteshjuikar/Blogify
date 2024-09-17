const { Schema, model } = require("mongoose");

const blogSchema = Schema({
    title:  {
                type: String,
                required: true
            },
    body:  {
                type: String,
                required: true
            },
    coverImage:  {
                type: String,
                required: false,
    
            },
    createdBy:  {
                type: Schema.Types.ObjectId,
                required: "user"
            },
}, { timestamp: true }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
