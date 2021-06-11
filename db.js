import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('interviews.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS interviews(id INTEGER PRIMARY KEY, title TEXT NOT NULL, startDate TEXT NOT NULL,startMonth TEXT NOT NULL,startHour TEXT NOT NULL,startMinutes TEXT NOT NULL, endDate TEXT NOT NULL, endMonth TEXT NOT NULL,endHour TEXT NOT NULL,endMinutes TEXT NOT NULL, candidates TEXT NOT NULL);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const insertInterview = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO interviews (title,startDate,startMonth,startHour,startMinutes,endDate,endMonth,endHour,endMinutes,candidates) VALUES (?,?,?,?,?,?,?,?,?,?);',
        [
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
        ],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const fetchInterviews = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM interviews;',
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const updatingInterview = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE interviews SET title=?, startDate=? ,startMonth=?, startHour=?, startMinutes=?, endDate=?, endMonth=?, endHour=?, endMinutes=? ,candidates=? WHERE id=? ;',
        [
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
          id,
        ],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const deletingInterview = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM interviews WHERE id=?;',
        [id],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}
