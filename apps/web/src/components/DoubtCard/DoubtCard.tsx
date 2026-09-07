import { EDoubtStatus } from '@live/shared';
import type { IDoubt } from '@live/shared';
import { Card, Tag } from 'antd';
import { t } from '../../i18n/t';
import type { TTranslationKey } from '../../i18n/t';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { Answer, AnswerLabel, Meta, Question } from './DoubtCard.styles';

interface IDoubtCardProps {
  doubt: IDoubt;
  courseName: string;
}

interface IStatusTag {
  color: string;
  labelKey: TTranslationKey;
}

const STATUS_TAGS: Record<EDoubtStatus, IStatusTag> = {
  [EDoubtStatus.PENDING]: { color: 'gold', labelKey: 'STATUS_PENDING' },
  [EDoubtStatus.ANSWERED]: { color: 'green', labelKey: 'STATUS_ANSWERED' },
};

export const DoubtCard = ({ doubt, courseName }: IDoubtCardProps) => {
  const statusTag = STATUS_TAGS[doubt.status];

  return (
    <Card size="small" title={courseName} extra={<Tag color={statusTag.color}>{t(statusTag.labelKey)}</Tag>}>
      <Question>{doubt.question}</Question>
      <Meta>
        {t('ASKED_AT')} {formatRelativeTime(doubt.createdAt)}
      </Meta>
      {doubt.answer && (
        <Answer>
          <AnswerLabel>{t('ANSWER_LABEL')}</AnswerLabel>
          {doubt.answer}
        </Answer>
      )}
    </Card>
  );
};
