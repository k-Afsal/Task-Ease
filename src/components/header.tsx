import { DynamicInfo } from "./dynamic-info";

export function Header() {
    return (
        <header className="p-4 bg-background/30 backdrop-blur-lg border-b border-white/20 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-center">
                    <h1 className="font-headline text-3xl font-bold text-white drop-shadow-lg">
                        TaskEase
                    </h1>
                    <p className="text-gray-200 text-sm drop-shadow-md hidden sm:block">
                        Your calm and focused to-do list.
                    </p>
                </div>
                <DynamicInfo />
            </div>
        </header>
    );
}
