class Interview {
  constructor(
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
  ) {
    this.id = id
    this.title = title
    this.startDate = startDate
    this.startMonth = startMonth
    this.startHour = startHour
    this.startMinutes = startMinutes
    this.endDate = endDate
    this.endMonth = endMonth
    this.endHour = endHour
    this.endMinutes = endMinutes
    this.candidates = candidates
  }
}

export default Interview
