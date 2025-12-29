import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ResonanceMetrics } from '../types';

interface SigilProps {
  metrics: ResonanceMetrics;
}

const SigilGenerator: React.FC<SigilProps> = ({ metrics }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || metrics.numericSequence.length === 0) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;
    const center = { x: width / 2, y: height / 2 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear canvas

    // Define 9 points on the circle (1-9)
    const points: { [key: number]: { x: number, y: number } } = {};
    for (let i = 1; i <= 9; i++) {
      // -90 degrees to start 1 at top, mapping 1-9 clockwise
      const angle = ((i - 1) / 9) * 2 * Math.PI - (Math.PI / 2); 
      points[i] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    }

    // Draw the Circle
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", metrics.isResonant ? "#c5a059" : "#334155")
      .attr("stroke-width", 2)
      .attr("opacity", 0.6);

    // Draw the Numbers
    Object.entries(points).forEach(([key, pos]) => {
      svg.append("text")
        .attr("x", pos.x)
        .attr("y", pos.y)
        .attr("dy", "0.35em")
        .attr("dx", (d) => {
             // slight adjustment for visual centering based on angle could go here
             return 0;
        })
        .attr("text-anchor", "middle")
        .text(key)
        .attr("fill", [3, 6, 9].includes(parseInt(key)) ? "#c5a059" : "#64748b")
        .attr("font-size", "12px")
        .attr("font-family", "Fira Code");
    });

    // Draw the Sigil Path
    const lineGenerator = d3.line<{x: number, y: number}>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveLinear);

    const pathData = metrics.numericSequence
      .filter(n => n >= 1 && n <= 9) // Only map valid root numbers
      .map(n => points[n]);

    if (pathData.length > 1) {
      svg.append("path")
        .datum(pathData)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", metrics.resonanceType === 'Tesla' ? "#00f0ff" : metrics.resonanceType === 'Void' ? "#ff3333" : "#94a3b8")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.8)
        .attr("filter", "url(#glow)");
    }

    // Add nodes at vertices
    svg.selectAll(".node")
      .data(pathData)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 3)
      .attr("fill", "#0a0a0c")
      .attr("stroke", "#c5a059")
      .attr("stroke-width", 1);

    // Glow Filter Definition
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  }, [metrics]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-void border border-gray-800 rounded-lg shadow-2xl">
      <h3 className="text-gold font-serif mb-4 tracking-widest text-sm uppercase">Algorithmic Sigil</h3>
      <svg ref={svgRef} width={400} height={400} className="w-full max-w-[300px] h-auto" />
      <div className="mt-4 text-xs font-mono text-gray-500">
        Resonance: <span className={metrics.isResonant ? "text-cyan" : "text-gray-400"}>
          {metrics.digitalRoot} 
          {metrics.isResonant && " [Tesla Lock]"}
        </span>
      </div>
    </div>
  );
};

export default SigilGenerator;