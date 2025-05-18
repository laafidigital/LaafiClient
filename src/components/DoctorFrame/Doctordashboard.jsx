import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import KycdetailsParent from './KycDetails/KycdetailsParent';
import { setparentstatus } from '../Store/DoctorFrame/KycDetailSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoSearch } from 'react-icons/io5';
import DocMypatients from './DocMypatients';
import DocScheSlots from './DoctorSchedule/DocScheSlots';
import DocScheTimeWindow from './DoctorSchedule/DocScheTimeWindow';
import { setSearchValue } from '../Store/NurseFrame/SearchNavSlice';
import Dashboard from '../Admin/Dashboard/Dashboard';
import laafilogo from '../../assets/Logos/laafiheader_transparentlogo.png';
import axios from 'axios';
import Unauthorized from '../Admin/Unauthorized';
import { useLocation } from 'react-router-dom';
import { GetZoomcallback } from '../Store/ApiReducers/Conference';

const Doctordashboard = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken');
    const Parentstatus = useSelector((state) => state.KycDetails.parentStatus);
    const seachvalue = useSelector((state) => state.SearchNurse.searchValue);
    const userlogindata = useSelector((state) => state.logindetails.userdetailsfordashboard);

    const location = useLocation();
    const [code, setCode] = useState('');

    const [zoomTokenStatus, setZoomTokenStatus] = useState(null);
    const [buttons, setButtons] = useState([
        { id: '3', label: 'My Patients', value: 'mypatients' },
        { id: '4', label: 'My Schedules', value: 'myschedule' },
    ]);

    const [selectedday, setselectedday] = useState({ slot: [], time: [], opentime: '', closetime: '', timewindow: '60' });
    const [content, setcontent] = useState('mypatients');
    const [doctorid, setdoctorid] = useState();
    const [recallapi, setrecallapi] = useState(false);
    useEffect(() => {
        const locationState = location.state;
        if (locationState && locationState.focusSection === 'mypatients') {
          setcontent('mypatients');
        }
      }, [location.state]);
      
    useEffect(() => {
        const DecodedToken = jwtDecode(token);
        setdoctorid(DecodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);

        if (DecodedToken.KycStatus === "Unverified" || DecodedToken.KycStatus === "Rejected") {
            dispatch(setparentstatus(true));
        }
    }, [token]);

    const navigate = useNavigate();

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(buttons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setButtons(items);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        dispatch(setSearchValue({ name, value }));
        if (e.target.value === '') {
            setselectedday((prev) => ({
                ...prev,
                slot: []
            }));
        }
    };

    useEffect(() => {
        const fetchZoomToken = async () => {
            try {
                const external = 'https://laafi.in/conference/api/';
                const headers = Unauthorized.Actionsauthorized();
                const response = await axios.get(external + 'ZoomAuth/GetZoomTokenByDoctorId', { headers });
                setZoomTokenStatus(response.status);
                if (response.status === 404) {
                    setButtons((prevButtons) => {
                        if (!prevButtons.find((button) => button.id === '5')) {
                            return [
                                ...prevButtons,
                                { id: '5', label: 'Authorize with Zoom', value: 'zoomlogin' }
                            ];
                        }
                        return prevButtons;
                    });
                } else {
                    setButtons((prevButtons) =>
                        prevButtons.filter((button) => button.id !== '5')
                    );
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setZoomTokenStatus(404);
                    setButtons((prevButtons) => {
                        if (!prevButtons.find((button) => button.id === '5')) {
                            return [
                                ...prevButtons,
                                { id: '5', label: 'Authorize with Zoom', value: 'zoomlogin' }
                            ];
                        }
                        return prevButtons;
                    });
                } else {
                    //console.error('Error fetching Zoom token:', error);
                }
            }
        };

        fetchZoomToken();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const codeParam = params.get('code');
    
        if (codeParam && zoomTokenStatus === 404) {
            setCode(codeParam);
            dispatch(GetZoomcallback(codeParam))
                .then((data) => {
                    setButtons((prevButtons) =>
                        prevButtons.filter((button) => button.id !== '5') // Remove the Zoom button after successful auth
                    );
                })
                .catch((error) => {
                });
        }
    }, [location.search, zoomTokenStatus, dispatch]);
    

    return (
        <div className='docdash_maindiv'>
            <div className='docdash_maindiv_container'>
                <div className='docdash_content1_main'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="ROOt" type="group">
                            {(provider) => (
                                <div className="button_div" {...provider.droppableProps} ref={provider.innerRef}>
                                    {buttons.map((button, index) => (
                                        <Draggable key={button.id} draggableId={button.id} index={index}>
                                            {(provider) => (
                                                <div
                                                    {...provider.dragHandleProps}
                                                    {...provider.draggableProps}
                                                    ref={provider.innerRef}
                                                    onClick={() =>
                                                        button.value === 'zoomlogin'
                                                            ? window.location.href = 'https://zoom.us/oauth/authorize?client_id=Ex6IDDIjQuCwGfPCwSUdA&response_type=code&redirect_uri=https%3A%2F%2Flaafi.in%2Fdoctor%2Fdoctordashboard'
                                                            : setcontent(button.value)
                                                    }
                                                >
                                                    {button.label}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provider.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className='content_div'>
                        {content === 'mypatients'
                            ? (<DocMypatients />)
                            : content === 'myschedule' ? (
                                <DocScheSlots doctorId={doctorid} setselectedday={setselectedday} selectedday={selectedday} recallapi={recallapi} />
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>

                <div className='content2_main'>
                    <div className='content2_first_div_container'>
                        <input type='text' className='content2_first_div_main' placeholder='Search For Patient Records'
                            name='search'
                            value={seachvalue.search}
                            onChange={handleSearchChange}
                        />
                        <div>
                            <IoSearch />
                        </div>
                    </div>
                    <div className='content2_second_div'>
                        {selectedday && selectedday.slot.length > 0 ? (
                            <DocScheTimeWindow selectedday={selectedday} setselectedday={setselectedday} setrecallapi={setrecallapi} recallapi={recallapi} />
                        )
                            : seachvalue.search ? (
                                <Dashboard />
                            )
                                : (
                                    <div className='content2_imagediv'>
                                        <img src={laafilogo} />
                                    </div>
                                )}
                    </div>
                </div>
            </div>
            {/* {Parentstatus && (
                <KycdetailsParent />
            )} */}
        </div>
    );
};

export default Doctordashboard;