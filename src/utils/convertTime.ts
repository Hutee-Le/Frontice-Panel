function convertTimestampToVietnamTime(timestamp: number | null | string) {
  if (timestamp === null) return;
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const calculateAccountAge: (timestamp: number) => string = (
  timestamp: number,
) => {
  const accountCreatedDate = new Date(timestamp * 1000);
  const now = new Date();

  const diff = now.getTime() - accountCreatedDate.getTime();

  const result: string[] = [];

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (years !== 0) {
    result.push(`${years} năm`);
  }

  if (months !== 0) {
    result.push(`${months} tháng`);
  }

  if (days !== 0) {
    result.push(`${days} ngày`);
  }

  if (hours !== 0) {
    result.push(`${hours} giờ`);
  }

  if (minutes !== 0) {
    result.push(`${minutes} phút`);
  }

  return result.join(" ");
};

export { convertTimestampToVietnamTime, calculateAccountAge };
