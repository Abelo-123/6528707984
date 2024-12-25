import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={1.5}
        width={500}
        height={205}
        viewBox="0 0 400 205"
        backgroundColor="#878787"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="-11" y="-5" rx="2" ry="2" width="414" height="45" />
        <rect x="-13" y="353" rx="2" ry="2" width="400" height="400" />
        <rect x="-3" y="52" rx="2" ry="2" width="414" height="45" />
        <rect x="-13" y="110" rx="2" ry="2" width="414" height="45" />
        <rect x="-7" y="166" rx="2" ry="2" width="414" height="45" />
    </ContentLoader>
)

export default MyLoader
