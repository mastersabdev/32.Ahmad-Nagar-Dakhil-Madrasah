"use client";

import React, { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "@/styles/slider.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SliderComponent({ sliderImages }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    if (!instanceRef.current) return;

    const slider = instanceRef.current;
    timerRef.current = setInterval(() => {
      slider.next();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [instanceRef]);

  return (
    <div className="relative">
      <div className="navigation-wrapper">
        <div className="navigation-wrapper">
          <div
            ref={sliderRef}
            className={cn(
              "keen-slider border border-slate-300 overflow-hidden",
              !loaded && "opacity-0 pointer-events-none"
            )}
          >
            {sliderImages?.length > 0
              ? sliderImages.map((item, i) => (
                  <div key={item.id} className="keen-slider__slide">
                    <Image
                      className="max-h-[380px] h-full w-full object-cover"
                      src={item?.image_url || "/images/common/placeholder.svg"}
                      alt={item?.title || `School gallery slide ${i + 1}`}
                      width={1800}
                      height={1200}
                    />
                  </div>
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="keen-slider__slide">
                    <Image
                      className="max-h-[380px] h-full w-full object-cover"
                      src="/images/common/placeholder.svg"
                      alt={`School gallery slide ${i + 1}`}
                      width={1800}
                      height={1200}
                    />
                  </div>
                ))}
          </div>

          {!loaded && (
            <div className="flex items-center justify-center">
              <div className="w-full max-h-[380px] bg-slate-200 h-[220px] animate-pulse border border-slate-300" />
            </div>
          )}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.prev();
              }}
            />
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.next();
              }}
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current.moveToIdx(idx)}
              className={"dot" + (currentSlide === idx ? " active" : "")}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow({ left, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={`arrow ${left ? "arrow--left" : "arrow--right"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
