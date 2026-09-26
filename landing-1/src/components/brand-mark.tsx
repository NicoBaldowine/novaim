import Image from "next/image";

export function Wordmark() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <span className="wordmark branding-one-wordmark" role="img" aria-label="NovaIM">
    <Image className="header-isotipo" src={`${basePath}/novaim-isotipo.svg`} width={19} height={19} alt="" aria-hidden="true" />
    <Image className="header-wordmark" src={`${basePath}/novaim-wordmark.svg`} width={92} height={22} alt="" aria-hidden="true" />
  </span>;
}
