const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require ('../models/Category');
const Category = mongoose.model('categories');

require('../models/Post');
const Post = mongoose.model('posts');

require('../models/MainPageBanner');
const MainPageBanner = mongoose.model('mainpagebanner');

require('../models/TitleSubtitle');
const TitleSubtitle = mongoose.model('titlesubtitle');

const upload = require('../config/multer');


router.get("/", (req,res) => {
    res.render('admin/add');
})

router.get('/categories', (req, res) => {

    Category.find().lean().then((categories) => {
        res.render('admin/categories', {categories: categories});
    }).catch((err) => {
        req.flash('error_msg', "Error in categories list");
        res.redirect("/admin/add")
    })
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addcategory')
})

router.get('/categories/edit/:id', (req,res) => {

    Category.findOne({_id:req.params.id}).lean().then((category) => {
        res.render('admin/editcategories', {category: category});
    }).catch((err) => { 
        req.flash('error_msg', "That category does not exist");
        res.redirect('admin/categories');
    })
})

router.post('/categories/edit', (req, res) => {
    Category.findOne({_id: req.body.id}).then((category) => {

        category.name = req.body.name;
        category.slug = req.body.slug;

        category.save().then(() => {
            req.flash('success_msg', "Category edited successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Internal error in saving category edit");
            res.redirect('/admin/categories');
        })
    }).catch((err) => {
        req.flash('error_msg', "Error editing category");
        req.redirect('/admin/categories');
    })
})

router.post('/categories/delete', (req, res) => {
    Category.deleteOne({_id: req.body.id}).then(() => {
       req.flash('success_msg', "Category deleted successfully");
        res.redirect('/admin/categories');
    }).catch((err) => {
        req.flash('error_msg', "Error deleting category");
        res.redirect('/admin/categories');
    })
})

router.post('/category/new', (req, res) => {

    var error = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        error.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        error.push({texto: "Invalid slug"});
    }

    if (error.length > 0) {
        res.render('admin/addcategory', {error: error});
    } else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }

        new Category(newCategory).save().then(() => {
            req.flash('success_msg', "Category created successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Error to create a new category, try again");
            res.redirect('/admin');
        })
    }
})

router.get('/posts', (req, res) => {
    Post.find().lean().populate({path:'category', strictPopulate: false}).sort({date:'desc'}).then((posts) => {
        res.render('admin/posts', {posts: posts});
    }).catch((err) => {
        req.flash('error_msg', "Error to list posts");
        res.redirect('/admin');
    }) 
})

router.get('/posts/add', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('admin/addpost', {categories: categories});
    }).catch((err) => {
        req.flash('error_msg', "Error to load post form");
        res.redirect('/admin');
    }) 
})

router.post('/post/new', upload.single('file'), (req, res) => {
    var error = [];

    if(!req.body.title || typeof req.body.title == undefined || req.body.title == null) {
        error.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        error.push({texto: "Invalid slug"});
    }

    if (req.body.categoria == "0") {
        error.push({texto: "Categoria inválida, registre uma categoria"});
    }

    if (error.length > 0){
        res.render('admin/addpost', {error: error});
    } else {

        const imagePathBody = req.file.path;

        let nameNumbersImage = imagePath(imagePathBody);
        let exe = getExtension(imagePathBody);

        const fullPath = `/uploads/${nameNumbersImage}.${exe}`;

        const newPost = {
            imageName: req.body.imageName,
            imageSrc: fullPath,
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category
        }

        new Post (newPost).save().then(() => {
            req.flash('success_msg', "Post create successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Post save error");
            res.redirect('/admin/posts');
        })
    }
})

function imagePath (imagePath) {
    let justNumbers = imagePath.replace(/[^0-9]/g,'');
    return parseInt(justNumbers);
}

function getExtension(imagePathBody) {
    var r = /\.([^./]+)$/.exec(imagePathBody);
    return r && r[1] || '';
}

