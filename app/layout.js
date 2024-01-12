export const metadata = {
	title: 'Article',
	description: 'Testing Sanity With Next JS and stuff',
}

export const viewport = {
	viewport: "width: device-width, initial-scale: 1.0",
}

export default function RootLayout({ children }) {
	return (
		<html>
		<body>
		{children}
		</body>
		</html>
	)
}
