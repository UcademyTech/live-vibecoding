import type { ICourse, IDoubt } from '@live/shared';
import { Alert, Button, Skeleton } from 'antd';
import type { UseQueryResult } from '@tanstack/react-query';
import { DoubtCard } from '../../components/DoubtCard/DoubtCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { t } from '../../i18n/t';
import { DoubtList } from './StudentPage.styles';

interface IMyDoubtsListProps {
  doubts: UseQueryResult<IDoubt[]>;
  courses: ICourse[];
}

const SKELETON_ROWS = 4;

export const MyDoubtsList = ({ doubts, courses }: IMyDoubtsListProps) => {
  if (doubts.isPending) {
    return <Skeleton active paragraph={{ rows: SKELETON_ROWS }} />;
  }

  if (doubts.isError) {
    return (
      <Alert
        type="error"
        showIcon
        message={t('ERROR_TITLE')}
        action={
          <Button size="small" onClick={() => doubts.refetch()}>
            {t('ERROR_RETRY')}
          </Button>
        }
      />
    );
  }

  if (doubts.data.length === 0) {
    return <EmptyState description={t('MY_DOUBTS_EMPTY')} />;
  }

  const courseNamesById = new Map(courses.map((course) => [course.id, course.name]));

  return (
    <DoubtList>
      {doubts.data.map((doubt) => (
        <DoubtCard key={doubt.id} doubt={doubt} courseName={courseNamesById.get(doubt.courseId) ?? ''} />
      ))}
    </DoubtList>
  );
};
