import { DynamicInfo } from "./dynamic-info";

export function Header() {
    return (
        <header className="p-4 bg-primary/80 backdrop-blur-lg border-b border-white/20 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-center">
                    <h1 className="font-headline text-3xl font-bold text-primary-foreground drop-shadow-lg">
                        TaskEase
                    </h1>
                    <p className="text-primary-foreground/80 text-sm drop-shadow-md hidden sm:block">
                        Your calm and focused to-do list.
                    </p>
                </div>
                <DynamicInfo />
            </div>
        </header>
    );
}
