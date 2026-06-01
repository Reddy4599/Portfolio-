import { useEffect, useState } from "react";

function TypewriterName({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
      {displayText}
      <span className="ml-1 inline-block h-10 w-[3px] animate-pulse bg-cyan-300 align-middle" />
    </h1>
  );
}

export default TypewriterName;
