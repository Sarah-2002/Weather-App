import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'



function App() {
  const [count, setCount] = useState(0)
  const [data,setData]= useState({
    celcius: 10,
    name : 'london',
    feel: 10 ,
    speed: 2 , 
    image : ' ' 
  })
  const [name, setName] = useState('');
  
  const handleClick =() =>{
    if(name !== ""){
      const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=854ed64c5975f2c7b048f7bbcaa4cd1b&units=metric` ;
    axios.get(apiUrl).then(res => {
      let imagePath = ' ' ;
      if(res.data.weather[0].main === "Clouds"){
        imagePath = "/images/cloudy.png"
      } else if ( res.data.weather[0].main === "Clear"){
        imagePath = "/images/sunny.png"
      } else if ( res.data.weather[0].main === "Mist"){
        imagePath = "/images/haze.png"
       } else {
        imagePath = "/images/cloudy.png"
       }

      setData({...data , celcius: res.data.main.temp , name: res.data.name, 
        feel : res.data.main.humidity, speed: res.data.wind.speed, image : imagePath})
    })
      .catch(err => console.log(err))

  } 

    }


  useEffect(()=> {
    const apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=london&appid=854ed64c5975f2c7b048f7bbcaa4cd1b&units=metric' ;
    axios.get(apiUrl).then(res => {
      let imagePath = ' ' ;
      if(res.data.weather[0].main === "Clouds"){
        imagePath = "/images/cloudy.png"
      } else if ( res.data.weather[0].main === "Clear"){
        imagePath = "/images/sunny.png"
      } else if ( res.data.weather[0].main === "Mist"){
        imagePath = "/images/haze.png"
       } else {
        imagePath = "/images/cloudy.png"
       }
      console.log(res.data);
      setData({...data , celcius: res.data.main.temp , name: res.data.name, 
        feel: res.data.main.humidity, speed: res.data.wind.speed , image:imagePath })
    })
      .catch(err => console.log(err))

  } , [])



  return (
    <div className="App">
    <div className='container'>
    <div className='input-group'>
        <input  type="text" placeholder='Enter City Name' onChange={e=> setName(e.target.value)} />
        <div class="icon"> <img src='/images/search (1).png' onClick={handleClick} alt='search'/> </div> 
        </div>
        <div class="image-container">
        <img src={data.image} alt=' ' />
        <h1> {Math.round(data.celcius)} °C </h1>
        <h1> {data.name} </h1>
      </div>

      <div class="boxes">
      <div class="box">
        <div className='img'> <img src='/images/dew.png' alt='humidity' /> </div>
        <div class="info">
        <h1> {Math.round(data.feel)} % </h1>
        <h1> Humidity </h1>
      </div>
      </div>
      <div class="box">
      <div className='img'>  <img src='/images/wind.png' alt='windy' /> </div>
      <div class="info"> 
        <h1> {Math.round (data.speed)} km/h </h1>
        <h1>  Wind </h1>
        </div>
      </div>
      </div>
      </div>
      </div> 
    
  )} 

export default App
