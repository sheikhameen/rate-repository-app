export default formatToK = (number) => {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return parseFloat(formattedNumber) + "k";
  }
  return number.toString();
};
