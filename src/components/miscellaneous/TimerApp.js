import { useState, useEffect } from 'react';

function TimerApp() {
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
    today: new Date().toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
  })
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
        today: date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
      })
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  const convertToTwoDigit = (number) => {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2
    })
  }
  console.log(time.today.split(',')[1].split(' '));
  function strip(string) {
    return string.replace(/^\s+|\s+$/g, '');
}
  return (
    <div id="timer" style={{width:'100%',height:'30%',overflow:'hidden',backgroundColor:'red',borderRadius:'5px',padding:'2%'}}>
      <div className='clock'>
        <div style={{textAlign:'right',fontSize:'28px',fontWeight:'600',}}>Hello {time.today.split(',')[0]}<br></br>{strip(time.today.split(',')[1]).split(' ')[1]+" "+strip(time.today.split(',')[1]).split(' ')[0]+" "+time.today.split(',')[2]}<br></br>{convertToTwoDigit(time.hours)}:{convertToTwoDigit(time.minutes)}:{convertToTwoDigit(time.seconds)} {time.hours >= 12 ? ' PM' : ' AM'}</div>
      </div>
    </div>
    
  );
}

export default TimerApp;