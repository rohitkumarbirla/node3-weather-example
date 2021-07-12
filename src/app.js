const express=require("express")
const path=require("path")
const app=express()
const hbs=require('hbs')
const request=require('request')

app.set('views', path.join(__dirname, '../views'));

hbs.registerPartials(path.join(__dirname,'../partials'));


app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,"../public")))

app.get('/',(req,res) => {
    res.render('home',{
        'name':'home'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        'name':'help'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.search){
        return res.send({
            'error':'No location specified'
        })
    }

    const url="http://api.weatherstack.com/current?access_key=4a2639271fff5a6c382a349fa69d9b2e&query=" + req.query.search + "&units=m";

    console.log(url);

    request({url: url, json: true}, (error, response) => {

        if (error) {
            return res.send({
                'error':'Api returned error'
            })
        }

        //console.log(response.body.current.weather_descriptions[0] +   'current temperature is:' + response.body.current.temperature + "\n feels like:" + response.body.current.feelslike)
        return res.send({
            'current_weather':response.body.current.temperature,
            'weather_description': response.body.current.weather_descriptions[0],
            'feels like':response.body.current.feelslike
        })
    })

})

app.get('/about',(req,res)=> {
    res.render('about',{
        'name':'about'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        'name':'404'
    })
})

app.listen(3000,()=>{
    console.log("server is up")
})