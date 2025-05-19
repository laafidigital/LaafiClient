import { GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, GET_DOCTORS_FAILURE } from './Actions';

const initialState = {
    doctors: [],
    loading: false,
    error: null,
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTORS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DOCTORS_SUCCESS:
            return { ...state, loading: false, doctors: action.payload };
        case GET_DOCTORS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default doctorReducer;
