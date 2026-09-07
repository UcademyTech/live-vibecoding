import { Outlet } from 'react-router-dom';
import { t } from '../../i18n/t';
import { UserSwitcher } from '../UserSwitcher/UserSwitcher';
import { Brand, Content, Header, Nav, NavItem, Page } from './Layout.styles';

export const Layout = () => (
  <Page>
    <Header>
      <Brand>{t('APP_NAME')}</Brand>
      <Nav>
        <NavItem to="/alumno">{t('NAV_STUDENT')}</NavItem>
        <NavItem to="/profe">{t('NAV_TEACHER')}</NavItem>
      </Nav>
      <UserSwitcher />
    </Header>
    <Content>
      <Outlet />
    </Content>
  </Page>
);
