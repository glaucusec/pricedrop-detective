export function URLPrettier(url) {
  let parts = url.split("ref=");
  let newURL;
  if (parts.length == 2) {
    newURL = parts[0];
  } else {
    newURL = url;
  }
  return newURL;
}

export function isValidURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" + // port and path
      "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" + // query string
      "(\\#[-a-zA-Z\\d_/]*)?$",
    "i"
  ); // fragment locator

  return !!pattern.test(url);
}
