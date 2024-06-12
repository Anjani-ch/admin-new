'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

type Option = {
	id: number | string
	value: any
	label: string
}

type Props = {
	options: Option[]
	onSelect?: (option: Option) => void
	defaultValue?: Option
}

export default function Combobox({ options, onSelect, defaultValue }: Props) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState<Option | null>(defaultValue || null)

	const option = value && options.find(option => option.id === value.id)

	useEffect(() => {
		if (!defaultValue) return

		setValue(defaultValue)
	}, [])

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='justify-between w-full'
				>
					{option ? option.label : 'Velg noe...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0 w-full'>
				<Command className='w-full'>
					<CommandInput placeholder='Søk resultat...' />
					<CommandEmpty>Ingen resultater funnet.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{options.map(option => (
								<CommandItem
									key={option.id}
									value={option.label}
									onSelect={currentValue => {
										const selected =
											options.find(option => option.label === currentValue) ||
											null

										if (!selected || value?.id === selected.id) return

										setValue(selected)

										if (onSelect) onSelect(selected)

										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value?.id === option.id ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
