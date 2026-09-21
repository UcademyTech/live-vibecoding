import { EUserRole } from '@live/shared';
import type { ComponentType } from 'react';
import { Layout } from './components/Layout/Layout';
import { StudentPage } from './pages/StudentPage/StudentPage';
import { TeacherPage } from './pages/TeacherPage/TeacherPage';
import { useCurrentUser } from './store/useCurrentUser';

const PAGE_BY_ROLE: Record<EUserRole, ComponentType> = {
  [EUserRole.STUDENT]: StudentPage,
  [EUserRole.TEACHER]: TeacherPage,
};

export const App = () => {
  const role = useCurrentUser((state) => state.user.role);
  const Page = PAGE_BY_ROLE[role];

  return (
    <Layout>
      <Page />
    </Layout>
  );
};
