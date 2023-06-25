module.exports = async (arr) => {
  const resulte = await Promise.all(arr);
  const veryFiyUpdates = resulte.every((el) => el === "success");

  if (veryFiyUpdates) {
    return true;
  } else {
    return false;
  }
};
