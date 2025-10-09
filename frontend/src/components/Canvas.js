import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationId;
        let vcrY = 0;

        const blockWidth = Math.round(window.innerWidth / 15);
        const blockHeight = Math.round(window.innerHeight / 15);
        const grid = Array.from({ length: blockHeight }, () =>
            Array.from({ length: blockWidth }, () => ({ alpha: 0 }))
        );

        let walkers = Array.from({ length: 100 }, () => ({
            x: Math.floor(blockWidth * Math.random()),
            y: Math.floor(blockHeight * Math.random()),
            dir: Math.floor(Math.random() * 4), // 0=up,1=down,2=left,3=right
        }));

        // Pre-rendered scanlines
        const scanlineCanvas = document.createElement("canvas");
        const scanCtx = scanlineCanvas.getContext("2d");
        scanlineCanvas.width = canvas.width;
        scanlineCanvas.height = canvas.height;
        scanCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
        for (let y = 0; y < scanlineCanvas.height; y += 4) {
            scanCtx.fillRect(0, y, scanlineCanvas.width, 2);
        }

        // Reusable gradient for the VCR
        const barHeight = 50;
        const vcrGradient = context.createLinearGradient(0, 0, 0, barHeight);
        vcrGradient.addColorStop(0, "rgba(255, 255, 255, 0.005)");
        vcrGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.007)");
        vcrGradient.addColorStop(1, "rgba(255, 255, 255, 0.005)");

        // Walker step update
        function stepWalkers() {
            for (const walker of walkers) {
                if (Math.random() < 0.05) {
                    walker.dir = Math.floor(Math.random() * 4);
                }

                switch (walker.dir) {
                    case 0:
                        walker.y = Math.max(0, walker.y - 1);
                        break;
                    case 1:
                        walker.y = Math.min(blockHeight - 1, walker.y + 1);
                        break;
                    case 2:
                        walker.x = Math.max(0, walker.x - 1);
                        break;
                    case 3:
                        walker.x = Math.min(blockWidth - 1, walker.x + 1);
                        break;
                    default:
                        break;
                }

                const cell = grid[walker.y][walker.x];
                if (cell.alpha < 0.01) {
                    cell.alpha = 0;
                    cell.growing = true;
                }
            }
        }

        // Draw function
        function drawGrid() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < blockHeight; y++) {
                for (let x = 0; x < blockWidth; x++) {
                    const cell = grid[y][x];
                    if (cell.alpha > 0 || cell.growing) {
                        context.strokeStyle = `rgba(112, 37, 65, ${cell.alpha * 3})`;
                        context.fillStyle = `rgba(112, 37, 65, ${cell.alpha})`;
                        context.beginPath();
                        context.roundRect(x * 20, y * 20, 15, 15, 5);
                        context.stroke();
                        context.fill();

                        if (cell.growing) {
                            cell.alpha = Math.min(1, cell.alpha + 0.02);
                            if (cell.alpha >= 1) cell.growing = false;
                        } else {
                            cell.alpha = Math.max(0, cell.alpha - 0.005);
                        }
                    }
                }
            }

            // Cached scanlines
            context.drawImage(scanlineCanvas, 0, 0);

            // Moving VCR bar
            context.fillStyle = vcrGradient;
            context.fillRect(0, vcrY, canvas.width, barHeight);

            vcrY += 16;
            if (vcrY > canvas.height) vcrY = -barHeight;
        }

        // Animation timing
        let lastStepTime = 0;
        let lastDrawTime = 0;
        const stepInterval = 75;
        const fps = 30;                   // target frames per second
        const frameInterval = 1000 / fps; // = 33.3 ms per frame

        function animate(timestamp) {
            if (timestamp - lastStepTime > stepInterval) {
                stepWalkers();
                lastStepTime = timestamp;
            }

            if (timestamp - lastDrawTime > frameInterval) {
                drawGrid();
                lastDrawTime = timestamp;
            }

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
