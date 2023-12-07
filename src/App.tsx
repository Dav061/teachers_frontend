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
          element={<Navigate to="/teachers_frontend/" replace />}
        />
        <Route path="/teachers_frontend/" element={<MainPage />} />
        {}
        <Route path="/teachers_frontend/:id" element={<TeacherPage />} />
      </Routes>
    </>
  );
}

export default App;
