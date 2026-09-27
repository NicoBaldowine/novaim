"use client";

import Image from "next/image";
import { Badge } from "./badge";

export type PromotionKind = "discount" | "benefit" | "price";

const promotionTone = {
  discount: "pink",
  benefit: "green",
  price: "white",
} as const;

export type ProjectCardData = {
  name: string;
  developer: string;
  commune: string;
  priceLabel: string;
  priceDescription?: string;
  delivery: string;
  availability: number;
  image: string;
  tags: Array<{ label: string; kind: PromotionKind }>;
};

export function ProjectCard({ project, onOpen }: { project: ProjectCardData; onOpen?: (name: string) => void }) {
  const imagePromotions = project.tags.filter((tag) => tag.kind !== "discount");
  const discount = project.tags.find((tag) => tag.kind === "discount");

  return (
    <article className="projectCard">
      <div className="projectImageWrap">
        <Image src={project.image} alt={`Edificio ${project.name}`} className="projectImage" fill sizes="(max-width: 760px) 100vw, (max-width: 1060px) 50vw, 33vw" />
        <div className="projectTags">
          {imagePromotions.map((tag) => <Badge key={tag.label} tone={promotionTone[tag.kind]}>{tag.label}</Badge>)}
        </div>
      </div>

      <div className="projectCardBody">
        <div className="projectIdentity">
          <p className="projectCommune">{project.commune}</p>
          <h3>{project.name}</h3>
          <p className="projectSubline">{project.developer}</p>
        </div>

        <div className="projectFacts">
          <Badge tone="outline" icon="calendar">{project.delivery}</Badge>
          <Badge tone="outline" icon="building">{project.availability} deptos.</Badge>
        </div>

        <div className={`price${project.priceDescription ? " priceWithDescription" : ""}`}>
          <div className="priceValue">
            <span>Desde</span>
            <strong>{project.priceLabel}</strong>
            {project.priceDescription && <small>{project.priceDescription}</small>}
          </div>
          {discount && <Badge tone="pink">{discount.label}</Badge>}
        </div>
      </div>

      {onOpen && <button className="projectCardAction" onClick={() => onOpen(project.name)} aria-label={`Ver proyecto ${project.name}`} />}
    </article>
  );
}
