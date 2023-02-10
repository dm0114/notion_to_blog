// #Date-Formatting
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: {dateString: string}) {
  
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}

{/* <Date dateString={postData.date as string} / */}
// 출력 - January 1, 2020