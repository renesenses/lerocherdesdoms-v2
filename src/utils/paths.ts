const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Prefix a path with the site base path (idempotent) */
export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }
  if (base && path.startsWith(base)) {
    return path
  }
  return `${base}${path.startsWith('/') ? path : '/' + path}`
}

/** Prefix an asset/image path with the site base path */
export const asset = url
