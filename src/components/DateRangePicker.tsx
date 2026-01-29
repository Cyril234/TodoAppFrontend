import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { German } from "flatpickr/dist/l10n/de";

export default function DateRangePicker() {
  return (
    <Flatpickr
      placeholder="Zeitraum auswählen"
      options={{
        mode: "range",
        dateFormat: "Y-m-d",
        locale: German,
      }}
      onChange={(selectedDates) => {
        const [start, end] = selectedDates;
        console.log("Start:", start);
        console.log("Ende:", end);
      }}
    />
  );
}
