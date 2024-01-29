import React from "react";

const Profile: React.FunctionComponent<
    Partial<{
        src: string;
        alt: string;
    }>
> = function ({
    src = "https://i.imgur.com/MK3eW3Am.jpg",
    alt = "Katherine Johnson",
}) {
    return <img src={src} alt={alt} />;
};

export default Profile;
