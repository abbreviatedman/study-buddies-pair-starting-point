const date1 = new Date("2022-06-26T03:11:00.000Z");

const dateTime = (date) => {
  new Date(date);
  const [month, day, year, hour, minutes, seconds] = [
    date1.month(),
    date1.date(),
    date1.fullYear(),
    date1.hours(),
    date1.minutes(),
    date1.seconds(),
  ];
  return `${month}/${day}/${year} and the time is ${hour}: ${minutes}:${seconds}`;
};

module.exports = {
  dateTime,
};
