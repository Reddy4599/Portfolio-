export default function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <path d="M7 17 17 7M7 7h10v10" />,
    down: <path d="M12 4v16m-6-6 6 6 6-6" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 8h16M4 16h16" />,
    cube: (
      <>
        <path d="m12 2 9 5v10l-9 5-9-5V7Z" />
        <path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    pause: <path d="M8 5v14M16 5v14" />,
    play: <path d="m8 4 12 8-12 8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V4H4v12h4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
