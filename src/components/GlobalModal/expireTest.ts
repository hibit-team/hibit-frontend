import  dayjs from 'dayjs';
export const expireDateSet = ()=>{
  const currentDate = dayjs()
  const goalDate = currentDate.add(3,'day').format('YYYY-MM-DD')
  if(!localStorage.getItem('modalExpireDate'))
  localStorage.setItem('modalExpireDate',goalDate)
}
export const isExpired = () => {
    const now = dayjs()
    const fotmattedGoalDate = localStorage.getItem('modalExpireDate')
    if(fotmattedGoalDate) { //null이 아니면
      // 현재 날짜와 expireDate를 비교
      let expireDate = dayjs(fotmattedGoalDate)
      return now.isAfter(expireDate) ?
      true
      :false
    }
    return 'no-value'
  }
    