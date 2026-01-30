import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { German } from "flatpickr/dist/l10n/de";

const formatDate = (date: Date) => date.toLocaleDateString("de-DE");

type DateRangePickerProps = {
  onChange?: (range: [Date, Date]) => void;
};

export default function DateRangePicker({ onChange }: DateRangePickerProps) {
  return (
    <Flatpickr
      placeholder="Zeitraum auswählen"
      options={{
        mode: "range",
        dateFormat: "Y-m-d", // intern (z. B. 2026-01-28)
        locale: German,
      }}
      onChange={(selectedDates) => {
        const [start, end] = selectedDates as [Date, Date];

        if (end && onChange) {
          onChange([start, end]);
          console.log([formatDate(start), formatDate(end)]);
        }
      }}
    />
  );
}
