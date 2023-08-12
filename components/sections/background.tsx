

const imageUrlStyle = {
    "--bg-image":
        `url('https://image.tmdb.org/t/p/original/lupYDG3lrqX9nTt3dwFiPSd3MqD.jpg')`,
};

export default function Background() {
    return (
        <div className='bg-image w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover fixed z-[-15]' style={imageUrlStyle as React.CSSProperties} />        
    );
}