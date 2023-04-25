import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

const Img = styled.img`
    width: ${(props) => props.width || "75px"};
    height: ${(props) => props.width || "75px"};
    border-radius: 50%;
    overflow: hidden;
`;

function ProfileImg(props:any) {
    const { tmpsrc, src, width, height} = props;
    // tmpsrc : 클라이언트에서 바로 가져오는 이미지src
    // src : s3에서 불러오는 이미지 키값

    // s3 bucket 이미지 읽어오기
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_S3_REGION,
    });
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const params = {
            Bucket: "bloomer205",
            Key: `${src}`,
        };

        s3.getSignedUrlPromise("getObject", params)
        .then((url) => setImageUrl(url))
        .catch((err) => console.error(err));

    }, [src]);

    // 이미지 편집에서 선택한 tmpImage있으면 해당 사진 미리보기
    return tmpsrc ? (
        <Img src={tmpsrc} width={width} height={height} />
    ) : (
        <Img src={imageUrl} width={width} height={height} />
    );
}

export default ProfileImg;
