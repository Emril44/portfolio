import React, {useEffect, useRef} from 'react'

const Canvas = props => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    const canvasRef = useRef(null);

    useEffect(() => {
        let animationId;

        const canvas =  canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blockWidth = Math.round(window.innerWidth / 15);
        const blockHeight = Math.round(window.innerHeight / 15);
        const grid = Array.from({ length: blockHeight }, (_) =>
            Array.from({ length: blockWidth }, (_) => ({alpha: 0}))
        );

        let walkers = Array.from({ length: 96 }, () => ({
            x: Math.floor(blockWidth * Math.random()),
            y: Math.floor(blockHeight * Math.random()),
        }));

        function wienerRandom() {
            let sum = 0;
            for (let i = 0; i < 6; i++) {
                sum += Math.random() - 0.5; // range [-0.5, 0.5]
            }
            return sum; // mean ~0, variance ~small
        }

        function stepWalkers() {
            for (const walker of walkers) {
                walker.x += wienerRandom() * 2;
                walker.y += wienerRandom() * 2;

                walker.x = Math.max(0, Math.min(blockWidth - 1, Math.round(walker.x)));
                walker.y = Math.max(0, Math.min(blockHeight - 1, Math.round(walker.y)));

                const cell = grid[walker.y][walker.x];
                if(cell.alpha < 0.01) {  // only restart if needed, prevent blinking cells
                    cell.alpha = 0;
                    cell.growing = true;
                }
            }
        }

        function drawGrid() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < blockHeight; y++) {
                for (let x = 0; x < blockWidth; x++) {
                    const cell = grid[y][x];
                    if(cell.alpha > 0 || cell.growing) {
                        // draw rectangle
                        context.strokeStyle = `rgba(100, 73, 121, ${cell.alpha * 3})`;
                        context.fillStyle = `rgba(100, 73, 121, ${cell.alpha})`;
                        context.beginPath();
                        context.roundRect(x * 20, y * 20, 15, 15, 5);
                        context.stroke();
                        context.fill();
                        // fade tile
                        if(cell.growing) {
                            cell.alpha = Math.min(1, cell.alpha + 0.02);
                            if(cell.alpha >= 1) cell.growing = false;
                        } else {
                            cell.alpha = Math.max(0, cell.alpha - 0.003);
                        }
                    }
                }
            }
        }

        let lastStepTime = 0;
        const stepInterval = 75; // ms per step

        function animate(timestamp) {
            if(timestamp - lastStepTime > stepInterval) {
                stepWalkers();
                lastStepTime = timestamp;
            }

            drawGrid();
            animationId = requestAnimationFrame(animate);
        }

        // clean up animation on unmount (prevents double-mount)
        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas;