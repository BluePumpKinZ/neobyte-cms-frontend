
export function getType(element: Element): string {
  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute('data-type');
  const blockRegions = [
    'address', 'article', 'aside', 'blockquote', 'dd', 'div', 'dt', 'fieldset', 'figure', 'footer',
    'header', 'hgroup', 'li', 'main', 'nav', 'ol', 'section', 'td', 'th', 'ul'
  ];
  const imageRegions = ['img'];
  const inlineRegions = [
    'abbr', 'acronym', 'b', 'big', 'caption', 'cite', 'code', 'del', 'dfn', 'em', 'figcaption',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'insert', 'kbd', 'label', 'mark', 'p', 'q', 's',
    'samp', 'small', 'span', 'strong', 'sub', 'sup', 'tt', 'var'
  ];
  const linkRegions = ['a'];

  // Background
  if (type === 'background') {
    return 'background';
  }

  // Gallery
  if (type === 'gallery') {
    return 'gallery';
  }

  // Text
  if (type === 'text') {
    return 'text';
  }

  // Block
  if (blockRegions.includes(tagName)) {
    return 'block';
  }

  // Image
  if (imageRegions.includes(tagName)) {
    return 'image';
  }

  // Inline
  if (inlineRegions.includes(tagName)) {
    return 'inline';
  }

  // Link
  if (linkRegions.includes(tagName)) {
    return 'link';
  }

  return 'unsupported';
}
