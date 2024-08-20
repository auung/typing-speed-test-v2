function getElementWidth(element: HTMLDivElement): number {
  const computedStyle = getComputedStyle(element);
  return element.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
}

export default getElementWidth;