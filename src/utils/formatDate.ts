import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function formatDate({
  date,
  short = false,
}: {
  date: string | null;
  short?: boolean;
}) {
  const formatString = short
    ? "dd/MM/yy"
    : "⋮ dd 'de' MMMM, yyyy ⋮ HH:mm 'UTC'";

  if (date)
    return format(parseISO(date), formatString, {
      locale: es,
    });
}
