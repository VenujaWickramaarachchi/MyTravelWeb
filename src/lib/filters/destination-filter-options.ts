import type { Destination } from '@/types/destination'

export function getDestinationTypeOptions(
    destinations: Destination[],
) {
    const types = destinations.flatMap(
        (destination) => destination.destinationType || [],
    )

    return [
        { label: 'Any Destination Type', value: '' },
        ...Array.from(
            new Set(
                types
                    .map((type) => String(type).trim())
                    .filter(Boolean),
            ),
        ).map((type) => ({
            label: type,
            value: type,
        })),
    ]
}