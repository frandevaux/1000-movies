import React, { useEffect, useRef, useState } from "react";

const DynamicGrid = ({ items }) => {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 200; // Ancho aproximado de cada elemento
        const newColumns = Math.floor(containerWidth / itemWidth);
        setColumns(newColumns || 1);
      }
    };

    handleResize(); // Ejecutar una vez al montar el componente
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño de la ventana
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rows = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <div ref={containerRef} className="w-full">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid gap-4`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {row.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicGrid;
