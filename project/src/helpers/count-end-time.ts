export default function countEndTime (secondTimeLine: number): string {
  const date = new Date(secondTimeLine * 1000);
  const hour = date.getUTCHours();
  let timeNormalization: string;
  if (hour) {
    timeNormalization = `-${date.toUTCString().slice(17, 25)}`;
  } else {
    timeNormalization = `- ${date.toUTCString().slice(20, 25)}`;
  }
  return timeNormalization;
}
