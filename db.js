// import * as SQLite from 'expo-sqlite'

// const db1 = SQLite.openDatabase('interviews.db')
// const db2 = SQLite.openDatabase('candidates.db')
// // export const init = () => {
// //   const promise = new Promise((resolve, reject) => {
// //     db.transaction((tx) => {
// //       tx.executeSql(
// //         'CREATE TABLE IF NOT EXISTS interview(id INTEGER NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, startTime TIMEDATE, endTime TIMEDATE, PRIMARY KEY(id,email));',
// //         [],
// //         () => {
// //           resolve()
// //         },
// //         (_, err) => {
// //           reject(err)
// //         }
// //       )
// //     })
// //   })
// //   return promise
// // }

// export const init1 = () => {
//   const promise = new Promise((resolve, reject) => {
//     db1.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS interviews(id TEXT PRIMARY KEY, title TEXT, startTime TIMEDATE NOT NULL, endTime TIMEDATE NOT NULL,candidates TEXT NOT NULL);',
//         [],
//         () => {
//           resolve()
//         },
//         (_, err) => {
//           reject(err)
//         }
//       )
//     })
//   })
//   return promise
// }
// export const init2 = () => {
//   const promise = new Promise((resolve, reject) => {
//     db2.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS candidates(id TEXT NOT NULL, name TEXT NOT NULL,email TEXT NOT NULL,PRIMARY KEY(id,email));',
//         [],
//         () => {
//           resolve()
//         },
//         (_, err) => {
//           reject(err)
//         }
//       )
//     })
//   })
//   return promise
// }

// export const insertCandidate = (name, email) => {
//   const promise = new Promise((resolve, reject) => {
//     db2.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO candidates(name,email) VALUES (?,?);',
//         [name, email],
//         (_, response) => {
//           resolve(response)
//         },
//         (_, err) => {
//           reject(err)
//         }
//       )
//     })
//   })
//   return promise
// }

// export const insertInterview = (title, startTime, endTime, candidates) => {
//   const promise = new Promise((resolve, reject) => {
//     db1.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO candidates(title,startTime,endTime,candidates) VALUES (?,?,?,?);',
//         [title, startTime, endTime, candidates],
//         (_, response) => {
//           resolve(response)
//         },
//         (_, err) => {
//           reject(err)
//         }
//       )
//     })
//   })
//   return promise
// }

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
