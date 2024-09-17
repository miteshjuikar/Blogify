const Blog = require("../models/blogModel");

async function handleCreateNewBlog(req,res){
    const { title,body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        coverImage: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });

    return res.redirect(`/blog/${blog._id}`);
}

async function handleSingleBlogDetails(req,res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    return res.render("blog", {
        user: req.user,
        blog
    });
};

module.exports = { handleCreateNewBlog, handleSingleBlogDetails };