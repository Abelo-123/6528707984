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
        <rect x="-1" y="105" rx="3" ry="3" width="357" height="12" />
        <rect x="-2" y="46" rx="3" ry="3" width="373" height="12" />
        <rect x="0" y="75" rx="3" ry="3" width="363" height="13" />
        <rect x="0" y="16" rx="3" ry="3" width="380" height="12" />
    </ContentLoader>
)

export default MyLoader

