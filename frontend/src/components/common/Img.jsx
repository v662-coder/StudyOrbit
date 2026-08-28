import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// BUGFIX: there was no fallback for a broken/failed image URL (dead
// Cloudinary link, deleted asset, network blip) - the browser just showed a
// broken-image icon and the surrounding layout could shift. This adds a
// graceful inline placeholder and swaps to it on error.
const FALLBACK_IMG =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23161d29'/%3E%3Ctext x='50%25' y='50%25' fill='%23838894' font-family='sans-serif' font-size='16' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E"

const Img = ({ src, className, alt }) => {
    return (
        <LazyLoadImage
            className={`${className} `}
            alt={alt || 'Image'}
            effect='blur'
            src={src}
            onError={(e) => {
                if (e.target.src !== FALLBACK_IMG) {
                    e.target.src = FALLBACK_IMG
                }
            }}
        />
    )
}


export default Img