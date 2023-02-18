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
  "الاسكندرية", "القاهرة", "الأقصر"
]

for(city of cities){
  let content = `
  <option>${city}</option>
  `
  let citiesInput=document.getElementById("cities-select")

  citiesInput.innerHTML +=content
}

document.getElementById("cities-select").addEventListener("chang", function(){
  alert("welcome")
})

let params = {
  country: "EG",
  city: "Luxor"
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


function fillTime(id, time){
  document.getElementById(id).innerHTML = time
}
















