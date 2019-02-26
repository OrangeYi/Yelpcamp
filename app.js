var LocalStrategy = require("passport-local"),
    express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    Comment       = require("./models/comment"),
    passport      = require("passport"),
    User          = require("./models/user"),
    methodOverride= require("method-override"),
    flash         = require("connect-flash")
    
var commentRoutes = require("./routes/comments"),
campgroundsRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/yalp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//seedDB(); 

app.use(flash());

//passport configation
app.use(require("express-session")({
    secret: "wins",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//let all the page know currentuser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routers
app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});