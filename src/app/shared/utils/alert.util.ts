import { signal, WritableSignal } from '@angular/core';
import { Alert } from '../models/alert.model';

export function createAlert(initial?: Partial<Alert>) {
    return signal<Alert>({
        type: 'error',
        message: 'Ocorreu um erro.',
        show: false,
        ...initial,
    });
}

export function showAlert(alert: WritableSignal<Alert>, show: boolean) {
    alert.update((a) => ({ ...a, show }));
}
