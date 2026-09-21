import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';

export const Page = styled(AntLayout)`
  min-height: 100vh;
`;

export const Header = styled(AntLayout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

export const Brand = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const Content = styled(AntLayout.Content)`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
`;
