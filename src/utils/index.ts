export const getCurrentTime = (dateTime: string) => {
  const dateCode  = new Date(dateTime);
  return dateCode.getHours().toString()
  + ':' + 
  dateCode.getMinutes().toString()
  + ':' +
  dateCode.getSeconds().toString();
}

export const doesArrayContainDuplicate = <T extends Record<'id', string>>(
  array: Array<T>, 
  mapperId: string
): boolean => {
  return array.some((note) => note.id === mapperId);
}