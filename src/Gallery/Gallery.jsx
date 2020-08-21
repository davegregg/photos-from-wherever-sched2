import React from "react"

import getPhotos from "../services/flickrService"

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
        }
    }

    componentDidMount() {
        getPhotos("spaghetti").then(photos => this.setState({ photos }))
    }

    render() {
        if (this.state.photos.length === 0) {
            return <div className="Photo">Loading...</div>
        }

        const firstPhoto = this.state.photos[0]
        return (
            <div className="Photo">
                <h3>{firstPhoto.title}</h3>
                <img src={firstPhoto.src} alt={firstPhoto.title} />
            </div>
        )
    }
}
