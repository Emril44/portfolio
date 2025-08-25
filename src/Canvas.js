import React, {useEffect, useRef} from 'react'

const Canvas = props => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas =  canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context.fillStyle = "pink";
        const blockWidth = Math.round(window.innerWidth / 15);
        const blockHeight = Math.round(window.innerHeight / 15);
        console.log(blockWidth);
        console.log(blockHeight);
        for(let j = 0; j < blockHeight - 16; j++) {
            for (let i = 0; i < blockWidth - 20; i++) {
                context.beginPath();
                context.roundRect(i*20, j*20, 15, 15, 2);
                context.fill();
            }
        }
    }, [])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas;