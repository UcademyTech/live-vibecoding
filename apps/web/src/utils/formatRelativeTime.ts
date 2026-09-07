import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('es');

export const formatRelativeTime = (isoDate: string): string => dayjs(isoDate).fromNow();
