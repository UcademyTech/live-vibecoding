import { Empty } from 'antd';

interface IEmptyStateProps {
  description: string;
}

export const EmptyState = ({ description }: IEmptyStateProps) => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
);
