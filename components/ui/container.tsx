import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ContainerProps{
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    );
}
 
export default Container;