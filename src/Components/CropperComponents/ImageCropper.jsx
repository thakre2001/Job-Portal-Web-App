import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import getCroppedImg from './CropImageHelper';

const ImageCropper = ({ imageSrc, onCropDone, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, [])

    const handleDone = async () => {
        const { blob, fileUrl } = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropDone(fileUrl, blob)
    }

    return (
        <div className="crop-container"
            style={{
                zIndex: '1000',
                display: 'block',
                width: '700px',
                height: '600px',
                position: 'relative',
                margin:'auto'
            }}>
            <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{width:'300px'}}
            />

            <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, zoom) => setZoom(zoom)}
            />

            <div className="crop-action position-absolute" style={{ right: '10%', bottom: '10%' }}>
                <button className='btn btn-success py-2 px-4 fs-3 me-3' onClick={handleDone}>Done</button>
                <button className='btn btn-danger py-2 px-4 fs-3' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default ImageCropper
