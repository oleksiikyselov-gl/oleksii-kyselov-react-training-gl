import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="flex max-w-150 flex-col items-center space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Welcome to the Team! 🚀
        </h1>

        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Your journey with us starts right here.
        </h2>

        <p className="text-lg text-muted-foreground">
          We have built this onboarding portal to make your first days as smooth
          as possible. To initiate your setup process and configure your
          workplace, please fill out your initial data.
        </p>

        <div className="pt-4 space-y-4 flex flex-col items-center">
          <p className="text-sm font-medium">
            Please take a couple of minutes to complete your employee profile.
          </p>

          <Button
            asChild
            size="lg"
            className="text-base font-semibold px-8 h-12"
          >
            <Link to="/registration">Complete Your Profile &rarr;</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
