export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="18" fill="#0A6C7A" />
      <circle cx="24" cy="12" r="4" fill="#FFC94A" />
      <path d="M7 21c3-3 5-3 8 0s5 3 8 0 5-3 6-1" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
