export interface Site {
  id: string;
  name: string;
  domain: string;
  createdDate: Date;
  screenshot: string;
}

export interface SiteDetails extends Site {
  protocol: Protocol;
  host: string;
  port: number;
  username: string;
  password: string;
  homeFolder: string;
  uploadFolder: string;
  isLocked: boolean;
  gaProfileId: string;
}

export enum Protocol {
  FTP = 'FTP',
  SFTP = 'SFTP',
  S3 = 'S3',
  SSH = 'SSH',
}
