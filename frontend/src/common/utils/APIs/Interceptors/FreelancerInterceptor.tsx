// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { BASE_API_URL } from '../../config/constants';
// import { useSelector } from 'react-redux';

// const freelancersAPI = axios.create({
//   baseURL: `${BASE_API_URL}/freelancers`,
// });

// // response interceptor
// freelancersAPI.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// const AxiosInterceptor: React.FC = () => {
//   const user = useSelector((state: any) => state.freelancer);

//   useEffect(() => {
//     const requestInterceptor = freelancersAPI.interceptors.request.use(
//       (config) => {
//         if (user) {
//           config.headers['Authorization'] = user.token;
//         }

//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Clean up the request interceptor when the component unmounts
//     return () => {
//       freelancersAPI.interceptors.request.eject(requestInterceptor);
//     };
//   }, [user]);

//   return null; // This component doesn't render any UI
// };

// export default AxiosInterceptor;