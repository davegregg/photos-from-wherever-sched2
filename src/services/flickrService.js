function constructImageURL({ farm, server, id, secret }) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}

export default function getPhotos(
    searchTerm,
    lat = "39.76574",
    long = "-86.1579024"
) {
    const apiKey = "183aac1229d8d18d7dae109e1bdc3383"
    const perPage = 100
    const CORSProxy = "https://shrouded-mountain-15003.herokuapp.com/"
    const url = `${CORSProxy}https://flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=${perPage}&lat=${lat}&lon=${long}&text=${searchTerm}`

    return fetch(url)
        .then(response => response.json())
        .then(flickrPhotoSearch => {
            const photos = flickrPhotoSearch.photos.photo
            photos.forEach(photo => (photo.src = constructImageURL(photo)))

            return photos
        })
}
