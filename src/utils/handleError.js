export function showErrorMessage(error) {
  if (typeof error?.message === "string") {
    return error?.message;
  }
  if (typeof error?.data?.message === "string") {
    return error?.data?.message;
  }
  if (Array.isArray(error?.message?.base)) {
    return error?.message?.base.join(", ");
  }
  if (Array.isArray(error?.message)) {
    return error?.message.join(", ");
  }
  if (typeof error?.message === "object" && error?.message !== null) {
    const getArrayKeyName = Object.keys(error.message);
    const getKeyName = getArrayKeyName[0];
    const errorFirstItem = error.message[getKeyName];
    if (Array.isArray(errorFirstItem)) {
      return getKeyName + " " + errorFirstItem.join(" ");
    }
    if (Array.isArray(errorFirstItem)) {
      return getKeyName + " " + errorFirstItem;
    } else {
      return getKeyName;
    }
  }

  return "";
}

const handleError = (error) => {
  let dataErr = {};
  let setMessage = "";
  const { response, message } = error;
  const status = response ? response.status : null;

  try {
    setMessage = response?.data?.error?.msg || message;

    // if (status === 401) {
    //   removeTokenFromStorage();
    //   window.location.reload();
    // }
  } catch (e) {}
  switch (status) {
    case 400:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Bad Request",
      };
      break;
    case 402:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Payment Required",
      };
      break;
    case 403:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Forbidden",
      };
      break;
    case 404:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Not Found",
      };
      break;
    case 409:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Conflict",
      };
      break;
    case 422:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: response.data.error.msg,
      };
      break;
    case 500:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Internal Server Error",
      };
      break;
    default:
      dataErr = {
        code: 404,
        message: setMessage,
        desc: message,
      };
  }
  return dataErr;
};

export default handleError;
