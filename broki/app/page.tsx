"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "./_components/icon";
import { ControlMenu } from "./_components/control-menu";
import { ProjectCard, type ProjectCardData } from "./_components/project-card";
import { Sidebar } from "./_components/sidebar";

type Project = ProjectCardData & {
  price: number;
  region: string;
  deliveryType: string;
  typologies: string[];
};

type CatalogFilters = {
  regions: string[];
  communes: string[];
  deliveries: string[];
  developers: string[];
  typologies: string[];
  minPrice: string;
  maxPrice: string;
};

const emptyFilters: CatalogFilters = { regions: [], communes: [], deliveries: [], developers: [], typologies: [], minPrice: "", maxPrice: "" };

const projects: Project[] = [
  {
    name: "Abdón Cifuentes",
    developer: "Ingevec",
    commune: "Santiago",
    region: "Metropolitana",
    deliveryType: "En verde",
    typologies: ["1D1B", "2D2B"],
    price: 2867,
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
    region: "Metropolitana",
    deliveryType: "Entrega inmediata",
    typologies: ["1D1B", "Studio"],
    price: 2400,
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
    region: "Metropolitana",
    deliveryType: "En blanco",
    typologies: ["2D2B", "2D1B"],
    price: 4004,
    priceLabel: "4.004 UF",
    delivery: "1° Semestre 2028",
    availability: 177,
    image: "/projects/alto-irrarazaval.jpg",
    tags: [{ label: "Hasta 6% dscto.", kind: "discount" }, { label: "Aporte hasta 5%", kind: "benefit" }],
  },
  {
    name: "Brasil",
    developer: "Ingevec",
    commune: "Santiago",
    region: "Metropolitana",
    deliveryType: "En blanco",
    typologies: ["1D1B", "2D2B"],
    price: 2819,
    priceLabel: "2.819 UF",
    delivery: "1° Semestre 2029",
    availability: 148,
    image: "/projects/brasil.jpg",
    tags: [{ label: "Bono pie hasta 10%", kind: "benefit" }, { label: "desde $223.000", kind: "price" }],
  },
  {
    name: "Centenario",
    developer: "Ingevec",
    commune: "Santiago",
    region: "Metropolitana",
    deliveryType: "Entrega inmediata",
    typologies: ["Studio", "1D1B"],
    price: 2427,
    priceLabel: "2.427 UF",
    delivery: "Entrega inmediata",
    availability: 15,
    image: "/projects/centenario.jpg",
    tags: [{ label: "Bono pie hasta 20%", kind: "benefit" }],
  },
  {
    name: "Coronel Godoy",
    developer: "Ingevec",
    commune: "Estación Central",
    region: "Metropolitana",
    deliveryType: "En verde",
    typologies: ["2D1B", "2D2B"],
    price: 2440,
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
    region: "Metropolitana",
    deliveryType: "En verde",
    typologies: ["2D2B", "3D2B"],
    price: 3216,
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
    region: "Metropolitana",
    deliveryType: "Entrega inmediata",
    typologies: ["Studio", "1D1B"],
    price: 2952,
    priceLabel: "2.952 UF",
    priceDescription: "Precio total de operación",
    delivery: "Entrega inmediata",
    availability: 7,
    image: "/projects/brasil.jpg",
    tags: [{ label: "Hasta 5% dscto.", kind: "discount" }, { label: "Aporte inmobiliario hasta 10%", kind: "benefit" }],
  },
];

const sortOptions = [
  { value: "name", label: "Ordenar por nombre" },
  { value: "price", label: "Menor precio" },
  { value: "availability", label: "Más disponibilidad" },
];

function projectMatchesFilters(project: Project, filters: CatalogFilters) {
  const minPrice = Number(filters.minPrice.replace(/\D/g, "")) || 0;
  const maxPrice = Number(filters.maxPrice.replace(/\D/g, "")) || Number.POSITIVE_INFINITY;
  return (filters.regions.length === 0 || filters.regions.includes(project.region))
    && (filters.communes.length === 0 || filters.communes.includes(project.commune))
    && (filters.deliveries.length === 0 || filters.deliveries.includes(project.deliveryType))
    && (filters.developers.length === 0 || filters.developers.includes(project.developer))
    && (filters.typologies.length === 0 || filters.typologies.some((typology) => project.typologies.includes(typology)))
    && project.price >= minPrice
    && project.price <= maxPrice;
}

