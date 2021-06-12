export const DELETE_INTERVIEW = 'DELETE_INTERVIEW'
export const CREATE_INTERVIEW = 'CREATE_INTERVIEW'
export const UPDATE_INTERVIEW = 'UPDATE_INTERVIEW'
export const SET_INTERVIEWS = 'SET_INTERVIEWS'
export const INSERT_INTERVIEW_CANDIDATES = 'INSERT_INTERVIEW_CANDIDATES'
export const FILTER = 'FILTER'
export const SET_INTERVIEW_CANDIDATES = 'SET_INTERVIEW_CANDIDATES'
import {
  insertInterview,
  fetchInterviews,
  updatingInterview,
  deletingInterview,
  insertInterviewCandidates,
  filterInterviewCandidates,
  fetchInterviewCandidates,
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
      const interview_id = dbResult.insertId
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
      for (const x in candidates.split(' ')) {
        let currentEmail = candidates.split(' ')[x]
        let dbResult2 = await insertInterviewCandidates(
          currentEmail,
          interview_id
        )
        console.log(dbResult2)
        dispatch({
          type: INSERT_INTERVIEW_CANDIDATES,
          interviewCandidatesData: {
            id: dbResult2.insertId,
            interview_id: interview_id,
            email: currentEmail,
          },
        })
      }
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
      // console.log(dbResult)
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

export const loadInterviewCandidates = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchInterviewCandidates()
      console.log(dbResult)
      dispatch({
        type: SET_INTERVIEW_CANDIDATES,
        interview_candidates: dbResult.rows._array,
      })
    } catch (err) {
      throw err
    }
  }
}

export const filterFilter = (email) => {
  return async (dispatch) => {
    try {
      const dbResult = await filterInterviewCandidates(email)
      console.log(dbResult)
      dispatch({
        type: FILTER,
        filterData: dbResult.rows._array,
      })
    } catch (err) {
      throw err
    }
  }
}
