import { Status } from '@/models/user';
import { reverseKeyValue, setValueWithDefault } from '@/utils';

export function formatStatus(value: string) {
  return setValueWithDefault<string>(reverseKeyValue(Status)[value], value);
}
