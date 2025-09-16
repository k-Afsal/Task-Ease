import Link from "next/link";
import { Settings } from "lucide-react";
import { DynamicInfo } from "./dynamic-info";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Header() {
    return (
        <header className="p-4 bg-primary/80 backdrop-blur-lg border-b border-white/20 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                    <Link href="/">
                      <h1 className="font-headline text-3xl font-bold text-primary-foreground drop-shadow-lg">
                          TaskEase
                      </h1>
                    </Link>
                    <p className="text-primary-foreground/80 text-sm drop-shadow-md hidden sm:block">
                        Your calm and focused to-do list.
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center">
                  <DynamicInfo />
                  <Link href="/settings">
                    <Button variant="ghost" size="icon" aria-label="Settings">
                        <Settings className="text-primary-foreground" />
                    </Button>
                  </Link>
                  <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
