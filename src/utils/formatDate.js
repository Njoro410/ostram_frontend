function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  let suffix = "th";

  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedWithSuffix = formattedDate.replace(
    /\b\d{1,2}\b/,
    (dayStr) => dayStr + suffix
  );

  return formattedWithSuffix;
}

export default formatDate;
