import { onBeforeMount, ref } from "vue";

function convertDate(oldDate) {

    const confirmyear = oldDate.slice(0,4)
    const confirmmonth = oldDate.slice(5,7)
    const confirmdate = oldDate.slice(8,10)
    let alphabetMonth = ref('')
  
  if(confirmmonth == '01') {
    alphabetMonth = 'Jan'
  }
  else if(confirmmonth == '02') {
    alphabetMonth = 'Feb'
  } 
  else if(confirmmonth == '03') {
    alphabetMonth = 'Mar'
  }
  else if(confirmmonth == '04') {
    alphabetMonth = 'Apr'
  }
  else if(confirmmonth == '05') {
    alphabetMonth = 'May'
  }
  else if(confirmmonth == '06') {
    alphabetMonth = 'Jun'
  }
  else if(confirmmonth == '07') {
    alphabetMonth = 'Jul'
  }
  else if(confirmmonth == '08') {
    alphabetMonth = 'Aug'
  }
  else if(confirmmonth == '09') {
    alphabetMonth = 'Sep'
  }
  else if(confirmmonth == '10') {
    alphabetMonth = 'Oct'
  }
  else if(confirmmonth == '11') {
    alphabetMonth = 'Nov'
  }
  else if(confirmmonth == '12') {
    alphabetMonth = 'Dec'
  }

    return `${confirmdate} ${alphabetMonth} ${confirmyear}`
}

export default convertDate