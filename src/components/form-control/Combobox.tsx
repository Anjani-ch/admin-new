'use client'

import { useState } from 'react'
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
	onSelect?: (option: Option | null) => void
}

export default function Combobox({ options, onSelect }: Props) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState<Option | null>(null)

	if (!options) options = []

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
					className='w-[200px] justify-between'
				>
					{value
						? options.find(option => option.id === value.id)?.label
						: 'Velg noe...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search framework...' />
					<CommandEmpty>Ingen resultater funnet.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{options.map(option => (
								<CommandItem
									key={option.id}
									value={option.id.toString()}
									onSelect={currentValue => {
										const selected =
											options.find(option => option.id === currentValue) || null

										setValue(
											!selected || selected?.id.toString() === currentValue
												? null
												: selected
										)
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
