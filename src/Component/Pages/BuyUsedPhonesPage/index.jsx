import React from 'react'
import './BuyUsedPhonesPage.sass'

const BuyUsedPhonesPage = () => {
	return (
		<div className='buy-used-phones-page'>
			<h1>
				Antalya'da İkinci El Cep telefonunuzu Alımı - Bugün En İyi Fiyatı Alın!
			</h1>

			<meta
				name='description'
				content="Antalya'da ikinci el telefonunuzu alım hizmeti. Hızlı değerlendirme, en iyi fiyatlar. Eski telefonunuzu getirin ve bugün nakit alın!"
			/>

			<section className='introduction'>
				<p>
					Eski telefonunuzu hızlı ve karlı bir şekilde satabilirsiniz. Basit
					değerlendirme süreci, dürüst fiyatlar, hızlı ödeme.
				</p>
			</section>

			<section className='how-it-works'>
				<h2>Nasıl Çalışır</h2>
				<div className='steps'>
					<div className='step'>
						<i className='step-icon'>📸</i>
						<p>WhatsApp'a fotoğraf ve açıklama gönderin.</p>
					</div>
					<div className='step'>
						<i className='step-icon'>🏠</i>
						<p>Telefonunuzu mağazamıza getirin.</p>
					</div>
					<div className='step'>
						<i className='step-icon'>💰</i>
						<p>Değerlendirmeden hemen sonra ödeme alın.</p>
					</div>
				</div>
			</section>

			<section className='cta'>
				<a
					href='https://wa.me/905444558407'
					target='_blank'
					rel='noopener noreferrer'
					className='whatsapp-button'
				>
					WhatsApp'ta İletişime Geçin
				</a>
			</section>

			<section className='seo-article'>
				<h2>
					İkinci El Cep telefonunuzu Nasıl Değerlendirebilir ve Nerede
					Satabilirsiniz?
				</h2>
				<p>
					Eski Cep telefonunuzu değerini öğrenmek ve hızlı bir şekilde satmak
					istiyorsanız, doğru yerdesiniz. Antalya'da ikinci el telefon alımı ve
					satımı konusunda uzmanız.
				</p>
				<h3>Cep telefonunuzu Değerini Nasıl Öğrenirsiniz?</h3>
				<p>
					Cihazınızın değerini belirlemek için modeli, kapasitesi, ekran durumu
					ve batarya sağlığı gibi birkaç faktör önemlidir. Antalya'da yerel
					mağazamızda hızlı bir değerlendirme yapabilir veya WhatsApp üzerinden
					bizimle iletişime geçebilirsiniz.
				</p>

				<h3>İkinci El Cep telefonunuzu Satarken Dikkat Edilmesi Gerekenler</h3>
				<ul>
					<li>Telefonunuzun kilidini açın ve fabrika ayarlarına sıfırlayın.</li>
					<li>Tüm aksesuarları ve orijinal kutuyu getirin, eğer mümkünse.</li>
					<li>Telefonunuzun genel durumunu iyi bir şekilde değerlendirin.</li>
				</ul>
				<h3>Doğru Bir Fiyat Teklifi Aldığınızı Nasıl Anlarsınız?</h3>

				<p>
					Telefonunuz için uygun bir teklif almak istiyorsanız, sadece
					teklifimizi değil, aynı zamanda piyasa fiyatlarını da göz önünde
					bulundurmalısınız. İşte birkaç ipucu:
				</p>
				<ul>
					<li>
						<strong>Sahibinden.com'u Ziyaret Edin:</strong> Telefonunuz ve bir
						üst modeli için güncel satış fiyatlarını kontrol edin. Eğer arada
						önemli bir fiyat farkı yoksa, müşteriler muhtemelen biraz daha fazla
						ödeyip daha yeni bir modeli tercih edeceklerdir.
					</li>
					<li>
						<strong>Fiyat Farkını Değerlendirin:</strong> Telefonunuzun modeli
						ile bir üst model arasındaki fiyat farkı yeterince büyükse,
						müşteriler için sizin teklifiniz daha cazip hale gelir. Eğer fark
						küçükse, müşteriler yeni modeli tercih edebilir.
					</li>
					<li>
						<strong>Karşılaştırma Yapın:</strong> Çeşitli kaynaklardan alınan
						fiyat tekliflerini karşılaştırın.
					</li>
				</ul>
			</section>
		</div>
	)
}

export default BuyUsedPhonesPage
