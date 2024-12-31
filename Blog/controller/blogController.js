const blog = require('../model/blogModel');
const path = require("path")
const admin = require('../model/adminModel');
const { log } = require('console');

exports.addBlogPage = async (req, res) => {
    return res.render('addBlog')
}

exports.addBlog = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/blogs/${req.file.filename}`
        }
        req.body.blogImage = imagePath;
        let fullName = req.cookies.admin.firstname + " " + req.cookies.admin.lastname
        req.body.author = fullName

        console.log(req.body.author);

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
        if (deleteBlog) {
            await blog.findByIdAndDelete(req.params.id);
            console.log('Blog Deleted Successfully');
            return res.redirect('/home');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.editBlog = async (req, res) => {
    try {
        let editBlog = await blog.findById(req.params.id);
        let loginAdmin = await admin.findById(req.cookies.admin._id);
        if (editBlog) {
            return res.render('editBlog', { editBlog, loginAdmin })
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
        console.log(record);

        if (record) {
            if (req.file) {
                let imagePath = record.blogImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
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
            console.log("Update Blog Success...");
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