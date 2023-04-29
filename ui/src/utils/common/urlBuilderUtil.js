const buildUrl = (baseUrl, params) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value.length) {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(","));
      } else {
        searchParams.append(key, value);
      }
    } else if (typeof value == "boolean") {
      searchParams.append(key, +value);
    }
  }

  const queryParams = searchParams.toString();
  if (queryParams) {
    baseUrl += `?${queryParams}`;
  }

  return baseUrl;
};

export default buildUrl;
