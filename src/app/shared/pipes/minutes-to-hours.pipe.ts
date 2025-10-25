import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minutesToHours',
})
export class MinutesToHoursPipe implements PipeTransform {
    transform(totalMinutes: number | null | undefined) {
        if (!totalMinutes) return null;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');

        if (hours === 0) return `${minutes}m`;
        if (minutes === 0) return `${hours}h`;
        return `${hours}h ${formattedMinutes}m`;
    }
}
