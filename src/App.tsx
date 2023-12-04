import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";

function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/my-app" replace />}
        />
        <Route path="/my-app" element={<MainPage />} />
        {}
        <Route path="/my-app/:id" element={<TeacherPage />} />
      </Routes>
    </>
  );
}

export default App;
