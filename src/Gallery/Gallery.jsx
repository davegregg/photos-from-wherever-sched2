import React from "react"
import _ from "lodash"

import getPhotos from "../services/flickrService"

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)

        this.initialLatitude = "39.76574"
        this.initialLongitude = "-86.1579024"

        this.state = {
            prevLatitude: null,
            prevLongitude: null,
            latitude: this.latitude,
            longitude: this.longitude,
            photos: [],
        }
    }

    // componentDidUpdate() {
    //     if (this.state.latitude === this.initialLatitude) return
    //     if (this.state.latitude === this.prevLatitude) return
    // }

    componentDidMount() {
        const onSuccess = location => {
            const { latitude, longitude } = location.coords
            const andThenPopulateAgain = this.populatePhotosList

            this.setState(
                currentState => ({
                    prevLatitude: currentState.latitude,
                    latitude,
                    longitude,
                }),
                andThenPopulateAgain
            )
        }

        const onError = err => console.warn(err.message)

        navigator.geolocation.getCurrentPosition(onSuccess, onError)

        this.populatePhotosList()
    }

    populatePhotosList = () => {
        getPhotos(
            this.props.searchTerm,
            this.state.latitude,
            this.state.longitude
        ).then(photos => this.setState({ photos }))
    }

    pickRandomPhoto() {
        return _.sample(this.state.photos)
    }

    render() {
        if (this.state.photos.length === 0) {
            return <div className="Photo">Loading...</div>
        }

        const randomPhoto = this.pickRandomPhoto()
        return (
            <div className="Photo">
                <h3>{randomPhoto.title}</h3>
                <img src={randomPhoto.src} alt={randomPhoto.title} />
            </div>
        )
    }
}
