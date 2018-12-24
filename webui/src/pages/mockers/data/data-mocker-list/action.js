import { CALL_API } from '../../../../middlewares/api';
import { getCGIBase } from '../../../../custom';

export const MOCKER_LIST_REQUEST = 'MOCKER_LIST_REQUEST';
export const MOCKER_LIST_REQUEST_SUCCESS = 'MOCKER_LIST_REQUEST_SUCCESS';
export const MOCKER_LIST_REQUEST_FAIL = 'MOCKER_LIST_REQUEST_FAIL';

function fetchMockerList(namespace) {
    return {
        [CALL_API]: {
            types: [MOCKER_LIST_REQUEST, MOCKER_LIST_REQUEST_SUCCESS, MOCKER_LIST_REQUEST_FAIL],
            url: `${getCGIBase()}/mocker/${namespace}`
        }
    };
}

export function loadMockerList(namespace) {
    return (dispatch, getState) => {
        return dispatch(fetchMockerList(namespace));
    };
}
