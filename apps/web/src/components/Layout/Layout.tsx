import type { PropsWithChildren } from 'react';
import { t } from '../../i18n/t';
import { UserSwitcher } from '../UserSwitcher/UserSwitcher';
import { Brand, Content, Header, Page } from './Layout.styles';

export const Layout = ({ children }: PropsWithChildren) => (
  <Page>
    <Header>
      <Brand>{t('APP_NAME')}</Brand>
      <UserSwitcher />
    </Header>
    <Content>{children}</Content>
  </Page>
);
