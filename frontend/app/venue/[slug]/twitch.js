export default function TwitchStream({ channelId }) {

  return (
    <div>
      <iframe
        className='ml-96 my-0 p-0 w-3/5 h-3/5 absolute'
        src={`https://player.twitch.tv/?channel=${channelId}&parent=localhost`}
        frameBorder="0"
        allowFullScreen
        title="Twitch Livestream"
      />
    </div>
  )
}