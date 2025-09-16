import { DynamicInfo } from "./dynamic-info";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
    return (
        <header className="p-4 bg-primary/80 backdrop-blur-lg border-b border-white/20 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="font-headline text-3xl font-bold text-primary-foreground drop-shadow-lg">
                        TaskEase
                    </h1>
                    <p className="text-primary-foreground/80 text-sm drop-shadow-md hidden sm:block">
                        Your calm and focused to-do list.
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
                  <DynamicInfo />
                  <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
