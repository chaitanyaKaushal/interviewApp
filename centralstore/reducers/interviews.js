// import { Interview } from '../../models/interview'
// import {
//   SET_INTERVIEWS,
//   DELETE_INTERVIEW,
//   CREATE_INTERVIEW,
//   UPDATE_INTERVIEW,
// } from '../actions/interviews'

// import INTERVIEWS from '../../dummy/dummyInterviews'

// const initialState = {
//   adminInterviews: INTERVIEWS,
// }

// const interviewsReducers = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_INTERVIEWS:
//       return state
//     case DELETE_INTERVIEW:
//       return {
//         ...state,
//         adminInterviews: state.adminInterviews.filter(
//           (interview) => interview.id !== action.pid
//         ),
//       }
//     case CREATE_INTERVIEW:
//       const newInterview = new Interview(
//         action.interviewData.id,
//         action.interviewData.title,
//         action.interviewData.startTime,
//         action.interviewData.endTime,
//         action.interviewData.candidates
//       )
//       return {
//         ...state,
//         adminInterviews: state.adminInterviews.concat(newInterview),
//       }
//     case UPDATE_INTERVIEW:
//       const interviewIndex = state.adminInterviews.findIndex(
//         (interview) => interview.id === action.pid
//       )
//       const updatedInterview = new Interview(
//         action.pid,
//         action.interviewData.title,
//         action.interviewData.startTime,
//         action.interviewData.endTime,
//         action.interviewData.candidates
//       )
//       const updatedAdminInterviews = [...state.adminInterviews]
//       updatedAdminInterviews[interviewIndex] = updatedInterview

//       return {
//         ...state,
//         adminInterviews: updatedAdminInterviews,
//       }
//     default:
//       return state
//   }
// }

// export default interviewsReducers

import INTERVIEWS from '../../dummy/dummyInterviews'
import Interview from '../../models/interview'
import {
  DELETE_INTERVIEW,
  UPDATE_INTERVIEW,
  CREATE_INTERVIEW,
} from '../actions/interviews'
const initialState = {
  adminInterviews: INTERVIEWS,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_INTERVIEW:
      return {
        ...state,
        adminInterviews: state.adminInterviews.filter(
          (interview) => interview.id !== action.pid
        ),
      }
    case CREATE_INTERVIEW:
      const newInterview = new Interview(
        new Date().getTime().toString(),
        action.interviewData.title,
        action.interviewData.startDate,
        action.interviewData.startMonth,
        action.interviewData.startHour,
        action.interviewData.startMinutes,
        action.interviewData.endDate,
        action.interviewData.endMonth,
        action.interviewData.endHour,
        action.interviewData.endMinutes,
        action.interviewData.candidates
      )
      return {
        ...state,
        adminInterviews: state.adminInterviews.concat(newInterview),
      }
    case UPDATE_INTERVIEW:
      const interviewIndex = state.adminInterviews.findIndex(
        (interview) => interview.id === action.pid
      )
      const updatedInterview = new Interview(
        action.pid,
        action.interviewData.title,
        action.interviewData.startDate,
        action.interviewData.startMonth,
        action.interviewData.startHour,
        action.interviewData.startMinutes,
        action.interviewData.endDate,
        action.interviewData.endMonth,
        action.interviewData.endHour,
        action.interviewData.endMinutes,
        action.interviewData.candidates
      )
      const updatedInterviews = [...state.adminInterviews]
      updatedInterviews[interviewIndex] = updatedInterview
      return {
        ...state,
        adminInterviews: updatedInterviews,
      }
  }
  return state
}
