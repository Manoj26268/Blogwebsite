const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const db = 'mongodb+srv://manojanthati26:Manoj@cluster0.zxoafsd.mongodb.net/bolgwebsitedb?retryWrites=true&w=majority';

mongoose.connect(db,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("connection is succesful");
}).catch((err)=>console.log(err));

const postSchema = {

  title: String,
 
  content: String
 
 };
 const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  (async ()=> {
    try {
      const posts = await Post.find({});
      res.render("home", {homeDisplayContent: homeStartingContent, blogPosts: posts});
      // console.log(people);
      // mongoose.connection.close();
      
    } catch (err) {
      console.log(err);
    }
})();

  
})

app.get("/posts/:postTitle", (req, res) => {
  const requestedTitle =_.capitalize(_.lowerCase( req.params.postTitle));
  (async ()=> {
    try {
      const post = await Post.findOne({title:requestedTitle});
      res.render("post", {requestedTitle: post.title, postBody: post.content});
      // console.log(people);
      // mongoose.connection.close();
      
    } catch (err) {
      console.log(err);
    }
})();

  
})

app.post("/compose", (req, res) => {
  
  const post =new Post( {
    title:_.capitalize(_.lowerCase( req.body.postTitle)),
    content: req.body.postContent
  });
  (async ()=> {
    try {
       await post.save();
       res.redirect("/");
      // console.log(people);
      // mongoose.connection.close();
      
    } catch (err) {
      console.log(err);
    }
})();


  // Adding post to the total blog posts
  // posts.push(post);

  // Redirecting to the home page
  
})

app.get("/about", (req, res) => {
  res.render("about", {aboutDisplayContent: aboutContent});
})

app.get("/contact", (req, res) => {
  res.render("contact", {contactDisplayContent: contactContent});
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});