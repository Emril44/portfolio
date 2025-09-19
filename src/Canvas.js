import React, {useEffect, useRef} from 'react'

const Canvas = props => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    const canvasRef = useRef(null);

    let walker = {
        x: 0,
        y: 0
    };

    const directions = ['up', 'down', 'left', 'right'];

    useEffect(() => {
        let animationId;

        const canvas =  canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blockWidth = Math.round(window.innerWidth / 15);
        const blockHeight = Math.round(window.innerHeight / 15);
        const grid = Array.from({ length: blockHeight }, (_, y) =>
            Array.from({ length: blockWidth }, (_, x) => ({alpha: 0}))
        );
        walker.x = 68;
        walker.y = 31;

        let walkNum = 0;

        function stepWalker() {
            // pick random direction
            const newDirection = Math.floor(Math.random() * directions.length);
            // eslint-disable-next-line default-case
            switch(newDirection) {
                case 0: walker.y = Math.max(0, walker.y - 1); break; // up
                case 1: walker.y = Math.min(blockHeight - 1, walker.y + 1); break; // down
                case 2: walker.x = Math.max(0, walker.x - 1); break; // left
                case 3: walker.x = Math.min(blockWidth - 1, walker.x + 1); break; // right
            }

            walkNum++;

            console.log(`walker ${walkNum}: (${walker.x}, ${walker.y})`);

            grid[walker.y][walker.x].alpha = 1;
        }

        function drawGrid() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < blockHeight; y++) {
                for (let x = 0; x < blockWidth; x++) {
                    const cell = grid[y][x];
                    if(cell.alpha > 0) {
                        // draw rectangle
                        context.fillStyle = `rgba(255, 182, 193, ${cell.alpha})`;
                        context.fillRect(x * 15, y * 15, 15, 15);
                        // fade tile
                        cell.alpha = Math.max(0, cell.alpha - 0.02);
                    }
                }
            }
        }

        let lastStepTime = 0;
        const stepInterval = 100; // ms per step

        function animate(timestamp) {
            if(timestamp - lastStepTime > stepInterval) {
                stepWalker();
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