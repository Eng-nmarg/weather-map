const input= document.getElementById("country-inp");
const search= document.getElementById("search-btn");
 const map_container= document.getElementById("map-container");
 const contryName= document.getElementById("contryName");
 const save= document.getElementsByClassName("btn-1");
 



//
const default_coords= [30.0444 , 31.2357];
const zoom=6;


// create map 
const map = L.map(map_container).setView(default_coords , zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    zoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(map);
//L.marker(default_coords,zoom).addTo(map);
//L.circle(default_coords ,zoom).addTo(map);





let marker, circle;


const apikey=`71c63bc7e4c006803628174de0c9decb`;
 async function map_weather(contryName){
 //   console.log(contryName.value.trim());

    if(!contryName||!contryName.trim()){
alert("Enter the valid contry");
    return;

    }
    

    try{
        const gurll =`https://api.openweathermap.org/geo/1.0/direct?q=${contryName.trim()}&limit=1&appid=${apikey}`;
        const mm = await fetch(gurll);
        const goc =await mm.json();

        if(goc.length===0){
            throw new Error( 'contry not found weather data');

        }//en if

        const lat = goc[0].lat;
        const lng =goc[0].lon;
        const name = goc[0].name;
        const accuracy = 1500;



        const urll=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}&units=metric`;
        const resp = await fetch(urll);
        if(!resp.ok){
            throw new Error( 'contry not found');

        }//en if

        const jsonData =await resp. json();


        ///data
        

       
        const temp = Math.round(jsonData.main.temp)+"c" || "N/A";
        const wind_speed = jsonData.wind.speed+"Km/h"||"N/A";
        const humidity = jsonData.main.humidity+"%"||"N/A";
        const clouds = jsonData.weather[0].main||"N/A";
        const icon = jsonData.weather[0].icon||"N/A";
        const weather_status = jsonData.weather[0].description||"N/A";
        
        
   if(marker){
            map.removeLayer(marker);
            map.removeLayer(circle);

        }
        marker= L.marker([lat , lng]).addTo(map);
      circle= L.circle([lat , lng] ,{radius: accuracy}).addTo(map);
 

       //if for zoom

       //invok method
       loading_location(lat , lng ,accuracy, name , temp ,humidity,wind_speed ,clouds ,weather_status ) 



    }

    catch{

    }


}
 

search.addEventListener("click", (e) =>{
     e.preventDefault();
    const searchCountry = input.value;
    console.log(searchCountry);
    contryName.innerText=searchCountry;
    map_weather(input.value);

});


function loading_location(lat , lng , name , temp ,humidity,wind ,clouds ,weather_status ){
    map.setView([lat , lng] ,6);
    const popup= `
    <div class="pop">
    <div class="name"><h2>${name}</h2> </div>
    <div class="weather-icon"> <img src="image/sun.png" alt=""></div>
    <div class="discrip"> <h3>${weather_status}</h3></div>

    <div class="temp">
        <img src="image/temperature.svg" alt="">
         <span>${temp}</span>

    </div>
    <div class="clouds">
        <img src="image/cloud.svg" alt="">
         <span>${clouds} </span>

    </div>

    <div class="info">
        <div class="wind">
            <img src="image/wind.png" alt="">
            <span>${wind}</span>
        </div>
        <div class="hum">
          <img src="image/humidity.png" alt="">
          <span>${humidity}</span>

        </div>      
</div>
    `;
   
    
    marker= L.marker([lat , lng]).addTo(map).bindPopup(popup).openPopup();
    circle= L.circle([lat , lng] ,{radius: accuracy}).addTo(map);

  //  marker.bindPopup(popup).openPopup();


}

//--------------
 
function saveton(searchCountry){

  //  const store= localStorage.getItem
}