function Logo() {
  return (
    <div className="brand" aria-label="Broki">
      <span className="brandMarkFrame" aria-hidden="true"><Image className="brandMark" src="/broki-diagonal.svg" alt="" width={30} height={30} priority/></span>
      <span>broki</span>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState("name");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);
  const [draftFilters, setDraftFilters] = useState<CatalogFilters>(emptyFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [toast, setToast] = useState("");
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        setSortOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [filterOpen]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    const result = projects.filter((project) => {
      const matchesQuery = `${project.name} ${project.developer} ${project.commune}`.toLocaleLowerCase("es").includes(normalized);
      return matchesQuery && projectMatchesFilters(project, filters);
    });
    return [...result].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "availability") return b.availability - a.availability;
      return a.name.localeCompare(b.name, "es");
    });
  }, [query, filters, sort]);

  const toggleDraftFilter = (key: "regions" | "communes" | "deliveries" | "developers" | "typologies", value: string) => {
    setDraftFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  };

  const openFilters = () => {
    setDraftFilters({ ...filters, regions: [...filters.regions], communes: [...filters.communes], deliveries: [...filters.deliveries], developers: [...filters.developers], typologies: [...filters.typologies] });
    setFilterOpen(true);
    setSortOpen(false);
  };

  const draftCount = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return projects.filter((project) => `${project.name} ${project.developer} ${project.commune}`.toLocaleLowerCase("es").includes(normalized) && projectMatchesFilters(project, draftFilters)).length;
  }, [draftFilters, query]);

  const activeFilterCount = filters.regions.length + filters.communes.length + filters.deliveries.length + filters.developers.length + filters.typologies.length + (filters.minPrice || filters.maxPrice ? 1 : 0);
  const regionOptions = ["Metropolitana"];
  const communeOptions = ["Santiago", "La Florida", "Ñuñoa", "Quinta Normal", "Estación Central", "Conchalí"];
  const deliveryOptions = ["Entrega inmediata", "En verde", "En blanco"];
  const developerOptions = ["Euro", "Ingevec", "AJ Urbana"];
  const typologyOptions = ["1D1B", "2D2B", "2D1B", "Studio", "3D2B"];

  const showToast = (name: string) => {
    setToast(`${name} seleccionado`);
    window.setTimeout(() => setToast(""), 2400);
  };

  return (
    <div className="appShell">
      <header className="topbar">
        <button className="mobileMenu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Icon name="menu"/></button>
        <Logo/>
        <div className="accountArea">
          <button className="notificationButton" aria-label="Notificaciones"><Icon name="bell"/></button>
          <button className="profileButton"><span className="avatar">NB</span><span className="profileCopy"><strong>Nicolas Baldovino</strong><small>Administrador · Broki</small></span><Icon name="chevronDown" size={17} className="chevron"/></button>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="overlay" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú" />}

      <main className="mainContent">
        <div className="catalogHeader">
          <div className="catalogTitle">
            <p className="eyebrow">CATÁLOGO</p><h1>Proyectos</h1>
            <span className="projectCount">
              <strong>{filtered.length === projects.length ? 48 : filtered.length}</strong> disponibles
              <span aria-hidden="true">·</span>
              <span>12 agotados</span>
              <button onClick={() => setShowSoldOut((value) => !value)}>{showSoldOut ? "Ocultar" : "Mostrar"}</button>
            </span>
          </div>

          <div className="catalogControls" ref={controlsRef}>
            <label className="searchBox"><Icon name="search"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por proyecto..." aria-label="Buscar proyectos"/>{query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><Icon name="x" size={17}/></button>}</label>
            <button className={`filterDrawerTrigger${activeFilterCount ? " filterDrawerTriggerActive" : ""}`} type="button" onClick={openFilters} aria-haspopup="dialog" aria-expanded={filterOpen}><Icon name="sliders"/><span>Filtros</span>{activeFilterCount > 0 && <b>{activeFilterCount}</b>}</button>
            <ControlMenu icon="sort" label={sortOptions.find((option) => option.value === sort)?.label ?? "Ordenar"} open={sortOpen} onToggle={() => { setSortOpen((value) => !value); setFilterOpen(false); }} panelLabel="Ordenar proyectos" panelRole="menu">
              <div className="controlOptions">
                {sortOptions.map((option) => <button key={option.value} type="button" role="menuitemradio" aria-checked={sort === option.value} className={sort === option.value ? "controlOptionSelected" : ""} onClick={() => { setSort(option.value); setSortOpen(false); }}><span>{option.label}</span>{sort === option.value && <Icon name="check" size={15} strokeWidth={2}/>}</button>)}
              </div>
            </ControlMenu>
            <div className="segmented" aria-label="Vista de proyectos">
              <button className={view === "list" ? "selected" : ""} onClick={() => setView("list")}><Icon name="grid"/><span>Lista</span></button>
              <button className={view === "map" ? "selected" : ""} onClick={() => setView("map")}><Icon name="map"/><span>Mapa</span></button>
            </div>
          </div>

          {activeFilterCount > 0 && <div className="activeFilters" aria-label="Filtros activos">
            {filters.regions.map((region) => <button key={region} onClick={() => setFilters((current) => ({ ...current, regions: current.regions.filter((item) => item !== region) }))}><span>{region}</span><Icon name="x" size={13}/></button>)}
            {filters.communes.map((commune) => <button key={commune} onClick={() => setFilters((current) => ({ ...current, communes: current.communes.filter((item) => item !== commune) }))}><span>{commune}</span><Icon name="x" size={13}/></button>)}
            {filters.deliveries.map((delivery) => <button key={delivery} onClick={() => setFilters((current) => ({ ...current, deliveries: current.deliveries.filter((item) => item !== delivery) }))}><span>{delivery}</span><Icon name="x" size={13}/></button>)}
            {filters.developers.map((developer) => <button key={developer} onClick={() => setFilters((current) => ({ ...current, developers: current.developers.filter((item) => item !== developer) }))}><span>{developer}</span><Icon name="x" size={13}/></button>)}
            {filters.typologies.map((typology) => <button key={typology} onClick={() => setFilters((current) => ({ ...current, typologies: current.typologies.filter((item) => item !== typology) }))}><span>{typology}</span><Icon name="x" size={13}/></button>)}
            {(filters.minPrice || filters.maxPrice) && <button onClick={() => setFilters((current) => ({ ...current, minPrice: "", maxPrice: "" }))}><span>{filters.minPrice || "0"}–{filters.maxPrice || "∞"} UF</span><Icon name="x" size={13}/></button>}
            <button className="clearFilters" onClick={() => setFilters(emptyFilters)}>Limpiar todo</button>
          </div>}
        </div>

        <section className="results" aria-labelledby="results-heading">
          <h2 id="results-heading" className="srOnly">Resultados del catálogo</h2>

          {filtered.length === 0 ? (
            <div className="emptyState">
              <div className="emptyStateIcon" aria-hidden="true"><Icon name="search" size={22}/></div>
              <div className="emptyStateCopy">
                <h3>No encontramos proyectos</h3>
                <p>Prueba con otro nombre o restablece los filtros para ver todos los proyectos.</p>
              </div>
              <button className="emptyStateAction" onClick={() => { setQuery(""); setFilters(emptyFilters); }}>Limpiar filtros y búsqueda</button>
            </div>
          ) : view === "list" ? (
            <div className="projectGrid">{filtered.map((project) => <ProjectCard key={project.name} project={project} onOpen={showToast}/>)}</div>
          ) : (
            <div className="mapLayout">
              <div className="mapPanel">
                <div className="mapRoad roadOne"/><div className="mapRoad roadTwo"/><div className="mapRoad roadThree"/>
                {filtered.map((project, index) => <button key={project.name} className={`mapPin mapPin${index + 1}`} onClick={() => showToast(project.name)} aria-label={`Ver ${project.name}`}><span>{index + 1}</span></button>)}
                <div className="mapLabel labelOne">Santiago</div><div className="mapLabel labelTwo">Ñuñoa</div><div className="mapLabel labelThree">Estación Central</div>
              </div>
              <div className="mapList">{filtered.map((project, index) => <button key={project.name} onClick={() => showToast(project.name)}><span>{index + 1}</span><Image src={project.image} alt="" width={136} height={100}/><div><strong>{project.name}</strong><small>{project.commune} · {project.priceLabel}</small></div></button>)}</div>
            </div>
          )}
        </section>
      </main>

      {filterOpen && <>
        <button className="filterDrawerScrim" type="button" onClick={() => setFilterOpen(false)} aria-label="Cerrar filtros" />
        <aside className="filterDrawer" role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title">
          <header className="filterDrawerHeader"><div><span>CATÁLOGO</span><h2 id="filter-drawer-title">Filtros</h2></div><button type="button" onClick={() => setFilterOpen(false)} aria-label="Cerrar filtros"><Icon name="x"/></button></header>
          <div className="filterDrawerBody">
            <section className="drawerFilterSection"><h3>Rango de precios <span>UF</span></h3><div className="priceInputs"><label><span>Mínimo</span><input inputMode="numeric" value={draftFilters.minPrice} onChange={(event) => setDraftFilters((current) => ({ ...current, minPrice: event.target.value }))} placeholder="2.000"/></label><label><span>Máximo</span><input inputMode="numeric" value={draftFilters.maxPrice} onChange={(event) => setDraftFilters((current) => ({ ...current, maxPrice: event.target.value }))} placeholder="6.000"/></label></div></section>
            <section className="drawerFilterSection"><h3>Tipo de entrega</h3><div className="drawerChecks">{deliveryOptions.map((option) => <label key={option}><input type="checkbox" checked={draftFilters.deliveries.includes(option)} onChange={() => toggleDraftFilter("deliveries", option)}/><span>{option}</span><small>{projects.filter((project) => project.deliveryType === option).length}</small></label>)}</div></section>
            <section className="drawerFilterSection"><h3>Región</h3><div className="drawerChecks">{regionOptions.map((option) => <label key={option}><input type="checkbox" checked={draftFilters.regions.includes(option)} onChange={() => toggleDraftFilter("regions", option)}/><span>{option}</span><small>{projects.filter((project) => project.region === option).length}</small></label>)}</div></section>
            <section className="drawerFilterSection"><h3>Comuna</h3><div className="drawerChecks">{communeOptions.map((option) => <label key={option}><input type="checkbox" checked={draftFilters.communes.includes(option)} onChange={() => toggleDraftFilter("communes", option)}/><span>{option}</span><small>{projects.filter((project) => project.commune === option).length}</small></label>)}</div></section>
            <section className="drawerFilterSection"><h3>Inmobiliaria</h3><div className="drawerChecks">{developerOptions.map((option) => <label key={option}><input type="checkbox" checked={draftFilters.developers.includes(option)} onChange={() => toggleDraftFilter("developers", option)}/><span>{option}</span><small>{projects.filter((project) => project.developer === option).length}</small></label>)}</div></section>
            <section className="drawerFilterSection"><h3>Tipología</h3><div className="drawerChecks">{typologyOptions.map((option) => <label key={option}><input type="checkbox" checked={draftFilters.typologies.includes(option)} onChange={() => toggleDraftFilter("typologies", option)}/><span>{option}</span><small>{projects.filter((project) => project.typologies.includes(option)).length}</small></label>)}</div></section>
          </div>
          <footer className="filterDrawerFooter"><button className="drawerClearButton" type="button" onClick={() => setDraftFilters(emptyFilters)}>Limpiar</button><button className="drawerApplyButton" type="button" onClick={() => { setFilters(draftFilters); setFilterOpen(false); }}>Ver {draftCount} {draftCount === 1 ? "proyecto" : "proyectos"}</button></footer>
        </aside>
      </>}

      {toast && <div className="toast" role="status"><span><Icon name="check" size={14} strokeWidth={2}/></span>{toast}</div>}
    </div>
  );
}
