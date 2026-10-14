'use client'

interface FilterOption {
    label: string
    value: string
}

interface FilterSelectProps {
    label: string
    name: string
    value?: string
    options: FilterOption[]
    placeholder?: string
}
export default function FilterSelect({
    label,
    name,
    value = '',
    options,

}: FilterSelectProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                defaultValue={value}
                onChange={(event) => {
                    event.currentTarget.form?.requestSubmit()
                }}
                className="w-full rounded border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}