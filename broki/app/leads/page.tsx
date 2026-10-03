"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../_components/button";
import { ControlMenu } from "../_components/control-menu";
import { Icon } from "../_components/icon";
import { Sidebar } from "../_components/sidebar";
import styles from "./page.module.css";

type Stage = "Nuevos" | "No contesta" | "Contactados" | "Interesados" | "Agendados" | "Reunión hecha" | "No asistió" | "Descartados";

type Lead = {
  id: number;
  name: string;
  stage: Stage;
  age: number;
  phone: string;
  project: string;
  owner?: string;
  email?: string;
  task?: string;
};

const stageMeta: Array<{ name: Stage; count: number; color: string; note?: string; warning?: boolean }> = [
  { name: "Nuevos", count: 18, color: "#55aee6", note: "17 sin actividad · +1 día", warning: true },
  { name: "No contesta", count: 20, color: "#e5ad49", note: "14 sin actividad · +2 días", warning: true },
  { name: "Contactados", count: 23, color: "#8f79db", note: "16 sin actividad · +2 días", warning: true },
  { name: "Interesados", count: 4, color: "#df74a8", note: "Al día" },
  { name: "Agendados", count: 26, color: "#55bd91", note: "6 sin actividad · +7 días", warning: true },
  { name: "Reunión hecha", count: 1, color: "#4fa38c", note: "Resultado registrado desde la agenda." },
  { name: "No asistió", count: 1, color: "#d79255", note: "Inasistencia registrada desde la agenda." },
  { name: "Descartados", count: 64, color: "#a6aaa3", note: "Fuera del flujo comercial activo." },
];

const manualStageOptions: Stage[] = ["Nuevos", "No contesta", "Contactados", "Interesados", "Agendados", "Descartados"];

const ownerOptions = [
  "Administrador Broki · Administrador",
  "Candelaria Molina · Administrador",
  "Candelaria Molina Raffo · Broker",
  "Jesús Ahumada · Team lead",
  "josé · Broker",
  "José Fredes · Broker",
  "José Tomás Carrasco · Administrador",
  "Matías Gonzalez · Administrador",
  "Nicolas Baldovino · Administrador",
  "sebastian alfredo valenzuela valdes · Broker",
  "Setter / Marketer · Marketer / Setter",
];

const initialLeads: Lead[] = [
  { id: 1, name: "Manuel Ríos", stage: "Nuevos", age: 24, phone: "+56 9 6234 8891", project: "Abdón Cifuentes" },
  { id: 2, name: "Luis Sepúlveda Vergara", stage: "Nuevos", age: 23, phone: "+56 9 8490 2241", email: "lasepulvedav@gmail.com", project: "Alameda 4719" },
  { id: 3, name: "Cristian Bustos Villanueva", stage: "Nuevos", age: 23, phone: "+56 9 7712 4008", project: "Brasil" },
  { id: 4, name: "Claudio Contreras", stage: "No contesta", age: 13, phone: "+56 9 5102 7334", project: "Coronel Godoy" },
  { id: 5, name: "Diego Alonso", stage: "No contesta", age: 13, phone: "+56 9 6109 9910", project: "Centenario" },
  { id: 6, name: "Orlando Gálvez", stage: "No contesta", age: 13, phone: "+56 9 9544 6710", project: "Tecnitios 750" },
  { id: 7, name: "Luis Cárcamo Oyarzún", stage: "Contactados", age: 23, phone: "+56 9 7712 9311", project: "Alto Irarrazaval" },
  { id: 8, name: "Miguel P. Ortega", stage: "Contactados", age: 23, phone: "+56 9 6110 7238", project: "Abdón Cifuentes", task: "Retomar contacto · hoy 16:30" },
  { id: 9, name: "Pedro Fuentes", stage: "Contactados", age: 23, phone: "+56 9 8812 4457", project: "Brasil" },
  { id: 10, name: "Francisco González", stage: "Interesados", age: 2, phone: "+56 9 5109 0083", project: "Vicuña Mackenna 7589" },
  { id: 11, name: "Roberto Zelaya", stage: "Interesados", age: 2, phone: "+56 9 9361 2280", project: "Alameda 4719" },
  { id: 12, name: "Maykel Martínez", stage: "Interesados", age: 2, phone: "+56 9 7355 1190", project: "Coronel Godoy" },
  { id: 13, name: "Olga Cárdenas", stage: "Agendados", age: 21, phone: "+56 9 9122 8610", project: "Centenario", owner: "Nicolás" },
  { id: 14, name: "Elías Pereira", stage: "Agendados", age: 21, phone: "+56 9 6321 4450", project: "Brasil", owner: "Catalina" },
  { id: 15, name: "Germán Grandón Muñoz", stage: "Agendados", age: 21, phone: "+56 9 6327 2140", project: "Abdón Cifuentes", owner: "Nicolás" },
  { id: 16, name: "Dr. Alfonso Hannel", stage: "Reunión hecha", age: 1, phone: "+56 9 7441 2860", project: "Tecnitios 750", owner: "Catalina" },
  { id: 17, name: "Anthony Cubas Hernández", stage: "No asistió", age: 2, phone: "+56 9 8103 5572", project: "Alameda 4719", owner: "Nicolás" },
  { id: 18, name: "Ricardo Lorca", stage: "Descartados", age: 23, phone: "+56 9 9045 3387", project: "Coronel Godoy" },
];

