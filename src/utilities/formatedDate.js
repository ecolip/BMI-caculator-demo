const pad2 = (n) => {
  return (n < 10 ? '0' : '') + n;
}

const formatedDate = () => {
  let date = new Date();
  let month = pad2(date.getMonth() + 1);//months (0-11)
  let day = pad2(date.getDate());//day (1-31)
  let year = date.getFullYear();
  let formattedDate = month + "-" + day + "-" + year;
  return formattedDate
}

module.exports = {
  "formatedDate": formatedDate
}