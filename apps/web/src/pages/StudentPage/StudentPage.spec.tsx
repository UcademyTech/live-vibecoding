import { EDoubtStatus, EVertical } from '@live/shared';
import type { ICourse, IDoubt } from '@live/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { t } from '../../i18n/t';
import { coursesApi, doubtsApi } from '../../services/api';
import { StudentPage } from './StudentPage';

vi.mock('../../services/api', () => ({
  coursesApi: { findAll: vi.fn() },
  doubtsApi: { findMine: vi.fn(), create: vi.fn() },
}));

const COURSE: ICourse = {
  id: 'course-1',
  name: 'Auxiliar Administrativo del Estado',
  vertical: EVertical.OPOSICIONES,
  teacherId: 'u-ana',
};

const DOUBT: IDoubt = {
  id: 'doubt-1',
  courseId: COURSE.id,
  studentId: 'u-maria',
  question: '¿Por qué el silencio administrativo del tema 12 es negativo?',
  status: EDoubtStatus.PENDING,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const renderStudentPage = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <StudentPage />
    </QueryClientProvider>,
  );
};

describe('StudentPage', () => {
  beforeEach(() => {
    vi.mocked(coursesApi.findAll).mockResolvedValue([COURSE]);
  });

  it('shows my doubts with their course name', async () => {
    vi.mocked(doubtsApi.findMine).mockResolvedValue([DOUBT]);

    renderStudentPage();

    expect(await screen.findByText(DOUBT.question)).toBeInTheDocument();
    expect(await screen.findByText(COURSE.name)).toBeInTheDocument();
  });

  it('shows the empty state when there are no doubts', async () => {
    vi.mocked(doubtsApi.findMine).mockResolvedValue([]);

    renderStudentPage();

    expect(await screen.findByText(t('MY_DOUBTS_EMPTY'))).toBeInTheDocument();
  });
});
