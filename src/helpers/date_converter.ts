import { format } from "date-fns";
import { id } from "date-fns/locale";

export const date_converter = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = format(date, "d MMMM yyyy", { locale: id });

  return formattedDate;
};
