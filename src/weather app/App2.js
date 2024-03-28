import React, { useEffect, useState } from 'react'
import CloudIcon from '@mui/icons-material/Cloud';
import PlaceIcon from '@mui/icons-material/Place';

const App2 = () => {

    const [city, setCity] = useState("kitchener"); // for input data

    const [tempData, setTempData] = useState(null); // for showing the data in the card

    const [error, setError] = useState(null); // for error message

    const changeEvent = (e) => {
        setCity(e.target.value) 
    }

    useEffect(() => {
        const fetchApi = async () => {

            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3d87dd373e68808fa36d934d21697474`);

            console.log("response");
            console.log(response);

            if(!response.ok) {
                console.log("we are coming here");
                setError("Data not found");
            }
            else {
                const jsonRes = await response.json();
                console.log("json response");
                console.log(jsonRes); // object
          
            setError(null);
            setTempData(jsonRes);
            }
        }
 
        fetchApi();
     }, [city])


     const months = ["Jan","Feb","Mar","Apr","May","June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];

     let curTime = new Date();
     let date = curTime.getDate();
     let month = months[curTime.getMonth()];

     let hr = curTime.getHours();
     let min = curTime.getMinutes();
     let sec = curTime.getSeconds();

     let period = "AM";

     if(hr < 11){
         console.log(period);
     }else{
         period = "PM";
         if(hr > 12){
             hr -= 12;
         }
         if(min < 10){
             min = `0${min}`
         }
     }


  return (
   <>
   <body>

    <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>

        <div className='inputData'>
            <input 
            type="text" 
            placeholder='Enter your city here..'
            className='inputFeild'
            onChange={changeEvent} />
        </div>

            
            <div id="weathericon">
            <CloudIcon />
        </div>

        <div className="info">
            <div className='error'>{error}</div>
            {!error && <>
                <h2 className="location"><PlaceIcon />{tempData && tempData.name}, {tempData && tempData.sys && tempData.sys.country}</h2>
            <p id="date">{month} | {date} | {hr}:{min}:{sec} {period} </p>
            <h1 className="temp" id="temp">{tempData && tempData.main && tempData.main.temp}&deg;C</h1>
            <h3 className="tempmin_max">Min: {tempData && tempData.main && tempData.main.temp_min}&deg;C | Max: {tempData && tempData.main && tempData.main.temp_max}&deg;C </h3>
            </>}
            
        </div>
    </div>
        
   </body>
   </>
  )
}

export default App2


// style="color : #eccc68" 