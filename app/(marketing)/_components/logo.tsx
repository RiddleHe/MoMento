import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo-black-new.png"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"//暗模式下，隐藏亮图标
      />
      <Image
        src="/logo-white-new.png"
        height="50"
        width="50"
        alt="Logo"
        className="hidden dark:block"//默认情况下都隐藏图标，但是dark模式下显示
      />
      <p className={cn("font-semibold", font.className)}>
          MCITotion
      </p>
    </div>
  )
}