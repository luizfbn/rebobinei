import { HttpParams } from '@angular/common/http';

export function toHttpParams<T extends Record<string, any>>(paramsObj?: T) {
    let params = new HttpParams();

    if (paramsObj) {
        Object.entries(paramsObj).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((v) => (params = params.append(key, String(v))));
                } else {
                    params = params.set(key, String(value));
                }
            }
        });
    }

    return params;
}
