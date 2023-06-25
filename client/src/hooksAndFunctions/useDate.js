function useDate(date) {
  const time = new Date(date);
  const houres = time.getHours();
  const minutes = time.getMinutes();

  return `${houres}:${minutes}`;
}

export default useDate;
