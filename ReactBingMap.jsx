import React, { useEffect, useState } from "react";

/// LOG STYLE FOR DEBUG
const log = (arg) => {
  console.log(`%c log: ${arg}`, "color:green; font-size:large;");
};
const check = (arg) => {
  console.log(
    `%c check: ${arg}`,
    "color:blue; font-weight:bold; font-size:large;"
  );
};
const err = (arg) => {
  console.log(`%c error: ${arg}`, "color:red; font-weight:bold;");
};
const next = (arg) => {
  alert(arg);
};

export default function ReactBingMap({
  height,
  width,
  debug,
  bingkey,
  mapOption,
  viewEvents,
  viewchangestart,
  viewchange,
  viewchangeend,
  mouseEvent,
  click,
  dblclick,
  rightclick,
  mousedown,
  mouseout,
  mouseover,
  mouseup,
  mousewheel,
  maptypechanged,
}) {
  console.log(height)
  const GetMap = () => {
    log("callin getmap");
    //> load maps
    let type = mapOption.mapTypeId;
    let map = new window.Microsoft.Maps.Map("#myReactBingMap", {
      credentials: mapOption.credentials ?? null,
      center:
        new window.Microsoft.Maps.Location(
          mapOption.center.latitude,
          mapOption.center.longitude
        ) ?? null,
      mapTypeId:
        window.Microsoft.Maps.MapTypeId.type ??
        window.Microsoft.Maps.MapTypeId.road,
      zoom: mapOption.zoom ?? null,
    });
    //> set map view
    map.setView({
      // mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      // center: new Microsoft.Maps.Location(35.027222, -111.0225),
      // zoom: 15,
      // padding: 80
    });
    // var locs = [array of Microsoft.Maps.Location];
    // var rect = Microsoft.Maps.LocationRect.fromLocations(locs);
    // map.setView({ bounds: rect, padding: 80 });

    //> add map events
    if (viewEvents) {
      //)Add view change events to the map(var)
      if (viewchangestart) {
        window.Microsoft.Maps.Events.addHandler(map, "viewchangestart", (e) => {
          viewchangestart(e);
        });
      }
      if (viewchange) {
        window.Microsoft.Maps.Events.addHandler(map, "viewchange", (e) => {
          viewchange(e);
        });
      }
      if (viewchangeend) {
        window.Microsoft.Maps.Events.addHandler(map, "viewchangeend", (e) => {
          viewchangeend(e);
        });
      }
    }

    //)Add mouse events to the map(var)
    if(mouseEvent){
      if(click){
        window.Microsoft.Maps.Events.addHandler(map, "click", (e) => {
          click(e);
        });
      }
      if(dblclick){
        window.Microsoft.Maps.Events.addHandler(map, "dblclick", (e) => {
          dblclick(e);
        });
      }
      if(rightclick){
        window.Microsoft.Maps.Events.addHandler(map, "rightclick", (e) => {
          rightclick(e);
        });
      }
      if(mousedown){
        window.Microsoft.Maps.Events.addHandler(map, "mousedown", (e) => {
          mousedown(e);
        });
      }
      if(mouseout){
        window.Microsoft.Maps.Events.addHandler(map, "mouseout", (e) => {
          mouseout(e);
        });
      }
      if(mouseover){
        window.Microsoft.Maps.Events.addHandler(map, "mouseover", (e) => {
          mouseover(e);
        });
      }
      if(mouseup){
        window.Microsoft.Maps.Events.addHandler(map, "mouseup", (e) => {
          mouseup(e);
        });
      }
      if(mousewheel){
        window.Microsoft.Maps.Events.addHandler(map, "mousewheel", (e) => {
          mousewheel(e);
        });
      }
    }

    //)Add addition map(var) event handlers
    if(maptypechanged){
      window.Microsoft.Maps.Events.addHandler(map, "maptypechanged", (e) => {
        maptypechanged(e);
      });
    }
  };

  // / Dynamic load the Bing Maps Key and Script
  // ) Get your own Bing Maps key at https://www.microsoft.com/maps
  (async () => {
    try {
      //> 1. if scriptag has already been created then GetMap or create scripttag
      if (window.Microsoft && window.Microsoft.Maps) {
        if (debug) check("1. script tag already present");
        GetMap();
      } else {
        let script = document.createElement("script");
        log("1. script tag created");
        script.setAttribute(
          "src",
          `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingkey}`
        );
        document.body.appendChild(script);
        setTimeout(() => {
          GetMap();
        }, 1000); // ! map does not load in 1st load so run after 1s , as "defer = true" does not work
      }
    } catch (error) {
      err(`creating script tag err : ${error}`);
    }
  })();

  return <div id="myReactBingMap" style={{ height: height , width: width }}></div>;
}
ReactBingMap.defaultProps = {
  height:"100%",
  width:"100%",
  debug : true,
  bingkey : null,
  mapOption : {center: {latitude:19.404037329366517 , longitude:84.17604352783164}},
  viewEvents : false,
  viewchangestart : undefined,
  viewchange : undefined,
  viewchangeend : undefined,
  mouseEvent: false,
  click : undefined,
  dblclick : undefined,
  rightclick : undefined,
  mousedown : undefined,
  mouseout : undefined,
  mouseover : undefined,
  mouseup : undefined,
  mousewheel : undefined,
  maptypechanged : undefined,
}