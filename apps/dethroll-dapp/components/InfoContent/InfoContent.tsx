'use client';
import { FC } from 'react';

const InfoContent: FC<{}> = () => {
  return (
    <div
      className="bg-cover overflow-hidden grid grid-cols-3 pt-10"
      style={{
        backgroundImage: `url(backgroundBlack.png)`,
        height: `calc(100vh - 136px)`,
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white">Origins</h1>
        <div className="m-auto text-white p-6 max-w-screen-2xl h-screen text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          risus lacus, pulvinar ac neque vestibulum, molestie elementum enim.
          Praesent metus elit, lobortis at massa vitae, blandit aliquet dui.
          Quisque consectetur iaculis nunc vel blandit. Praesent et libero ac
          dui dictum scelerisque. Sed pretium dui sit amet ligula egestas, a
          vulputate odio pretium. Donec pretium varius nunc non sodales. Duis
          placerat fringilla erat pharetra fringilla. Fusce porta ac ligula sed
          tempor. Morbi id imperdiet sapien. Nullam tempor ligula nunc, eget
          luctus tellus sollicitudin quis. Suspendisse vulputate et nisi in
          iaculis. Suspendisse venenatis diam quis felis lobortis, in iaculis
          nibh faucibus. Donec eu quam convallis, luctus nibh at, dignissim
          neque. Proin vestibulum, lacus id porttitor dictum, velit arcu
          porttitor arcu, vel congue tellus nisl nec nunc. Cras id porttitor ex,
          ac iaculis arcu. Fusce nec risus ut felis elementum lobortis eu tempus
          felis. Maecenas sem massa, iaculis ut placerat vel, pulvinar vitae
          nunc.
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white">Rules</h1>
        <div className="m-auto text-white p-6 max-w-screen-2xl h-screen text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          risus lacus, pulvinar ac neque vestibulum, molestie elementum enim.
          Praesent metus elit, lobortis at massa vitae, blandit aliquet dui.
          Quisque consectetur iaculis nunc vel blandit. Praesent et libero ac
          dui dictum scelerisque. Sed pretium dui sit amet ligula egestas, a
          vulputate odio pretium. Donec pretium varius nunc non sodales. Duis
          placerat fringilla erat pharetra fringilla. Fusce porta ac ligula sed
          tempor. Morbi id imperdiet sapien. Nullam tempor ligula nunc, eget
          luctus tellus sollicitudin quis. Suspendisse vulputate et nisi in
          iaculis. Suspendisse venenatis diam quis felis lobortis, in iaculis
          nibh faucibus. Donec eu quam convallis, luctus nibh at, dignissim
          neque. Proin vestibulum, lacus id porttitor dictum, velit arcu
          porttitor arcu, vel congue tellus nisl nec nunc. Cras id porttitor ex,
          ac iaculis arcu. Fusce nec risus ut felis elementum lobortis eu tempus
          felis. Maecenas sem massa, iaculis ut placerat vel, pulvinar vitae
          nunc.
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white">Help</h1>
        <div className="m-auto text-white p-6 max-w-screen-2xl h-screen text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          risus lacus, pulvinar ac neque vestibulum, molestie elementum enim.
          Praesent metus elit, lobortis at massa vitae, blandit aliquet dui.
          Quisque consectetur iaculis nunc vel blandit. Praesent et libero ac
          dui dictum scelerisque. Sed pretium dui sit amet ligula egestas, a
          vulputate odio pretium. Donec pretium varius nunc non sodales. Duis
          placerat fringilla erat pharetra fringilla. Fusce porta ac ligula sed
          tempor. Morbi id imperdiet sapien. Nullam tempor ligula nunc, eget
          luctus tellus sollicitudin quis. Suspendisse vulputate et nisi in
          iaculis. Suspendisse venenatis diam quis felis lobortis, in iaculis
          nibh faucibus. Donec eu quam convallis, luctus nibh at, dignissim
          neque. Proin vestibulum, lacus id porttitor dictum, velit arcu
          porttitor arcu, vel congue tellus nisl nec nunc. Cras id porttitor ex,
          ac iaculis arcu. Fusce nec risus ut felis elementum lobortis eu tempus
          felis. Maecenas sem massa, iaculis ut placerat vel, pulvinar vitae
          nunc.
        </div>
      </div>
    </div>
  );
};

export default InfoContent;
