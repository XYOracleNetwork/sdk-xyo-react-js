const archiveRegex = /\/(?:archive)\/([\w]+)/

export const getArchiveFromUri = (uri: string): string | undefined => {
  // TODO: Parse archive from real URI
  return uri.match(archiveRegex)?.[1]
}
