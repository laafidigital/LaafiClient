import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetConsultaionListInDateRange } from '../Store/Actions'

const Mycalender = () => {
    const dispatch=useDispatch()

    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarData,setcalendarData]=useState()
    const [filterData,setfilterdata]=useState()



    useEffect(() => {
        if (calendarData && calendarData.length > 0) {
            handleCompltewaiting(0);
        }
    }, [calendarData]);

    const handleDatesSet = (arg) => {
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
          };
        let startdate=new Date(arg.start);
        startdate.setDate(startdate.getDate()+1)
        const visibleStartDate = formatDate(new Date(startdate));
        const visibleEndDate = formatDate(new Date(arg.end));


        dispatch(GetConsultaionListInDateRange(visibleStartDate,visibleEndDate)).then((res)=>{
          setcalendarData(res)
        })
        
        const visibleDates = [];
        let currentDate = new Date(arg.start);
    
        while (currentDate < arg.end) {
          visibleDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
      };

      const events = calendarData && calendarData.map((item) => {
        return {
          title: item.PatientName,
          start: `${item.ConsultationDate.split('T')[0]}T${item.ConsultationTime}`,
          end: `${item.ConsultationDate.split('T')[0]}T${item.ConsultationTime}`,
          classNames: [item.ConsultStatus ? 'calender_complted' : 'calender_pending']
        };
      });

      const handleCompltewaiting=(val)=>{
        switch(val){
            case 0:
            setfilterdata(calendarData.filter((item)=>!item.ConsultStatus))
            break
            case 1:
            setfilterdata(calendarData.filter((item)=>item.ConsultStatus))
            break
        }
      }

  return (
    <div style={{backgroundColor:'white', padding:'5px'}}>
        <div className='calendar'>
            <div className='calendar1'>
                <FullCalendar
                    plugins={[dayGridPlugin,timeGridPlugin]}
                    initialView="timeGridWeek"
                    initialDate={currentDate}
                    headerToolbar={
                        {
                            start: 'dayGridMonth,timeGridWeek,timeGridDay',
                            center: 'title',
                            end: 'prev,next'
                        }
                    }
                    datesSet={handleDatesSet}
                    events={events} 
                    eventClassNames={(arg) => arg.event.classNames}
                />
            </div>
            <div className='calendar2'>
                {/* <div className='calendar2_topdiv'>
                    <p className='calendar2_para'>Online</p>
                    <p className='calendar2_para'>Offline</p>
                    <p className='calendar2_para'>All</p>
                </div> */}
                <div>
                    <div className='d-flex pt-4 justify-content-around'>
                        <div>
                        <p className='pl-2 mb-0'>WAITING</p>
                        <button className='colorbtn ' style={{backgroundColor:'#d6d2d2',marginLeft:'30px'}} onClick={()=>handleCompltewaiting(0)}></button>
                        </div>
                        <div>
                            <p className='pl-2 mb-0'>COMPLETED</p>
                        <button className='colorbtn ' style={{backgroundColor:'#36f162 ',marginLeft:'40px'}} onClick={()=>handleCompltewaiting(1)}></button>
                        </div>               
                    </div>
                </div>
                <div className='calendar2_content'>
                {filterData &&(
                <div className='calendar2_contentmain'>
                    {filterData && filterData.map((item)=>
                    <div className='calendar2_contentsubdiv'>
                       <p><li>{item.MRN}</li></p>
                       <p>{item.PatientName}</p>
                       <hr></hr>
                    </div>
                    )}
                </div>
                )}
                </div>
            </div>
        </div>

    </div>
  )
}

export default Mycalender