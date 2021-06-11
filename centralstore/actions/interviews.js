export const DELETE_INTERVIEW = 'DELETE_INTERVIEW'
export const CREATE_INTERVIEW = 'CREATE_INTERVIEW'
export const UPDATE_INTERVIEW = 'UPDATE_INTERVIEW'
export const SET_INTERVIEWS = 'SET_INTERVIEWS'

import {
  insertInterview,
  fetchInterviews,
  updatingInterview,
  deletingInterview,
} from '../../db'

export const deleteInterview = (interviewId) => {
  return async (dispatch) => {
    try {
      const dbResult = await deletingInterview(interviewId)
      console.log(dbResult)
      dispatch({ type: DELETE_INTERVIEW, pid: interviewId })
    } catch (err) {
      throw err
    }
  }
  // return { type: DELETE_INTERVIEW, pid: interviewId }
}

export const createInterview = (
  title,
  startDate,
  startMonth,
  startHour,
  startMinutes,
  endDate,
  endMonth,
  endHour,
  endMinutes,
  candidates
) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertInterview(
        title,
        startDate,
        startMonth,
        startHour,
        startMinutes,
        endDate,
        endMonth,
        endHour,
        endMinutes,
        candidates
      )
      console.log(dbResult)
      dispatch({
        type: CREATE_INTERVIEW,
        interviewData: {
          //auto generated
          id: dbResult.insertId,
          title,
          startDate,
          startMonth,
          startHour,
          startMinutes,
          endDate,
          endMonth,
          endHour,
          endMinutes,
          candidates,
        },
      })
    } catch (err) {
      throw err
    }
  }
  // return {
  //   type: CREATE_INTERVIEW,
  //   interviewData: {
  //     // yaha pe id bhi daaldo
  //     title,
  //     startDate,
  //     startMonth,
  //     startHour,
  //     startMinutes,
  //     endDate,
  //     endMonth,
  //     endHour,
  //     endMinutes,
  //     candidates,
  //   },
  // }
}

export const updateInterview = (
  id,
  title,
  startDate,
  startMonth,
  startHour,
  startMinutes,
  endDate,
  endMonth,
  endHour,
  endMinutes,
  candidates
) => {
  return async (dispatch) => {
    try {
      const dbResult = await updatingInterview(
        id,
        title,
        startDate,
        startMonth,
        startHour,
        startMinutes,
        endDate,
        endMonth,
        endHour,
        endMinutes,
        candidates
      )
      console.log(dbResult)
      dispatch({
        type: UPDATE_INTERVIEW,
        pid: id,
        interviewData: {
          title,
          startDate,
          startMonth,
          startHour,
          startMinutes,
          endDate,
          endMonth,
          endHour,
          endMinutes,
          candidates,
        },
      })
    } catch (err) {
      throw err
    }
  }

  // return {
  //   type: UPDATE_INTERVIEW,
  //   pid: id,
  //   interviewData: {
  //     title,
  //     startDate,
  //     startMonth,
  //     startHour,
  //     startMinutes,
  //     endDate,
  //     endMonth,
  //     endHour,
  //     endMinutes,
  //     candidates,
  //   },
  // }
}

export const loadInterviews = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchInterviews()

      dispatch({ type: SET_INTERVIEWS, adminInterviews: dbResult.rows._array })
    } catch (err) {
      throw err
    }
  }
}
