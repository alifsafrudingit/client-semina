const handleError = (error) => {
  let dataErr = {};
  let setMessage = "";
  let setStep = "";
  const { response, message } = error;
  const status = response ? response.status : null;
  try {
    setMessage = response?.data?.data?.message || message;
    setStep = response?.data?.data?.step || "";
  } catch (e) {
    console.log(e);
  }
  switch (status) {
    case 400:
      dataErr = {
        data: response,
        code: response.status,
        message: response?.data?.message || setMessage,
        desc: "Bad Request",
      };
      break;
    case 401:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Unathorized",
      };

      window.location.href = `${window.location.origin}/dashboard`;

      localStorage.clear();
      break;
    case 402:
      dataErr = {
        code: response.status,
        message: setMessage,
        desc: "Payemnt Required",
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
        desc: response.data.response.message,
        step: setStep,
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

// import axios from "axios";
// import { config } from "../configs";

// const handleError = (error) => {
//   const originalRequest = error.config;
//   if (error.response.data.msg === "jwt expired") {
//     originalRequest._retry = true;
//     const session = localStorage.getItem("auth")
//       ? JSON.parse(localStorage.getItem("auth"))
//       : {};

//     return axios
//       .get(
//         `${config.api_host_dev}/v1/cms/refresh-token/${session.refreshToken}`
//       )
//       .then((res) => {
//         console.log("res");
//         console.log(res);
//         localStorage.setItem(
//           "auth",
//           JSON.stringify({
//             ...session,
//             token: res.data.data.token,
//           })
//         );
//         originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;

//         console.log("originalRequest");
//         console.log(originalRequest);

//         return axios(originalRequest);
//       })
//       .catch((err) => {
//         window.location.href = "/logout";
//         localStorage.removeItem("auth");
//       });
//   }

//   return Promise.reject(error);
// };

// export default handleError;
