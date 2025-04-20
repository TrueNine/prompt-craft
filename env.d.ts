/// <reference types="vite/client" />
/// <reference types="vitest" />

declare module '*.md' {
  const content: string
  export default content
}
