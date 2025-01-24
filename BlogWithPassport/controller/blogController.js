const blog = require('../model/blogModel');
const admin = require('../model/adminModel');
const path = require("path")
const fs = require('fs');

exports.addBlogPage = async (req, res) => {
    return res.render('addBlog', { user: req.user })
}

exports.addBlog = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/blogs/${req.file.filename}`
        }
        req.body.blogImage = imagePath;

        let authorName = req.user.firstname + " " + req.user.lastname;
        req.body.author = authorName;

        let addBlog = await blog.create(req.body);
        if (addBlog) {
            console.log("New Blog Added");
            return res.redirect("/home")
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        let deleteBlog = await blog.findById(req.params.id);

        if (!deleteBlog) {
            console.log('Blog not found');
            return res.redirect('back');
        }

        // Delete the blog image if it exists
        if (deleteBlog.blogImage) {
            let imagePath = path.join(__dirname, "..", deleteBlog.blogImage);
            fs.unlinkSync(imagePath);
            console.log('Blog image deleted successfully');
        }

        // Delete the blog from the database
        await blog.findByIdAndDelete(req.params.id);
        console.log('Blog deleted successfully');
        return res.redirect('/home');
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.redirect('back');
    }
};

exports.editBlog = async (req, res) => {
    try {
        let editBlog = await blog.findById(req.params.id);
        if (editBlog) {
            return res.render('editBlog', { editBlog, user: req.user });
        }
        else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.updateBlog = async (req, res) => {
    try {
        let record = await blog.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.blogImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Is Missing");
                    }
                }
                let newImagepath = `/uploads/blogs/${req.file.filename}`;
                req.body.blogImage = newImagepath
            } else {
                req.body.blogImage = record.blogImage
            }
            await blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Updated Blog Successfully...");
            return res.redirect("/home")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
