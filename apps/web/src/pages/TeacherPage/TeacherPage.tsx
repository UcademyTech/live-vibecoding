import { Typography } from 'antd';
import { t } from '../../i18n/t';

export const TeacherPage = () => (
  <>
    <Typography.Title level={2}>{t('TEACHER_TITLE')}</Typography.Title>
    <Typography.Paragraph type="secondary">{t('TEACHER_COMING_SOON')}</Typography.Paragraph>
  </>
);
