import { Wordmark } from "./brand-mark";

export function LogoIntro() {
  return <section className="logo-cover" id="top" aria-label="Novaim identity">
    <h1 className="sr-only">Novaim · A connected identity</h1>
    <div className="cover-logo"><Wordmark /></div>
    <p className="cover-rationale">Four equal forms move as one, expressing connected capabilities and intelligence in continuous exchange. Rounded letterforms echo that flow, giving the identity a clear, approachable voice.</p>
  </section>;
}
