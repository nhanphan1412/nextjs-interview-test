export function convertPairFormat(pairs: string) {
  return pairs.replace(/(\w{3})(\w{3,4})(?=\W|$)/g, "$1/$2");
}
