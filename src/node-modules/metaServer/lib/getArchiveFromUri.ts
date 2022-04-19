const archiveRegex = /\/(?:archive)\/([\w]+)/

export const getArchiveFromUri = (uri: string): string | undefined => {
  return uri.match(archiveRegex)?.[1]
}
