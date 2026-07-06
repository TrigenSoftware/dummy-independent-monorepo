import { foo } from '@trigensoftware/dummy-independent-monorepo-foo'

export function bar() {
  return `bar(${foo()})`
}
