import React, { useRef, useEffect } from "react";
import "../index.css"

const Animate = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    const onMouseMove = (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const boxX = box.offsetLeft + box.clientWidth / 2;
      const boxY = box.offsetTop + box.clientHeight / 2;

      const distanceX = mouseX - boxX;
      const distanceY = mouseY - boxY;

      const maxDistance = 50;
      const moveX = (distanceX / window.innerWidth) * maxDistance;
      const moveY = (distanceY / window.innerHeight) * maxDistance;

      box.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={boxRef} className="box"></div>;
};

export default Animate;
