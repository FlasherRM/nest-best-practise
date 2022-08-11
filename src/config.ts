// Here is the configuration file
// Customize it however you like
export const appOptions = { cors: true };
// Global prefix that comes after the domain
export const globalPrefix = 'api';
// The project port
export const PORT = 3000;
export const ProjectOptions = {
  title: 'NestJS Realworld Example App',
  description: 'The Realworld API description',
  version: '1.0',
  basePath: globalPrefix,
};
// SECRET KEY HERE
export const SECRET = 'secret-key';
