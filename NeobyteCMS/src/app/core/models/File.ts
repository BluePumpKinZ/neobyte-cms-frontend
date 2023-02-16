export interface FileSystemItem {
  lastModified: Date;
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
}
