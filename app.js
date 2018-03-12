var express=require("express"),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser"),
    methodOverride=require("method-override");
   
var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/recipe_app");

var recipeSchema=new mongoose.Schema({
 name:String,
 ingredients:String,
 process:String
});
var Recipe=mongoose.model("Recipe",recipeSchema);

app.get("/",function(req, res){
   Recipe.find({},function(err,recipes){
    if(err){
     console.log(err);
    }else{
     res.render("index",{Recipes:recipes});
    }
   });
});

app.post("/addrecipe",function(req, res){
 Recipe.create(req.body.recipe,function(err, addrecipe){
   if(err){
    console.log(err);
   }else{
    res.redirect("/");
    console.log(req.body.recipe);
   }
 });
});

app.get("/:id/edit",function(req, res){
  Recipe.findById(req.params.id,function(err,editrecipe){
  if(err){
    console.log(err);
  }else{
    console.log(req.params.id);
    res.render("index",{edr:editrecipe});
  }
  });
});

app.put("/:id",function(req, res){
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedrecipe){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});

app.delete("/:id",function(req, res){
     Recipe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
     });
});


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server is runing...");
});