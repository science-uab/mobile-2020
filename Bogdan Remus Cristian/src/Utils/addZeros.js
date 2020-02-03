export default x => {
  while (x.toString().length < 8) {
    x = "0" + x;
  }
  return x;
}
