export function getTimeDifference(timestamp) {
  const currentTime = new Date();
  const commentTime = new Date(timestamp);

  const timeDifference = Math.abs(currentTime - commentTime);
  const minutes = Math.floor(timeDifference / 60000); // Number of minutes
  const hours = Math.floor(minutes / 60); // Number of hours
  const days = Math.floor(hours / 24); // Number of days

  if (minutes < 1) {
    return "Току що";
  } else if (minutes < 60) {
    return `Преди ${minutes} минут${minutes !== 1 ? "и" : "а"}`;
  } else if (hours < 24) {
    return `Преди ${hours} час${hours !== 1 ? "а" : ""}`;
  } else {
    return `Преди ${days} д${days !== 1 ? "ни" : "ен"}`;
  }
}
