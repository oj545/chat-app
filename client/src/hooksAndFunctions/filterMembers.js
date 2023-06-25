export const filtermembers = (arr1, arr2) => {
  const arr3 = arr2
    .map(function (contact) {
      const isMember = arr1.some((el) => el === contact.contactEmail);
      if (!isMember) return contact;
      return null;
    })
    .filter((el) => el !== null);

  return arr3;
};

export const filterBlockMessages = (arr1, arr2) => {
  const arr3 = arr2
    .map(function (mes) {
      const isMember = arr1.some((el) => el === mes.sender);
      if (!isMember) return mes;
      return null;
    })
    .filter((el) => el !== null);

  return arr3;
};
