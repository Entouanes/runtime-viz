const colors = ['#16a34a', '#dc2626', '#cbd5e1', '#0f172a'];

export const toMicro = (time: string) => {
    const days = parseFloat(time.split('T')[0].split('-')[2])*3600*24;
    const hours = parseFloat(time.split(':')[0].split('T')[1])*3600
    const minutes = parseFloat(time.split(':')[1])*60;
    const sec = parseFloat(time.split(':')[2]);
    return (days + hours + minutes + sec)*1000000;
}
  
export const durationMicro = (duration: string) => {
  duration = duration.split('T')[1];
  
  if (duration.includes('H')) {
    console.log(duration.split('H')[0])
    const hours: number = parseInt(duration.split('H')[0]);
    duration = duration.split('H')[1];
    const minutes: number = parseInt(duration.split('M')[0]);
    duration = duration.split('M')[1];
    const seconds: number = parseInt(duration.split('.')[0]);
    duration = duration.split('.')[1];
    const mseconds: number = parseInt(duration);

    return (mseconds + seconds*1000)*1000 + minutes*60*1000000 + hours*60*60*1000000;
  } else if (duration.includes('M')) {
    const minutes: number = parseInt(duration.split('M')[0]);
    duration = duration.split('M')[1];
    const seconds: number = parseInt(duration.split('.')[0]);
    duration = duration.split('.')[1];
    const mseconds: number = parseInt(duration);
    
    return (mseconds + seconds*1000)*1000 + minutes*60*1000000;
  } else {
    return parseFloat(duration.split('S')[0])*1000000;
  }
}
  
export const getEndTime = (data: object) => {
    var max = -1;
    for (const action in data) {
      if (data[action]['y'][1] > max) {
        max = data[action]['y'][1];
      }
    }
    return max;
}