router.get('/post/edit/:id', (req, res) => {

    Post.findOne({_id: req.params.id}).lean().then((post) => {

        Category.find().lean().then((categories) => {
            res.render('admin/editposts', {categories: categories, post: post});
        }).catch((err) => {
            req.flash('error_msg', "Error to list categories");
            res.redirect('/admin/posts');
        })

    }).catch((err) => {
        req.flash('error_msg', "Error to load edit form");
        res.redirect('/admin/posts');
    })
})

router.post('/post/edit',upload.single('file'),  (req, res) => {

    Post.findOne({_id: req.body.id}).then((post) => {

        var fullPath = ''

        if(req.file != undefined) {
            const imagePathBody = req.file.path

            let nameNumbersImage = imagePath(imagePathBody);
            let exe = getExtension(imagePathBody);

            fullPath = `/uploads/${nameNumbersImage}.${exe}`;
        } else {
            fullPath = req.body.noImageFile
        }

        post.imageName = req.body.imageName
        post.imageSrc = fullPath
        post.title = req.body.title
        post.slug = req.body.slug
        post.description = req.body.description
        post.content = req.body.content
        post.category = req.body.category

        post.save().then(() => {
            req.flash('success_msg', "Post edit successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Error to edit post");
            res.redirect('/admin/posts');
        })

    }).catch((err) => {
        console.log(err);
        req.flash('error_msg', "Error saving edit");
        res.redirect('/admin/posts');
    })
})

router.post('/posts/delete', (req, res) => {
    Post.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', "Post deleted successfully");
        res.redirect('/admin/posts');
    }).catch((err) => {
        req.flash('error_msg', "Error deleting post");
        res.redirect('/admin/posts');
    })
})


router.get('/mainpage', (req, res) => {

    MainPageBanner.find().lean().then((mainpagebanner) => {

        TitleSubtitle.find().lean().then((titlesubtitle) => {

            res.render('admin/mainpage', {mainpagebanner: mainpagebanner, titlesubtitle: titlesubtitle})

        }).catch((err) => {
            req.flash('error_msg', "An internal error occurred");
            res.redirect('/admin');
        })

        
        
    }).catch((err) => {
        req.flash('error_msg', "Error to load main page");
        res.redirect('/admin');
    })    
})

router.post('/mainpage/save', upload.array("file"), (req, res) => {

    MainPageBanner.findById("645be464835c1bc0ebba9a71").then((mainpagebanner) => {

        var arrayPath = []
        req.files.forEach((e) => {
            arrayPath.push(e.path)
        })
    
        const mpImageNumbersArray = mpImagePath(arrayPath)
        const mpImageExtensionArray = mpGetExtension(arrayPath)
    
        const mpFullPath = []
    
        for (i = 0; i < arrayPath.length; i++) {
            mpFullPath.push(`/uploads/${mpImageNumbersArray[i]}.${mpImageExtensionArray[i]}`)
        }

        mainpagebanner.bannerImageSrc = mpFullPath

        mainpagebanner.save().then(() => {
            req.flash('success_msg', "All datas saved successfully");
            res.redirect('/admin/mainpage');
        }).catch((err) => {
            req.flash('error_msg', "Data save error");
            res.redirect('/admin/mainpage');
        })

    }).catch((err) => {
        req.flash('error_msg', "Data save error");
        res.redirect('/admin/mainpage');
    })    
})

router.post('/mainpage/savetitle', (req, res) => {

    TitleSubtitle.findById("645be16507383ea59d445df6").then((titlesubtitle) => {


        titlesubtitle.mpTitle = req.body.mpTitle
        titlesubtitle.mpSubtitle = req.body.mpSubtitle

    
        titlesubtitle.save().then(() => {
            req.flash('success_msg', "All datas saved successfully");
            res.redirect('/admin/mainpage');
        }).catch((err) => {
            req.flash('error_msg', "Data save error");
            res.redirect('/admin/mainpage');
        })
    })   
})


function mpImagePath(arrayPath) {

    const mpImageNumbers = arrayPath.map(e => e.replace(/[^0-9]/g,''))
    return mpImageNumbers
}

function mpGetExtension(arrayPath) {

    var ext = arrayPath.map(e => e.split('.').pop())
    return ext
}

module.exports = router;


