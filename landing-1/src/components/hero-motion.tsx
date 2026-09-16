import { SignalField } from "./signal-field";

export function HeroMotion() {
  return <div className="hero-motion">
    <div className="hero-system">
      <div className="orbit-node orbital-sphere orbit-node-one">
        <div className="sphere"><SignalField mode="positioning" neural interactive ariaLabel="Disperse points in sphere one" ink="#e6e9e5" fixedPointSize={0.72} rotationRate={0.065} /></div>
      </div>
      <div className="orbit-node orbital-sphere orbit-node-two">
        <div className="sphere"><SignalField mode="positioning" neural interactive ariaLabel="Disperse points in sphere two" ink="#e6e9e5" fixedPointSize={0.72} rotationRate={-0.105} /></div>
      </div>
      <div className="orbit-node orbital-sphere orbit-node-three">
        <div className="sphere"><SignalField mode="positioning" neural interactive ariaLabel="Disperse points in sphere three" ink="#e6e9e5" fixedPointSize={0.72} rotationRate={0.125} /></div>
      </div>
      <div className="sphere sphere-main orbital-sphere"><SignalField mode="positioning" neural interactive ariaLabel="Disperse points in sphere four" ink="#e6e9e5" fixedPointSize={0.72} rotationRate={-0.08} /></div>
    </div>
  </div>;
}
