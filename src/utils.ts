export function qs(selector: string, context: Document | HTMLElement = document): HTMLElement | null {
  return context.querySelector(selector)
}

export function qsa(selector: string, context: Document | HTMLElement = document): Element[] {
  return [...context.querySelectorAll(selector)]
}

export function createElement(tag: string, attrs: Record<string, any> = {}, ...children: (string | Node)[]): HTMLElement {
  const el = document.createElement(tag)
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') el.className = value
    else if (key === 'dataset') Object.assign(el.dataset, value)
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value)
    else el.setAttribute(key, value)
  }
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child))
    else if (child) el.appendChild(child)
  })
  return el
}

export function debounce<T extends (...args: any[]) => any>(fn: T, ms = 300): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