function Logo() {
  return (
    <div className="brand" aria-label="Broki">
      <span className="brandMarkFrame" aria-hidden="true"><Image className="brandMark" src="/broki-diagonal.svg" alt="" width={30} height={30} priority /></span>
      <span>broki</span>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [bucket, setBucket] = useState("Todos");
  const [view, setView] = useState<"board" | "table">("board");
  const [bucketOpen, setBucketOpen] = useState(false);
  const [stageMenuId, setStageMenuId] = useState<number | null>(null);
  const [scheduleLeadId, setScheduleLeadId] = useState<number | null>(null);
  const [scheduleOwner, setScheduleOwner] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [ownerMenuOpen, setOwnerMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [boardWindow, setBoardWindow] = useState({ start: 0, visible: 4 });
  const [boardProgress, setBoardProgress] = useState({ position: 0, size: 0.5 });
  const boardRef = useRef<HTMLDivElement>(null);
  const trackDragOffsetRef = useRef(0);

  const visibleLeads = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("es");
    return leads.filter((lead) => {
      const matchesQuery = `${lead.name} ${lead.phone} ${lead.project}`.toLocaleLowerCase("es").includes(term);
      const matchesBucket = bucket === "Todos" || (bucket === "Activos" && !["Agendados", "Reunión hecha", "Descartados"].includes(lead.stage)) || (bucket === "Seguimiento recuperable" && lead.age >= 7) || (bucket === "Reciclaje / descartados" && lead.stage === "Descartados");
      return matchesQuery && matchesBucket;
    });
  }, [bucket, leads, query]);

  const changeStage = (id: number, stage: Stage) => {
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, stage, age: 0 } : lead));
    flash("Etapa actualizada");
  };

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const scheduleLead = leads.find((lead) => lead.id === scheduleLeadId) ?? null;

  const openSchedule = (id: number) => {
    setStageMenuId(null);
    setScheduleOwner("");
    setScheduleDate("");
    setOwnerMenuOpen(false);
    setScheduleLeadId(id);
  };

  const confirmSchedule = () => {
    if (!scheduleLead || !scheduleOwner || !scheduleDate) return;
    setLeads((current) => current.map((lead) => lead.id === scheduleLead.id ? { ...lead, stage: "Agendados", age: 0, owner: scheduleOwner } : lead));
    setScheduleLeadId(null);
    flash(`Reunión agendada con ${scheduleLead.name}`);
  };

  useEffect(() => {
    if (view !== "board") return;
    const board = boardRef.current;
    if (!board) return;

    const updateBoardWindow = () => {
      const columns = Array.from(board.children) as HTMLElement[];
      if (!columns.length) return;
      const boardBounds = board.getBoundingClientRect();
      const start = Math.max(0, columns.findIndex((column) => column.getBoundingClientRect().right > boardBounds.left + 48));
      const visible = Math.max(1, columns.filter((column) => {
        const bounds = column.getBoundingClientRect();
        return bounds.left < boardBounds.right - 80 && bounds.right > boardBounds.left + 48;
      }).length);
      setBoardWindow({ start, visible });
      const maxScroll = Math.max(0, board.scrollWidth - board.clientWidth);
      setBoardProgress({
        position: maxScroll > 0 ? board.scrollLeft / maxScroll : 0,
        size: Math.min(1, board.clientWidth / board.scrollWidth),
      });
    };

    updateBoardWindow();
    board.addEventListener("scroll", updateBoardWindow, { passive: true });
    window.addEventListener("resize", updateBoardWindow);
    return () => {
      board.removeEventListener("scroll", updateBoardWindow);
      window.removeEventListener("resize", updateBoardWindow);
    };
  }, [view]);

  const scrollToStage = (index: number) => {
    const board = boardRef.current;
    const target = board?.children[index] as HTMLElement | undefined;
    if (!board || !target) return;
    board.scrollTo({ left: target.offsetLeft - board.offsetLeft, behavior: "smooth" });
  };

  const lastVisibleStage = Math.min(stageMeta.length, boardWindow.start + boardWindow.visible);

  const moveBoardFromTrack = (clientX: number, track: HTMLButtonElement) => {
    const board = boardRef.current;
    if (!board) return;
    const bounds = track.getBoundingClientRect();
    const handleWidth = bounds.width * boardProgress.size;
    const travel = Math.max(1, bounds.width - handleWidth);
    const position = Math.min(1, Math.max(0, (clientX - bounds.left - trackDragOffsetRef.current) / travel));
    board.scrollLeft = position * Math.max(0, board.scrollWidth - board.clientWidth);
  };

  return (
    <div className="appShell">
      <header className="topbar">
        <button className="mobileMenu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Icon name="menu" /></button>
        <Logo />
        <div className="accountArea">
          <button className="notificationButton" aria-label="Notificaciones"><Icon name="bell" /></button>
          <button className="profileButton"><span className="avatar">NB</span><span className="profileCopy"><strong>Nicolas Baldovino</strong><small>Administrador · Broki</small></span><Icon name="chevronDown" size={17} className="chevron" /></button>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activePath="/leads" />
      {sidebarOpen && <button className="overlay" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú" />}

      <main className={styles.main}>
        <section className="catalogHeader">
          <div className={styles.titleRow}>
            <div className="catalogTitle">
              <h1>Leads del equipo</h1>
              <span className="projectCount">Distribuye responsables y acompaña cada oportunidad desde un solo lugar.</span>
            </div>
            <div className={styles.headerActions}>
              <Button onClick={() => flash("Fuentes automáticas abiertas")}>Fuentes automáticas</Button>
              <Button icon="plus" variant="primary" onClick={() => flash("Nuevo lead listo para crear")}>Agregar lead</Button>
            </div>
          </div>

          <div className="catalogControls" aria-label="Controles del tablero">
          <label className="searchBox">
            <Icon name="search" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, RUT, email o teléfono" aria-label="Buscar lead" />
            {query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><Icon name="x" size={16} /></button>}
          </label>
          <ControlMenu icon="filter" label={bucket === "Todos" ? "Todos los leads" : bucket} open={bucketOpen} onToggle={() => setBucketOpen((value) => !value)} panelLabel="Vista de leads" panelRole="menu">
            <div className="controlOptions">
              {["Todos", "Activos", "Seguimiento recuperable", "Reciclaje / descartados"].map((option) => (
                <button key={option} className={bucket === option ? "controlOptionSelected" : ""} role="menuitemradio" aria-checked={bucket === option} onClick={() => { setBucket(option); setBucketOpen(false); }}>
                  <span>{option}</span>{bucket === option && <Icon name="check" size={15} />}
                </button>
              ))}
            </div>
          </ControlMenu>
          <div className="segmented" aria-label="Cómo ver los leads">
            <button className={view === "board" ? "selected" : ""} onClick={() => setView("board")}><Icon name="columns" size={16} />Tablero</button>
            <button className={view === "table" ? "selected" : ""} onClick={() => setView("table")}><Icon name="filter" size={16} />Tabla</button>
          </div>
          </div>
        </section>

        <div className={styles.summaryRow}>
          <p><strong>{visibleLeads.length}</strong> leads visibles <span>·</span> 157 en total</p>
          {view === "board" && (
            <div className={styles.scrollControls}>
              <button className={styles.scrollArrow} type="button" disabled={boardWindow.start === 0} onClick={() => scrollToStage(Math.max(0, boardWindow.start - 1))} aria-label="Ver etapas anteriores"><Icon name="arrowLeft" size={15} /></button>
              <button
                className={`${styles.scrollOverview} ${styles.scrollOverviewTop}`}
                type="button"
                aria-label="Moverse horizontalmente por las etapas"
                onPointerDown={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const handleWidth = bounds.width * boardProgress.size;
                  const handleLeft = bounds.left + boardProgress.position * (bounds.width - handleWidth);
                  const grabbedHandle = event.clientX >= handleLeft && event.clientX <= handleLeft + handleWidth;
                  trackDragOffsetRef.current = grabbedHandle ? event.clientX - handleLeft : handleWidth / 2;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  moveBoardFromTrack(event.clientX, event.currentTarget);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) moveBoardFromTrack(event.clientX, event.currentTarget);
                }}
                onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") scrollToStage(Math.max(0, boardWindow.start - 1));
                  if (event.key === "ArrowRight") scrollToStage(Math.min(stageMeta.length - 1, boardWindow.start + 1));
                }}
              >
                <span style={{ left: `${boardProgress.position * (1 - boardProgress.size) * 100}%`, width: `${boardProgress.size * 100}%` }} />
              </button>
              <button className={`${styles.scrollArrow} ${styles.scrollArrowNext}`} type="button" disabled={lastVisibleStage === stageMeta.length} onClick={() => scrollToStage(Math.min(stageMeta.length - 1, boardWindow.start + 1))} aria-label="Ver etapas siguientes"><Icon name="arrowLeft" size={15} /></button>
            </div>
          )}
        </div>

        {view === "board" ? (
          <div className={styles.boardFrame}>
            <div className={styles.board} ref={boardRef}>
              {stageMeta.map((stage) => (
                <section className={styles.column} key={stage.name}>
                <header className={styles.columnHeader}>
                  <div><h2><i className={styles.stageAccent} style={{ backgroundColor: stage.color }} aria-hidden="true" />{stage.name}</h2><span>{stage.count}</span></div>
                  <p className={stage.warning ? "" : styles.calm}>{stage.note}</p>
                </header>
                <div className={styles.cards}>
                  {visibleLeads.filter((lead) => lead.stage === stage.name).map((lead) => (
                    <article className={styles.leadCard} key={lead.id} draggable>
                      <div className={styles.cardTop}>
                        <button className={styles.leadName} onClick={() => flash(`${lead.name} seleccionado`)}>{lead.name}</button>
                        <button className={styles.dragHandle} aria-label={`Arrastrar ${lead.name}`} title="Arrastrar lead"><Icon name="move" size={15} strokeWidth={1.35} /></button>
                      </div>
                      <div className={styles.leadMeta}><span className={lead.age > 7 ? styles.stale : ""}><Icon name="clock" size={13} />{lead.age} días en esta etapa</span>{lead.owner && <span>· con {lead.owner}</span>}</div>
                      <p className={styles.projectName}><Icon name="building" size={13} /><span>{lead.project}</span></p>
                      {lead.task && <button className={styles.task} onClick={() => flash(lead.task ?? "Tarea")}><Icon name="calendar" size={14} /><span><strong>Tarea pendiente</strong>{lead.task}</span></button>}
                      <div className={styles.cardActions}>
                        <Button className={styles.cardActionButton} icon="calendarPlus" size="compact" onClick={() => openSchedule(lead.id)}>Agendar</Button>
                        {!manualStageOptions.includes(lead.stage) || lead.stage === "Descartados" ? (
                          <Button className={styles.cardActionButton} icon="arrowUpRight" size="compact" disabled>Avanzar</Button>
                        ) : (
                          <ControlMenu icon="arrowUpRight" label="Avanzar" open={stageMenuId === lead.id} onToggle={() => setStageMenuId((current) => current === lead.id ? null : lead.id)} panelLabel={`Avanzar a ${lead.name}`} panelRole="menu" size="compact">
                            <div className="controlOptions">
                              {manualStageOptions.slice(manualStageOptions.indexOf(lead.stage) + 1).map((option) => (
                                <button key={option} role="menuitem" onClick={() => { changeStage(lead.id, option); setStageMenuId(null); }}>
                                  <span>{option}</span>
                                </button>
                              ))}
                            </div>
                          </ControlMenu>
                        )}
                      </div>
                    </article>
                  ))}
                  {visibleLeads.every((lead) => lead.stage !== stage.name) && <div className={styles.emptyColumn}>Sin leads en esta etapa</div>}
                </div>
                </section>
              ))}
            </div>
            {lastVisibleStage < stageMeta.length && (
              <button className={styles.moreStagesHint} onClick={() => scrollToStage(lastVisibleStage)} aria-label={`Ver ${stageMeta.length - lastVisibleStage} etapas más`}>
                <span>{stageMeta.length - lastVisibleStage} etapas más</span>
                <Icon name="arrowLeft" size={15} />
              </button>
            )}
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table><thead><tr><th>Lead</th><th>Proyecto</th><th>Etapa</th><th>Antigüedad</th><th>Responsable</th></tr></thead><tbody>{visibleLeads.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><small>{lead.phone}</small></td><td>{lead.project}</td><td><span className={styles.stagePill}>{lead.stage}</span></td><td>{lead.age} días</td><td>{lead.owner ?? "Sin asignar"}</td></tr>)}</tbody></table>
          </div>
        )}
      </main>

      {scheduleLead && <>
        <button className={styles.modalScrim} type="button" onClick={() => setScheduleLeadId(null)} aria-label="Cerrar modal para agendar" />
        <section className={styles.scheduleModal} role="dialog" aria-modal="true" aria-labelledby="schedule-title">
          <header className={styles.modalHeader}>
            <div><h2 id="schedule-title">Agendar reunión</h2><p>{scheduleLead.name} · {scheduleLead.email ?? scheduleLead.phone}</p></div>
            <button type="button" onClick={() => setScheduleLeadId(null)} aria-label="Cerrar"><Icon name="x" size={20} /></button>
          </header>
          <div className={styles.modalBody}>
            <div className={`${styles.modalField} ${styles.modalControl}`}><span>Responsable</span><ControlMenu icon="users" label={scheduleOwner || "Selecciona un responsable"} open={ownerMenuOpen} onToggle={() => setOwnerMenuOpen((open) => !open)} panelLabel="Seleccionar responsable" panelRole="menu">
              <div className="controlOptions">
                {ownerOptions.map((owner) => (
                  <button key={owner} className={scheduleOwner === owner ? "controlOptionSelected" : ""} role="menuitemradio" aria-checked={scheduleOwner === owner} onClick={() => { setScheduleOwner(owner); setOwnerMenuOpen(false); }}><span>{owner}</span>{scheduleOwner === owner && <Icon name="check" size={14} />}</button>
                ))}
              </div>
            </ControlMenu></div>
            <label className={styles.modalField}><span>Fecha y hora en Chile</span><input type="datetime-local" value={scheduleDate} onChange={(event) => setScheduleDate(event.target.value)} disabled={!scheduleOwner} /></label>
            {!scheduleOwner && <p className={styles.modalHint}>Selecciona un responsable para consultar horarios.</p>}
            <p className={styles.modalInfo}>Duración: 1 hora · America/Santiago · Google Meet. Se comprobará la disponibilidad del responsable antes de agendar.</p>
          </div>
          <footer className={styles.modalFooter}><Button onClick={() => setScheduleLeadId(null)}>Cancelar</Button><Button variant="primary" disabled={!scheduleOwner || !scheduleDate} onClick={confirmSchedule}>Agendar y enviar invitación</Button></footer>
        </section>
      </>}

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </div>
  );
}
