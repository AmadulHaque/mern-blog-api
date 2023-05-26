const express =require("express");
const router = express.Router();
const path= require('path');
const fs = require('fs');
const AuthVerifyMiddleware =require('../Middleware/AuthverifyMiddleware');

const UsersController=require("../Controllers/Users/UserController");
const ContactController =require("../Controllers/Contact/ContactController");
const BlogController =require("../Controllers/Blogs/BlogController");
const DashboardController =require("../Controllers/Dashboard/DashboardController");


// auth check & test
router.get("/auth-check",AuthVerifyMiddleware, (req, res) => {
  res.json({ status: "ok" });
});
router.get("/test", (req, res) => {
	res.send("Test Success");
});



// User Profile 
router.post("/register",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.post("/ProfileUpdate",AuthVerifyMiddleware,UsersController.ProfileUpdate);
router.get("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass",UsersController.RecoverResetPass);


// Contact
router.post("/CreateContact",AuthVerifyMiddleware,ContactController.CreateContact);
router.post("/UpdateContact/:id",AuthVerifyMiddleware,ContactController.UpdateContact);
router.get("/ContactList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ContactController.ContactList);
router.get("/DeleteContact/:id",AuthVerifyMiddleware,ContactController.DeleteContact);
router.get("/ContactDetailsByID/:id",AuthVerifyMiddleware,ContactController.ContactDetailsByID);

// Blog
router.post("/CreateBlog",AuthVerifyMiddleware,BlogController.CreateBlog);
router.post("/UpdateBlog/:id",AuthVerifyMiddleware,BlogController.UpdateBlog);
router.get("/BlogList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,BlogController.BlogList);
router.get("/DeleteBlog/:id",AuthVerifyMiddleware,BlogController.DeleteBlog);
router.get("/BlogDetailsByID/:id",AuthVerifyMiddleware,BlogController.BlogDetailsByID);

// Summery
router.get("/contactTotal",AuthVerifyMiddleware,DashboardController.ContactTotal);
router.get("/blogTotal",AuthVerifyMiddleware,DashboardController.BlogTotal);
router.get("/visitorTotal",AuthVerifyMiddleware,DashboardController.VisitorTotal);



///
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));
router.get('/uploads', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');

    // Read the files in the directory
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send({ error: 'Error reading directory.' });
        }

        // Filter the files to only include images (you can adjust this based on your requirements)
        const imageFiles = files.filter((file) => {
            const extension = path.extname(file).toLowerCase();
            return extension === '.jpg' || extension === '.jpeg' || extension === '.png' || extension === '.gif';
        });

        // Send the image files as a response
        res.send(imageFiles);
    });
});
module.exports = router;