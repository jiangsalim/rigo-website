// Reusable inline style objects for theme-aware components

export const headingStyle = { color: 'var(--text-heading)' } as React.CSSProperties
export const bodyStyle = { color: 'var(--text-body)' } as React.CSSProperties
export const mutedStyle = { color: 'var(--text-muted)' } as React.CSSProperties
export const linkStyle = { color: 'var(--text-link)' } as React.CSSProperties

export const cardStyle = {
  backgroundColor: 'var(--card-bg)',
  borderColor: 'var(--card-border)',
} as React.CSSProperties

export const inputStyle = {
  backgroundColor: 'var(--bg-input)',
  borderColor: 'var(--card-border)',
  color: 'var(--text-heading)',
} as React.CSSProperties

export const badgeStyle = {
  backgroundColor: 'var(--bg-badge)',
  borderColor: 'var(--card-border)',
} as React.CSSProperties

export const iconBgStyle = (primaryColor: string) => ({
  backgroundColor: primaryColor ? `${primaryColor}12` : 'var(--bg-icon)',
}) as React.CSSProperties