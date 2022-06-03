import dayjs from "dayjs"
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)

export const format = (date: any) => {
  return dayjs(date).format('MMMM Do, YYYY')
}
