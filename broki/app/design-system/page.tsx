import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "../_components/button";
import { Icon, type IconName } from "../_components/icon";
import { Badge } from "../_components/badge";
import { ProjectCard, type ProjectCardData } from "../_components/project-card";
import { Sidebar, SidebarItem } from "../_components/sidebar";
import leadStyles from "../leads/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design system · Broki",
  description: "Tokens de tipografía, color e iconografía de Broki",
};

const typeStyles: Array<{ name: string; token: string; className: string; sample: ReactNode }> = [
  { name: "Display", token: "40 / 42 · Light 300 · LS −4%", className: styles.display, sample: "Encuentra el proyecto indicado" },
  { name: "Title", token: "32 / 37 · Light 300 · LS −4%", className: styles.title, sample: "Proyectos disponibles" },
  { name: "Heading", token: "18 / 24 · Light 300 · LS −2%", className: styles.heading, sample: "Abdón Cifuentes" },
  { name: "Card title", token: "18 / 24 · Light 300 · LS −2%", className: styles.cardTitle, sample: "Alameda 4719" },
  { name: "Card price", token: "Desde 12 / 14 Zalando Light 300 · UF 24 / 29 Instrument Sans Regular 400 · LS −2%", className: styles.cardPrice, sample: <><span>Desde</span> <strong>2.400 UF</strong></> },
  { name: "Metric", token: "24 / 29 · Light 300 · LS −2%", className: styles.metric, sample: "2.867 UF" },
  { name: "Body large", token: "16 / 24 · Light 300 · LS −2%", className: styles.bodyLarge, sample: "Compara proyectos, precios y disponibilidad." },
  { name: "Body", token: "14 / 21 · Light 300 · LS −2%", className: styles.body, sample: "Entrega durante el primer semestre de 2028." },
  { name: "Label", token: "14 / 21 · Regular 400 · LS −2%", className: styles.label, sample: "Ver proyecto" },
  { name: "Meta", token: "12 / 18 · Light 300 · LS −2%", className: styles.meta, sample: "37 departamentos disponibles" },
  { name: "Utility", token: "12 / 16 · Zalando Sans Light 300 · LS −2%", className: styles.utility, sample: "Entrega inmediata · 3 deptos." },
  { name: "Eyebrow", token: "12 / 17 · Regular 400 · LS +14%", className: styles.eyebrow, sample: "PROYECTOS DESTACADOS" },
];

const colors = [
  { name: "Ink 950", token: "--color-ink-950", value: "#11120F", tone: "#11120f" },
  { name: "Ink 700", token: "--color-ink-700", value: "#363833", tone: "#363833" },
  { name: "Ink 500", token: "--color-ink-500", value: "#73766F", tone: "#73766f" },
  { name: "Surface subtle", token: "--color-surface-subtle", value: "#F7F8F6", tone: "#f7f8f6" },
  { name: "Border", token: "--color-border", value: "#E5E7E2", tone: "#e5e7e2" },
  { name: "Brand 100", token: "--color-brand-100", value: "#ABE5BD", tone: "#abe5bd" },
  { name: "Brand 700", token: "--color-brand-700", value: "#257245", tone: "#257245" },
  { name: "Brand 900", token: "--color-brand-900", value: "#174F2E", tone: "#174f2e" },
  { name: "Accent pink", token: "--color-accent-pink", value: "#FFDBE5", tone: "#ffdbe5" },
];

const icons: Array<{ name: IconName; label: string }> = [
  { name: "building", label: "Building 2" },
  { name: "sliders", label: "Sliders Horizontal" },
  { name: "users", label: "Users Round" },
  { name: "calendar", label: "Calendar Days" },
  { name: "columns", label: "Columns 3" },
  { name: "document", label: "File Text" },
  { name: "bookmark", label: "Bookmark" },
  { name: "mail", label: "Mail" },
  { name: "shield", label: "Shield" },
  { name: "activity", label: "Activity" },
  { name: "search", label: "Search" },
  { name: "grid", label: "Layout Grid" },
  { name: "map", label: "Map" },
  { name: "pin", label: "Map Pin" },
  { name: "bell", label: "Bell" },
  { name: "arrowUpRight", label: "Arrow Up Right" },
];

