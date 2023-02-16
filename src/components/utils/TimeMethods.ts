const colors = ['#16a34a', '#dc2626', '#cbd5e1', '#0f172a'];

export const toMicro = (time: string) => {
    const minutes = parseFloat(time.split(':')[1])*60;
    const sec = parseFloat(time.split(':')[2]);
    return (minutes+sec)*1000000;
}
  
export const durationMicro = (duration: string) => {
    return parseFloat((duration.split('T')[1]).split('S')[0])*1000000;
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