import type { ICreateDoubtPayload } from '@live/shared';
import { Button, Form, Input, Select, Typography, message } from 'antd';
import { useCourses } from '../../hooks/useCourses';
import { useCreateDoubt } from '../../hooks/useCreateDoubt';
import { useMyDoubts } from '../../hooks/useMyDoubts';
import { t } from '../../i18n/t';
import { MyDoubtsList } from './MyDoubtsList';
import { FormCard } from './StudentPage.styles';

const QUESTION_MAX_LENGTH = 2000;
const QUESTION_ROWS = 4;

export const StudentPage = () => {
  const [form] = Form.useForm<ICreateDoubtPayload>();
  const [messageApi, messageContext] = message.useMessage();
  const courses = useCourses();
  const doubts = useMyDoubts();
  const createDoubt = useCreateDoubt();

  const handleSubmit = (values: ICreateDoubtPayload) => {
    createDoubt.mutate(values, {
      onSuccess: () => {
        messageApi.success(t('DOUBT_SENT'));
        form.resetFields();
      },
      onError: () => messageApi.error(t('DOUBT_ERROR')),
    });
  };

  const courseOptions = (courses.data ?? []).map((course) => ({ value: course.id, label: course.name }));

  return (
    <>
      {messageContext}
      <Typography.Title level={2}>{t('STUDENT_TITLE')}</Typography.Title>
      <Typography.Paragraph type="secondary">{t('STUDENT_SUBTITLE')}</Typography.Paragraph>

      <FormCard title={t('NEW_DOUBT_TITLE')}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="courseId" label={t('COURSE_LABEL')} rules={[{ required: true, message: t('REQUIRED_FIELD') }]}>
            <Select placeholder={t('COURSE_PLACEHOLDER')} loading={courses.isPending} options={courseOptions} />
          </Form.Item>
          <Form.Item name="question" label={t('QUESTION_LABEL')} rules={[{ required: true, message: t('REQUIRED_FIELD') }]}>
            <Input.TextArea
              rows={QUESTION_ROWS}
              maxLength={QUESTION_MAX_LENGTH}
              showCount
              placeholder={t('QUESTION_PLACEHOLDER')}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={createDoubt.isPending}>
            {t('SEND_DOUBT')}
          </Button>
        </Form>
      </FormCard>

      <Typography.Title level={4}>{t('MY_DOUBTS_TITLE')}</Typography.Title>
      <MyDoubtsList doubts={doubts} courses={courses.data ?? []} />
    </>
  );
};
