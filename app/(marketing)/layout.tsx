import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-orange-50 dark:bg-sky-900 ">
      <Navbar />
      <main className="h-full pt-40">
        {children}
      </main>
    </div>
   );
}
 
export default MarketingLayout;