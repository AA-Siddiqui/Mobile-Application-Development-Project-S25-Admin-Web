"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions";

export default function Drawer() {
  const [drawerState, setDrawerState] = useState(false);

  useEffect(() => {
    function openDrawer() {
      document.getElementById('drawer')!.style.left = '0';
      document.getElementsByTagName("main").item(0)!.classList.add("blur-ground");
      document.addEventListener("click", (event) => {
        const eventTarget = event.target as Node;

        if (document.getElementById("drawer")!.contains(eventTarget) || document.getElementById("drawer-btn")!.contains(eventTarget)) {
          return;
        }
        closeDrawer();
      });
    }

    function closeDrawer() {
      document.getElementById('drawer')!.style.left = '-250vw';
      document.getElementsByTagName("main").item(0)!.classList.remove("blur-ground");
      document.removeEventListener("click", (event: Event) => {
        const eventTarget = event.target as Node;
        if (document.getElementById("drawer")!.contains(eventTarget) || document.getElementById("drawer-btn")!.contains(eventTarget)) {
          return;
        }
        closeDrawer();
      });
    }

    if (drawerState) {
      openDrawer();
    } else {
      closeDrawer();
    }

  }, [drawerState]);

  return (
    <>
      <header id="drawer-btn" className="flex justify-between absolute left-0 top-0">
        <button className="text-2xl border-none py-2.5 px-5 cursor-pointer transition-all duration-300 ease-in-out bg-background-color text-text-color hover:bg-accent-color" onClick={() => { setDrawerState(true); }}>☰</button>
      </header>
      <aside id="drawer" className="h-full w-[75vw] left-[-75vw] fixed top-0 bg-surface-color text-text-color overflow-x-hidden transition-all duration-300 ease-in-out p-4 z-10 flex flex-col items-end md:w-[25vw] md:left-[-25vw]">
        <div className="flex justify-between items-center sticky w-full">
          <h1 className="text-[40px] p-2.5">UMS</h1>
          <button className="text-2xl border-none bg-transparent text-text-color cursor-pointer p-2.5" onClick={() => { setDrawerState(false); }}>×</button>
        </div>
        <div className="w-full flex flex-col justify-start gap-2.5">
          {/* {
            [
              { text: "Logout", route: "/" }
            ].map((btn, btnIndex) => {
              return (<a href={btn.route} className="text-text-color bg-background-color border-2 border-solid border-border-color no-underline p-5 w-full transition-all duration-300 ease-in-out hover:bg-surface-color" key={btnIndex}>{btn.text}</a>)
            })} */}
          <form action={signOutAction}>
        <Button className="text-text-color bg-background-color border-2 border-solid border-border-color no-underline p-5 w-full transition-all duration-300 ease-in-out hover:bg-surface-color" type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
        </div>
      </aside>
      <div className="pb-14"></div>
    </>
  );
}