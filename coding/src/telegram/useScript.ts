import { useEffect, useRef, useState } from "react";

const hasScriptInDom = (id: string) => {
  return document.getElementById(id) !== null;
};

type DataAttributes = {
  [K in `data-${string}`]: string;
};
export type UseScriptProps = {
  src: string;
  id: string;
  async?: boolean;
  dataAttr?: DataAttributes;
  skip?: boolean;
};

export const useScript = ({
  src,
  id,
  async,
  dataAttr,
  skip,
}: UseScriptProps) => {
  const [isLoading, setIsLoading] = useState(() => !hasScriptInDom(id));
  const [isLoaded, setIsLoaded] = useState(() => hasScriptInDom(id));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded || skip) return;

    const tvScript = document.getElementById(id);

    if (tvScript) {
      setIsLoading(false);
      setIsLoaded(true);

      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = async ?? false;

    Object.entries(dataAttr ?? []).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    const onScriptLoad = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    const onScriptError = () => {
      setIsLoading(false);
      setIsLoaded(false);
    };

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);

    if (ref.current) {
      ref.current.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("error", onScriptError);
    };
  }, [async, dataAttr, id, isLoaded, skip, src]);

  return {
    isLoading,
    isLoaded,
    ref,
  };
};

export default useScript;
