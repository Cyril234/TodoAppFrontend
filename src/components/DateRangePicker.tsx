import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { German } from "flatpickr/dist/l10n/de";

type DateRangePickerProps = {
  onChange?: (range: [Date, Date]) => void;
  existingRange?: [string, string];
};

export default function DateRangePicker({ onChange, existingRange }: DateRangePickerProps) {
    const defaultDate = existingRange ? [existingRange[0], existingRange[1]] : undefined;

    return (
        <Flatpickr
            style={{marginBottom: 2}}
            placeholder="Select time period"
            options={{
                mode: "range",
                dateFormat: "Y-m-d", // intern (z. B. 2026-01-28)
                locale: German,
                ...(defaultDate ? { defaultDate } : {})
            }}
            onChange={(selectedDates) => {
                const [start, end] = selectedDates as [Date, Date];

                if (end && onChange) {
                    onChange([start, end]);
                }
            }}
        />
    );
}
