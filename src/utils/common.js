export const stringifyQueryParam = (obj) => {
  // handle if the value is array
  /**
   * {
   *  status: ['READY', 'DRIVEN']
   * }
   *
   * the return will be:
   * status[]=READY&status[]=DRIVEN
   *
   */

  const dataObj = { ...obj };

  let query = "";

  Object.entries(dataObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      query += value.map((val) => `${key}=${val}`).join("&");
      delete dataObj[key];
    }
  });

  // const withoutFalsy = pickBy(dataObj, (value) => value || typeof value === 'number');

  if (query.length > 0) query += "&";
  query += Object.entries(dataObj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return query;
};

export const getTotalPage = (total, limit) => {
  return Math.ceil(total / limit);
};

export const getPaginationStateServer = (headers) => {
  const totalData = headers.get("x-total");
  const limit = headers.get("x-per-page");
  const currentPage = headers.get("x-page");
  const totalPage = getTotalPage(totalData, limit);

  return {
    totalPage,
    currentPage,
    totalData,
    limit,
  };
};

export const getPaginationStateClient = (headers) => {
  const limit = headers["x-per-page"];
  const totalPage = getTotalPage(headers["x-total"], headers["x-per-page"]);
  const currentPage = headers["x-page"];
  const totalData = headers["x-total"];

  return {
    totalPage,
    currentPage,
    totalData,
    limit,
  };
};

export function hasMoreData(headers) {
  const totalPage = Math.ceil(headers["x-total"] / headers["x-per-page"]);
  const currentPage = headers["x-page"];
  const addedPage = parseInt(currentPage) + 1;
  return addedPage <= totalPage;
}
