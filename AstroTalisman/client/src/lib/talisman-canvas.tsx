import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

interface DesignElement {
  shape: string;
  color: string;
  symbols: string[];
  numbers: number[];
  materials: string[];
}

interface TalismanCanvasProps {
  design: DesignElement;
}

const TalismanCanvas = forwardRef<any, TalismanCanvasProps>(({ design }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef(-1);

  useImperativeHandle(ref, () => ({
    exportPNG: () => {
      if (canvasRef.current) {
        const link = document.createElement('a');
        link.download = 'talisman-design.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
      }
    },
    exportSVG: () => {
      // Simple SVG export - in a real implementation you'd create proper SVG
      const svgContent = generateSVG(design);
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'talisman-design.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    },
    undo: () => {
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && historyRef.current[historyIndexRef.current]) {
          ctx.putImageData(historyRef.current[historyIndexRef.current], 0, 0);
        }
      }
    },
    redo: () => {
      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyIndexRef.current++;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && historyRef.current[historyIndexRef.current]) {
          ctx.putImageData(historyRef.current[historyIndexRef.current], 0, 0);
        }
      }
    },
    clear: () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        saveToHistory();
      }
    }
  }));

  const saveToHistory = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(imageData);
      historyIndexRef.current = historyRef.current.length - 1;
    }
  };

  const drawTalisman = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 20;

    // Set color
    const colorMap: Record<string, string> = {
      red: '#DC2626',
      blue: '#2563EB',
      green: '#16A34A',
      yellow: '#CA8A04',
      purple: '#9333EA',
      black: '#000000'
    };
    
    ctx.fillStyle = colorMap[design.color] || '#DC2626';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Draw base shape
    ctx.beginPath();
    switch (design.shape) {
      case 'circle':
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        break;
      case 'triangle':
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX - radius * 0.866, centerY + radius * 0.5);
        ctx.lineTo(centerX + radius * 0.866, centerY + radius * 0.5);
        ctx.closePath();
        break;
      case 'square':
        ctx.rect(centerX - radius, centerY - radius, radius * 2, radius * 2);
        break;
      case 'pentagon':
        drawPolygon(ctx, centerX, centerY, radius, 5);
        break;
      case 'hexagon':
        drawPolygon(ctx, centerX, centerY, radius, 6);
        break;
      case 'star':
        drawStar(ctx, centerX, centerY, radius, 5);
        break;
    }
    ctx.fill();
    ctx.stroke();

    // Draw symbols
    if (design.symbols.length > 0) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const symbolMap: Record<string, string> = {
        mars: '♂',
        venus: '♀',
        sun: '☉',
        moon: '☽',
        jupiter: '♃',
        saturn: '♄',
        mercury: '☿',
        liberation: '⚡',
        shield: '🛡️',
        key: '🗝️',
        chains: '⛓️‍💥',
        fire: '🔥'
      };

      design.symbols.forEach((symbolId, index) => {
        const symbol = symbolMap[symbolId] || symbolId;
        const angle = (index / design.symbols.length) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius * 0.6;
        const y = centerY + Math.sin(angle) * radius * 0.6;
        ctx.fillText(symbol, x, y);
      });
    }

    // Draw numbers
    if (design.numbers.length > 0) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '18px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      design.numbers.forEach((number, index) => {
        const angle = (index / design.numbers.length) * 2 * Math.PI + Math.PI / 4;
        const x = centerX + Math.cos(angle) * radius * 0.3;
        const y = centerY + Math.sin(angle) * radius * 0.3;
        ctx.fillText(number.toString(), x, y);
      });
    }

    saveToHistory();
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number) => {
    const angle = (2 * Math.PI) / sides;
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (let i = 1; i < sides; i++) {
      ctx.lineTo(x + radius * Math.cos(i * angle), y + radius * Math.sin(i * angle));
    }
    ctx.closePath();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number) => {
    const angle = Math.PI / points;
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? radius : radius * 0.5;
      ctx.lineTo(x + r * Math.cos(i * angle), y + r * Math.sin(i * angle));
    }
    ctx.closePath();
  };

  const generateSVG = (design: DesignElement): string => {
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 20;

    const colorMap: Record<string, string> = {
      red: '#DC2626',
      blue: '#2563EB',
      green: '#16A34A',
      yellow: '#CA8A04',
      purple: '#9333EA',
      black: '#000000'
    };

    let shapeElement = '';
    const color = colorMap[design.color] || '#DC2626';

    switch (design.shape) {
      case 'circle':
        shapeElement = `<circle cx="${center}" cy="${center}" r="${radius}" fill="${color}" stroke="black" stroke-width="2"/>`;
        break;
      case 'square':
        shapeElement = `<rect x="${center - radius}" y="${center - radius}" width="${radius * 2}" height="${radius * 2}" fill="${color}" stroke="black" stroke-width="2"/>`;
        break;
      default:
        shapeElement = `<circle cx="${center}" cy="${center}" r="${radius}" fill="${color}" stroke="black" stroke-width="2"/>`;
    }

    return `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        ${shapeElement}
      </svg>
    `;
  };

  useEffect(() => {
    drawTalisman();
  }, [design]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-gray-300 rounded-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
});

TalismanCanvas.displayName = 'TalismanCanvas';

export default TalismanCanvas;