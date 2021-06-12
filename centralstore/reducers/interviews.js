// import INTERVIEWS from '../../dummy/dummyInterviews'

import Interview from '../../models/interview'
import Interview_Candidates from '../../models/interview_candidates'
import FilterObject from '../../models/filter'
import {
  DELETE_INTERVIEW,
  UPDATE_INTERVIEW,
  CREATE_INTERVIEW,
  SET_INTERVIEWS,
  INSERT_INTERVIEW_CANDIDATES,
  FILTER,
  SET_INTERVIEW_CANDIDATES,
} from '../actions/interviews'
import { Alert } from 'react-native'
const initialState = {
  // adminInterviews: INTERVIEWS,
  adminInterviews: [],
  interview_candidates: [],
  filter: [],
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
        action.interviewData.id.toString(), // put the id here after tweaking
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
    case INSERT_INTERVIEW_CANDIDATES:
      const newEntry = new Interview_Candidates(
        action.interviewCandidatesData.id.toString(),
        action.interviewCandidatesData.email,
        action.interviewCandidatesData.interview_id.toString()
      )
      // console.log(newEntry)
      return {
        ...state,
        interview_candidates: state.interview_candidates.concat(newEntry),
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
    case SET_INTERVIEWS:
      const loadedData1 = action.adminInterviews.map(
        (interview) =>
          new Interview(
            interview.id.toString(),
            interview.title,
            interview.startDate,
            interview.startMonth,
            interview.startHour,
            interview.startMinutes,
            interview.endDate,
            interview.endMonth,
            interview.endHour,
            interview.endMinutes,
            interview.candidates
          )
      )
      // console.log(loadedData1)
      return {
        ...state,
        adminInterviews: loadedData1,
      }
    case FILTER:
      const filteredList = action.filterData.map(
        (item) => new FilterObject(item.title)
      )
      for (let x in action.filterData) {
        console.log(x)
      }
      // console.log(action.filterData)

      return {
        ...state,
        filter: filteredList,
      }
    case SET_INTERVIEW_CANDIDATES:
      const loadedData = action.interview_candidates.map(
        (item) =>
          new Interview_Candidates(
            item.id.toString(),
            item.email,
            item.interview_id.toString()
          )
      )
      // console.log(loadedData)
      return {
        ...state,
        interview_candidates: loadedData,
      }
  }
  return state
}