const componentProjects: ProjectCardData[] = [
  {
    name: "Abdón Cifuentes",
    developer: "Ingevec",
    commune: "Santiago",
    priceLabel: "2.867 UF",
    delivery: "1° Semestre 2028",
    availability: 37,
    image: "/projects/abdon.jpg",
    tags: [{ label: "Bono pie hasta 10%", kind: "benefit" }, { label: "desde $313.000", kind: "price" }],
  },
  {
    name: "Alameda 4719",
    developer: "Euro",
    commune: "Estación Central",
    priceLabel: "2.400 UF",
    delivery: "Entrega inmediata",
    availability: 3,
    image: "/projects/alameda.jpg",
    tags: [],
  },
  {
    name: "Alto Irarrazaval",
    developer: "Euro",
    commune: "Ñuñoa",
    priceLabel: "4.004 UF",
    delivery: "1° Semestre 2028",
    availability: 177,
    image: "/projects/alto-irrarazaval.jpg",
    tags: [{ label: "Hasta 6% dscto.", kind: "discount" }, { label: "Aporte hasta 5%", kind: "benefit" }],
  },
  {
    name: "Coronel Godoy",
    developer: "Ingevec",
    commune: "Estación Central",
    priceLabel: "2.440 UF",
    delivery: "2° Semestre 2028",
    availability: 78,
    image: "/projects/coronel-godoy.jpg",
    tags: [{ label: "Hasta 4% dscto.", kind: "discount" }, { label: "Bono pie hasta 15%", kind: "benefit" }, { label: "desde $121.000", kind: "price" }],
  },
  {
    name: "Vicuña Mackenna 7589 Etapa II",
    developer: "Ingevec",
    commune: "La Florida",
    priceLabel: "3.216 UF",
    delivery: "2° Semestre 2027",
    availability: 54,
    image: "/projects/centenario.jpg",
    tags: [{ label: "Hasta 2% dscto.", kind: "discount" }, { label: "Bono pie hasta 10%", kind: "benefit" }, { label: "desde $405.000", kind: "price" }],
  },
  {
    name: "Tecnitios 750",
    developer: "AJ Urbana",
    commune: "Santiago",
    priceLabel: "2.952 UF",
    priceDescription: "Precio total de operación",
    delivery: "Entrega inmediata",
    availability: 7,
    image: "/projects/brasil.jpg",
    tags: [{ label: "Hasta 5% dscto.", kind: "discount" }, { label: "Aporte inmobiliario hasta 10%", kind: "benefit" }],
  },
];

function BrandMark() {
  return <Image className={styles.brandMark} src="/broki-diagonal.svg" alt="" width={35} height={35} priority/>;
}

function ComponentTitle({ name, description }: { name: string; description: string }) {
  return <div className={styles.componentTitle}><h3>{name}</h3><p>{description}</p></div>;
}

function LeadCardPreview() {
  return (
    <article className={`${leadStyles.leadCard} ${styles.leadCardPreview}`}>
      <div className={leadStyles.cardTop}>
        <button className={leadStyles.leadName}>Luis Sepúlveda Vergara</button>
        <button className={leadStyles.dragHandle} aria-label="Arrastrar lead"><Icon name="move" size={15} strokeWidth={1.35}/></button>
      </div>
      <div className={leadStyles.leadMeta}><span className={leadStyles.stale}><Icon name="clock" size={13}/>23 días en esta etapa</span></div>
      <p className={leadStyles.projectName}><Icon name="building" size={13}/><span>Alameda 4719</span></p>
      <div className={leadStyles.cardActions}>
        <Button className={leadStyles.cardActionButton} icon="calendarPlus" size="compact">Agendar</Button>
        <div className="controlMenu controlMenuCompact"><button className="controlTrigger controlTriggerCompact"><Icon name="arrowUpRight"/><span>Avanzar</span><Icon name="chevronDown" className="controlChevron"/></button></div>
      </div>
    </article>
  );
}

