import moment from "moment";

export const setDiffTimeString = diffDuration => {
  const str = [];
  diffDuration.years() > 0 ? str.push(`${diffDuration.years()} año(s)`) : null;
  diffDuration.months() > 0
    ? str.push(`${diffDuration.months()} mese(s)`)
    : null;
  diffDuration.days() > 0 ? str.push(`${diffDuration.days()} día(s)`) : null;
  diffDuration.hours() > 0 ? str.push(`${diffDuration.hours()} hora(s)`) : null;
  diffDuration.minutes() > 0
    ? str.push(`${diffDuration.minutes()} minuto(s)`)
    : null;
  diffDuration.seconds() > 0
    ? str.push(`${diffDuration.seconds()} segundos(s)`)
    : null;
  return str.join(", ");
};

export const calculateDateDiff = timeStamp => {
  const reqPetitionDate = new Date(timeStamp);
  const duration = moment.duration(moment().diff(moment(reqPetitionDate)));
  const str = setDiffTimeString(duration);
  return str;
};
