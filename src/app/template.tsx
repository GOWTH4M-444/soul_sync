import Preloader from "@/components/Preloader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
