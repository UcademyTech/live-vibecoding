import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { StudentPage } from './pages/StudentPage/StudentPage';
import { TeacherPage } from './pages/TeacherPage/TeacherPage';

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Navigate to="/alumno" replace />} />
      <Route path="/alumno" element={<StudentPage />} />
      <Route path="/profe" element={<TeacherPage />} />
      <Route path="*" element={<Navigate to="/alumno" replace />} />
    </Route>
  </Routes>
);