export default function DesignSystemPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}><BrandMark/><span>broki</span></div>
        <Link href="/" className={styles.backLink}><Icon name="arrowLeft" size={17}/>Volver al catálogo</Link>
      </header>

      <div className={styles.content}>
        <section className={styles.intro}>
          <p className={styles.overline}>FOUNDATIONS · V0.1</p>
          <h1>Sistema visual</h1>
          <p>Tokens básicos para mantener producto, componentes y futuras pantallas en el mismo idioma visual.</p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>01</span><h2>Tipografía</h2></div>
          <p>Zalando Sans para toda la interfaz; Instrument Sans se reserva únicamente para las cifras UF.</p>
          </div>
          <div className={styles.typeTable}>
            {typeStyles.map((style) => (
              <div className={styles.typeRow} key={style.name}>
                <div className={styles.typeMeta}><strong>{style.name}</strong><code>{style.token}</code></div>
                <p className={style.className}>{style.sample}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>02</span><h2>Color</h2></div>
            <p>Neutros para estructura; verde como señal de acción y selección.</p>
          </div>
          <div className={styles.colorGrid}>
            {colors.map((color) => (
              <article className={styles.colorCard} key={color.token}>
                <div className={styles.swatch} style={{ background: color.tone }} />
                <strong>{color.name}</strong>
                <span>{color.value}</span>
                <code>{color.token}</code>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>03</span><h2>Iconografía</h2></div>
            <p>Lucide · 19 px por defecto · stroke 1.75 · extremos redondeados.</p>
          </div>
          <div className={styles.iconGrid}>
            {icons.map((icon) => (
              <div className={styles.iconCard} key={icon.name}>
                <div><Icon name={icon.name} size={22}/></div>
                <span>{icon.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.iconRules}>
            <div><Icon name="check" size={17}/><span>Una sola familia en toda la interfaz.</span></div>
            <div><Icon name="check" size={17}/><span>El icono acompaña al texto; no lo reemplaza en acciones críticas.</span></div>
            <div><Icon name="check" size={17}/><span>Color heredado del estado del componente.</span></div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>04</span><h2>Controles de catálogo</h2></div>
            <p>Acciones para filtrar, cambiar de vista y ordenar resultados.</p>
          </div>
          <div className={styles.componentStack}>
            <div className={styles.componentBlock}>
              <ComponentTitle name="Toolbar" description="Filtro, conteo de resultados, vista y ordenamiento." />
              <div className={`toolbar ${styles.catalogToolbar}`}>
                <div className="filterGroup">
                  <button className="outlineButton"><Icon name="sliders"/><span>Filtros</span></button>
                  <span className="projectCount"><strong>48</strong> proyectos</span>
                </div>
                <div className="viewControls">
                  <div className="segmented" aria-label="Vista de proyectos">
                    <button className="selected"><Icon name="grid"/><span>Lista</span></button>
                    <button><Icon name="map"/><span>Mapa</span></button>
                  </div>
                  <label className="sortControl"><span>Ordenar por</span><select defaultValue="name" aria-label="Ordenar por"><option value="name">Nombre</option><option value="price">Menor precio</option><option value="availability">Más disponibilidad</option></select></label>
                </div>
              </div>
            </div>

            <div className={styles.componentGrid}>
              <div className={styles.componentBlock}>
                <ComponentTitle name="Button · Action" description="Acción estándar con la misma base visual de los dropdowns." />
                <div className={styles.componentRow}>
                  <Button>Fuentes automáticas</Button>
                  <Button icon="plus" variant="primary">Agregar lead</Button>
                </div>
              </div>
              <div className={styles.componentBlock}>
                <ComponentTitle name="Button · Filter" description="Default y con filtros activos." />
                <div className={styles.componentRow}>
                  <button className="outlineButton"><Icon name="sliders"/><span>Filtros</span></button>
                  <button className="outlineButton outlineButtonActive"><Icon name="sliders"/><span>Filtros</span><b>2</b></button>
                </div>
              </div>
              <div className={styles.componentBlock}>
                <ComponentTitle name="Segmented control" description="Lista seleccionada y alternativa Mapa." />
                <div className={styles.componentRow}>
                  <div className="segmented"><button className="selected"><Icon name="grid"/><span>Lista</span></button><button><Icon name="map"/><span>Mapa</span></button></div>
                </div>
              </div>
              <div className={styles.componentBlock}>
                <ComponentTitle name="Card actions · Compact" description="Acciones secundarias compactas para contextos densos como una card CRM." />
                <div className={styles.componentRow}>
                  <Button icon="calendarPlus" size="compact">Agendar</Button>
                  <div className="controlMenu controlMenuCompact"><button className="controlTrigger controlTriggerCompact"><Icon name="arrowUpRight" /><span>Avanzar</span><Icon name="chevronDown" className="controlChevron" /></button></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>05</span><h2>Componentes CRM</h2></div>
            <p>Acciones compactas y card base para operar leads dentro del tablero.</p>
          </div>
          <div className={styles.crmShowcase}>
            <div className={styles.componentBlock}>
              <ComponentTitle name="Button · Compact" description="32 px de alto, siempre secundario outline dentro de una card." />
              <div className={styles.compactComponentRow}>
                <div><span>Default</span><Button icon="calendarPlus" size="compact">Agendar</Button></div>
                <div><span>Dropdown trigger</span><div className="controlMenu controlMenuCompact"><button className="controlTrigger controlTriggerCompact"><Icon name="arrowUpRight"/><span>Avanzar</span><Icon name="chevronDown" className="controlChevron"/></button></div></div>
                <div><span>Disabled</span><Button icon="arrowUpRight" size="compact" disabled>Avanzar</Button></div>
              </div>
            </div>
            <div className={styles.componentBlock}>
              <ComponentTitle name="Dropdown · Compact" description="Menú para avanzar etapas; sin iconos decorativos dentro de las opciones." />
              <div className={styles.dropdownPreview}>
                <div className="controlMenu controlMenuCompact">
                  <button className="controlTrigger controlTriggerCompact" aria-expanded="true"><Icon name="arrowUpRight"/><span>Avanzar</span><Icon name="chevronDown" className="controlChevron"/></button>
                  <div className="controlPopover controlPopoverCompact" role="menu" aria-label="Etapas disponibles"><div className="controlOptions"><button><span>No contesta</span></button><button><span>Contactados</span></button><button><span>Interesados</span></button><button><span>Agendados</span></button><button><span>Descartados</span></button></div></div>
                </div>
              </div>
            </div>
            <div className={`${styles.componentBlock} ${styles.leadCardBlock}`}>
              <ComponentTitle name="Lead card" description="Nombre, antigüedad, proyecto, handle de arrastre y dos acciones compactas." />
              <div className={styles.leadCardCanvas}><LeadCardPreview/></div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>06</span><h2>Mensajes y promociones</h2></div>
            <p>Información secundaria y beneficios asociados a un proyecto.</p>
          </div>
          <div className={styles.componentGrid}>
            <div className={styles.componentBlock}>
              <ComponentTitle name="Inline notice" description="Estado del catálogo con una acción contextual." />
              <div className={styles.noticePreview}><p className="soldOutNote">12 proyecto(s) agotado(s) no se muestran. <button>Mostrarlos</button></p></div>
            </div>
            <div className={styles.componentBlock}>
              <ComponentTitle name="Badge" description="Beneficios agrupados sobre imagen; descuento asociado al precio UF." />
              <div className={styles.tagPreview}>
                <Badge tone="green">Bono pie hasta 10%</Badge>
                <Badge tone="white">desde $313.000</Badge>
                <Badge tone="pink">Hasta 6% dscto.</Badge>
                <Badge tone="outline" icon="calendar">1° Semestre 2028</Badge>
                <Badge tone="outline" icon="building">37 deptos.</Badge>
                <Badge tone="muted" icon="pin">Santiago</Badge>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>07</span><h2>Project card</h2></div>
            <p>La unidad principal del marketplace con sus variantes de promoción.</p>
          </div>
          <div className={styles.cardAnatomy}>
            <span>Imagen inset + promociones</span><span>Título + contexto</span><span>Datos con iconos</span><span>Precio + descripción opcional</span><span>Card completa como acción</span>
          </div>
          <div className={`projectGrid ${styles.cardGrid}`}>
            {componentProjects.map((project) => <ProjectCard project={project} key={project.name} />)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><span>08</span><h2>Sidebar navigation</h2></div>
            <p>Zalando Sans para navegación; estados neutrales separados de las acciones de producto.</p>
          </div>
          <div className={styles.sidebarShowcase}>
            <Sidebar preview />
            <div className={styles.componentBlock}>
              <ComponentTitle name="Sidebar item" description="Componente atómico en sus estados default, activo y deshabilitado." />
              <div className={styles.sidebarItemPreview}>
                <div><span>Default</span><SidebarItem icon="calendar" label="Agenda" /></div>
                <div><span>Active</span><SidebarItem icon="building" label="Proyectos" active /></div>
                <div><span>Disabled</span><SidebarItem icon="headphones" label="Soporte" disabled /></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
