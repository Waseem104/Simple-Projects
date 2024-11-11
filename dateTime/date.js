let is24Format=true;

function formatTime(hours,minutes,seconds){
  if(is24Format){
    document.getElementById("toggleFormat").textContent="12 Hour Format";
    return `${hours}:${minutes}:${seconds}`;
  }else{
    document.getElementById("toggleFormat").textContent="24 Hour Format";
    let period=hours>=12 ? 'PM' : 'AM';
    hours=hours%12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  }
}

function updateClock(){
  const now=new Date();
  let hours=now.getHours();
  let minutes=now.getMinutes();
  let seconds=now.getSeconds();

  hours=hours<10 ? '0' + hours : hours;
  minutes=minutes<10 ? '0' + minutes : minutes;
  seconds=seconds<10 ? '0' + seconds :seconds;

  const timeString=formatTime(hours,minutes,seconds);
  const dateString=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;

  document.getElementById("time").textContent=timeString;
  document.getElementById("date").textContent=dateString;
}

document.getElementById("toggleFormat").addEventListener("click",()=>{
  is24Format=!is24Format;
  updateClock();
});

setInterval(updateClock,1000);
updateClock();