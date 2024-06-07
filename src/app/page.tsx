import RecentlyChangedTemplates from './_components/RecentlyChangedTemplates'

export default async function Page() {
	return (
		<main className='flex-1 items-start p-4 sm:px-6 sm:py-0'>
			<h1 className='text-xl sm:text-3xl mb-4'>
				Velkommen til flyttefordel admin
			</h1>
			<RecentlyChangedTemplates />
		</main>
	)
}
