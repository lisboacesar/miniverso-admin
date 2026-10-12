"use client";

import { cx } from "@/lib/cx";
import styles from "./switch.module.css";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Nome lido pelo leitor de tela. */
  label: string;
  /** Texto visível ao lado (opcional). */
  showLabel?: boolean;
  disabled?: boolean;
  /** Explica por que está bloqueado; aparece como dica. */
  disabledReason?: string;
};

/** Liga e desliga, com estado em texto para não depender só da cor (RNF39). */
export function Switch({ checked, onChange, label, showLabel, disabled, disabledReason }: SwitchProps) {
  return (
    <span className={styles.wrapper} title={disabled ? disabledReason : undefined}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={showLabel ? undefined : label}
        aria-disabled={disabled || undefined}
        className={cx(styles.track, checked && styles.on, disabled && styles.disabled)}
        onClick={() => {
          if (!disabled) onChange(!checked);
        }}
      >
        <span className={styles.thumb} aria-hidden="true" />
        {showLabel && <span className="sr-only">{label}</span>}
      </button>
      {showLabel && (
        <span className={styles.text} aria-hidden="true">
          {label}
        </span>
      )}
    </span>
  );
}
