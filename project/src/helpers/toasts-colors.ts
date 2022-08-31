import { NameSeverity } from '../const';

export default function colorToasts(severity: NameSeverity): string {
  if (severity === NameSeverity.ERROR) {
    return '#d50000';
  }
  if (severity === NameSeverity.SUCCESS) {
    return '#4caf50';
  }
  if (severity === NameSeverity.INFO) {
    return '#03a9f4';
  }
  if (severity === NameSeverity.WARNING) {
    return '#ff9800';
  }
  return '#673ab7';
}
