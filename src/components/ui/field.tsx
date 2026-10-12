"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { LuChevronDown, LuCircleAlert, LuEye, LuEyeOff, LuSearch } from "react-icons/lu";
import { cx } from "@/lib/cx";
import styles from "./field.module.css";

type FieldFrameProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Rótulo visível, dica e erro ligados ao campo (RNF30, RNF32, RNF36). */
function FieldFrame({ id, label, required, hint, error, className, children }: FieldFrameProps) {
  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-dica`} className={styles.hint}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-erro`} className={styles.error}>
          <LuCircleAlert aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-dica` : null, error ? `${id}-erro` : null].filter(Boolean).join(" ") || undefined;
}

type BaseFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

// ComponentProps<"input"> inclui `ref`, usado para levar o foco ao campo com erro.
type InputProps = BaseFieldProps & Omit<ComponentProps<"input">, "className">;

export function TextField({ label, hint, error, className, id, required, ...input }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldFrame id={inputId} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={inputId}
        className={cx(styles.input, error && styles.invalid)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(inputId, hint, error)}
        {...input}
      />
    </FieldFrame>
  );
}

export function PasswordField({ label, hint, error, className, id, required, ...input }: Omit<InputProps, "type">) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  return (
    <FieldFrame id={inputId} label={label} required={required} hint={hint} error={error} className={className}>
      <div className={cx(styles.control, styles.withToggle)}>
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className={cx(styles.input, error && styles.invalid)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(inputId, hint, error)}
          {...input}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          aria-controls={inputId}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
        </button>
      </div>
    </FieldFrame>
  );
}

export function SearchField({ label, hint, error, className, id, ...input }: Omit<InputProps, "type">) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldFrame id={inputId} label={label} hint={hint} error={error} className={className}>
      <div className={cx(styles.control, styles.withIcon)}>
        <LuSearch aria-hidden="true" className={styles.leadingIcon} />
        <input
          id={inputId}
          type="search"
          className={styles.input}
          aria-describedby={describedBy(inputId, hint, error)}
          {...input}
        />
      </div>
    </FieldFrame>
  );
}

type SelectProps = BaseFieldProps &
  Omit<ComponentProps<"select">, "className"> & {
    options: Array<{ value: string; label: string }>;
  };

export function SelectField({ label, hint, error, className, id, required, options, ...select }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <FieldFrame id={selectId} label={label} required={required} hint={hint} error={error} className={className}>
      <div className={styles.control}>
        <select
          id={selectId}
          className={cx(styles.input, styles.select, error && styles.invalid)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(selectId, hint, error)}
          {...select}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <LuChevronDown aria-hidden="true" className={styles.selectIcon} />
      </div>
    </FieldFrame>
  );
}
