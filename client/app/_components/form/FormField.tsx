import { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: FormFieldProps) {
  const getClassName = (id: string) => {
    if (id === "concertName") return "section1";
    if (id === "totalSeats") return "section2";
    if (id === "description") return "section3";
    return "";
  };

  return (
    <div className={getClassName(id)}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="input"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input"
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
