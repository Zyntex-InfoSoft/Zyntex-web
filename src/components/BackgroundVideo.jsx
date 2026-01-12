import video from "../assets/videos/zyntex1.mp4";

const BackgroundVideo = () => {
  return (
    <video autoPlay muted loop playsInline id="bg-video">
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
