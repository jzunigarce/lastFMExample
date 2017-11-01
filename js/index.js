$(function () {

	const getTemplate = function(artist) {
		return `<div class="card card-artist">
			  <div class="card-body text-center">
			    <h4 class="card-title">${artist.name}</h4>
			    <img src="${artist.image[2]['#text']}" alt="" />
			  </div>
			</div>`
	}

	const render = function (artists) {
		let $artists = $('.artists')

		artists.forEach(function (artist) {
			let content = getTemplate(artist)
			$artists.append(content)
		})
	}

	$('#country').on('change', function(e) {
		let country = $(this).val()
		if(country !== '-1') {
			$('.loader').show()
			$('.artists').find('.card-artist').remove()
			$.ajax({
				url: `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${config.apiKey}&format=json`
			}).done(function (data){
				let artists = data.topartists.artist.map(function (artist) {
					return artist
				})
				render(artists)
				$('.loader').hide()
			}).fail(function () {
				$('.loader').hide()
			}).always(function () {

			})
		}
	})
})