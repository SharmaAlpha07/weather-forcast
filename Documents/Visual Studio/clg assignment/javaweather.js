const apiKey= `7930e3a96834ea837b6708d4258b8365`;
const CityElement=document.querySelector('.city');
const temperature=document.querySelector('.temp');
const windSpeed=document.querySelector('.wind-speed');
const humidity=document.querySelector('.humidity');
const visible=document.querySelector('.visibility-distance');
const description=document.querySelector('.description-text');
const date=document.querySelector('.date');
const Time=document.querySelector('.time');

const descriptionIcon=document.querySelector('.description i');

async function fetchWeatherData(city){

   const response= await fetch
   (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
         const data=await response.json();
         console.log(data);
         updateUI(data);
}
//fetchWeatherData();

function updateUI(data){
      if (data.cod == 404){
            temperature.textContent = data.message ;
      }else{
   CityElement.textContent=data.name;
   temperature.textContent=`${Math.round(data.main.temp)}°C`; 
   windSpeed.textContent=`${Math.round(data.wind.speed)}KM/H`;
   humidity.textContent=`${data.main.humidity}%`;
   visible.textContent=`${data.visibility/1000}KM/H`;
   description.textContent=`${data.weather[0].description}`;
   const currentDate= new Date();
   date.textContent=currentDate.toDateString();

   let hours = currentDate.getHours();
   const minutes = currentDate.getMinutes();
   const ampm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12;
   hours = hours ? hours : 12; 

   
   const currentTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
   Time.textContent = currentTime; 

   const iconName=getWeatherIcon(data.weather[0].main);
   descriptionIcon.innerHTML=` <i class="material-icons">${iconName}</i>`;
      setBackgroundVideo(iconName);
      }
}

const formEle= document.querySelector('.search-form');
const input=document.querySelector('.city-input');

formEle.addEventListener("submit",function(e){
      e.preventDefault();
      const city=input.value;
      if(city!==''){
            fetchWeatherData(city);
            input.value="";
      }
})

function getWeatherIcon(weatherCondition){
      const map={
            Clear:"wb_sunny",
            Clouds:"wb_cloudy",
            Rain:"umbrella",
            Thunderstrom:"flash_on",
            Drizzle:"grain",
            Snow: "ac_unit",
            Mist:"cloud",
            Smoke:"cloud",
            Haze:"wb_cloudy",
            Fog:"cloud",
           
      }
      return map[weatherCondition] || "Help"
}

function setBackgroundVideo(iconName) {
      const videoContainer = document.querySelector('#background-video');
      const backgroundVideoMap = {
         Clear: "./backgroundvideo1.mp4", 
         wb_cloudy: "./cloudy.mp4", 
         Rain: "./rain.mp4", 
      
      };
     
      const videoSource = backgroundVideoMap[iconName] || "./backgroundvideo1.mp4";
      
      videoContainer.src= videoSource;
   }