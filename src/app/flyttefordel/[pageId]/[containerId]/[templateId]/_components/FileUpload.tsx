import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useId, useState } from 'react'

type Props = {
	imageUrl?: string
	onFileSelect: ({ file, dataUrl }: { file: File; dataUrl: string }) => void
}

export default function FileUpload({
	imageUrl: defaultImageUrl,
	onFileSelect,
}: Props) {
	const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImageUrl)
	const id = useId()

	return (
		<div>
			{imageUrl && (
				<img
					className='max-w-[37.5rem] mb-5'
					src={imageUrl}
				/>
			)}

			<Button className='p-0 h-auto'>
				<label
					className='py-2 px-4 cursor-pointer flex items-center gap-3'
					htmlFor={id}
				>
					{imageUrl ? 'Endre fil' : 'Last opp fil'}
					<Upload
						className='h-4 w-4 text-muted-foreground'
						aria-hidden
					/>
				</label>
			</Button>

			<input
				id={id}
				type='file'
				className='hidden'
				accept='image/jpeg, image/png'
				onChange={e => {
					const file = (e.target.files || [])[0]

					if (!file) return

					const reader = new FileReader()

					reader.readAsDataURL(file)

					reader.onloadend = () => {
						const result = reader.result as string

						setImageUrl(result)
						onFileSelect({ file, dataUrl: result })
					}
				}}
			/>
		</div>
	)
}
