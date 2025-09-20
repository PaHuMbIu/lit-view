export const updateUrlParams = (updates: Record<string, string | string[] | null>) => {
  const params = new URLSearchParams(window.location.search);

  Object.entries(updates).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, value);
    }
  });

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);

  return newUrl;
};

export const getInitialParams = (): Record<string, string | string[]> => {
  const params = new URLSearchParams(window.location.search);
  const obj: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    if (value.includes(",")) {
      obj[key] = value.split(",");
    } else {
      obj[key] = value;
    }
  });

  return obj;
};
