import { DevTool } from "@hookform/devtools";
import { Control } from "react-hook-form";

interface MainLayoutProps {
  control?: Control<any>;
  children?: React.ReactNode;
}

function MainLayout({ control, children }: MainLayoutProps): JSX.Element {
  return (
    <div className="max-w-[800px] mx-auto p-4">
      {/* navbar */}

      <div className="flex flex-col gap-8 justify-center items-center py-16">
        {children}
      </div>

      {control && <DevTool control={control} />}
    </div>
  );
}

export default MainLayout;
