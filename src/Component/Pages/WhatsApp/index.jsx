import PropTypes from 'prop-types'
import React from 'react'
import styles from './WhatsAppButton.module.sass'

const WhatsAppButton = ({ phoneNumber, message }) => {
	const formattedMessage = encodeURIComponent(message)
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`

	return (
		<div className={styles.buttonWrap}>
			<a href={whatsappUrl} target='_blank' rel='noopener noreferrer'>
				<button className={styles.button}>WhatsApp ile Değerlendirin</button>
			</a>
		</div>
	)
}

WhatsAppButton.propTypes = {
	phoneNumber: PropTypes.string.isRequired,
	message: PropTypes.string,
}

WhatsAppButton.defaultProps = {
	message: '',
}

export default WhatsAppButton
