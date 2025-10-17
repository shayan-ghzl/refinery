import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessorBase<T = any> implements ControlValueAccessor {
    value!: T | null;

    onChange = (value: T | null) => { };
    onTouched = () => { };
    touched = false;
    disabled = false;

    writeValue(obj: T | null): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    onInput(value: T | null) {
        if (!this.disabled) {
            this.value = value;
            this.onChange(this.value);
            this.markAsTouched();
        }
    }

    clear() {
        if (!this.disabled && this.value) {
            this.value = null;
            this.onChange(this.value);
            this.markAsTouched();
        }
    }
}
