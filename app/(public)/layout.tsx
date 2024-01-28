const PublicLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full bg-orange-50 dark:bg-sky-900">
      {children}
    </div>
   );
}
 
export default PublicLayout;