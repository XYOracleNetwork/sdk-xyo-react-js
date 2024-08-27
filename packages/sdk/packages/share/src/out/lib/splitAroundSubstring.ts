export const splitAroundSubstring = (path: string, substring: string): [string, string, string] => {
  // Find the index of the substring
  const index = path.indexOf(substring)

  if (index === -1) {
    throw new Error(`XNS name "${substring}" not found in path.`)
  }

  // Extract the part before the substring
  const part1 = path.slice(0, index)

  // The substring itself is part2
  const part2 = substring

  // Extract the part after the substring
  const part3 = path.slice(index + substring.length)

  return [part1, part2, part3]
}
