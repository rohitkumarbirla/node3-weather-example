//const e = require("express")


console.log("Hello client!")

const weatherForm = document.querySelector('#frm1')
const search = document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')


weatherForm.addEventListener('submit',(event)=> {
    event.preventDefault() // so that page doesnt refresh

    const location=search.value

    fetch('http://localhost:3000/weather?search=' + location).then ((response) =>{
    response.json().then((data)=> {
        console.log(response)
        console.log(data)
        if(data.error){
            console.log('error')
            msg1.textContent='Error'
        } else {
            console.log(data.current_weather)
            msg2.textContent = data.current_weather
        }
    })
})

})