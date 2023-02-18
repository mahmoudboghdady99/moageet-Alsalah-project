let name= 'مواقيت الصلاة'
 let index=1;

 function text(){
  let title= document.getElementById("name");
  title.textContent=name.slice(0, index);

  index++;
  if(index> name.length){
    index=1
  }
 }
setInterval( () => {
  text()
}, 700)

let cities=[
  {
    arabicName: "الاقصر",
    name: "Luxor"
  },
  {
    arabicName: "القاهرة",
    name: "Cairo"
  },
 {
    arabicName: "الاسكندرية",
    name: "Alexandria"
  },
  {
    arabicName: "اسوان",
    name: "Aswan"
  },
  {
    arabicName: "اسيوط",
    name: "Asyut"
  },
  {
    arabicName: "قنا",
    name: "Qena"
  }
]
//Aswan
//Asyut
// Qena

for(city of cities){
  let content = `
  <option>${city.arabicName}</option>
  `
  let citiesInput=document.getElementById("cities-select")

  citiesInput.innerHTML +=content
}

document.getElementById("cities-select").addEventListener("change", function(){
  document.getElementById("city_name").innerHTML = this.value
  let cityName=""
  for (let city of cities){
    if(city.arabicName == this.value){
      cityName = city.name
    }
  }
  getPrayerTiming(cityName)
})

function getPrayerTiming(cityName){

      let params = {
        country: "EG",
        city: cityName // "Luxor"
      }
      axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        let timings = response.data.data.timings;

        let getTimeGajr=document.getElementById("fajr-time");
        getTimeGajr.innerHTML=timings.Fajr
        console.log(timings.Sunrise, timings.Asr, timings.Maghrib , timings.Isha);

        fillTime("sunrise-time", timings.Sunrise)
        fillTime("dohr-time", timings.Dhuhr)
        fillTime("asr-time", timings.Asr )
        fillTime("magrib-time", timings.Maghrib)
        fillTime("aesha-time", timings.Isha)

        let readable=response.data.data.date.readable

        let weekDay=response.data.data.date.hijri.weekday.ar

        let inputDate=document.getElementById("date")
        date=weekDay + " "+readable
        inputDate.innerHTML= date
        console.log(weekDay + " "+readable)

      })
      .catch(function (error) {
        console.log(error);
      })

}
getPrayerTiming("Luxor")
function fillTime(id, time){
  document.getElementById(id).innerHTML = time
}
















