export default function Icon({ name, filled = false, className = '', size = 24, style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  )
}
