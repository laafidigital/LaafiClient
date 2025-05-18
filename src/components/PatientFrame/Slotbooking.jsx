import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";

const Slotbooking = (props) => {
  const [slot, setslot] = useState({ consultationDate: '', consultTime: '' })
  const [filterslot, setfilterslot] = useState(null)
  const doctorslotfortheWeek = useSelector((state) => state.Adddoctor.doctorSlotFortheWeek)

  const getday = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const handleinputchange = (e, consultationdate) => {
    const { name } = e.target
    if (name == 'consultationDate') {
      setslot((prev) => {
        const updatedslot = { ...prev, consultationDate: consultationdate }
        props.onsloteChange(updatedslot)
        return updatedslot
      })
      const filtertime = doctorslotfortheWeek.filter((item) => item.day == consultationdate)
      setfilterslot(filtertime)
    
    }
    else if (name == 'consulttime') {
      setslot((prev) => {
        const updatedslot = { ...prev, consultTime: consultationdate }
        props.onsloteChange(updatedslot)
        return updatedslot
      })
    }
    else {
      setslot((prev) => {
        const updatedslot = { ...prev, consultationDate: consultationdate, consultTime: consultationdate }
        props.onsloteChange(updatedslot)
        return updatedslot
      })
    }
  }

  const filterTime = (time, consultationDate) => {
    const currentDateTime = new Date();
    const [hours, minutes] = time.split(':');
    const slotDateTime = new Date(consultationDate);
    slotDateTime.setHours(hours, minutes, 0, 0);
    if (slotDateTime.toDateString() !== currentDateTime.toDateString()) {
      return true;
    }
    return slotDateTime > currentDateTime;
  };

  const areAllSlotsPassed = (slots, consultationDate) => {
    const currentDateTime = new Date();
    return slots.every(slot => {
      const [hours, minutes] = slot.timeSlot.split(':');
      const slotDateTime = new Date(consultationDate);
      slotDateTime.setHours(hours, minutes, 0, 0);
      return slotDateTime < currentDateTime;
    });
  };

  return (
    <div className='slotbooking'>
      {
        slot.consultationDate ? (
          <div className='slotbooking_conatiner2'>
            <div className='d-flex justify-content-end'>
              <IconButton onClick={(e) => handleinputchange(e, null)} ><IoClose /></IconButton>
            </div>
            <div>
              {filterslot && filterslot[0].slots
                .filter((filteritem) => filterTime(filteritem.timeSlot, slot.consultationDate)) // Filter slots
                .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)) // Sort slots in ascending order
                .length === 0 || areAllSlotsPassed(filterslot[0].slots, slot.consultationDate) ? (
                  <p className="no-slots-message">No slots are available now, select another day</p>
                ) : (
                  filterslot[0].slots
                    .filter((filteritem) => filterTime(filteritem.timeSlot, slot.consultationDate)) // Filter slots
                    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)) // Sort slots in ascending order
                    .map((filteritem) => (
                      <button
                        onClick={(e) => handleinputchange(e, filteritem.timeSlot)}
                        name='consulttime'
                        disabled={filteritem.status}
                        className={filteritem.status ? 'slotemptybtn' : 'slotavilablebtn'}
                      >
                        {filteritem.timeSlot}
                      </button>
                    ))
                )}
            </div>
          </div>
        ) : (
          doctorslotfortheWeek && doctorslotfortheWeek.map((item) => (
            <div className='slotbooking_conatiner'>
              <button onClick={(e) => handleinputchange(e, item.day)}
                name='consultationDate'
                className={item.slots.length == 0 ? 'slotemptybtn' : 'slotavilablebtn'}
                disabled={item.slots.length == 0}
              >{item.day}{getday(item.day)}
              </button>
            </div>
          ))
        )
      }
    </div>
  )
}

export default Slotbooking