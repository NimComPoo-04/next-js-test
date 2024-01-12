import React from 'react'
import { notFound } from 'next/navigation'

// Not bothering with CORS since the request is serverside
const PROJECT_ID = 'h11av1lx'
const DATASET = 'production'

const QUERY = encodeURIComponent('*[_type == "iarticle"]')

const allowed = ['en','be','de','jp']

function ListItem({title, author, details, references})
{
	let i = 0
	return (<section>
			<strong> { title } </strong><br />
			<em> { author } </em><br />
			<p> { details } </p>
			<strong> References </strong><br />
			<ul>{references?.map((a) => <li key={i++}>{a}</li>)}</ul>
			<hr />
			</section>)
}

// Automatic memoization of fetch requests
export async function SanityArticle({lang}) {

	lang = (lang == undefined ? 'en': lang);
	
	// gets revalidated every six hours
	const something = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/${DATASET}?query=${QUERY}.${lang}`, {next: {revalidate: 3600 * 6}})
	const result = await something.json()

	console.log(lang)
	console.log('happened')
	console.log(result.result)

	let i = 0
	let content = (<article>
		{result.result?.map((a) => a ? (<ListItem
			key={i++}
			title={a.title}
			author={a.author}
			details={a.details}
			references={a.references}
			/>) : (<section><li>Sorry Document not present it this language</li><hr/></section>))}
		</article>)

	return content
}

export default function HomePage({params})
{
	// Don't mess up the database
	if(allowed.indexOf(params.lang && params.lang[0]) < 0)
		return notFound()

	console.log(JSON.stringify(params))
	return (
		<>
		<h1>Hello, World!</h1>
		<SanityArticle lang={params.lang && params.lang[0]}/>
		</>
	)
}

export const generateStaticParams = () => allowed.map((a) => {lang: [a]})
