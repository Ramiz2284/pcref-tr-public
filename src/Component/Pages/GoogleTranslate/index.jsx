import React, { useEffect } from 'react'
import './GoogleTranslate.sass'

const GoogleTranslate = () => {
	useEffect(() => {
		const googleTranslateScript = document.createElement('script')
		googleTranslateScript.type = 'text/javascript'
		googleTranslateScript.async = true
		googleTranslateScript.src =
			'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
		document.body.appendChild(googleTranslateScript)
		window.googleTranslateElementInit = function () {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: 'tr',
					includedLanguages: 'en,tr,ru',
					layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
				},
				'google_translate_element'
			)
		}
	}, [])

	return (
		<div className='googleTranslateWrapper'>
			<div id='google_translate_element'></div>
		</div>
	)
}

export default GoogleTranslate
