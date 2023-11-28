import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Login";
import User from "./component/User";
import Taluka from "./component/Taluka";
import Town from "./component/Town";
import SchoolType from "./component/SchoolType";
import Class from "./component/Class";
import Subject from "./component/Subject";
import StudyMaterials from "./component/StudyMaterials";
import School from "./component/School";
import CameraImageUpload from "./component/CameraImageUpload";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const authStatus = localStorage.getItem('auth');
//     if (authStatus === 'true') {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         {isLoggedIn ? (
//           <>
//             <Header />
//             <div className="flex-grow">
//               <Routes>
//                 <Route path="/user" element={<User />} />
//                 <Route path="/taluka" element={<Taluka />} />
//                 <Route path="/town" element={<Town />} />
//                 <Route path="/schoolType" element={<SchoolType />} />
{
  /* <Route path="/school" element={<School />} />
<Route path="/class" element={<Class />} />
<Route path="/subjects" element={<Subject />} />
<Route path="/studyMaterials" element={<StudyMaterials />} />
<Route path="/logs" element={<Login />} />
//               </Routes> */
}
//             </div>
//             <Footer />
//           </>
//         ) : (
//           <Login />
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;

const App = () => {
  return (
    <>
      {/* <Router>
        <Header />
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/taluka" element={<Taluka />} />
          <Route path="/town" element={<Town />} />
          <Route path="/schoolType" element={<SchoolType />} />
          <Route path="/school" element={<School />} />
          <Route path="/class" element={<Class />} />
          <Route path="/subjects" element={<Subject />} />
          <Route path="/studyMaterials" element={<StudyMaterials />} />
          <Route path="/logs" element={<Login />} />
        </Routes>
      </Router> */}
      <CameraImageUpload/>
    </>
  );
};

export default App;
