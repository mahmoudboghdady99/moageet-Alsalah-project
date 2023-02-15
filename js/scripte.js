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
let params = {
    country : "SA",
    city: "Luxor"
}

axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const timing = response.data.data.timings

    fillTiming("fajr-time", timing.Fajr)
    fillTiming("sunrise-time", timing.Sunrise)
    fillTiming("dohr-time", timing.Dhuhr)
    fillTiming("asr-time", timing.Asr )
    fillTiming("magrib-time", timing.Maghrib)
    fillTiming("aesha-time", timing.Isha)

    // document.getElementById("fajr-time").innerHTML = timing.Fajr

    console.log(response.data.data.timings);
  })
  .catch(function (error) {
    console.log(error);
  })
 function fillTiming(id, time){
    document.getElementById(id).innerHTML = time
 }