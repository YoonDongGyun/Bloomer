import AWS from "aws-sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 음악 가져오기
export const getMusicAction = async (musicTitle: any) => {
  try {
    const s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_S3_REGION,
    });
    const params = {
      Bucket: "bloomer205",
      Key: `music/${musicTitle}.mp3`,
    };

    //

    const url = await s3.getSignedUrlPromise("getObject", params);

    return url;
  } catch (e) {
    return e;
  }
};
