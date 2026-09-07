import { EUserRole, USERS, findUserById } from '@live/shared';
import type { IUser } from '@live/shared';
import { Select, Typography } from 'antd';
import { t } from '../../i18n/t';
import { useCurrentUser } from '../../store/useCurrentUser';
import { Wrapper } from './UserSwitcher.styles';

const ROLE_LABELS: Record<EUserRole, string> = {
  [EUserRole.STUDENT]: t('ROLE_STUDENT'),
  [EUserRole.TEACHER]: t('ROLE_TEACHER'),
};

const toOption = (user: IUser) => ({
  value: user.id,
  label: `${user.name} · ${ROLE_LABELS[user.role]}`,
});

export const UserSwitcher = () => {
  const user = useCurrentUser((state) => state.user);
  const setUser = useCurrentUser((state) => state.setUser);

  const handleChange = (userId: string) => {
    const nextUser = findUserById(userId);
    if (nextUser) {
      setUser(nextUser);
    }
  };

  return (
    <Wrapper>
      <Typography.Text type="secondary">{t('CURRENT_USER')}</Typography.Text>
      <Select value={user.id} options={USERS.map(toOption)} onChange={handleChange} />
    </Wrapper>
  );
};
