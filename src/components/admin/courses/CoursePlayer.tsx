import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
            videoId: videoUrl,
        });
        setVideoData(res.data);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
          console.error("Axios error:", err.response?.data || err.message);
        } else {
          setError("An unexpected error occurred");
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchVideoData();
  }, [videoUrl]);


  useEffect(() => {
    if (videoData.otp && videoData.playbackInfo) {
      setLoading(false);
    }
  }, [videoData]);

  return (
    <div className="pt-[56%] relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-12 w-12 rounded-full"></div>
        </div>
      )}
      {!videoData.otp || !videoData.playbackInfo ? (
        <div className="text-red-500">{error}</div>
      ) : (
        !loading && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=lQoGZLc0llmqRT70`}
            style={{
              border: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              left: "0",
            }}
            allow="encrypted-media"
            allowFullScreen={true}
          ></iframe>
        )
      )}
    </div>
  );
};

export default CoursePlayer;
