export function foo(name) {
  if (!name) {
    throw new Error('Name is required')
  }

  return `foo(${name})`
}

export function shout() {
  return 'FOO!'
}
