import React from 'react'

// Not bothering with CORS since the request is serverside
const PROJECT_ID = 'h11av1lx'
const DATASET = 'production'

const QUERY = encodeURIComponent('*[_type == "article"]')

function ListItem({title, author, details, references})
{
	let i = 0
	return (<section>
			<strong> { title } </strong><br />
			<em> { author } </em><br />
			<p> { details } </p>
			<strong> References </strong><br />
			<ul>{references.map((a) => <li key={i++}>{a}</li>)}</ul>
			<hr />
			</section>)
}

// Automatic memoization of fetch requests
export async function SanityArticle() {

	const something = await fetch('https://h11av1lx.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27article%27%5D', {next: {revalidate: 3600}})
	const result = await something.json()
	console.log('happened')

	console.log(result.result)

	let i = 0
	let content = (<article>
		{result.result.map((a) => (<ListItem
			key={i++}
			title={a.title}
			author={a.author}
			details={a.details}
			references={a.references}
			/>))}
		</article>)

	return content
}

export default function HomePage()
{
	return (
		<>
		<h1>Hello, World!</h1>
		<SanityArticle />
		</>
	)
}
