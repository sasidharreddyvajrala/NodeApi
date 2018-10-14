
const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000; //To set port value to local enviorment when use by heroku seerver

const app=express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now=new Date().toString();
    var logger=`${now}:${req.method} ${req.url}`
    fs.appendFile('server.log',logger+"\n",(err)=>{
        console.log('Unable to append a file');
    });
    console.log(logger);
    next();
});

// app.use((req,res,next)=>{
//     res.render("maintance.hbs");
// });

app.use(express.static(__dirname+"/public"));

app.get('/', (req,res)=>{
    //res.send('<h1>Hello Express</h1>');
   res.render("home.hbs",{
       pageTitle:"HomePage",
       message:"Welcome this is hbs node application"
   });
})
app.get('/about',(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"AboutPage",
    });
})



app.get('/bad',(req,res)=>{
    res.send({
        error:"Unable to fetch a page"
    });
})

app.listen(port,()=>{
    console.log(`server is up running at port ${port}`);
});