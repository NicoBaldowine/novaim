import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  ArrowUpDown,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Columns3,
  FileText,
  Headphones,
  LayoutGrid,
  Mail,
  Map,
  MapPin,
  Menu,
  Palette,
  Search,
  Shield,
  SlidersHorizontal,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  activity: Activity,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  sort: ArrowUpDown,
  bell: Bell,
  bookmark: Bookmark,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  chevronDown: ChevronDown,
  circleCheck: CircleCheck,
  columns: Columns3,
  document: FileText,
  headphones: Headphones,
  grid: LayoutGrid,
  mail: Mail,
  map: Map,
  menu: Menu,
  palette: Palette,
  pin: MapPin,
  search: Search,
  shield: Shield,
  sliders: SlidersHorizontal,
  users: UsersRound,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({ name, size = 19, strokeWidth = 1.75, className }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
  const LucideIconComponent = iconMap[name];
  return <LucideIconComponent aria-hidden="true" size={size} strokeWidth={strokeWidth} className={className} />;
}
