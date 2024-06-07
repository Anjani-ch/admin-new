import RecentlyChangedTemplates from './_components/RecentlyChangedTemplates'

export default async function Page() {
	return (
		<>
			<h1 className='text-xl sm:text-3xl mb-4'>
				Velkommen til flyttefordel admin
			</h1>
			<RecentlyChangedTemplates />
		</>
	)
}
