// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

//   const navigate = useNavigate();
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <useNavigate to="/login" />;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <useNavigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;


import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Router, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  console.log('protected route==',isAdmin, children);
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (isAdmin && user.role !== "admin") {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

