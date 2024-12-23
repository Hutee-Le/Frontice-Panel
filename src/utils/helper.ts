import { jwtDecode } from 'jwt-decode';

const checkRefreshTokenValidity: (refreshToken: string) => boolean = (
  refreshToken: string
) => {
  const decodeRefreshToken = jwtDecode(refreshToken);
  const currentTime = Date.now() / 1000;

  if (typeof decodeRefreshToken.exp !== 'number') {
    return false;
  }

  if (decodeRefreshToken.exp < currentTime) {
    return false;
  }

  return true;
};

const logOnDev = (message: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log(message);
  }
};

const openNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const scrollToElement: (id: string) => void = (idElement) => {
  const element = document.getElementById(idElement);
  if (element) {
    const classAddition = 'highLight';
    element.style.transition = 'background-color 1s linear';
    element.scrollIntoView({ behavior: 'smooth' });
    element.classList.add(classAddition);

    setTimeout(() => {
      element.classList.remove(classAddition);
    }, 1000);
  }
};

const calculateTimeLeft = (timestamp: number | null | undefined) => {
  if (timestamp === null || timestamp === undefined) return null;
  const targetTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();
  const difference = targetTime - currentTime;

  if (difference <= 0) {
    return null;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (days > 0) {
    return { days, hours, minutes, seconds };
  }

  return { hours, minutes, seconds };
};

/**
 * Downloads a file from the given URL.
 * @param url - The URL of the file to download.
 * @param filename - Optional: The name to save the file as.
 */
const downloadFile = (url: string, filename?: string) => {
  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';

  // If a filename is provided, set the download attribute
  if (filename) {
    anchor.download = filename;
  }

  // Append the anchor to the body and programmatically click it
  document.body.appendChild(anchor);
  anchor.click();

  // Remove the anchor element from the DOM
  document.body.removeChild(anchor);
};

const downloadFileWithBlob = async (url: string, filename: string) => {
  try {
    // Fetch the file as a blob
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch the file.');
    }
    const blob = await response.blob();

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element for download
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;

    // Trigger download
    document.body.appendChild(anchor);
    anchor.click();

    // Cleanup
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const formatCurrencyVND = (amount: number | string): string => {
  if (isNaN(Number(amount))) return '0';

  return Number(amount)
    .toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    })
    .replace('₫', '')
    .trim();
};

const parseCurrencyVND = (formatted: string): number => {
  return Number(formatted.replace(/\./g, '').trim());
};

export {
  logOnDev,
  openNewTab,
  scrollToElement,
  calculateTimeLeft,
  checkRefreshTokenValidity,
  downloadFile,
  downloadFileWithBlob,
  formatCurrencyVND,
  parseCurrencyVND,
};
