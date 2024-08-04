export default function YouTubeStream({ videoId }) {

  return (
    <div>
      <iframe
        className='ml-96 my-0 p-0 w-3/5 h-3/5 absolute'
        src={`https://youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Livestream"
      />
    </div>
  )
}