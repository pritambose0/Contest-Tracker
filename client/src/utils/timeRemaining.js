const formatTimeRemaining = (startTime) => {
  const startTimestamp = new Date(startTime).getTime();
  const now = Date.now();
  const diff = startTimestamp - now;

  if (isNaN(diff)) return "Invalid Date";
  if (diff <= 0) return "Started";

  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let result = [];

  if (days > 0) result.push(`${days}d`);
  if (hours > 0) result.push(`${hours}h`);
  if (minutes > 0) result.push(`${minutes}m`);

  return result.join(" ");
};

export default formatTimeRemaining;
