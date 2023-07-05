export function classNames(...classNames: Array<string | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
