// enable plain .css imports (used by side-effect imports like '@mantine/core/styles.css')
declare module '*.css';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.module.sass' {
  const content: { [className: string]: string };
  export default content;
}

// Common Mantine side-effect style imports
declare module '@mantine/core/styles.css';
// declare module '@mantine/dates/styles.css';
// declare module '@mantine/dropzone/styles.css';
// declare module '@mantine/code-highlight/styles.css';
