import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="var(--tgui--bg_color)"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="-1" y="100" rx="3" ry="3" width="357" height="17" />
        <rect x="-2" y="46" rx="3" ry="3" width="403" height="14" />
        <rect x="0" y="21" rx="3" ry="3" width="403" height="14" />
        <rect x="0" y="73" rx="3" ry="3" width="403" height="14" />
    </ContentLoader>
)

export default MyLoader

