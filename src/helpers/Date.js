import moment from "moment";
export function dateFormat(time) {
  var today = moment().format("DD-MMM-YY");
  var yesterday = moment().add(-1, "days").format("DD-MMM-YY");
  var dataTime = moment(time, "YYYYMMDD");
  if (today === time) {
    return "Hari ini";
  } else if (yesterday === time) {
    return "Kemarin";
  } else {
    return dataTime.fromNow().replace("days ago", "hari lalu");
  }
}

export function dateFormatPass(time) {
  var timeNow = moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("DD-MMM-YY");
  var today = moment().format("DD-MMM-YY");
  var yesterday = moment().add(-1, "days").format("DD-MMM-YY");
  if (today === timeNow) {
    return moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("HH:mm");
  } else if (yesterday === timeNow) {
    return "Kemarin";
  } else {
    return moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("DD MMM YYYY");
  }
}

export function parseDate(date, format) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format(format);
}

export function responLimit(date) {
  var newDate = moment(new Date());
  var currentDate = moment(date, "YYYY-MM-DDTHH:mm:ssZ");
  var miliseconds = currentDate.diff(newDate);

  const days = Math.trunc(miliseconds / 86400000);
  miliseconds = Math.trunc(miliseconds % 86400000);
  const hours = Math.trunc(miliseconds / 3600000);
  miliseconds = Math.trunc(miliseconds % 3600000);
  miliseconds = Math.trunc(miliseconds % 60000);
  const seconds = Math.trunc(miliseconds / 1000);

  miliseconds = miliseconds % 1000;

  if (days >= 1) {
    return "DD [Hari] HH [Jam]";
  } else if (hours >= 1) {
    return "HH [Jam] mm [Menit]";
  } else if (seconds > 0) {
    return "mm [Menit] ss [Detik]";
  } else {
    return "[Waktu Habis]";
  }
}

export function parseDateDefault(date) {
  return moment(date, "DD-MM-YYYY");
}

export function defaultDate(date) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD HH:mm");
}

export function defaultDatePesanan(date) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format(
    "DD MMM YYYY, HH:mm [WIB]"
  );
}
export function defaultDateTracking(date) {
  const hari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum&#39;at",
    "Sabtu",
  ];
  const _hari = new Date().getDay(date);
  return (
    hari[_hari] + moment(date, "YYYY-MM-DDTHH:mm:ssZ").format(", DD MMM YYYY")
  );
}
export function getDateTracHystory(date) {
  const tanggal = moment(date, "YYYY-MM-DDTHH:mm:ssZ").format("DD MMM");
  const jam = moment(date, "YYYY-MM-DDTHH:mm").format("HH:mm");
  return tanggal + " | " + jam;
}
export function newDate(format) {
  return moment(new Date()).format(format);
}

export function addDays(date, days) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZ")
    .format("YYYY-MM-DD h:m:s")
    .add("days", days);
}

export function endOfDate(format) {
  return moment(new Date()).clone().endOf("month").format(format);
}
