export function shouldIgnoreKey (evt) {
  return lastKeyCompositionStatus === true ||
    evt !== Object(evt) ||
    evt.isComposing === true ||
    evt.qKeyEvent === true
}