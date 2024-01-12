import {NextResponse} from 'next/server'
import { headers } from 'next/headers'

export function middleware(request)
{
	const headerList = headers()
	const k = headerList.get('Accept-Language')

	if(k?.indexOf('jp') >= 0)
		return NextResponse.redirect(new URL('/jp', request.url))

	else if(k?.indexOf('bn') >= 0)
		return NextResponse.redirect(new URL('/be', request.url))

	else if(k?.indexOf('de') >= 0)
		return NextResponse.redirect(new URL('/de', request.url))

	else
		return NextResponse.redirect(new URL('/en', request.url))
}

export const config = {
	matcher: ['/']
}
