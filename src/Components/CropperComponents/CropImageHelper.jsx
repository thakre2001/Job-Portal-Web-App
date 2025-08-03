export default function getCroppedImg(imageSrc, croppedAreaPixels) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height

            const ctx = canvas.getContext('2d')

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0, 0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('canvas is empty'));
                const fileUrl = URL.createObjectURL(blob);
                resolve ({blob,fileUrl});

            }, 'image/jpeg')
        }
        image.onerror = (err) => reject(err)
    })
}