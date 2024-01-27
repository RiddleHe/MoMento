import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[500px] md:w-[500px] translate-y-[-10%]">
          <Image
            src="/hero-black-new.png"
            fill
            className="object-contain dark:hidden"
            alt="hero-new-black"
          />
          <Image
            src="/hero-white-new.png"
            fill
            className="object-contain hidden dark:block"
            alt="hero-white-newnew"
          />
        </div>


      </div>
    </div>
  )
}